#!/bin/bash

echo "======================================================================"
echo "Component Migration Script - Safe & Automated"
echo "======================================================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create destination directories
echo -e "\n${YELLOW}[Phase 1] Creating directory structure...${NC}"
mkdir -p src/components/layout
mkdir -p src/components/modules/citizen
mkdir -p src/components/modules/admin
mkdir -p src/components/modules/officer
mkdir -p src/components/modules/field
echo -e "${GREEN}✓ Directories created${NC}"

# Function to copy and update imports
copy_and_update() {
    local src=$1
    local dst=$2
    local sed_pattern=$3
    
    if [ -f "$src" ]; then
        echo "  Migrating: $src -> $dst"
        cp "$src" "$dst"
        
        if [ ! -z "$sed_pattern" ]; then
            # Apply sed replacements
            eval "$sed_pattern"
        fi
        echo -e "  ${GREEN}✓ Done${NC}"
    else
        echo -e "  ${YELLOW}⚠ Skipping $src (already migrated or not found)${NC}"
    fi
}

# Phase 2: Migrate layout components
echo -e "\n${YELLOW}[Phase 2] Migrating layout components...${NC}"

# WaterTheme (no import changes needed)
copy_and_update "components/WaterTheme.tsx" "src/components/layout/WaterTheme.tsx" ""

# LoginPage
copy_and_update "components/LoginPage.tsx" "src/components/layout/LoginPage.tsx" \
    "sed -i \"s|from './ui/|from '../common/ui/|g\" src/components/layout/LoginPage.tsx"

# CitizenLanding
copy_and_update "components/CitizenLanding.tsx" "src/components/layout/CitizenLanding.tsx" \
    "sed -i \"s|from './ui/|from '../common/ui/|g; s|from './citizen/|from '../modules/citizen/|g; s|from './WaterTheme'|from './WaterTheme'|g\" src/components/layout/CitizenLanding.tsx"

# CitizenPortal
copy_and_update "components/CitizenPortal.tsx" "src/components/layout/CitizenPortal.tsx" \
    "sed -i \"s|from './ui/|from '../common/ui/|g; s|from './citizen/|from '../modules/citizen/|g\" src/components/layout/CitizenPortal.tsx"

# OfficerPortal
copy_and_update "components/OfficerPortal.tsx" "src/components/layout/OfficerPortal.tsx" \
    "sed -i \"s|from './ui/|from '../common/ui/|g; s|from './officer/|from '../modules/officer/|g\" src/components/layout/OfficerPortal.tsx"

# AdminPanel
copy_and_update "components/AdminPanel.tsx" "src/components/layout/AdminPanel.tsx" \
    "sed -i \"s|from './ui/|from '../common/ui/|g; s|from './admin/|from '../modules/admin/|g\" src/components/layout/AdminPanel.tsx"

# FieldOfficerPortal
copy_and_update "components/FieldOfficerPortal.tsx" "src/components/layout/FieldOfficerPortal.tsx" \
    "sed -i \"s|from './ui/|from '../common/ui/|g; s|from './field/|from '../modules/field/|g\" src/components/layout/FieldOfficerPortal.tsx"

# Phase 3: Migrate citizen components
echo -e "\n${YELLOW}[Phase 3] Migrating citizen module components...${NC}"

for file in components/citizen/*.tsx; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        dst="src/components/modules/citizen/$filename"
        
        echo "  Migrating: $file -> $dst"
        cp "$file" "$dst"
        
        # Update imports: ../ui/ -> ../../common/ui/
        sed -i "s|from '../ui/|from '../../common/ui/|g" "$dst"
        echo -e "  ${GREEN}✓ Done${NC}"
    fi
done

# Phase 4: Update App.tsx
echo -e "\n${YELLOW}[Phase 4] Updating App.tsx imports...${NC}"

sed -i "s|from './components/CitizenPortal'|from './src/components/layout/CitizenPortal'|g" App.tsx
sed -i "s|from './components/OfficerPortal'|from './src/components/layout/OfficerPortal'|g" App.tsx
sed -i "s|from './components/AdminPanel'|from './src/components/layout/AdminPanel'|g" App.tsx
sed -i "s|from './components/FieldOfficerPortal'|from './src/components/layout/FieldOfficerPortal'|g" App.tsx
sed -i "s|from './components/LoginPage'|from './src/components/layout/LoginPage'|g" App.tsx
sed -i "s|from './components/CitizenLanding'|from './src/components/layout/CitizenLanding'|g" App.tsx
sed -i "s|from './components/citizen/FirstConnectionForm'|from './src/components/modules/citizen/FirstConnectionForm'|g" App.tsx
sed -i "s|from './components/citizen/FirstConnectionGrievance'|from './src/components/modules/citizen/FirstConnectionGrievance'|g" App.tsx

echo -e "${GREEN}✓ App.tsx updated${NC}"

# Summary
echo -e "\n======================================================================"
echo -e "${GREEN}Migration Complete!${NC}"
echo -e "======================================================================"
echo ""
echo "Next steps:"
echo "1. Test the application to ensure everything works"
echo "2. Check browser console for any import errors"
echo "3. If everything works, delete the old /components folder:"
echo "   rm -rf components/"
echo ""
echo "If you encounter errors, you can revert changes from git:"
echo "   git checkout App.tsx"
echo "   git clean -fd  # Remove new files"
echo ""
