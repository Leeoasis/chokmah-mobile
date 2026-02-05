import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, getUserData } from '../../utils/storage';
import { setUser, setToken } from '../../redux/slices/authSlice';
import { COLORS } from '../../constants/colors';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await getToken();
      const userData = await getUserData();

      if (token && userData) {
        dispatch(setToken(token));
        dispatch(setUser(userData));
        // Navigation will be handled by AppNavigator based on auth state
      } else {
        // Wait a bit to show splash screen
        setTimeout(() => {
          navigation.replace('Login');
        }, 2000);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setTimeout(() => {
        navigation.replace('Login');
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Chokmah Mobile</Text>
        <Text style={styles.subtitle}>SPPS Parent Portal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.textWhite,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textWhite,
    opacity: 0.9,
  },
});

export default SplashScreen;
