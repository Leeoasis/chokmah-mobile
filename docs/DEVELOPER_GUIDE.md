# Developer Guide - Capetech RSM

## Architecture Overview

The application follows a clean architecture pattern with clear separation of concerns:

```
├── App.tsx                 # Root component
├── src/
│   ├── contexts/          # React Context providers
│   ├── navigation/        # Navigation configuration
│   ├── screens/           # UI screens
│   ├── components/        # Reusable components
│   ├── services/          # Business logic and data
│   ├── types/             # TypeScript definitions
│   └── utils/             # Helper functions
```

## Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **State Management**: React Context API
- **Storage**: AsyncStorage
- **UI**: React Native built-in components

## Key Concepts

### Data Flow

1. **User Action** → Screen component
2. **Screen** → Calls service function
3. **Service** → Updates AsyncStorage
4. **Service** → Returns updated data
5. **Screen** → Updates local state
6. **UI** → Re-renders with new data

### Authentication

The AuthContext manages user sessions:
- Stores user data in AsyncStorage
- Provides login/logout functions
- Protects routes based on auth state

```typescript
const { user, login, logout } = useAuth();
```

### Data Services

All data operations go through service modules:
- `CustomerService`
- `ProductService`
- `RepairService`
- `SalesService`
- `DeviceService`

Each service provides CRUD operations with a consistent API.

## Adding New Features

### Creating a New Screen

1. Create screen file in `src/screens/`
```typescript
import React from 'react';
import { View, Text } from 'react-native';

const MyNewScreen = () => {
  return (
    <View>
      <Text>My New Screen</Text>
    </View>
  );
};

export default MyNewScreen;
```

2. Add to navigation in `src/navigation/AppNavigator.tsx`
```typescript
<Tab.Screen 
  name="MyNew" 
  component={MyNewScreen}
  options={{ tabBarLabel: 'My New' }}
/>
```

### Adding a New Data Type

1. Define type in `src/types/index.ts`
```typescript
export interface MyType {
  id: string;
  name: string;
  createdAt: Date;
}
```

2. Create service in `src/services/dataService.ts`
```typescript
export const MyTypeService = {
  async getAll(): Promise<MyType[]> {
    return getItems<MyType>('mytype');
  },
  
  async create(data: Omit<MyType, 'id' | 'createdAt'>): Promise<MyType> {
    const items = await this.getAll();
    const newItem: MyType = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    items.push(newItem);
    await saveItems('mytype', items);
    return newItem;
  },
};
```

### Creating Reusable Components

Place in `src/components/`:
```typescript
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
```

## Code Style Guidelines

### TypeScript
- Use explicit types for function parameters
- Define interfaces for all data structures
- Avoid `any` type
- Use optional chaining (`?.`) for nullable values

### React
- Use functional components with hooks
- Keep components focused and small
- Extract reusable logic into custom hooks
- Use memo for expensive computations

### Naming Conventions
- Components: PascalCase (`MyComponent`)
- Functions: camelCase (`handleSubmit`)
- Constants: UPPER_SNAKE_CASE (`MAX_ITEMS`)
- Files: PascalCase for components, camelCase for utilities

### File Structure
```typescript
// 1. Imports
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { MyService } from '../services';

// 2. Types/Interfaces
interface Props {
  id: string;
}

// 3. Component
const MyComponent: React.FC<Props> = ({ id }) => {
  // 4. State
  const [data, setData] = useState(null);
  
  // 5. Effects
  useEffect(() => {
    loadData();
  }, []);
  
  // 6. Handlers
  const loadData = async () => {
    // ...
  };
  
  // 7. Render
  return (
    <View>
      <Text>{data}</Text>
    </View>
  );
};

// 8. Styles
const styles = StyleSheet.create({
  // ...
});

// 9. Export
export default MyComponent;
```

## Testing

Currently, the app doesn't have tests, but here's how to add them:

### Unit Tests
```bash
npm install --save-dev @testing-library/react-native jest
```

Example test:
```typescript
import { render } from '@testing-library/react-native';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MyComponent />);
    expect(getByText('Hello')).toBeTruthy();
  });
});
```

## Performance Optimization

### Lists
Use `FlatList` for large datasets:
```typescript
<FlatList
  data={items}
  keyExtractor={item => item.id}
  renderItem={({ item }) => <ItemCard item={item} />}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

### Memoization
```typescript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

const MemoizedComponent = React.memo(MyComponent);
```

### Images
```typescript
<Image 
  source={{ uri: imageUrl }}
  style={styles.image}
  resizeMode="cover"
  defaultSource={require('./placeholder.png')}
/>
```

## Debugging

### React Native Debugger
```bash
# Open React Native Debugger
# Then in app, shake device/press Cmd+D and select "Debug"
```

### Console Logs
```typescript
console.log('Data:', data);
console.error('Error:', error);
console.warn('Warning:', warning);
```

### Network Debugging
Use React Native Debugger's Network tab to inspect AsyncStorage operations.

## Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

### Configuration
Update `app.json` before building:
- Version number
- Bundle identifier
- App icons
- Splash screen

## Common Issues

### AsyncStorage Quota
AsyncStorage has a ~6MB limit. For larger datasets, consider:
- SQLite via expo-sqlite
- Realm Database
- Backend API with cloud storage

### Navigation TypeScript
Define navigation types:
```typescript
type RootStackParamList = {
  Home: undefined;
  Details: { id: string };
};

type DetailsScreenProps = StackScreenProps<RootStackParamList, 'Details'>;
```

### State Updates
Always use functional updates for state based on previous state:
```typescript
setCount(prev => prev + 1); // Good
setCount(count + 1); // Avoid
```

## Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Commit Message Format
```
feat: Add new feature
fix: Fix bug in POS
docs: Update README
style: Format code
refactor: Restructure service
test: Add tests
```

## License

MIT License - See LICENSE file for details.
