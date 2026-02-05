import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthNavigator from './AuthNavigator';
import ParentNavigator from './ParentNavigator';
import TeacherNavigator from './TeacherNavigator';
import { USER_ROLES } from '../constants/routes';

const AppNavigator = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const getRoleBasedNavigator = () => {
    if (!isAuthenticated || !user) {
      return <AuthNavigator />;
    }

    switch (user.role) {
      case USER_ROLES.PARENT:
        return <ParentNavigator />;
      case USER_ROLES.TEACHER:
        return <TeacherNavigator />;
      case USER_ROLES.ADMIN:
        // For now, Admin users will see Teacher dashboard
        return <TeacherNavigator />;
      default:
        return <AuthNavigator />;
    }
  };

  return (
    <NavigationContainer>
      {getRoleBasedNavigator()}
    </NavigationContainer>
  );
};

export default AppNavigator;
