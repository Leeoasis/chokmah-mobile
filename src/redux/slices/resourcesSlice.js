import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as resourcesAPI from '../../services/api/resourcesAPI';

// Async thunks
export const fetchResources = createAsyncThunk(
  'resources/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await resourcesAPI.getResources();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch resources');
    }
  }
);

export const uploadResource = createAsyncThunk(
  'resources/upload',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await resourcesAPI.uploadResource(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to upload resource');
    }
  }
);

export const deleteResource = createAsyncThunk(
  'resources/delete',
  async (id, { rejectWithValue }) => {
    try {
      await resourcesAPI.deleteResource(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete resource');
    }
  }
);

// Initial state
const initialState = {
  resources: [],
  loading: false,
  error: null,
  uploadProgress: 0,
};

// Slice
const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch resources
    builder
      .addCase(fetchResources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.loading = false;
        state.resources = action.payload;
        state.error = null;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Upload resource
    builder
      .addCase(uploadResource.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.uploadProgress = 0;
      })
      .addCase(uploadResource.fulfilled, (state, action) => {
        state.loading = false;
        state.resources.push(action.payload);
        state.error = null;
        state.uploadProgress = 100;
      })
      .addCase(uploadResource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.uploadProgress = 0;
      });

    // Delete resource
    builder
      .addCase(deleteResource.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteResource.fulfilled, (state, action) => {
        state.loading = false;
        state.resources = state.resources.filter(resource => resource.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteResource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUploadProgress, clearError } = resourcesSlice.actions;
export default resourcesSlice.reducer;
