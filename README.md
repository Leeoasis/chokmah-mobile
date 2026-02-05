# Chokmah Mobile - SPPS Parent Portal

A React Native mobile application for the SPPS Chokmah Parent Portal, built with Expo. This app provides parents, teachers, and administrators with mobile access to educational resources, reports, and communication tools.

> 🚀 **Ready to test?** See **[HOW_TO_TEST.md](HOW_TO_TEST.md)** for a quick start guide or **[TESTING_GUIDE.md](TESTING_GUIDE.md)** for comprehensive testing instructions.

> 🔧 **Can't sign in?** See **[API_TROUBLESHOOTING.md](API_TROUBLESHOOTING.md)** for debugging help and API configuration guide.

## Features

### For Parents
- 📱 View child's progress reports
- 📁 Access educational resources
- 📅 View homework and assignments (Calendar)
- 👤 Manage profile and account settings
- 🔐 Secure token-based authentication

### For Teachers
- 👥 View student lists
- 🎫 Generate invitation codes for parents
- 📊 Dashboard with quick actions

### For Administrators
- 📤 Upload educational resources
- 📄 Upload student reports
- 👥 User management
- 📊 System-wide reports and analytics
- ⚙️ Administrative controls

## Tech Stack

- **Framework**: React Native with Expo
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation v6
- **API Integration**: Axios
- **Persistence**: Redux Persist + AsyncStorage
- **UI Components**: Custom components with consistent theming

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **iOS Simulator** (Mac only) or **Android Emulator**
- **Expo Go app** on your physical device (optional)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Leeoasis/chokmah-mobile.git
   cd chokmah-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Expo CLI globally (if not already installed)**
   ```bash
   npm install -g expo-cli
   ```

## Running the App

### Development Server

Start the Metro bundler:
```bash
npm start
```

This will open the Expo Developer Tools in your browser.

### Running on iOS Simulator (Mac only)

```bash
npm run ios
```

Or press `i` in the terminal after running `npm start`.

### Running on Android Emulator

```bash
npm run android
```

Or press `a` in the terminal after running `npm start`.

### Running on Physical Device

1. Install the **Expo Go** app on your iOS or Android device
2. Run `npm start`
3. Scan the QR code with your device's camera (iOS) or Expo Go app (Android)

### Running on Web

```bash
npm run web
```

## Project Structure

```
chokmah-mobile/
├── src/
│   ├── navigation/          # Navigation configuration
│   │   ├── AppNavigator.js
│   │   ├── AuthNavigator.js
│   │   ├── ParentNavigator.js
│   │   └── TeacherNavigator.js
│   ├── screens/             # Screen components
│   │   ├── auth/            # Authentication screens
│   │   ├── parent/          # Parent-specific screens
│   │   ├── teacher/         # Teacher-specific screens
│   │   ├── admin/           # Admin-specific screens
│   │   └── shared/          # Shared screens
│   ├── components/          # Reusable components
│   │   ├── common/          # Common UI components
│   │   └── specific/        # Feature-specific components
│   ├── redux/               # State management
│   │   ├── store.js
│   │   └── slices/          # Redux slices
│   ├── services/            # API and external services
│   │   └── api/             # API integration
│   ├── utils/               # Utility functions
│   ├── constants/           # App constants
│   └── assets/              # Images, fonts, etc.
├── App.js                   # Main app entry point
├── app.json                 # Expo configuration
├── package.json             # Dependencies
└── README.md               # This file
```

## API Configuration

The app connects to the backend API at:
```
https://chokmah-resources-backend.onrender.com
```

API configuration can be found in `src/constants/api.js`.

### Authentication Flow

1. **Login**: Users authenticate with email and password
2. **Token Storage**: JWT token is stored in AsyncStorage
3. **Auto-Login**: Token is validated on app launch for automatic login
4. **Role-Based Navigation**: Users are redirected based on their role (Parent/Teacher/Admin)

### Registration Flow

#### For Parents:
1. Select "Parent" role
2. Enter email and password
3. Enter parent name
4. Enter invitation token (provided by teacher)
5. Token is validated to fetch child information
6. Child name and grade are auto-filled
7. Complete registration

#### For Teachers:
1. Select "Teacher" role
2. Enter email and password
3. Complete registration

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser

## Configuration Files

### app.json
Contains Expo-specific configuration including:
- App name and slug
- Icons and splash screens
- Platform-specific settings (iOS/Android)
- Permissions

### babel.config.js
Babel configuration for Expo preset.

### metro.config.js
Metro bundler configuration.

## Environment Setup

### iOS Setup (Mac only)
1. Install Xcode from the App Store
2. Install Xcode Command Line Tools
3. Install CocoaPods: `sudo gem install cocoapods`

### Android Setup
1. Install Android Studio
2. Set up Android SDK
3. Create an Android Virtual Device (AVD)

## Troubleshooting

### Common Issues

**Issue: Metro bundler won't start**
```bash
# Clear cache and restart
expo start -c
```

**Issue: Dependencies not installing**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

**Issue: iOS build fails**
```bash
# For Mac users - reinstall pods
cd ios
pod install
cd ..
```

**Issue: Android build fails**
- Ensure Android SDK is properly installed
- Check that ANDROID_HOME environment variable is set
- Verify you have at least one Android Virtual Device created

### Authentication & API Issues

**Issue: Cannot sign in / Login fails**

See **[API_TROUBLESHOOTING.md](API_TROUBLESHOOTING.md)** for comprehensive debugging steps.

**Quick checks:**
1. **Backend is running**: Visit https://chokmah-resources-backend.onrender.com in browser
2. **Run diagnostic tool**: `node test-api.js`
3. **Check console logs**: Look for detailed API request/response logs
4. **Verify credentials**: Ensure user exists in backend database
5. **Check API endpoints**: Compare mobile app endpoints with backend routes

**Test API connectivity:**
```bash
# Test if backend is alive
curl https://chokmah-resources-backend.onrender.com

# Test login endpoint
curl -X POST https://chokmah-resources-backend.onrender.com/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"user":{"email":"test@test.com","password":"test123"}}'
```

**Debug in the app:**
- Open the app and try to sign in
- Check the console for detailed logs showing:
  - API request URL and payload
  - Response status and data
  - Any error messages
- These logs are automatically enabled when you run the app

**Common solutions:**
- Clear app data and try again
- Wake up backend (Render.com free tier sleeps after inactivity)
- Verify backend routes match mobile app endpoints
- Check request/response format matches backend expectations

See also:
- [API_ENDPOINTS_GUIDE.md](API_ENDPOINTS_GUIDE.md) - Complete API documentation
- [API_TROUBLESHOOTING.md](API_TROUBLESHOOTING.md) - Step-by-step debugging guide

### Network Issues

If you can't connect to the development server on a physical device:
1. Ensure your device and computer are on the same WiFi network
2. Try using tunnel mode: `expo start --tunnel`

## Building for Production

### iOS (Requires Mac and Apple Developer Account)
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

Alternatively, use EAS Build (recommended):
```bash
npm install -g eas-cli
eas build --platform ios
eas build --platform android
```

## Testing

The app includes:
- Role-based navigation testing
- API integration testing
- Form validation testing

## Security

- Passwords are never stored locally
- JWT tokens are stored securely in AsyncStorage
- API requests include authentication headers
- 401 responses trigger automatic logout

## Design Theme

The app follows the web application's design system:
- **Primary Color**: Amber (#F59E0B)
- **Secondary Color**: Gray-900 (#111827)
- Consistent component styling
- Responsive layouts for all screen sizes

## Future Enhancements

- [ ] Push notifications for new reports/resources
- [ ] Offline mode with data caching
- [ ] PDF viewer for reports
- [ ] Calendar integration for homework
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Biometric authentication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email support@spps.edu or create an issue in the GitHub repository.

## Related Projects

- [Web Application](https://github.com/Leeoasis/chokmah-resources)
- [Backend API](https://chokmah-resources-backend.onrender.com)

## Acknowledgments

- SPPS School System
- All contributors and maintainers
- React Native and Expo communities
