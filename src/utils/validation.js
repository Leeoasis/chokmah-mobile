// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (min 6 characters)
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Password match validation
export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

// Required field validation
export const validateRequired = (value) => {
  return value && value.trim() !== '';
};

// Name validation
export const validateName = (name) => {
  return name && name.trim().length >= 2;
};

// Grade validation (assuming grades are like "Grade 1", "Grade 2", etc.)
export const validateGrade = (grade) => {
  return grade && grade.trim() !== '';
};

// Token validation
export const validateToken = (token) => {
  return token && token.trim().length > 0;
};

// Form validation helper
export const validateForm = (fields) => {
  const errors = {};
  
  Object.keys(fields).forEach(key => {
    const value = fields[key];
    
    if (key === 'email') {
      if (!validateEmail(value)) {
        errors[key] = 'Please enter a valid email address';
      }
    } else if (key === 'password') {
      if (!validatePassword(value)) {
        errors[key] = 'Password must be at least 6 characters';
      }
    } else if (key === 'confirmPassword') {
      if (!validatePasswordMatch(fields.password, value)) {
        errors[key] = 'Passwords do not match';
      }
    } else if (!validateRequired(value)) {
      errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
