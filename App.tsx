import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { initializeSampleData } from './src/services/dataService';

export default function App() {
  useEffect(() => {
    // Initialize sample data on first launch
    initializeSampleData();
  }, []);

  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </AuthProvider>
  );
}
