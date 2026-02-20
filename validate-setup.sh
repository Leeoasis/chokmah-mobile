#!/bin/bash
# Chokmah Mobile - Setup Validation Script
# This script validates that your development environment is ready

echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                                                                  ║"
echo "║           🔍 Chokmah Mobile - Setup Validator 🔍                ║"
echo "║                                                                  ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASS=0
FAIL=0

# Function to check command
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $2: $(command -v $1)"
        ((PASS++))
        return 0
    else
        echo -e "${RED}✗${NC} $2 not found"
        ((FAIL++))
        return 1
    fi
}

# Function to check version
check_version() {
    if command -v $1 &> /dev/null; then
        version=$($1 --version 2>&1 | head -1)
        echo -e "${GREEN}✓${NC} $2: $version"
        ((PASS++))
        return 0
    else
        echo -e "${RED}✗${NC} $2 not installed"
        ((FAIL++))
        return 1
    fi
}

# Function to check file
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((PASS++))
        return 0
    else
        echo -e "${RED}✗${NC} $2 missing"
        ((FAIL++))
        return 1
    fi
}

# Function to check directory
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((PASS++))
        return 0
    else
        echo -e "${RED}✗${NC} $2 missing"
        ((FAIL++))
        return 1
    fi
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  SYSTEM REQUIREMENTS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

check_version node "Node.js"
check_version npm "npm"

# Check Node version is 18+
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -ge 18 ]; then
        echo -e "${GREEN}✓${NC} Node.js version is 18+ (v$NODE_VERSION)"
        ((PASS++))
    else
        echo -e "${YELLOW}⚠${NC} Node.js version should be 18+ (current: v$NODE_VERSION)"
        ((FAIL++))
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  PROJECT FILES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

check_file "package.json" "package.json"
check_file "App.js" "App.js"
check_file "app.json" "app.json"
check_file "babel.config.js" "babel.config.js"
check_file "metro.config.js" "metro.config.js"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  SOURCE STRUCTURE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

check_dir "src" "src directory"
check_dir "src/navigation" "src/navigation"
check_dir "src/screens" "src/screens"
check_dir "src/components" "src/components"
check_dir "src/redux" "src/redux"
check_dir "src/services" "src/services"
check_dir "src/constants" "src/constants"
check_dir "src/utils" "src/utils"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  CRITICAL FILES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

check_file "src/redux/store.js" "Redux store"
check_file "src/navigation/AppNavigator.js" "App navigator"
check_file "src/screens/auth/LoginScreen.js" "Login screen"
check_file "src/screens/auth/RegisterScreen.js" "Register screen"
check_file "src/services/api/axiosInstance.js" "Axios instance"
check_file "src/constants/api.js" "API constants"
check_file "src/constants/colors.js" "Color constants"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  DEPENDENCIES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

check_dir "node_modules" "node_modules installed"

if [ -d "node_modules" ]; then
    # Count packages
    PACKAGE_COUNT=$(ls -1 node_modules | wc -l)
    echo -e "${GREEN}✓${NC} $PACKAGE_COUNT packages installed"
    ((PASS++))
    
    # Check critical packages
    critical_packages=("expo" "react" "react-native" "@react-navigation/native" "@reduxjs/toolkit" "axios")
    
    for package in "${critical_packages[@]}"; do
        if [ -d "node_modules/$package" ]; then
            echo -e "${GREEN}✓${NC} $package installed"
            ((PASS++))
        else
            echo -e "${RED}✗${NC} $package NOT installed"
            ((FAIL++))
        fi
    done
else
    echo -e "${RED}✗${NC} Dependencies not installed. Run: npm install"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  DOCUMENTATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

check_file "README.md" "README.md"
check_file "QUICKSTART.md" "QUICKSTART.md"
check_file "TESTING_GUIDE.md" "TESTING_GUIDE.md"
check_file "CONTRIBUTING.md" "CONTRIBUTING.md"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  API CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f "src/constants/api.js" ]; then
    API_URL=$(grep "API_BASE_URL" src/constants/api.js | head -1)
    if [ ! -z "$API_URL" ]; then
        echo -e "${GREEN}✓${NC} API URL configured: $API_URL"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} API URL not found in src/constants/api.js"
        ((FAIL++))
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

TOTAL=$((PASS + FAIL))
PERCENTAGE=$((PASS * 100 / TOTAL))

echo ""
echo "  Total Checks: $TOTAL"
echo -e "  ${GREEN}Passed: $PASS${NC}"
echo -e "  ${RED}Failed: $FAIL${NC}"
echo "  Success Rate: $PERCENTAGE%"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                                  ║${NC}"
    echo -e "${GREEN}║                    ✅ ALL CHECKS PASSED! ✅                      ║${NC}"
    echo -e "${GREEN}║                                                                  ║${NC}"
    echo -e "${GREEN}║              Your environment is ready for testing!              ║${NC}"
    echo -e "${GREEN}║                                                                  ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "🚀 Next Steps:"
    echo "   1. Run: npm start"
    echo "   2. Press 'w' for web or scan QR code for mobile"
    echo "   3. Test the app following TESTING_GUIDE.md"
    echo ""
elif [ $FAIL -le 3 ]; then
    echo -e "${YELLOW}╔══════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║                                                                  ║${NC}"
    echo -e "${YELLOW}║                  ⚠️  MINOR ISSUES DETECTED ⚠️                   ║${NC}"
    echo -e "${YELLOW}║                                                                  ║${NC}"
    echo -e "${YELLOW}║            Fix the issues above before testing                   ║${NC}"
    echo -e "${YELLOW}║                                                                  ║${NC}"
    echo -e "${YELLOW}╚══════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "🔧 Recommended Fixes:"
    echo "   - If dependencies missing: npm install"
    echo "   - If Node version low: Update Node.js to 18+"
    echo ""
else
    echo -e "${RED}╔══════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║                                                                  ║${NC}"
    echo -e "${RED}║                  ❌ SETUP INCOMPLETE ❌                          ║${NC}"
    echo -e "${RED}║                                                                  ║${NC}"
    echo -e "${RED}║          Please fix the issues above before testing              ║${NC}"
    echo -e "${RED}║                                                                  ║${NC}"
    echo -e "${RED}╚══════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "🔧 Quick Fixes:"
    echo "   1. Install dependencies: npm install"
    echo "   2. Check you're in the right directory"
    echo "   3. Verify all files were properly cloned"
    echo "   4. See README.md for detailed setup"
    echo ""
fi

exit $FAIL
