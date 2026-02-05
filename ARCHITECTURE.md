# Chokmah Mobile - Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CHOKMAH MOBILE APP                       │
│                     (React Native + Expo)                        │
└─────────────────────────────────────────────────────────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
        ┌───────▼──────┐  ┌─────▼─────┐  ┌──────▼──────┐
        │   iOS App    │  │ Android   │  │   Web App   │
        │              │  │   App     │  │             │
        └──────────────┘  └───────────┘  └─────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                       APP ENTRY POINT                            │
│                          App.js                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Redux Provider → PersistGate → SafeAreaProvider         │   │
│  │      ↓                                                   │   │
│  │ GestureHandlerRootView → AppNavigator → Toast          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────▼───────────┐
                    │   AppNavigator         │
                    │ (Role-Based Router)    │
                    └────────────┬───────────┘
                                 │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
┌───────▼──────┐     ┌─────────▼────────┐     ┌───────▼──────┐
│ AuthNavigator│     │ ParentNavigator  │     │TeacherNavigator│
│              │     │                  │     │              │
│ ┌──────────┐ │     │ ┌──────────────┐│     │┌────────────┐│
│ │  Splash  │ │     │ │  Dashboard   ││     ││ Dashboard  ││
│ │  Login   │ │     │ │  Reports     ││     ││ (Stack)    ││
│ │ Register │ │     │ │  Resources   ││     ││  Upload    ││
│ └──────────┘ │     │ │  Calendar    ││     ││  Students  ││
│              │     │ │  Profile     ││     ││  Profile   ││
└──────────────┘     │ └──────────────┘│     │└────────────┘│
                     └──────────────────┘     └──────────────┘
                              │
                     ┌────────▼─────────┐
                     │ AdminNavigator   │
                     │                  │
                     │ ┌──────────────┐ │
                     │ │  Dashboard   │ │
                     │ │  Profile     │ │
                     │ └──────────────┘ │
                     └──────────────────┘
```

## Redux State Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        REDUX STORE                               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Redux Persist                          │  │
│  │                         ↓                                 │  │
│  │              AsyncStorage (Local)                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ authSlice  │  │ reportsSlice │  │resourcesSlice│           │
│  │            │  │              │  │              │           │
│  │ • user     │  │ • reports[]  │  │ • resources[]│           │
│  │ • token    │  │ • loading    │  │ • loading    │           │
│  │ • isAuth   │  │ • error      │  │ • error      │           │
│  │ • loading  │  │ • progress   │  │ • progress   │           │
│  │ • error    │  │              │  │              │           │
│  └─────┬──────┘  └──────┬───────┘  └──────┬───────┘           │
│        │                │                  │                    │
└────────┼────────────────┼──────────────────┼────────────────────┘
         │                │                  │
         │                │                  │
    ┌────▼────────────────▼──────────────────▼─────┐
    │           Async Thunks (Actions)              │
    │                                                │
    │  • loginUser          • fetchReports          │
    │  • registerUser       • uploadReport          │
    │  • logoutUser         • fetchResources        │
    │  • validateToken      • uploadResource        │
    └───────────────────┬────────────────────────────┘
                        │
                        ▼
```

## API Integration Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      COMPONENT LAYER                             │
│  (Screens dispatch actions)                                      │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                      REDUX LAYER                                 │
│  (Thunks handle async logic)                                     │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API SERVICES                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  authAPI.js  │  │ reportsAPI.js│  │resourcesAPI.js│          │
│  │              │  │              │  │              │          │
│  │ • login()    │  │ • getReports()│  │• getResources()│        │
│  │ • register() │  │ • uploadReport()│ │• uploadResource()│     │
│  │ • logout()   │  │ • deleteReport()│ │• deleteResource()│     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                  │                   │
└─────────┼─────────────────┼──────────────────┼───────────────────┘
          │                 │                  │
          └─────────────────┼──────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AXIOS INSTANCE                                │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Request Interceptor:                                   │    │
│  │  • Attach JWT token from AsyncStorage                   │    │
│  │  • Set headers                                          │    │
│  └────────────────────────────────────────────────────────┘    │
│                            ↓                                     │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  BASE URL: https://chokmah-resources-backend.onrender.com│   │
│  └────────────────────────────────────────────────────────┘    │
│                            ↓                                     │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Response Interceptor:                                  │    │
│  │  • Handle 401 → Clear storage & logout                  │    │
│  │  • Handle errors → Format error messages                │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND API                                 │
│            Rails Backend (chokmah-resources)                     │
└─────────────────────────────────────────────────────────────────┘
```

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      APP LAUNCH                                  │
│                     SplashScreen                                 │
│                          │                                       │
│              ┌───────────▼──────────┐                           │
│              │ Check AsyncStorage   │                           │
│              │   for JWT token      │                           │
│              └───────────┬──────────┘                           │
│                          │                                       │
│           ┌──────────────┴───────────────┐                      │
│           │                              │                      │
│      ┌────▼─────┐                  ┌─────▼────┐                │
│      │ Token    │                  │ No Token │                │
│      │ Found    │                  │          │                │
│      └────┬─────┘                  └─────┬────┘                │
│           │                              │                      │
│      ┌────▼──────────┐             ┌─────▼──────┐              │
│      │ Load userData │             │ Navigate   │              │
│      │ Set as auth   │             │ to Login   │              │
│      └────┬──────────┘             └────────────┘              │
│           │                                                     │
│      ┌────▼──────────┐                                         │
│      │ Role-based    │                                         │
│      │ Navigation    │                                         │
│      └───────────────┘                                         │
│                                                                 │
│  LOGIN FLOW:                     REGISTER FLOW:                │
│  ┌──────────────┐                ┌──────────────┐             │
│  │ Enter email  │                │ Select role  │             │
│  │ & password   │                │ Parent/Teacher│            │
│  └──────┬───────┘                └──────┬───────┘             │
│         │                               │                      │
│  ┌──────▼───────┐                ┌──────▼───────┐             │
│  │ Validate     │                │ If Parent:   │             │
│  │ & Submit     │                │ Validate     │             │
│  └──────┬───────┘                │ Token        │             │
│         │                        └──────┬───────┘             │
│  ┌──────▼───────┐                ┌──────▼───────┐             │
│  │ API Login    │                │ API Register │             │
│  └──────┬───────┘                └──────┬───────┘             │
│         │                               │                      │
│  ┌──────▼───────────────────────────────▼───────┐             │
│  │ Save token to AsyncStorage                   │             │
│  │ Save user data to Redux                      │             │
│  │ Navigate to role-based dashboard             │             │
│  └──────────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

## File Upload Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    TEACHER UPLOAD FLOW                           │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ 1. Navigate to Upload Screen                          │      │
│  │    (UploadResourceScreen / UploadReportScreen)       │      │
│  └─────────────────────┬────────────────────────────────┘      │
│                        │                                         │
│  ┌─────────────────────▼────────────────────────────────┐      │
│  │ 2. Fill in form details:                              │      │
│  │    • Title                                            │      │
│  │    • Description                                      │      │
│  │    • Student name (for reports)                      │      │
│  └─────────────────────┬────────────────────────────────┘      │
│                        │                                         │
│  ┌─────────────────────▼────────────────────────────────┐      │
│  │ 3. Tap "Choose File"                                  │      │
│  │    → expo-document-picker opens                      │      │
│  └─────────────────────┬────────────────────────────────┘      │
│                        │                                         │
│  ┌─────────────────────▼────────────────────────────────┐      │
│  │ 4. User selects file from device                      │      │
│  │    • Documents, PDFs, Images                          │      │
│  │    • File info displayed in UI                        │      │
│  └─────────────────────┬────────────────────────────────┘      │
│                        │                                         │
│  ┌─────────────────────▼────────────────────────────────┐      │
│  │ 5. Tap "Upload"                                       │      │
│  │    → Create FormData                                  │      │
│  │    → Dispatch Redux thunk                             │      │
│  └─────────────────────┬────────────────────────────────┘      │
│                        │                                         │
│  ┌─────────────────────▼────────────────────────────────┐      │
│  │ 6. Redux Thunk:                                       │      │
│  │    • Set loading state                                │      │
│  │    • Call API service                                 │      │
│  │    • Track upload progress                            │      │
│  └─────────────────────┬────────────────────────────────┘      │
│                        │                                         │
│  ┌─────────────────────▼────────────────────────────────┐      │
│  │ 7. API sends multipart/form-data to backend          │      │
│  └─────────────────────┬────────────────────────────────┘      │
│                        │                                         │
│  ┌─────────────────────▼────────────────────────────────┐      │
│  │ 8. Success:                                           │      │
│  │    • Add to Redux state                               │      │
│  │    • Show success toast                               │      │
│  │    • Navigate back                                    │      │
│  │                                                       │      │
│  │    Error:                                             │      │
│  │    • Show error message                               │      │
│  │    • Keep user on screen                              │      │
│  └───────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App.js
└── Redux Provider
    └── PersistGate
        └── SafeAreaProvider
            └── GestureHandlerRootView
                └── AppNavigator
                    ├── AuthNavigator (if not authenticated)
                    │   ├── SplashScreen
                    │   ├── LoginScreen
                    │   │   ├── Input (email)
                    │   │   ├── Input (password)
                    │   │   └── Button (login)
                    │   └── RegisterScreen
                    │       ├── RoleSelector
                    │       ├── Input (email)
                    │       ├── Input (password)
                    │       ├── Input (parent fields)
                    │       └── Button (register)
                    │
                    ├── ParentNavigator (if parent)
                    │   ├── ParentDashboard
                    │   │   ├── Card (stats)
                    │   │   └── Card (recent items)
                    │   ├── ReportsScreen
                    │   │   └── FlatList
                    │   │       └── Card (report item)
                    │   ├── ResourcesScreen
                    │   │   └── FlatList
                    │   │       └── Card (resource item)
                    │   ├── CalendarScreen
                    │   │   └── Card (placeholder)
                    │   └── ProfileScreen
                    │       ├── Card (user info)
                    │       └── Button (logout)
                    │
                    ├── TeacherNavigator (if teacher)
                    │   ├── TeacherDashboard
                    │   │   ├── Card (stats)
                    │   │   └── ActionCard (quick actions)
                    │   ├── UploadResourceScreen
                    │   │   ├── Input (title)
                    │   │   ├── Input (description)
                    │   │   ├── FilePicker
                    │   │   └── Button (upload)
                    │   ├── UploadReportScreen
                    │   │   ├── Input (title)
                    │   │   ├── Input (student)
                    │   │   ├── Input (description)
                    │   │   ├── FilePicker
                    │   │   └── Button (upload)
                    │   └── ProfileScreen
                    │
                    └── AdminNavigator (if admin)
                        ├── AdminDashboard
                        │   ├── Card (stats grid)
                        │   └── Card (overview)
                        └── ProfileScreen
                            ├── Card (user info)
                            └── Button (logout)
```

## Data Flow Summary

1. **User Interaction** → Component
2. **Component** → Dispatches Redux Action
3. **Redux Thunk** → Calls API Service
4. **API Service** → Uses Axios Instance
5. **Axios Instance** → Sends HTTP Request to Backend
6. **Backend** → Processes & Returns Response
7. **Axios Interceptor** → Handles Response/Errors
8. **Redux Thunk** → Updates State
9. **Component** → Re-renders with New Data

## Key Design Patterns

1. **Container/Presenter**: Screens handle logic, components handle UI
2. **Single Responsibility**: Each component/file has one purpose
3. **DRY**: Reusable components for common UI elements
4. **Separation of Concerns**: Navigation, state, UI, API all separate
5. **Centralized State**: Redux for app-wide state
6. **Async Handling**: Redux Thunks for async operations
7. **Error Boundaries**: Toast notifications for user feedback

---

**This architecture provides:**
- ✅ Scalability
- ✅ Maintainability
- ✅ Testability
- ✅ Clear separation of concerns
- ✅ Reusable components
- ✅ Type-safe navigation
- ✅ Robust error handling
