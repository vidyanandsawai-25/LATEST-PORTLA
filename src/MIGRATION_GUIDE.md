# 🚀 Complete Component Migration Guide

## Current Status
✅ App.tsx is using OLD import paths (working)
✅ Migration scripts created
⏳ Ready to migrate `/components` → `/src/components`

## Quick Start - Choose Your Method

### Method 1: Bash Script (RECOMMENDED - 30 seconds)

```bash
# Make script executable
chmod +x migrate.sh

# Run migration
./migrate.sh

# Test the app
# If it works, delete old folder:
rm -rf components/
```

### Method 2: Python Script (Cross-platform)

```bash
# Run migration
python3 migrate-components.py

# Test the app
# If it works, delete old folder:
rm -rf components/
```

### Method 3: Manual (If scripts fail)

Follow the detailed steps below.

---

## What The Scripts Do

### Phase 1: Create Directory Structure
```
/src/components/
├── layout/           # NEW - for root-level components
├── modules/
│   ├── citizen/      # Exists - will add more files
│   ├── admin/        # NEW
│   ├── officer/      # NEW
│   └── field/        # NEW
└── common/ui/        # Exists - already has UI components
```

### Phase 2: Migrate Layout Components

Copies these files with updated imports:
- `components/WaterTheme.tsx` → `src/components/layout/WaterTheme.tsx`
- `components/LoginPage.tsx` → `src/components/layout/LoginPage.tsx`
- `components/CitizenLanding.tsx` → `src/components/layout/CitizenLanding.tsx`
- `components/CitizenPortal.tsx` → `src/components/layout/CitizenPortal.tsx`
- `components/OfficerPortal.tsx` → `src/components/layout/OfficerPortal.tsx`
- `components/AdminPanel.tsx` → `src/components/layout/AdminPanel.tsx`
- `components/FieldOfficerPortal.tsx` → `src/components/layout/FieldOfficerPortal.tsx`

**Import changes in these files:**
- `from './ui/XXX'` → `from '../common/ui/XXX'`
- `from './citizen/XXX'` → `from '../modules/citizen/XXX'`
- `from './officer/XXX'` → `from '../modules/officer/XXX'`
- `from './admin/XXX'` → `from '../modules/admin/XXX'`
- `from './field/XXX'` → `from '../modules/field/XXX'`

### Phase 3: Migrate Citizen Components

Copies all files from `components/citizen/` to `src/components/modules/citizen/`:
- ApplicationSuccess.tsx
- BillCalculator.tsx
- FirstConnectionForm.tsx
- FirstConnectionGrievance.tsx
- Grievances.tsx
- MyConnections.tsx
- NewConnectionForm.tsx
- PayBills.tsx
- RTIInfo.tsx
- SubmitReading.tsx
- Support.tsx
- TrackStatus.tsx

**Import changes in these files:**
- `from '../ui/XXX'` → `from '../../common/ui/XXX'`

### Phase 4: Update App.tsx

Updates all imports in App.tsx:
- `from './components/CitizenPortal'` → `from './src/components/layout/CitizenPortal'`
- `from './components/OfficerPortal'` → `from './src/components/layout/OfficerPortal'`
- `from './components/AdminPanel'` → `from './src/components/layout/AdminPanel'`
- `from './components/FieldOfficerPortal'` → `from './src/components/layout/FieldOfficerPortal'`
- `from './components/LoginPage'` → `from './src/components/layout/LoginPage'`
- `from './components/CitizenLanding'` → `from './src/components/layout/CitizenLanding'`
- `from './components/citizen/FirstConnectionForm'` → `from './src/components/modules/citizen/FirstConnectionForm'`
- `from './components/citizen/FirstConnectionGrievance'` → `from './src/components/modules/citizen/FirstConnectionGrievance'`

---

## Manual Migration Steps (If Scripts Don't Work)

### Step 1: Create Directories

```bash
mkdir -p src/components/layout
mkdir -p src/components/modules/admin
mkdir -p src/components/modules/officer
mkdir -p src/components/modules/field
```

### Step 2: Copy WaterTheme (No Import Changes)

```bash
cp components/WaterTheme.tsx src/components/layout/WaterTheme.tsx
```

### Step 3: Copy and Update LoginPage

```bash
cp components/LoginPage.tsx src/components/layout/LoginPage.tsx
```

Open `src/components/layout/LoginPage.tsx` and find/replace:
- Find: `from './ui/`
- Replace: `from '../common/ui/`

### Step 4: Copy and Update CitizenLanding

```bash
cp components/CitizenLanding.tsx src/components/layout/CitizenLanding.tsx
```

Open `src/components/layout/CitizenLanding.tsx` and find/replace:
- Find: `from './ui/` → Replace: `from '../common/ui/`
- Find: `from './citizen/` → Replace: `from '../modules/citizen/`

### Step 5: Copy and Update Portal Components

```bash
cp components/CitizenPortal.tsx src/components/layout/CitizenPortal.tsx
cp components/OfficerPortal.tsx src/components/layout/OfficerPortal.tsx
cp components/AdminPanel.tsx src/components/layout/AdminPanel.tsx
cp components/FieldOfficerPortal.tsx src/components/layout/FieldOfficerPortal.tsx
```

For each file, find/replace:
- Find: `from './ui/` → Replace: `from '../common/ui/`
- Find: `from './citizen/` → Replace: `from '../modules/citizen/`
- Find: `from './officer/` → Replace: `from '../modules/officer/`
- Find: `from './admin/` → Replace: `from '../modules/admin/`
- Find: `from './field/` → Replace: `from '../modules/field/`

### Step 6: Copy Citizen Components

```bash
cp -r components/citizen/* src/components/modules/citizen/
```

For EACH file in `src/components/modules/citizen/`:
- Find: `from '../ui/` → Replace: `from '../../common/ui/`

### Step 7: Update App.tsx

Open App.tsx and update imports:

```typescript
// OLD
import { CitizenPortal } from './components/CitizenPortal';
import { OfficerPortal } from './components/OfficerPortal';
import { AdminPanel } from './components/AdminPanel';
import { FieldOfficerPortal } from './components/FieldOfficerPortal';
import { LoginPage } from './components/LoginPage';
import { CitizenLanding } from './components/CitizenLanding';
import { FirstConnectionForm } from './components/citizen/FirstConnectionForm';
import { FirstConnectionGrievance } from './components/citizen/FirstConnectionGrievance';

// NEW
import { CitizenPortal } from './src/components/layout/CitizenPortal';
import { OfficerPortal } from './src/components/layout/OfficerPortal';
import { AdminPanel } from './src/components/layout/AdminPanel';
import { FieldOfficerPortal } from './src/components/layout/FieldOfficerPortal';
import { LoginPage } from './src/components/layout/LoginPage';
import { CitizenLanding } from './src/components/layout/CitizenLanding';
import { FirstConnectionForm } from './src/components/modules/citizen/FirstConnectionForm';
import { FirstConnectionGrievance } from './src/components/modules/citizen/FirstConnectionGrievance';
```

### Step 8: Test

1. Run the app
2. Check browser console for errors
3. Test navigation between pages
4. Check that all components render correctly

### Step 9: Delete Old Folder (Only After Testing!)

```bash
rm -rf components/
```

---

## Troubleshooting

### Error: "Cannot find module '../common/ui/button'"

**Cause:** Import path not updated correctly
**Fix:** Check that the import uses the correct relative path

From `/src/components/layout/`:
- ✅ `from '../common/ui/button'`
- ❌ `from './ui/button'`

From `/src/components/modules/citizen/`:
- ✅ `from '../../common/ui/button'`
- ❌ `from '../ui/button'`

### Error: "Element type is invalid"

**Cause:** Component not exported correctly or circular dependency
**Fix:** Check that components have proper exports:
- `export function ComponentName() { ... }`
- or `export default function ComponentName() { ... }`

### Error: Still importing from old paths

**Cause:** App.tsx not updated
**Fix:** Check that App.tsx uses new import paths starting with `./src/components/`

---

## Verification Checklist

After migration, verify:
- [ ] App loads without errors
- [ ] Login page displays correctly
- [ ] Citizen landing page works
- [ ] Can log in as citizen
- [ ] Can log in as officer
- [ ] Can log in as admin
- [ ] Can log in as field officer
- [ ] All citizen portal features work
- [ ] No console errors
- [ ] TypeScript shows no errors

---

## Final Structure

```
/
├── App.tsx                    # Updated imports
├── src/
│   └── components/
│       ├── common/
│       │   └── ui/           # All UI components (50+ files)
│       ├── layout/           # NEW - Root components (7 files)
│       │   ├── CitizenPortal.tsx
│       │   ├── OfficerPortal.tsx
│       │   ├── AdminPanel.tsx
│       │   ├── FieldOfficerPortal.tsx
│       │   ├── LoginPage.tsx
│       │   ├── CitizenLanding.tsx
│       │   └── WaterTheme.tsx
│       └── modules/
│           ├── citizen/      # Updated with all 12 files
│           ├── admin/        # Ready for admin components
│           ├── officer/      # Ready for officer components
│           └── field/        # Ready for field components
└── components/               # DELETE AFTER TESTING ✓

```

---

## Quick Commands Reference

```bash
# Run bash script
chmod +x migrate.sh && ./migrate.sh

# Run python script
python3 migrate-components.py

# Test app (check for errors)
# ... run your dev server ...

# After successful test, delete old folder
rm -rf components/

# If something breaks, revert
git checkout App.tsx
git clean -fd src/
```

---

**Choose Method 1 (bash script) for fastest results! 🚀**
