# Final Complete Cleanup Instructions

## ✅ What's Already Done
1. App.tsx now imports from `/src/components` (updated)
2. Essential UI components migrated to `/src/components/common/ui/`
3. Some citizen components migrated to `/src/components/modules/citizen/`

## 🚀 Quick Automated Solution (RECOMMENDED)

Use your code editor's refactoring tools or run this script:

### Option A: VS Code Bulk Move

1. **Create folders if not exist:**
   - `/src/components/layout/`
   - `/src/components/modules/admin/`
   - `/src/components/modules/officer/`
   - `/src/components/modules/field/`

2. **Move files in VS Code:**
   - Select all files from `/components/*.tsx` (root level)
   - Drag to `/src/components/layout/`
   - VS Code will ask "Update imports?" → Click YES
   
3. **Move subfolders:**
   - Drag `/components/citizen/*` → `/src/components/modules/citizen/`
   - Drag `/components/admin/*` → `/src/components/modules/admin/`
   - Drag `/components/officer/*` → `/src/components/modules/officer/`
   - Drag `/components/field/*` → `/src/components/modules/field/`
   - Drag remaining `/components/ui/*` → `/src/components/common/ui/`

4. **Delete `/components` folder**

### Option B: Command Line Script

```bash
#!/bin/bash

# Create directories
mkdir -p src/components/layout
mkdir -p src/components/modules/admin
mkdir -p src/components/modules/officer  
mkdir -p src/components/modules/field

# Move root level components to layout
mv components/*.tsx src/components/layout/ 2>/dev/null

# Move module folders
cp -r components/citizen/* src/components/modules/citizen/ 2>/dev/null
cp -r components/admin/* src/components/modules/admin/ 2>/dev/null
cp -r components/officer/* src/components/modules/officer/ 2>/dev/null
cp -r components/field/* src/components/modules/field/ 2>/dev/null
cp -r components/ui/* src/components/common/ui/ 2>/dev/null

# Update imports in layout files
find src/components/layout -name "*.tsx" -type f -exec sed -i "s|'\\./ui/|'../common/ui/|g" {} +
find src/components/layout -name "*.tsx" -type f -exec sed -i "s|'\\./citizen/|'../modules/citizen/|g" {} +
find src/components/layout -name "*.tsx" -type f -exec sed -i "s|'\\./WaterTheme'|'./WaterTheme'|g" {} +

# Update imports in citizen module
find src/components/modules/citizen -name "*.tsx" -type f -exec sed -i "s|'\\.\\./ui/|'../../common/ui/|g" {} +

# Update imports in other modules
find src/components/modules/admin -name "*.tsx" -type f -exec sed -i "s|'\\.\\./ui/|'../../common/ui/|g" {} +
find src/components/modules/officer -name "*.tsx" -type f -exec sed -i "s|'\\.\\./ui/|'../../common/ui/|g" {} +
find src/components/modules/field -name "*.tsx" -type f -exec sed -i "s|'\\.\\./ui/|'../../common/ui/|g" {} +

# Remove old components folder
rm -rf components/

echo "✅ Migration complete! Old /components folder removed."
```

Save this as `migrate.sh`, make executable (`chmod +x migrate.sh`), and run (`./migrate.sh`)

### Option C: PowerShell (Windows)

```powershell
# Create directories
New-Item -ItemType Directory -Force -Path "src/components/layout"
New-Item -ItemType Directory -Force -Path "src/components/modules/admin"
New-Item -ItemType Directory -Force -Path "src/components/modules/officer"
New-Item -ItemType Directory -Force -Path "src/components/modules/field"

# Move root components
Get-ChildItem "components/*.tsx" | Move-Item -Destination "src/components/layout/" -Force

# Copy module folders
Copy-Item -Recurse "components/citizen/*" -Destination "src/components/modules/citizen/" -Force
Copy-Item -Recurse "components/admin/*" -Destination "src/components/modules/admin/" -Force
Copy-Item -Recurse "components/officer/*" -Destination "src/components/modules/officer/" -Force
Copy-Item -Recurse "components/field/*" -Destination "src/components/modules/field/" -Force
Copy-Item -Recurse "components/ui/*" -Destination "src/components/common/ui/" -Force

# Update imports (requires PowerShell 7+)
$layoutFiles = Get-ChildItem -Path "src/components/layout" -Filter "*.tsx" -Recurse
foreach ($file in $layoutFiles) {
    (Get-Content $file.FullName) -replace "'\.\/ui\/", "'../common/ui/" `
                                   -replace "'\.\/citizen\/", "'../modules/citizen/" `
                                   | Set-Content $file.FullName
}

# Update citizen module imports
$citizenFiles = Get-ChildItem -Path "src/components/modules/citizen" -Filter "*.tsx" -Recurse
foreach ($file in $citizenFiles) {
    (Get-Content $file.FullName) -replace "'\.\.\/ui\/", "'../../common/ui/" `
                                   | Set-Content $file.FullName
}

# Update other module imports
$modules = @("admin", "officer", "field")
foreach ($module in $modules) {
    $moduleFiles = Get-ChildItem -Path "src/components/modules/$module" -Filter "*.tsx" -Recurse
    foreach ($file in $moduleFiles) {
        (Get-Content $file.FullName) -replace "'\.\.\/ui\/", "'../../common/ui/" `
                                       | Set-Content $file.FullName
    }
}

# Remove old folder
Remove-Item -Recurse -Force "components/"

Write-Host "✅ Migration complete! Old /components folder removed."
```

## 📝 Manual Step-by-Step (If Scripts Don't Work)

### Step 1: Copy WaterTheme First (Used by Multiple Files)

```bash
cp components/WaterTheme.tsx src/components/layout/WaterTheme.tsx
```

Edit `/src/components/layout/WaterTheme.tsx`:
- No import changes needed (doesn't import from /ui/)

### Step 2: Copy Login Page

```bash
cp components/LoginPage.tsx src/components/layout/LoginPage.tsx
```

Edit `/src/components/layout/LoginPage.tsx`:
- Find all: `from './ui/`
- Replace with: `from '../common/ui/`
- Find: `from './WaterTheme'`
- Keep as: `from './WaterTheme'`

### Step 3: Copy CitizenLanding

```bash
cp components/CitizenLanding.tsx src/components/layout/CitizenLanding.tsx
```

Edit `/src/components/layout/CitizenLanding.tsx`:
- Find all: `from './ui/`
- Replace with: `from '../common/ui/`
- Find: `from './WaterTheme'`
- Keep as: `from './WaterTheme'`
- Find: `from './citizen/`
- Replace with: `from '../modules/citizen/`

### Step 4: Copy Portal Components

```bash
cp components/CitizenPortal.tsx src/components/layout/CitizenPortal.tsx
cp components/OfficerPortal.tsx src/components/layout/OfficerPortal.tsx
cp components/AdminPanel.tsx src/components/layout/AdminPanel.tsx
cp components/FieldOfficerPortal.tsx src/components/layout/FieldOfficerPortal.tsx
```

For each portal file, edit:
- Find all: `from './ui/`
- Replace with: `from '../common/ui/`
- Find: `from './citizen/`
- Replace with: `from '../modules/citizen/`
- Find: `from './officer/`
- Replace with: `from '../modules/officer/`
- Find: `from './admin/`
- Replace with: `from '../modules/admin/`
- Find: `from './field/`
- Replace with: `from '../modules/field/`

### Step 5: Copy All Citizen Components

```bash
# Copy all citizen components to modules
cp -r components/citizen/* src/components/modules/citizen/
```

For each file in `/src/components/modules/citizen/`:
- Find all: `from '../ui/`
- Replace with: `from '../../common/ui/`
- Leave same-folder imports unchanged: `from './TrackStatus'`

### Step 6: Copy Other Module Components

```bash
cp -r components/admin/* src/components/modules/admin/
cp -r components/officer/* src/components/modules/officer/
cp -r components/field/* src/components/modules/field/
```

For each file:
- Find all: `from '../ui/`
- Replace with: `from '../../common/ui/`

### Step 7: Copy Remaining UI Components

```bash
cp -r components/ui/* src/components/common/ui/
```

### Step 8: Verify & Delete

1. Check that app runs without errors
2. Test a few features
3. If everything works: `rm -rf components/`

## ✅ Verification Checklist

After migration:
- [ ] App loads without errors
- [ ] Login page works
- [ ] Citizen landing page works  
- [ ] All portals accessible
- [ ] No missing imports in console
- [ ] TypeScript shows no errors
- [ ] `/components` folder deleted

## 🎯 Expected Final Structure

```
/src/components/
├── common/
│   └── ui/              # All UI components
│       ├── button.tsx
│       ├── card.tsx
│       └── ... (50+ files)
│
├── layout/              # Root-level components
│   ├── CitizenPortal.tsx
│   ├── OfficerPortal.tsx
│   ├── AdminPanel.tsx
│   ├── FieldOfficerPortal.tsx
│   ├── LoginPage.tsx
│   ├── CitizenLanding.tsx
│   └── WaterTheme.tsx
│
└── modules/
    ├── citizen/         # Citizen feature components
    │   ├── BillCalculator.tsx
    │   ├── FirstConnectionForm.tsx
    │   └── ... (12 files)
    │
    ├── admin/           # Admin components
    ├── officer/         # Officer components
    └── field/           # Field officer components
```

/components/  ← DELETED ✅

## 🚨 Common Issues & Solutions

### Issue: "Cannot find module"
**Solution:** Check import paths match the new structure

### Issue: Circular dependencies
**Solution:** WaterTheme should be imported from `./WaterTheme` in layout files

### Issue: figma components not found
**Solution:** Copy `/components/figma` to `/src/components/common/figma`

## 💡 Pro Tips

1. Use VS Code's "Find in Files" (Ctrl+Shift+F) to locate all import statements
2. Use VS Code's  "Replace in Files" for bulk updates
3. Test frequently after each major move
4. Keep `/components` as backup until 100% verified
5. Commit to git before starting (easy rollback if needed)

---

**Choose your method and execute! The automated scripts are fastest and most reliable.**
