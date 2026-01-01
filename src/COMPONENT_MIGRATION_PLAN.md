# Component Migration Plan

## Overview
This document tracks the migration of components from `/components` to `/src/components` structure.

## Migration Tasks

### 1. Citizen Components
**Source:** `/components/citizen/`
**Destination:** `/src/components/modules/citizen/`

Components to migrate:
- [x] ApplicationSuccess.tsx
- [x] BillCalculator.tsx
- [x] FirstConnectionForm.tsx
- [x] FirstConnectionGrievance.tsx
- [x] Grievances.tsx
- [x] MyConnections.tsx
- [ ] NewConnectionForm.tsx
- [ ] PayBills.tsx
- [ ] RTIInfo.tsx
- [ ] SubmitReading.tsx
- [ ] Support.tsx
- [ ] TrackStatus.tsx

### 2. UI Components
**Source:** `/components/ui/`
**Destination:** `/src/components/common/ui/`

All UI components (button.tsx, card.tsx, input.tsx, etc.)

### 3. Import Path Updates Needed

After migration, update import paths in all moved files:
- `'../ui/button'` → `'../../common/ui/button'` or `'@/components/common/ui/button'`
- `'./TrackStatus'` → adjust relative paths as needed

## Current Status
- Migration in progress
- Some components have dependencies that need to be addressed
- UI folder migration pending

## Notes
- Preserve all existing functionality
- Update import paths after moving files
- Test each component after migration
- Consider creating path aliases in tsconfig for cleaner imports
