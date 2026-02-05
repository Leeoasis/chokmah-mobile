# Quick Start Guide - Chokmah Mobile

This guide will help you get the Chokmah Mobile app up and running quickly.

## Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn**
- **Expo CLI** (will be installed automatically)

## Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
cd chokmah-mobile
npm install
```

### 2. Start the Development Server
```bash
npm start
```

This will:
- Start the Metro bundler
- Open Expo DevTools in your browser
- Display a QR code to run on your device

### 3. Run on Device or Emulator

**Option A: Physical Device (Easiest)**
1. Install "Expo Go" app from App Store (iOS) or Play Store (Android)
2. Scan the QR code shown in the terminal
3. App will load on your device

**Option B: iOS Simulator (Mac only)**
```bash
npm run ios
```

**Option C: Android Emulator**
```bash
npm run android
```

**Option D: Web Browser**
```bash
npm run web
```

## Test Credentials

The app connects to:
```
API: https://chokmah-resources-backend.onrender.com
```

### Creating Test Accounts

1. **Register as a Teacher First**
   - Open the app → Sign Up
   - Select "Teacher" role
   - Enter email and password
   - Complete registration

2. **Register as a Parent**
   - Sign Up → Select "Parent" role
   - Enter parent details
   - Get invitation token from teacher
   - Enter token to link to teacher's class
   - Complete registration

## App Structure Overview

```
src/
├── screens/        # All app screens
│   ├── auth/       # Login, Register, Splash
│   ├── parent/     # Parent dashboard, reports, resources
│   ├── teacher/    # Teacher dashboard, upload screens
│   └── admin/      # Admin dashboard
├── navigation/     # Navigation configuration
├── redux/          # State management
├── services/       # API integration
├── components/     # Reusable UI components
└── constants/      # Colors, routes, API config
```

## Common Commands

```bash
# Start development server
npm start

# Clear cache and restart
npm start -- --clear

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web

# View all running processes
expo doctor
```

## Features Overview

### For Parents
- 🏠 Dashboard with overview
- 📄 View student reports
- 📁 Access educational resources
- 📅 View homework calendar
- 👤 Manage profile

### For Teachers
- 🏠 Dashboard with quick actions
- 📤 Upload resources
- 📄 Upload student reports
- 👥 View students (coming soon)
- 🎫 Generate invitation codes (coming soon)

### For Admins
- 📊 System overview
- 👥 User management (coming soon)

## Navigation Flow

```
App Launch → Splash Screen
    ↓
Authenticated? → Yes → Role-based Dashboard
    ↓              ↓         ↓         ↓
   No           Parent  Teacher   Admin
    ↓
Login/Register
```

## Key Technologies

- **Framework**: React Native (Expo)
- **State**: Redux Toolkit
- **Navigation**: React Navigation v6
- **API**: Axios
- **Storage**: AsyncStorage
- **UI**: Custom components

## Development Tips

1. **Hot Reload**: Shake device or press `Cmd+D` (iOS) / `Cmd+M` (Android) for dev menu

2. **Debugging**:
   - Enable Remote JS Debugging from dev menu
   - Or use React DevTools

3. **Network Issues**:
   - Ensure device and computer on same WiFi
   - Try: `npm start -- --tunnel`

4. **Clear Cache** if you see errors:
   ```bash
   npm start -- --clear
   ```

## Troubleshooting

**Issue: "Unable to resolve module"**
```bash
rm -rf node_modules
npm install
npm start -- --clear
```

**Issue: Metro bundler won't start**
```bash
killall node
npm start
```

**Issue: Can't connect on device**
- Check WiFi connection
- Use tunnel mode: `npm start -- --tunnel`

## Next Steps

1. ✅ App is running
2. 📱 Test login/registration
3. 🔄 Explore different user roles
4. 📤 Test file uploads
5. 🎨 Customize theme in `src/constants/colors.js`

## Need Help?

- Check main [README.md](./README.md) for detailed docs
- View API documentation at backend repo
- Create issue on GitHub

## Building for Production

When ready to build:

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure
eas init

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

---

**You're all set! 🎉**

The app should now be running. Try logging in or creating a new account to explore the features.
