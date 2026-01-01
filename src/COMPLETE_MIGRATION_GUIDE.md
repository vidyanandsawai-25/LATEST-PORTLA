# Complete Component Migration Guide

## Overview
This guide documents the systematic migration of all components from `/components` to `/src/components` structure.

## Structure

### Target Structure
```
/src/components/
├── common/
│   ├── ui/           # All UI components (button, card, input, etc.)
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   └── ... (other common components)
├── modules/
│   ├── citizen/      # All citizen-facing components
│   │   ├── ApplicationSuccess.tsx
│   │   ├── BillCalculator.tsx
│   │   ├── FirstConnectionForm.tsx
│   │   ├── FirstConnectionGrievance.tsx
│   │   ├── Grievances.tsx
│   │   ├── MyConnections.tsx
│   │   ├── NewConnectionForm.tsx
│   │   ├── PayBills.tsx
│   │   ├── RTIInfo.tsx
│   │   ├── SubmitReading.tsx
│   │   ├── Support.tsx
│   │   ├── TrackStatus.tsx
│   │   └── index.ts
│   ├── admin/        # Admin components
│   ├── officer/      # Officer components
│   └── field/        # Field officer components
└── layout/
    ├── Header.tsx
    ├── Footer.tsx
    ├── Sidebar.tsx
    └── MainLayout.tsx
```

## Import Path Mapping

### For Components in `/src/components/modules/citizen/`

| Old Import | New Import |
|------------|------------|
| `'../ui/button'` | `'../../common/ui/button'` |
| `'../ui/card'` | `'../../common/ui/card'` |
| `'../ui/input'` | `'../../common/ui/input'` |
| `'./TrackStatus'` | `'./TrackStatus'` (unchanged - same folder) |
| `'./ApplicationSuccess'` | `'./ApplicationSuccess'` (unchanged - same folder) |

### For Components in `/src/components/common/ui/`

UI components typically import from React and other libraries, minimal changes needed.

## Migration Steps

### Step 1: Move UI Components
All files from `/components/ui/` → `/src/components/common/ui/`

Files to move (50+ files):
- accordion.tsx
- alert-dialog.tsx
- alert.tsx
- aspect-ratio.tsx
- avatar.tsx
- badge.tsx
- breadcrumb.tsx
- button.tsx
- calendar.tsx
- card.tsx
- carousel.tsx
- chart.tsx
- checkbox.tsx
- collapsible.tsx
- command.tsx
- context-menu.tsx
- dialog.tsx
- drawer.tsx
- dropdown-menu.tsx
- form.tsx
- hover-card.tsx
- input-otp.tsx
- input.tsx
- label.tsx
- menubar.tsx
- navigation-menu.tsx
- pagination.tsx
- popover.tsx
- progress.tsx
- radio-group.tsx
- resizable.tsx
- scroll-area.tsx
- select.tsx
- separator.tsx
- sheet.tsx
- sidebar.tsx
- skeleton.tsx
- slider.tsx
- sonner.tsx
- switch.tsx
- table.tsx
- tabs.tsx
- textarea.tsx
- toggle-group.tsx
- toggle.tsx
- tooltip.tsx
- use-mobile.ts
- utils.ts

**Action**: These files can be copied as-is, no import changes needed.

### Step 2: Move Citizen Components with Updated Imports

For each citizen component:

1. Copy file from `/components/citizen/` to `/src/components/modules/citizen/`
2. Update imports:
   - Change `'../ui/COMPONENT'` to `'../../common/ui/COMPONENT'`
   - Keep same-folder imports unchanged
3. Test the component

### Step 3: Update Parent Components

Any components that import citizen components need updated paths:
- `/App.tsx` or other parent components
- `/components/CitizenPortal.tsx`
- etc.

## Automation Script Pattern

For bulk import replacement in a file:
```bash
# Example sed command (Unix/Mac)
sed -i '' "s|'../ui/|'../../common/ui/|g" filename.tsx

# Example PowerShell (Windows)
(Get-Content filename.tsx) -replace "'../ui/", "'../../common/ui/" | Set-Content filename.tsx
```

## Validation Checklist

After migration:
- [ ] All UI components moved to `/src/components/common/ui/`
- [ ] All citizen components moved to `/src/components/modules/citizen/`
- [ ] All imports updated correctly
- [ ] TypeScript compilation succeeds
- [ ] No broken imports remain
- [ ] Application runs without errors
- [ ] All components render correctly

## Common Issues & Solutions

### Issue 1: Import path depth wrong
**Symptom**: `Module not found: Can't resolve '../../common/ui/button'`
**Solution**: Count the folder depth correctly:
- From `/src/components/modules/citizen/` to `/src/components/common/ui/`
- Go up 2 levels: `../../`
- Then into `common/ui/`
- Result: `../../common/ui/button`

### Issue 2: Circular dependencies
**Symptom**: Component imports create a loop
**Solution**: Check component dependencies and break circular imports

### Issue 3: Missing TypeScript definitions
**Symptom**: TypeScript errors about types
**Solution**: Ensure all `.d.ts` files are also moved

## Path Alias Alternative (Recommended)

Instead of relative paths, configure path aliases in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/components/*": ["./src/components/*"],
      "@/common/*": ["./src/components/common/*"],
      "@/modules/*": ["./src/components/modules/*"]
    }
  }
}
```

Then use:
```typescript
// Instead of: import { Button } from '../../common/ui/button'
import { Button } from '@/common/ui/button'
```

## Next Steps

1. Execute UI component migration
2. Execute citizen component migration with import updates
3. Test all components
4. Remove old `/components` folder (keep as backup initially)
5. Update documentation

## Timeline Estimate

- UI Components Move: 10 minutes (bulk copy)
- Citizen Components Migration: 30-40 minutes (with import updates)
- Testing & Validation: 15-20 minutes
- **Total: ~1 hour**

## Support

If you encounter issues:
1. Check this guide's Common Issues section
2. Verify folder structure matches target
3. Count import path depths carefully
4. Use TypeScript compiler errors as guide
