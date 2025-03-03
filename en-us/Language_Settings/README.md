# Language Settings System Overview <!-- {docsify-ignore} -->
 
## Purpose <!-- {docsify-ignore} -->
A comprehensive system for managing multilingual configurations and adaptive learning progression within domains, featuring:

1. **Language Management**: Create/modify system/domain languages with skill types
2. **Level Progression**: Define scoring rules and thresholds per language level
3. **Customization**: Support domain-specific languages and skill types
4. **Synchronization**: Automatic updates between languages and related levels

---

## Key Components <!-- {docsify-ignore} -->
 
### 1. Core Data Structures <!-- {docsify-ignore} -->
| Structure                | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| **LangSettingDoc**       | Full language config (codes, custom flag, skill types)                     |
| **SystemLangsDoc**       | Pre-configured system languages (en/zh/es with default skill types)        |
| **DomainLangsDoc**       | Tracks active/available/custom languages per domain                        |
| **LevelSettingDoc**      | Defines level requirements and skill weights (Listening:25%, Grammar:-5%/level) |

### 2. Model Operations <!-- {docsify-ignore} -->
| Model           | Key Features                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| **langSetModel**| - Auto-generates conflict-free custom codes (custom1, custom2)<br>- Manages language types with sync to levels<br>- Handles system/domain initialization |
| **levelSetModel**| - Dynamic percentage calculations based on level number<br>- Automatic type synchronization<br>- Level scoring rule management |

### 3. Key Functionality <!-- {docsify-ignore} -->
- **Automatic Initialization**: Creates system languages and domain configs on first access
- **Retry Mechanism**: 10 retries with 1s delays for concurrent domain setup
- **Skill Type Management**: 
  ```typescript
  // Auto-generates next available type code (A-Z)
  for (let charCode = 65; charCode <= 90; charCode++) {
    if (!existingCodes.includes(String.fromCharCode(charCode))) {
      // Use this code
    }
  }
  ```
- **Dynamic Level Rules**: 
  ```typescript
  case 'R': percentage = Math.min(25, 5*(level-1)); // Reading +5% per level
  case 'G': percentage = Math.max(0, 25 - 5*(level-1)); // Grammar -5% per level
  ```

---

## Integration Flow <!-- {docsify-ignore} -->
1. **UI Injection**: Adds language settings tab to Hydrooj domain management
   ```typescript
   ctx.injectUI('DomainManage', 'language_settings', {family: 'Properties', icon: 'info' })
   ```
2. **Data Flow**:
   - Handlers receive HTTP requests
   - Models process business logic and DB operations
   - Changes propagate to related levels via `syncType()`
3. **Customization**:
   - 6 default levels created with new languages
   - Unique problem prefixes per domain through `problemPrefix` field

---

## Error Handling <!-- {docsify-ignore} -->
- **Validation**: Checks for valid langCodes and type structures
  ```typescript
  if (!sanitizedCode) throw new Error('Invalid language code');
  ```
- **Conflict Resolution**: Custom code generation avoids system conflicts
- **Sync Safety**: Maintains level-type relationships during updates/deletes

This system provides a robust framework for managing language learning environments with configurable progression rules and automatic data consistency maintenance.
