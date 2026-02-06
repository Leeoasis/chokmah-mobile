import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';

// Import screens (we'll create these next)
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import POSScreen from '../screens/POSScreen';
import RepairsScreen from '../screens/RepairsScreen';
import InventoryScreen from '../screens/InventoryScreen';
import CustomersScreen from '../screens/CustomersScreen';
import ReportsScreen from '../screens/ReportsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ tabBarLabel: 'Dashboard' }}
      />
      <Tab.Screen 
        name="POS" 
        component={POSScreen}
        options={{ tabBarLabel: 'Point of Sale' }}
      />
      <Tab.Screen 
        name="Repairs" 
        component={RepairsScreen}
        options={{ tabBarLabel: 'Repairs' }}
      />
      <Tab.Screen 
        name="Inventory" 
        component={InventoryScreen}
        options={{ tabBarLabel: 'Inventory' }}
      />
      <Tab.Screen 
        name="Customers" 
        component={CustomersScreen}
        options={{ tabBarLabel: 'Customers' }}
      />
      <Tab.Screen 
        name="Reports" 
        component={ReportsScreen}
        options={{ tabBarLabel: 'Reports' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="MainTabs" component={MainTabs} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
