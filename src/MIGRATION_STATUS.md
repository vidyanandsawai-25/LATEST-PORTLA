# Component Migration Status

## Current Progress
Migration from `/components` to `/src/components` structure

### Citizen Components Migration
Source: `/components/citizen/` → Destination: `/src/components/modules/citizen/`

#### Completed ✅
- None yet

#### In Progress 🔄
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

### Import Path Changes Required
Old: `'../ui/button'`
New: `'../../../common/ui/button'` or use path alias

### UI Components Migration
Source: `/components/ui/` → Destination: `/src/components/common/ui/`

Status: Pending

## Notes
- All citizen components have dependencies on UI components
- UI components must be moved before finalizing citizen component imports
- Consider adding path aliases to tsconfig.json for cleaner imports
