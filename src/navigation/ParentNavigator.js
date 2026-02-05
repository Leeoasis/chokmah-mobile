import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ParentDashboard from '../screens/parent/ParentDashboard';
import ReportsScreen from '../screens/parent/ReportsScreen';
import ResourcesScreen from '../screens/parent/ResourcesScreen';
import ProfileScreen from '../screens/shared/ProfileScreen';
import { ROUTES } from '../constants/routes';
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();

const ParentNavigator = () => {
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
        name={ROUTES.PARENT_DASHBOARD}
        component={ParentDashboard}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: () => '🏠',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={ROUTES.PARENT_REPORTS}
        component={ReportsScreen}
        options={{
          title: 'Reports',
          tabBarLabel: 'Reports',
          tabBarIcon: () => '📄',
        }}
      />
      <Tab.Screen
        name={ROUTES.PARENT_RESOURCES}
        component={ResourcesScreen}
        options={{
          title: 'Resources',
          tabBarLabel: 'Resources',
          tabBarIcon: () => '📁',
        }}
      />
      <Tab.Screen
        name={ROUTES.PARENT_PROFILE}
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

export default ParentNavigator;
