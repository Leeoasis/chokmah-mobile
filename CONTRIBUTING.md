# Contributing to Chokmah Mobile

Thank you for your interest in contributing to Chokmah Mobile! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## How to Contribute

### 1. Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**: Device, OS version, app version

Example:
```
**Bug**: Login button doesn't respond on Android

**Steps**:
1. Open app on Android device
2. Navigate to login screen
3. Enter credentials
4. Tap login button

**Expected**: User should be logged in
**Actual**: Nothing happens
**Device**: Samsung Galaxy S21, Android 12
```

### 2. Suggesting Features

Feature suggestions are welcome! Please include:

- **Use Case**: Why is this feature needed?
- **Description**: What should it do?
- **Mockups**: Visual examples if applicable
- **Alternatives**: Other solutions you've considered

### 3. Code Contributions

#### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   # On GitHub, click "Fork" button
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/chokmah-mobile.git
   cd chokmah-mobile
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

5. **Start development**
   ```bash
   npm start
   ```

#### Code Style Guidelines

**General Principles**:
- Write clean, readable code
- Follow existing code patterns
- Use meaningful variable/function names
- Add comments for complex logic
- Keep functions small and focused

**JavaScript/React Native**:
- Use functional components with hooks
- Use arrow functions
- Destructure props
- Use template literals
- Follow Expo and React Native best practices

**Example**:
```javascript
// Good
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  
  const handleLogin = async () => {
    // Login logic
  };
  
  return (
    <View style={styles.container}>
      {/* Component JSX */}
    </View>
  );
};

// Avoid
class LoginScreen extends Component {
  constructor(props) {
    this.state = { email: '' };
  }
  // ...
}
```

**File Organization**:
- One component per file
- File name matches component name
- Group related files in folders
- Use index.js for barrel exports

**Styling**:
- Use StyleSheet.create()
- Place styles at bottom of file
- Use constants for colors/spacing
- Make styles reusable when possible

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
});
```

#### Project Structure

```
src/
├── components/       # Reusable components
│   ├── common/       # Generic components (Button, Input)
│   └── specific/     # Feature-specific components
├── screens/          # Screen components
│   ├── auth/         # Authentication screens
│   ├── parent/       # Parent-specific screens
│   ├── teacher/      # Teacher-specific screens
│   └── shared/       # Shared screens
├── navigation/       # Navigation configuration
├── redux/            # Redux store and slices
├── services/         # API and external services
├── utils/            # Utility functions
├── constants/        # App constants
└── assets/           # Images, fonts, etc.
```

#### Making Changes

1. **Make your changes**
   - Write clean, tested code
   - Follow existing patterns
   - Update documentation if needed

2. **Test your changes**
   ```bash
   # Test on iOS
   npm run ios
   
   # Test on Android
   npm run android
   
   # Test on web
   npm run web
   ```

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add user profile editing"
   ```

**Commit Message Format**:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add calendar view for homework
fix: resolve login button not responding on Android
docs: update installation instructions
style: format code with prettier
refactor: simplify authentication logic
```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Provide clear description
   - Reference related issues

**Pull Request Template**:
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] Tested on web

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Closes #123
```

### 4. Documentation Contributions

Documentation improvements are always welcome:

- Fix typos or unclear instructions
- Add examples or tutorials
- Update outdated information
- Translate documentation

### 5. Review Process

1. **Maintainer Review**: A maintainer will review your PR
2. **Feedback**: Address any requested changes
3. **Approval**: Once approved, PR will be merged
4. **Credit**: You'll be added to contributors list

## Development Workflow

### Adding a New Screen

1. Create screen file in appropriate folder
   ```javascript
   // src/screens/parent/NewScreen.js
   import React from 'react';
   import { View, Text } from 'react-native';
   
   const NewScreen = () => {
     return (
       <View>
         <Text>New Screen</Text>
       </View>
     );
   };
   
   export default NewScreen;
   ```

2. Add route constant
   ```javascript
   // src/constants/routes.js
   export const ROUTES = {
     // ...
     NEW_SCREEN: 'NewScreen',
   };
   ```

3. Add to navigator
   ```javascript
   // src/navigation/ParentNavigator.js
   import NewScreen from '../screens/parent/NewScreen';
   
   // Add in Tab.Navigator
   <Tab.Screen name={ROUTES.NEW_SCREEN} component={NewScreen} />
   ```

### Adding a Redux Slice

1. Create slice file
   ```javascript
   // src/redux/slices/newSlice.js
   import { createSlice } from '@reduxjs/toolkit';
   
   const newSlice = createSlice({
     name: 'new',
     initialState: { data: [] },
     reducers: {
       setData: (state, action) => {
         state.data = action.payload;
       },
     },
   });
   
   export const { setData } = newSlice.actions;
   export default newSlice.reducer;
   ```

2. Add to store
   ```javascript
   // src/redux/store.js
   import newReducer from './slices/newSlice';
   
   export const store = configureStore({
     reducer: {
       // ...
       new: newReducer,
     },
   });
   ```

### Adding an API Endpoint

1. Add endpoint constant
   ```javascript
   // src/constants/api.js
   export const API_ENDPOINTS = {
     // ...
     NEW_ENDPOINT: '/api/v1/new',
   };
   ```

2. Create API function
   ```javascript
   // src/services/api/newAPI.js
   import axiosInstance from './axiosInstance';
   import { API_ENDPOINTS } from '../../constants/api';
   
   export const getNewData = async () => {
     const response = await axiosInstance.get(API_ENDPOINTS.NEW_ENDPOINT);
     return response.data;
   };
   ```

## Best Practices

### Performance
- Use `FlatList` for long lists
- Optimize images
- Avoid unnecessary re-renders
- Use `useMemo` and `useCallback` appropriately

### Security
- Never commit sensitive data
- Validate all user input
- Use secure storage for tokens
- Follow OWASP Mobile Security guidelines

### Accessibility
- Add accessibility labels
- Support screen readers
- Ensure sufficient color contrast
- Test with accessibility features enabled

### Error Handling
- Use try/catch blocks
- Provide user-friendly error messages
- Log errors appropriately
- Handle network failures gracefully

## Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

## Questions?

- Open an issue for questions
- Check existing documentation
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

Thank you for contributing! 🎉
