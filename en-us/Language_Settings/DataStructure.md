# Data Structures

### LangSettingDoc  <small> *language_info_setting.ts* </small>
**Purpose**: Stores complete configuration for a language within a domain. 

**Fields**:
- `domainId`: Domain identifier (e.g., "default")
- `langCode`: Unique language identifier (system or custom like "custom1")
- `langName`: Display name (e.g., "Business English")
- `isCustom`: Marks custom-created languages
- `langTypes`: Array of skill configurations
  ```typescript
  langTypes: [{
    typeId: new ObjectId(),      // Unique identifier
    typeCode: "G",               // Short code
    typeName: "Grammar",         // Display name
    tags: "sentence correction"  // Usage context
  }]
  ```

### SystemLangsDoc <small> *language_info_setting.ts* </small>
**Purpose**: Defines system-wide available languages.  
**Fields**:
- `availableLangCodes`: ["en", "zh", "es", "fr"] (supported languages)
- `defaultLangCodes`: ["en", "zh", "es"] (pre-activated)
- `langs`: Complete pre-configured language templates with types
  ```typescript
  langs: [{
    langCode: "es",
    langTypes: [{
      typeCode: "L",
      typeName: "Audiencia",
      tags: "llenar espacios en blanco"
    }]
  }]
  ```

### `DomainLangsDoc` <small> *language_info_setting.ts* </small>
**Purpose**: Tracks language availability/usage per domain.  
**Fields**:
- `currentLangs`: ["en", "zh"] (active languages)
- `availableLangs`: ["es", "fr"] (available for activation)
- `customLangs`: ["custom1"] (domain-specific languages)

### `LevelSettingDoc`
**file path**: language_level_setting.ts
**Purpose**: Defines progression rules for language levels.  
**Fields**:
- `typePoints`: Scoring rules per skill type
  ```typescript
  typePoints: [{
    typeCode: "R",
    percentage: 15,           // Weight in level
    typePoint: {
      correct: 15,            // Points awarded
      wrong: 10               // Points deducted
    }
  }]
  ```
- `totalPoint`: 2760 (max points for level 3)
- `requiredPoint`: 1932 (minimum to complete level)



