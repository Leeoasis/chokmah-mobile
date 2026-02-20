import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TeacherDashboard from '../screens/teacher/TeacherDashboard';
import StudentListScreen from '../screens/teacher/StudentListScreen';
import InvitationCodesScreen from '../screens/teacher/InvitationCodesScreen';
import ProfileScreen from '../screens/shared/ProfileScreen';
import { ROUTES } from '../constants/routes';
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack for Teacher
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
        name="TeacherHome"
        component={TeacherDashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.TEACHER_STUDENTS}
        component={StudentListScreen}
        options={{ title: 'Students' }}
      />
      <Stack.Screen
        name={ROUTES.TEACHER_INVITATIONS}
        component={InvitationCodesScreen}
        options={{ title: 'Invitation Codes' }}
      />
    </Stack.Navigator>
  );
};

const TeacherNavigator = () => {
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
        name={ROUTES.TEACHER_DASHBOARD}
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: () => '🏠',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={ROUTES.TEACHER_PROFILE}
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

export default TeacherNavigator;
