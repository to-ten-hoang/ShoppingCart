import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';

interface AuthState {
  user: User | null;           // Current user object
  isAuthenticated: boolean;    // True nếu user đã login
  loading: boolean;            // Loading state cho auth operations
  error: string | null;        // Error message
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,               // True ban đầu để check existing session
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set user khi login thành công
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload; // Convert to boolean
      state.loading = false;
      state.error = null;
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Logout user
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, clearError, logout } = authSlice.actions;
export default authSlice.reducer;