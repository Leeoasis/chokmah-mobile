import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from '../../services/api/authAPI';
import { saveToken, saveUserData, clearStorage } from '../../utils/storage';

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(email, password);
      if (response.token) {
        await saveToken(response.token);
        await saveUserData(response.user);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      if (response.token) {
        await saveToken(response.token);
        await saveUserData(response.user);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
      await clearStorage();
      return null;
    } catch (error) {
      // Even if logout fails on server, clear local storage
      await clearStorage();
      return null;
    }
  }
);

export const validateToken = createAsyncThunk(
  'auth/validateToken',
  async (token, { rejectWithValue }) => {
    try {
      const response = await authAPI.getTeacherByToken(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Invalid token');
    }
  }
);

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  tokenValidation: {
    loading: false,
    data: null,
    error: null,
  },
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });

    // Token validation
    builder
      .addCase(validateToken.pending, (state) => {
        state.tokenValidation.loading = true;
        state.tokenValidation.error = null;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.tokenValidation.loading = false;
        state.tokenValidation.data = action.payload;
        state.tokenValidation.error = null;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.tokenValidation.loading = false;
        state.tokenValidation.error = action.payload;
        state.tokenValidation.data = null;
      });
  },
});

export const { setUser, setToken, clearAuth, clearError } = authSlice.actions;
export default authSlice.reducer;
