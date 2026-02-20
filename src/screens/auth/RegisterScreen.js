import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, validateToken, clearError } from '../../redux/slices/authSlice';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { COLORS } from '../../constants/colors';
import { USER_ROLES } from '../../constants/routes';
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  validateRequired,
} from '../../utils/validation';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error, tokenValidation } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: USER_ROLES.PARENT,
    parent_name: '',
    child_name: '',
    child_grade: '',
    invitation_token: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Auto-fill child info when token is validated
    if (tokenValidation.data) {
      setFormData((prev) => ({
        ...prev,
        child_name: tokenValidation.data.child_name || '',
        child_grade: tokenValidation.data.child_grade || '',
      }));
    }
  }, [tokenValidation.data]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleTokenValidation = () => {
    if (formData.invitation_token.trim()) {
      dispatch(validateToken(formData.invitation_token.trim()));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Parent-specific validation
    if (formData.role === USER_ROLES.PARENT) {
      if (!validateRequired(formData.parent_name)) {
        newErrors.parent_name = 'Parent name is required';
      }
      if (!validateRequired(formData.child_name)) {
        newErrors.child_name = 'Child name is required';
      }
      if (!validateRequired(formData.child_grade)) {
        newErrors.child_grade = 'Child grade is required';
      }
      if (!validateRequired(formData.invitation_token)) {
        newErrors.invitation_token = 'Invitation token is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    const userData = {
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      role: formData.role,
    };

    // Add parent-specific fields
    if (formData.role === USER_ROLES.PARENT) {
      userData.parent_name = formData.parent_name;
      userData.child_name = formData.child_name;
      userData.child_grade = formData.child_grade;
      userData.invitation_token = formData.invitation_token;
    }

    dispatch(clearError());
    dispatch(registerUser(userData));
  };

  const isParent = formData.role === USER_ROLES.PARENT;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>

        <View style={styles.form}>
          {/* Role Selection */}
          <View style={styles.roleContainer}>
            <Text style={styles.label}>I am a:</Text>
            <View style={styles.roleButtons}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  formData.role === USER_ROLES.PARENT && styles.roleButtonActive,
                ]}
                onPress={() => handleChange('role', USER_ROLES.PARENT)}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    formData.role === USER_ROLES.PARENT && styles.roleButtonTextActive,
                  ]}
                >
                  Parent
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  formData.role === USER_ROLES.TEACHER && styles.roleButtonActive,
                ]}
                onPress={() => handleChange('role', USER_ROLES.TEACHER)}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    formData.role === USER_ROLES.TEACHER && styles.roleButtonTextActive,
                  ]}
                >
                  Teacher
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Input
            label="Email"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <Input
            label="Password"
            value={formData.password}
            onChangeText={(value) => handleChange('password', value)}
            placeholder="Enter your password"
            secureTextEntry
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(value) => handleChange('confirmPassword', value)}
            placeholder="Confirm your password"
            secureTextEntry
            error={errors.confirmPassword}
          />

          {/* Parent-specific fields */}
          {isParent && (
            <>
              <Input
                label="Parent Name"
                value={formData.parent_name}
                onChangeText={(value) => handleChange('parent_name', value)}
                placeholder="Enter your name"
                error={errors.parent_name}
              />

              <View style={styles.tokenSection}>
                <Input
                  label="Invitation Token"
                  value={formData.invitation_token}
                  onChangeText={(value) => handleChange('invitation_token', value)}
                  placeholder="Enter invitation token"
                  error={errors.invitation_token || tokenValidation.error}
                />
                <Button
                  title="Validate Token"
                  onPress={handleTokenValidation}
                  variant="outline"
                  loading={tokenValidation.loading}
                  disabled={!formData.invitation_token.trim()}
                  style={styles.validateButton}
                />
              </View>

              <Input
                label="Child Name"
                value={formData.child_name}
                onChangeText={(value) => handleChange('child_name', value)}
                placeholder="Enter child's name"
                editable={!tokenValidation.data}
                error={errors.child_name}
              />

              <Input
                label="Child Grade"
                value={formData.child_grade}
                onChangeText={(value) => handleChange('child_grade', value)}
                placeholder="Enter child's grade"
                editable={!tokenValidation.data}
                error={errors.child_grade}
              />
            </>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <Button
            title="Sign Up"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.loginLink}
          >
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.loginTextBold}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  form: {
    width: '100%',
  },
  roleContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  roleButtonActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  roleButtonTextActive: {
    color: COLORS.primary,
  },
  tokenSection: {
    marginBottom: 16,
  },
  validateButton: {
    marginTop: -8,
  },
  errorContainer: {
    backgroundColor: COLORS.error + '20',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    textAlign: 'center',
  },
  registerButton: {
    marginTop: 8,
  },
  loginLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  loginTextBold: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default RegisterScreen;
