import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as reportsAPI from '../../services/api/reportsAPI';

// Async thunks
export const fetchReports = createAsyncThunk(
  'reports/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await reportsAPI.getReports();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch reports');
    }
  }
);

export const uploadReport = createAsyncThunk(
  'reports/upload',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await reportsAPI.uploadReport(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to upload report');
    }
  }
);

export const deleteReport = createAsyncThunk(
  'reports/delete',
  async (id, { rejectWithValue }) => {
    try {
      await reportsAPI.deleteReport(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete report');
    }
  }
);

// Initial state
const initialState = {
  reports: [],
  loading: false,
  error: null,
  uploadProgress: 0,
};

// Slice
const reportsSlice = createSlice({
  name: 'reports',
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
    // Fetch reports
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
        state.error = null;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Upload report
    builder
      .addCase(uploadReport.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.uploadProgress = 0;
      })
      .addCase(uploadReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports.push(action.payload);
        state.error = null;
        state.uploadProgress = 100;
      })
      .addCase(uploadReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.uploadProgress = 0;
      });

    // Delete report
    builder
      .addCase(deleteReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = state.reports.filter(report => report.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUploadProgress, clearError } = reportsSlice.actions;
export default reportsSlice.reducer;
