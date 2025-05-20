import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  token: string;
  refreshToken: string;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  refreshToken: '',
  token: '',
  loading: true,
  error: null,
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(
      state,
      action: PayloadAction<{token: string; refreshToken: string}>,
    ) {
      state.loading = false;
      state.error = null;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const {setToken} = authReducer.actions;

export default authReducer.reducer;
