import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface AuthState {
  user: any; // Ganti dengan tipe data pengguna sesuai kebutuhan
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

// Thunk untuk login
export const loginUser = createAsyncThunk<{ user: any; token: string }, { identifier: string; password: string }>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/login', credentials);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Menangani kasus jika error adalah AxiosError
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
      // Menangani kasus jika error bukan AxiosError
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Thunk untuk registrasi
export const registerUser = createAsyncThunk<{ user: any; token: string }, { username: string; email: string; password: string; dateOfBirth: string }>(
  'auth/registerUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/register', data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Menangani kasus jika error adalah AxiosError
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
      // Menangani kasus jika error bukan AxiosError
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Thunk untuk meng-refresh token
export const refreshToken = createAsyncThunk<string, void, { state: RootState }>(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await axios.post('/refresh-token', { token: state.auth.token });
      return response.data.token;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Menangani kasus jika error adalah AxiosError
        return rejectWithValue(error.response?.data || 'An error occurred');
      }
      // Menangani kasus jika error bukan AxiosError
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload;
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
