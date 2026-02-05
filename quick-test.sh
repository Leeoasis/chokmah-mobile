#!/bin/bash
# Quick Test Script for Chokmah Mobile
# This script helps you quickly test the app

echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                                                                  ║"
echo "║              🚀 Chokmah Mobile - Quick Test 🚀                  ║"
echo "║                                                                  ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  Dependencies not installed${NC}"
    echo ""
    read -p "Would you like to install dependencies now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}📦 Installing dependencies...${NC}"
        npm install
        if [ $? -ne 0 ]; then
            echo -e "${RED}❌ Failed to install dependencies${NC}"
            exit 1
        fi
        echo -e "${GREEN}✅ Dependencies installed successfully!${NC}"
        echo ""
    else
        echo "Please run 'npm install' before testing."
        exit 1
    fi
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  SELECT TESTING PLATFORM"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "How would you like to test the app?"
echo ""
echo "  1) 🌐 Web Browser (Easiest - Recommended)"
echo "  2) 📱 iOS Simulator (Mac only)"
echo "  3) 🤖 Android Emulator"
echo "  4) 📲 Physical Device (via Expo Go)"
echo "  5) 🔍 Run Validation Only"
echo "  6) 📖 View Testing Guide"
echo "  q) Quit"
echo ""
read -p "Enter your choice (1-6 or q): " choice

case $choice in
    1)
        echo ""
        echo -e "${BLUE}🌐 Starting web server...${NC}"
        echo ""
        echo "The app will open in your browser automatically."
        echo "If it doesn't, navigate to: http://localhost:19006"
        echo ""
        echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
        echo ""
        npm run web
        ;;
    2)
        echo ""
        echo -e "${BLUE}📱 Starting iOS simulator...${NC}"
        echo ""
        if [[ "$OSTYPE" == "darwin"* ]]; then
            echo "The iOS simulator will launch automatically."
            echo ""
            echo -e "${YELLOW}Press Ctrl+C to stop${NC}"
            echo ""
            npm run ios
        else
            echo -e "${RED}❌ iOS simulator is only available on macOS${NC}"
            echo "Please select option 1 (Web) or 3 (Android) instead."
        fi
        ;;
    3)
        echo ""
        echo -e "${BLUE}🤖 Starting Android emulator...${NC}"
        echo ""
        echo "Make sure you have an Android emulator running."
        echo ""
        echo -e "${YELLOW}Press Ctrl+C to stop${NC}"
        echo ""
        npm run android
        ;;
    4)
        echo ""
        echo -e "${BLUE}📲 Starting Expo development server...${NC}"
        echo ""
        echo "To test on your device:"
        echo "  1. Install 'Expo Go' app from App Store or Play Store"
        echo "  2. Scan the QR code that will appear"
        echo "  3. The app will load on your device"
        echo ""
        echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
        echo ""
        npm start
        ;;
    5)
        echo ""
        echo -e "${BLUE}🔍 Running validation...${NC}"
        echo ""
        ./validate-setup.sh
        ;;
    6)
        echo ""
        echo -e "${BLUE}📖 Opening Testing Guide...${NC}"
        echo ""
        if command -v less &> /dev/null; then
            less TESTING_GUIDE.md
        elif command -v more &> /dev/null; then
            more TESTING_GUIDE.md
        else
            cat TESTING_GUIDE.md
        fi
        ;;
    q|Q)
        echo ""
        echo "Goodbye! 👋"
        echo ""
        exit 0
        ;;
    *)
        echo ""
        echo -e "${RED}❌ Invalid choice${NC}"
        echo "Please run the script again and select 1-6 or q"
        echo ""
        exit 1
        ;;
esac
