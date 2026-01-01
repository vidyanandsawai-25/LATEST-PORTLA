#!/usr/bin/env python3
"""
Safe Component Migration Script
Moves components from /components to /src/components with proper import updates
"""

import os
import re
import shutil
from pathlib import Path

# Define migration mappings
MIGRATIONS = {
    # Root level components -> layout
    'components/CitizenPortal.tsx': 'src/components/layout/CitizenPortal.tsx',
    'components/OfficerPortal.tsx': 'src/components/layout/OfficerPortal.tsx',
    'components/AdminPanel.tsx': 'src/components/layout/AdminPanel.tsx',
    'components/FieldOfficerPortal.tsx': 'src/components/layout/FieldOfficerPortal.tsx',
    'components/LoginPage.tsx': 'src/components/layout/LoginPage.tsx',
    'components/CitizenLanding.tsx': 'src/components/layout/CitizenLanding.tsx',
    'components/WaterTheme.tsx': 'src/components/layout/WaterTheme.tsx',
}

# Import replacement rules for layout files
LAYOUT_IMPORT_REPLACEMENTS = [
    (r"from ['\"]\.\/ui\/", r"from '../common/ui/"),
    (r"from ['\"]\.\/citizen\/", r"from '../modules/citizen/"),
    (r"from ['\"]\.\/officer\/", r"from '../modules/officer/"),
    (r"from ['\"]\.\/admin\/", r"from '../modules/admin/"),
    (r"from ['\"]\.\/field\/", r"from '../modules/field/"),
]

# Import replacement rules for citizen module files
CITIZEN_IMPORT_REPLACEMENTS = [
    (r"from ['\"]\.\.\/ui\/", r"from '../../common/ui/"),
]

# App.tsx import replacements
APP_IMPORT_REPLACEMENTS = [
    (r"from ['\"]\.\/components\/CitizenPortal", r"from './src/components/layout/CitizenPortal"),
    (r"from ['\"]\.\/components\/OfficerPortal", r"from './src/components/layout/OfficerPortal"),
    (r"from ['\"]\.\/components\/AdminPanel", r"from './src/components/layout/AdminPanel"),
    (r"from ['\"]\.\/components\/FieldOfficerPortal", r"from './src/components/layout/FieldOfficerPortal"),
    (r"from ['\"]\.\/components\/LoginPage", r"from './src/components/layout/LoginPage"),
    (r"from ['\"]\.\/components\/CitizenLanding", r"from './src/components/layout/CitizenLanding"),
    (r"from ['\"]\.\/components\/citizen\/FirstConnectionForm", r"from './src/components/modules/citizen/FirstConnectionForm"),
    (r"from ['\"]\.\/components\/citizen\/FirstConnectionGrievance", r"from './src/components/modules/citizen/FirstConnectionGrievance"),
]

def ensure_dir(filepath):
    """Ensure directory exists for filepath"""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)

def update_imports(content, replacements):
    """Apply import replacements to content"""
    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)
    return content

def migrate_file(src, dst, import_replacements=None):
    """Copy file and update imports"""
    print(f"Migrating: {src} -> {dst}")
    
    # Ensure destination directory exists
    ensure_dir(dst)
    
    # Read source file
    with open(src, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update imports if replacements provided
    if import_replacements:
        content = update_imports(content, import_replacements)
    
    # Write to destination
    with open(dst, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✓ Migrated successfully")

def migrate_citizen_components():
    """Migrate all citizen components"""
    citizen_files = [
        'ApplicationSuccess.tsx',
        'BillCalculator.tsx',
        'FirstConnectionForm.tsx',
        'FirstConnectionGrievance.tsx',
        'Grievances.tsx',
        'MyConnections.tsx',
        'NewConnectionForm.tsx',
        'PayBills.tsx',
        'RTIInfo.tsx',
        'SubmitReading.tsx',
        'Support.tsx',
        'TrackStatus.tsx',
    ]
    
    for filename in citizen_files:
        src = f'components/citizen/{filename}'
        dst = f'src/components/modules/citizen/{filename}'
        
        if os.path.exists(src):
            migrate_file(src, dst, CITIZEN_IMPORT_REPLACEMENTS)
        else:
            print(f"  ⚠ Skipping {src} (not found, may already be migrated)")

def update_app_imports():
    """Update App.tsx imports"""
    print("\nUpdating App.tsx imports...")
    
    with open('App.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = update_imports(content, APP_IMPORT_REPLACEMENTS)
    
    with open('App.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("  ✓ App.tsx updated")

def main():
    print("=" * 60)
    print("Component Migration Script")
    print("=" * 60)
    
    # Phase 1: Migrate root components to layout
    print("\n[Phase 1] Migrating layout components...")
    for src, dst in MIGRATIONS.items():
        if os.path.exists(src):
            migrate_file(src, dst, LAYOUT_IMPORT_REPLACEMENTS)
        else:
            print(f"  ⚠ Skipping {src} (not found, may already be migrated)")
    
    # Phase 2: Migrate citizen components
    print("\n[Phase 2] Migrating citizen module components...")
    migrate_citizen_components()
    
    # Phase 3: Update App.tsx
    print("\n[Phase 3] Updating App.tsx imports...")
    update_app_imports()
    
    # Phase 4: Cleanup instructions
    print("\n" + "=" * 60)
    print("Migration Complete!")
    print("=" * 60)
    print("\nNext steps:")
    print("1. Test the application to ensure everything works")
    print("2. If everything works, delete the old /components folder:")
    print("   rm -rf components/")
    print("\nIf you encounter errors, you can revert by running:")
    print("   git checkout App.tsx components/")

if __name__ == '__main__':
    main()
