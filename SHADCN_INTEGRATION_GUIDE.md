# shadcn Integration Guide

This document outlines the commands, syntaxes, and files created to integrate **shadcn/ui** with your Vite + React + TypeScript project.

## Overview

The project was previously using **Create React App (react-scripts)**, which is no longer supported by shadcn. To enable shadcn integration, we configured the project to work with **Vite** as the build tool.

---

## Files Created & Modified

### 1. **vite.config.ts** (Created)
Vite configuration file with React plugin and path aliases support.

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Purpose**: 
- Configures Vite as the build tool
- Adds React plugin for JSX support
- Defines `@` path alias pointing to `./src` directory

---

### 2. **tailwind.config.mjs** (Created)
Tailwind CSS configuration file.

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Purpose**:
- Configures Tailwind CSS for the project
- Specifies which files to scan for class names (`./src/**/*.{js,ts,jsx,tsx}`)
- Allows theme customization and plugin extensions

**Note**: Used `.mjs` extension (ES module) for Vite compatibility

---

### 3. **postcss.config.mjs** (Created)
PostCSS configuration file for Tailwind CSS processing.

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**Purpose**:
- Processes Tailwind CSS directives during build
- Adds vendor prefixes automatically with autoprefixer

**Note**: Used `.mjs` extension for consistency with modern tooling

---

### 4. **tsconfig.json** (Modified)
Updated TypeScript configuration with path aliases.

**Added lines**:
```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

**Full compilerOptions section**:
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

**Purpose**:
- Enables import path aliases
- Allows using `@/component` instead of `../../../component`

---

## Commands Used

### Initialize shadcn/ui
```bash
npx shadcn@latest init
```

**Options selected**:
- Component library: **Radix**
- Preset: **Nova**
- Framework: **Vite** (auto-detected)

### With framework type specification (alternative)
```bash
npx shadcn@latest init -t vite
```

---

## Dependencies Already in package.json

```json
{
  "dependencies": {
    "tailwindcss": "^3.4.19",
    "autoprefixer": "^10.5.0",
    "postcss": "^8.5.15"
  },
  "devDependencies": {
    "typescript": "^4.9.5",
    "react": "^19.2.6",
    "react-dom": "^19.2.6"
  }
}
```

These were already present in the project and did not require installation.

---

## Troubleshooting

### Issue: "We could not detect a supported framework"
**Solution**: 
- Create `vite.config.ts` file so shadcn can detect Vite as the framework
- Ensure Tailwind config files exist (`.mjs` or `.ts` extension)

### Issue: "No Tailwind CSS configuration found"
**Solution**:
- Create `tailwind.config.mjs` with proper content configuration
- Ensure `postcss.config.mjs` is present
- Use `.mjs` extension for modern ESM support

### Issue: "Could not find valid path aliases"
**Solution**:
- Add `baseUrl` and `paths` to `tsconfig.json`
- Configure `alias` in `vite.config.ts`

---

## Adding shadcn Components

After successful initialization, add components using:

```bash
npx shadcn-ui@latest add [component-name]
```

**Examples**:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
```

---

## Import Syntax

With path aliases configured, import components using:

```typescript
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
```

Instead of:
```typescript
import { Button } from '../../../components/ui/button'
```

---

## Next Steps

1. Run `npx shadcn@latest init` to complete the initialization
2. Start adding components with `npx shadcn-ui@latest add [component-name]`
3. Components will be created in `src/components/ui/` directory
4. Ensure all Tailwind styles are imported in your main CSS file

