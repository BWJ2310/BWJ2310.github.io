# Language Settings Handler <small>*file path: language_setting.ts*</small>

**Class Purpose**: Manages language configurations, skill types, and level settings within a domain via HTTP handlers.  


---

### **Handlers and Code**

---

#### **1. `GET /language_settings`  
**Method**: `get`  
**Purpose**: Fetches language settings for a domain or initializes default system/demo languages.  

```typescript
async get({ domainId }) {
    const maxRetries = 10;
    const retryDelay = 1000;
    let langInfo;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        langInfo = await langSetModel.get(domainId);
        if (langInfo.langSet?.length > 0) break;
        if (!langInfo || langInfo.langSet.length === 0) {
            langInfo = await langSetModel.initiate(domainId);
        }
        if (attempt < maxRetries - 1) {
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
    }

    this.response.template = 'domain_language_settings.html';
    this.response.body = { langInfo: langInfo || [] };
}
```

**Parameters**:  
- `domainId` (from route): Domain identifier (e.g., `"default"`).  

**Flow**:  
1. Retries fetching language data up to 10 times (1s delay between attempts).  
2. If no languages exist, initializes defaults via `langSetModel.initiate`.  
3. Renders `domain_language_settings.html` with aggregated data (`langSet`, `langCodes`, `langLevel`).  

**Key Logic**:  
- Retry mechanism ensures system/demo languages are created on first use.  
- Combines data from `LangSettingDoc`, `DomainLangsDoc`, and `LevelSettingDoc`.

---

#### **2. `POST /language_settings/addLang`  
**Method**: `postAddLang`  
**Purpose**: Adds a new language with predefined skill types.  

```typescript
@param('langIndexId', Types.Number, true)
async postAddLang(domainId: string, langIndexId: number) {
    await langSetModel.addLang(domainId, `lang # ${langIndexId}`, [
        { typeId: new ObjectId(), typeCode: 'L', typeName: 'Listening', tags: 'fill in blanks' },
        { typeId: new ObjectId(), typeCode: 'S', typeName: 'Speaking', tags: 'repeat' },
        { typeId: new ObjectId(), typeCode: 'R', typeName: 'Reading', tags: 'multiple choice' },
        { typeId: new ObjectId(), typeCode: 'W', typeName: 'Writing', tags: 'description' },
        { typeId: new ObjectId(), typeCode: 'V', typeName: 'Vocabulary', tags: 'check' },
        { typeId: new ObjectId(), typeCode: 'G', typeName: 'Grammar', tags: 'check' }
    ]);
    this.response.redirect = this.url('language_settings', { domainId });
}
```

**Parameters**:  
- `langIndexId` (form): Numeric index to generate a language name (e.g., `lang # 1`).  

**Flow**:  
1. Calls `langSetModel.addLang` to create a language with hardcoded skill types (Listening, Speaking, etc.).  
2. Automatically creates 6 levels via `levelSetModel.add`.  
3. Redirects to refresh the settings page.  

**Defaults**:  
- Skill types are predefined (e.g., `typeCode: 'L'` for Listening).  

---

#### **3. `POST /language_settings/updateLang`  
**Method**: `postUpdateLang`  
**Purpose**: Updates a language's metadata (code, name, custom flag).  

```typescript
@param('domainLangId', Types.ObjectId, true)
@param('langCode', Types.String, true)
@param('langName', Types.String, true)
@param('isCustom', Types.Boolean, true)
async postUpdateLang(
    domainId: string,
    domainLangId: string,
    langCode: string,
    langName: string,
    isCustom: boolean
) {
    await langSetModel.updateLang(domainLangId, domainId, { isCustom, langCode, langName });
    this.response.redirect = this.url('language_settings', { domainId });
}
```

**Parameters**:  
- `domainLangId` (form): `ObjectId` of the language document.  
- `langCode` (form): Updated short code (e.g., `"en"`).  
- `langName` (form): Display name (e.g., `"Business English"`).  
- `isCustom` (form): Whether the language is custom.  

**Flow**:  
1. Calls `langSetModel.updateLang` to update metadata.  
2. Handles `langCode` conflicts for custom languages (auto-generates unique codes).  
3. Redirects to refresh the settings page.  

---

#### **4. `POST /language_settings/deleteLang`  
**Method**: `postDeleteLang`  
**Purpose**: Deletes a language and its associated levels.  

```typescript
@param('langCode', Types.String, true)
@param('isCustom', Types.Boolean, true)
@param('domainLangId', Types.ObjectId, true)
async postDeleteLang(
    domainId: string,
    langCode: string,
    isCustom: boolean,
    domainLangId: ObjectId,
) {
    console.log('Deleting ID:', domainLangId, 'Type:', typeof domainLangId);
    await levelSetModel.deleteLevels(domainId, domainLangId);
    await langSetModel.deleteLang(domainLangId);
    await langSetModel.deleteDomainLang(domainId, langCode, isCustom);
    this.response.redirect = this.url('language_settings', { domainId });
}
```

**Parameters**:  
- `domainLangId` (form): `ObjectId` of the language document.  
- `langCode` (form): Language code (e.g., `"en"`).  
- `isCustom` (form): Whether the language is custom.  

**Flow**:  
1. Deletes associated levels via `levelSetModel.deleteLevels`.  
2. Removes the language document via `langSetModel.deleteLang`.  
3. Updates domain language lists via `langSetModel.deleteDomainLang`.  
4. Redirects to refresh the settings page.  

---

#### **5. `POST /language_settings/addType`  
**Method**: `postAddType`  
**Purpose**: Adds a new skill type to a language with a unique alphabetical code (A-Z).  

```typescript
@param('domainLangId', Types.ObjectId, true)
async postAddType(domainId: string, domainLangId: ObjectId) {
    const currentLang = await coll.findOne(domainLangId);
    let typeCode: string;
    const currentCodes = currentLang.langTypes.map(type => type.typeCode);
    for (let charCode = 65; charCode <= 90; charCode++) {
        typeCode = String.fromCharCode(charCode);
        if (!currentCodes.includes(typeCode)) {
            await langSetModel.addType(domainLangId, typeCode);
            break;
        }
    }
    this.response.redirect = this.url('language_settings', { domainId });
}
```

**Parameters**:  
- `domainLangId` (form): `ObjectId` of the language document.  

**Flow**:  
1. Finds the next unused alphabetical code (A-Z).  
2. Adds the type via `langSetModel.addType`.  
3. Syncs levels with the new type via `levelSetModel.syncType`.  
4. Redirects to refresh the settings page.  

**Key Logic**:  
- Sequential code assignment (e.g., `A` → `B` → `C`) ensures uniqueness.  

---

#### **6. `POST /language_settings/updateType`  
**Method**: `postUpdateType`  
**Purpose**: Updates a skill type's details (code, name, tags).  

```typescript
@param('domainLangId', Types.ObjectId, true)
@param('typeId', Types.ObjectId, true)
@param('typeCode', Types.String, true)
@param('typeName', Types.String, true)
@param('tags', Types.ArrayOf(Types.String), true)
async postUpdateType(
    domainId: string,
    domainLangId: ObjectId,
    typeId: ObjectId,
    typeCode: string,
    typeName: string,
    tags: string[]
) {
    await langSetModel.updateType(domainLangId, typeId, { typeName, typeCode, tags });
    this.response.redirect = this.url('language_settings', { domainId });
}
```

**Parameters**:  
- `domainLangId` (form): `ObjectId` of the language document.  
- `typeId` (form): `ObjectId` of the skill type.  
- `typeCode` (form): Updated short code (e.g., `"L"`).  
- `typeName` (form): Display name (e.g., `"Listening"`).  
- `tags` (form): Usage context tags (e.g., `["fill in blanks"]`).  

**Flow**:  
1. Updates the type via `langSetModel.updateType`.  
2. Syncs changes across all levels via `levelSetModel.syncType`.  
3. Redirects to refresh the settings page.  

---

#### **7. `POST /language_settings/deleteType`  
**Method**: `postDeleteType`  
**Purpose**: Deletes a skill type from a language.  

```typescript
@param('domainLangId', Types.ObjectId, true)
@param('typeId', Types.ObjectId, true)
async postDeleteType(
    domainId: string,
    domainLangId: ObjectId,
    typeId: ObjectId
) {
    await langSetModel.deleteType(domainLangId, typeId);
    this.response.redirect = this.url('language_settings', { domainId });
}
```

**Parameters**:  
- `domainLangId` (form): `ObjectId` of the language document.  
- `typeId` (form): `ObjectId` of the skill type.  

**Flow**:  
1. Deletes the type via `langSetModel.deleteType`.  
2. Syncs levels to remove the type via `levelSetModel.syncType`.  
3. Redirects to refresh the settings page.  

---

### **Level Management Handlers**

---

#### 8. `POST /language_settings/updateLevel`  
**Method**: `postUpdateLevel`  
**Purpose**: Updates a level's scoring rules and thresholds.  

```typescript
@param('levelName', Types.String)
@param('totalPoint', Types.Number)
@param('requiredPoint', Types.Number)
@param('levelId', Types.ObjectId, true)
@param('percentage', Types.Object, true)
@param('typePoints', Types.Object, true)
async postUpdateLevel(
    domainId: string,
    levelName: string,
    totalPoint: number,
    requiredPoint: number,
    levelId: ObjectId,
    percentage: { [key: string]: number },
    typePoints: Array<{ typeCode: string; correct: number; wrong: number }>
) {
    console.log('percentage is ', percentage);
    console.log('typePoint is', typePoints);
    await levelSetModel.update(
        domainId,
        levelId,
        levelName,
        totalPoint,
        requiredPoint,
        percentage,
        typePoints
    );
    this.response.redirect = this.url('language_settings', { domainId });
}
```

**Parameters**:  
- `levelId` (form): `ObjectId` of the level document.  
- `levelName` (form): Display name (e.g., `"Intermediate"`).  
- `totalPoint` (form): Max points for the level (e.g., `2760`).  
- `requiredPoint` (form): Minimum points to complete (e.g., `1932`).  
- `percentage` (form): Weightage per skill type (e.g., `{ "L": 25 }`).  
- `typePoints` (form): Scoring rules (e.g., `[{ typeCode: "L", correct: 15, wrong: 10 }]`).  

**Flow**:  
1. Calls `levelSetModel.update` to update level configuration.  
2. Redirects to refresh the settings page.  

---

#### **9. `POST /language_settings/addLevel`  
**Method**: `postAddLevel`  
**Purpose**: Adds a new level to a language.  

```typescript
@param('domainLangId', Types.ObjectId, true)
async postAddLevel(domainId: string, domainLangId: ObjectId) {
    const count: number = await coll.countDocuments({
        domainId,
        domainLangId,
        docType: TYPE_LEVEL_SETTING
    });
    await levelSetModel.add(domainId, domainLangId, count + 1);
    this.response.redirect = this.url('language_settings', { domainId });
}
```

**Parameters**:  
- `domainLangId` (form): `ObjectId` of the language document.  

**Flow**:  
1. Counts existing levels to determine the next level number.  
2. Adds a new level via `levelSetModel.add`.  
3. Redirects to refresh the settings page.  

**Default Naming**: Levels are named `level {n}` (e.g., `level 3`).  

---

#### **10. `POST /language_settings/deleteLevel`  
**Method**: `postDeleteLevel`  
**Purpose**: Deletes a level.  

```typescript
@param('levelId', Types.ObjectId, true)
async postDeleteLevel(domainId: string, levelId: ObjectId) {
    await levelSetModel.delete(domainId, levelId);
    this.response.redirect = this.url('language_settings', { domainId });
}
```

**Parameters**:  
- `levelId` (form): `ObjectId` of the level document.  

**Flow**:  
1. Deletes the level via `levelSetModel.delete`.  
2. Redirects to refresh the settings page.  

---

### **Key Interactions with Models**
| Handler              | Model Methods Used               | Purpose                                  |
|----------------------|----------------------------------|------------------------------------------|
| `get`                | `langSetModel.get`, `initiate`   | Fetch/initialize domain language data.   |
| `postAddLang`        | `langSetModel.addLang`           | Create a new language with default types.|
| `postUpdateLang`     | `langSetModel.updateLang`        | Update language metadata.                |
| `postDeleteLang`     | `levelSetModel.deleteLevels`, `langSetModel.deleteLang` | Remove language and its levels. |
| `postAddType`        | `langSetModel.addType`           | Add a skill type to a language.          |
| `postUpdateType`     | `langSetModel.updateType`        | Modify a skill type's details.           |
| `postDeleteType`     | `langSetModel.deleteType`        | Remove a skill type.                     |
| `postUpdateLevel`    | `levelSetModel.update`           | Update level scoring rules.              |
| `postAddLevel`       | `levelSetModel.add`              | Create a new level.                      |
| `postDeleteLevel`    | `levelSetModel.delete`           | Delete a level.                          |

---

### **Notes**
- **Redirects**: All POST handlers redirect to `language_settings` to refresh the UI.  
- **Error Handling**: Limited explicit error handling; relies on HydroJS framework exceptions.  
- **Type Code Generation**: `postAddType` uses A-Z sequential codes to avoid conflicts.  
- **Level Initialization**: Adding a language (`postAddLang`) auto-creates 6 levels with dynamic skill weights.