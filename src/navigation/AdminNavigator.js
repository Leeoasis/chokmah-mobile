import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminDashboard from '../screens/admin/AdminDashboard';
import UploadResourceScreen from '../screens/admin/UploadResourceScreen';
import UploadReportScreen from '../screens/admin/UploadReportScreen';
import ProfileScreen from '../screens/shared/ProfileScreen';
import { ROUTES } from '../constants/routes';
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack for Admin
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.textWhite,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="AdminHome"
        component={AdminDashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.ADMIN_UPLOAD_RESOURCE}
        component={UploadResourceScreen}
        options={{ title: 'Upload Resource' }}
      />
      <Stack.Screen
        name={ROUTES.ADMIN_UPLOAD_REPORT}
        component={UploadReportScreen}
        options={{ title: 'Upload Report' }}
      />
    </Stack.Navigator>
  );
};

const AdminNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
        },
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.textWhite,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name={ROUTES.ADMIN_DASHBOARD}
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: () => '📊',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={ROUTES.ADMIN_PROFILE}
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: () => '👤',
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminNavigator;
