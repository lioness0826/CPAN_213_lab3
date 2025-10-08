 Root Directory Overview

| File / Folder | Description |
|----------------|--------------|
| **android/** | Native Android build files (Gradle, manifests, etc.) |
| **ios/** | Native iOS project files (Xcode project) |
| **src/** | Main source folder containing all application code |
| **node_modules/** | Auto-generated dependencies installed by npm |
| **.eslintrc.js** | ESLint configuration for code linting and style consistency |
| **.eslintignore** | Files and folders ignored by ESLint |
| **.prettierrc.js** | Prettier configuration for code formatting |
| **.prettierignore** | Files ignored by Prettier |
| **.gitignore** | Files ignored by Git version control |
| **package.json** | Project metadata, dependencies, and npm scripts |
| **babel.config.js** | Babel configuration for JavaScript transpilation |
| **metro.config.js** | Metro bundler configuration for React Native |
| **tsconfig.json** | TypeScript compiler configuration |
| **App.tsx** | Application entry point |
| **README.md** | Main project documentation |
| **PROJECT_STRUCTURE.md** | (This file) Folder structure and explanation |

---

## `src/` Directory Breakdown

| Folder | Description |
|--------|--------------|
| **components/common/** | Reusable UI components shared across screens |
| ├── `ContactListItem.js` → Displays a single contact item with icons (call, message, favorite). |  
| ├── `CustomButton.js` → Styled button component used across forms. |  
| ├── `CustomInput.js` → Input field with icons, validation, and error display. |  
| └── `LoadingSpinner.js` → Reusable loading indicator. |
| **data/** | Static or mock data used for testing and development. |
| └── `contactsData.js` → Contains mock contacts and search/filter logic. |
| **screens/** | Contains all screen-level components of the app. |
| ├── `AddContact/` → `AddContactScreen.js`: Add or edit contact form. |  
| ├── `ContactDetails/` → `ContactDetailsScreen.js`: Display full contact info. |  
| └── `ContactList/` → `ContactListScreen.js`: Main contact list screen. |
| **styles/** | Global styles and theme definitions. |
| └── `globalStyles.js` → Shared color palette, font sizes, and spacing constants. |
| **utils/** | Helper functions and context providers. |
| └── `ContactContext.js` → React Context for managing contact state globally. |



