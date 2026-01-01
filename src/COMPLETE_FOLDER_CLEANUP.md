# Complete /components Folder Removal Plan

## Current Situation
- App.tsx imports from `/components` (old location)
- We need to move everything to `/src/components` (new location)
- Then delete `/components` folder entirely

## Files to Move

### Root Level Components (move to `/src/components/layout/`)
- CitizenPortal.tsx
- OfficerPortal.tsx
- AdminPanel.tsx
- FieldOfficerPortal.tsx
- LoginPage.tsx
- CitizenLanding.tsx
- WaterTheme.tsx

### Citizen Components (move to `/src/components/modules/citizen/`)
- FirstConnectionForm.tsx ✅ (already has migrated version)
- FirstConnectionGrievance.tsx
- All other citizen/*.tsx files

### UI Components (move to `/src/components/common/ui/`)
Already partially migrated - complete the rest

## Step-by-Step Migration

### Phase 1: Move Root Components to Layout
```typescript
// These components use '../ui/' imports
// After moving to /src/components/layout/, change to:
import { Button } from '../common/ui/button';
```

### Phase 2: Move Citizen Components
```typescript
// These components use '../ui/' imports  
// After moving to /src/components/modules/citizen/, change to:
import { Button } from '../../common/ui/button';
```

### Phase 3: Update App.tsx Imports
```typescript
// OLD:
import { CitizenPortal } from './components/CitizenPortal';
import { FirstConnectionForm } from './components/citizen/FirstConnectionForm';

// NEW:
import { CitizenPortal } from './src/components/layout/CitizenPortal';
import { FirstConnectionForm } from './src/components/modules/citizen/FirstConnectionForm';
```

### Phase 4: Delete /components Folder
After verification, delete the entire `/components` folder.

## Import Path Changes

### For /src/components/layout/*.tsx:
- `'./ui/button'` → `'../common/ui/button'`
- `'./WaterTheme'` → `'./WaterTheme'` (same folder)
- `'./citizen/Component'` → `'../modules/citizen/Component'`

### For /src/components/modules/citizen/*.tsx:
- `'../ui/button'` → `'../../common/ui/button'`
- `'./TrackStatus'` → `'./TrackStatus'` (same folder)

### For App.tsx (root):
- `'./components/CitizenPortal'` → `'./src/components/layout/CitizenPortal'`
- `'./components/citizen/FirstConnectionForm'` → `'./src/components/modules/citizen/FirstConnectionForm'`
