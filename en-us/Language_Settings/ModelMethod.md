# Data Model Methods

### langSetModel <small> *language_info_setting.ts* </small>
#### **get(domainId)**
```typescript
static async get(domainId: string) {
  let langSet = await coll.find<LangSettingDoc>({
    domainId,
    docType: TYPE_LANG_SETTING
  }).toArray();
  
  // Cross-collection data aggregation
  const langCodes = (await coll.findOne<DomainLangsDoc>({
    docType: TYPE_DOMAIN_LANGS
  }))?.availableLangs;
  
  return { langSet, langCodes };
}
```
**Purpose**: Aggregates language data from multiple collections for domain.

#### **initiate(domainId)**
```typescript
static async initiate(domainId: string) {
  // System langs initialization
  if (!systemLangs) {
    await coll.insertOne<SystemLangsDoc>({
      _id: new ObjectId(),
      docType: TYPE_SYSTEM_LANGS,
      availableLangCodes: ["en", "zh", "es", "fr"],
      langs: DEFAULT_SYSTEM_LANGS
    });
  }

  // Domain langs initialization
  if (!domainLangs) {
    await coll.insertOne<DomainLangsDoc>({
      domainId,
      availableLangs: systemLangs.availableLangCodes,
      customLangs: []
    });

    // Clone system langs to domain
    for (const lang of systemLangs.langs) {
      await this.addLang(domainId, lang.langName, lang.langTypes);
    }
  }
}
```
**Purpose**: First-time setup for system and domain languages.

#### **addLang()**
```typescript
static async addLang(domainId: string, langName: string, langTypes) {
  // Custom code generation logic
  let langCode = "custom";
  let suffix = 1;
  while (conflictExists(langCode)) {
    langCode = `custom${suffix++}`;
  }

  // Create 6 default levels
  const payload = {
    _id: new ObjectId(),
    docType: TYPE_LANG_SETTING,
    domainId,
    langCode,
    langName,
    langTypes,
    isCustom: true
  };
  
  for (let i = 1; i <= 6; i++) {
    await levelSetModel.add(domainId, payload._id, i);
  }
  
  return payload;
}
```
**Purpose**: Creates custom language with auto-generated code and default levels.

#### **updateLang()**
```typescript
static async updateLang(_id: ObjectId, domainId: string, update) {
  // Conflict resolution for langCode
  if (update.isCustom) {
    let candidate = update.langCode;
    while (codeExists(candidate)) {
      candidate = `${base}${suffix++}`;
    }
    update.langCode = candidate;
  }

  // Database update operation
  const result = await coll.findOneAndUpdate(
    { _id },
    { $set: update },
    { returnDocument: 'after' }
  );

  // Sync domain language lists
  await this.updateDomainLang(domainId, update.isCustom, update.langCode);
  
  return result.value;
}
```
**Purpose**: Updates language metadata with conflict-safe code generation.

### `levelSetModel` <small> *language_level_setting.ts* </small>

#### **add()**
```typescript
static async add(domainId: string, domainLangId: ObjectId, levelCount: number) {
  const langSetting = await coll.findOne<LangSettingDoc>({
    _id: domainLangId,
    docType: TYPE_LANG_SETTING
  });

  // Dynamic percentage calculation
  const typePoints = langSetting.langTypes.map(type => {
    let percentage;
    switch(type.typeCode) {
      case 'L': case 'S': percentage = 25;
      case 'R': case 'W': percentage = Math.min(25, 5*(levelCount-1));
      case 'V': case 'G': percentage = Math.max(0, 25 - 5*(levelCount-1));
    }
    return { 
      typeId: type.typeId,
      percentage,
      typePoint: { correct: 15, wrong: 10 }
    };
  });

  // Level creation
  return await coll.insertOne({
    _id: new ObjectId(),
    docType: TYPE_LEVEL_SETTING,
    domainId,
    domainLangId,
    levelName: `level ${levelCount}`,
    totalPoint: (levelCount * 500 + 1000) * 1.2,
    requiredPoint: (levelCount * 500 + 1000) * 0.84,
    typePoints
  });
}
```
**Purpose**: Creates level with progression-based skill weights.

#### **syncType()**
```typescript
static async syncType(domainId: string, domainLangId: ObjectId, langTypes) {
  const levels = await coll.find<LevelSettingDoc>({
    docType: TYPE_LEVEL_SETTING,
    domainId,
    domainLangId
  }).toArray();

  for (const level of levels) {
    // Merge existing data with new types
    const updated = langTypes.map(newType => 
      level.typePoints.find(t => t.typeId.equals(newType.typeId)) || {
        typeId: newType.typeId,
        percentage: 0,
        typePoint: { correct:15, wrong:10 }
      }
    );
    
    await coll.updateOne(
      { _id: level._id },
      { $set: { typePoints: updated } }
    );
  }
}
```
**Purpose**: Synchronizes skill type changes across all levels.

#### **update()**
```typescript
static async update(domainId: string, levelId: ObjectId, updateData) {
  // Validation
  if (!updateData.typePoints[1]?.typeCode) {
    throw new Error("Invalid typePoints structure");
  }

  // Update operation
  const result = await coll.updateOne(
    { _id: levelId, domainId },
    { $set: {
      levelName: updateData.levelName,
      totalPoint: updateData.totalPoint,
      typePoints: updateData.typePoints
    }},
    { returnDocument: "after" }
  );

  if (result.matchedCount === 0) {
    throw new Error("Level update failed");
  }
  
  return result;
}
```
**Purpose**: Modifies level configuration with data validation.