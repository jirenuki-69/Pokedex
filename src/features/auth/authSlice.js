import { createSlice } from '@reduxjs/toolkit';
import { isLoggedIn, setLocalStorageItems } from '../../utils';

// Define el slice del estado
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: isLoggedIn()
  },
  reducers: {
    setAuth: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      setLocalStorageItems({ email, password });
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }
  }
});

// Exporta la acción y el reducer generado automáticamente
export const { setAuth, login, logout } = authSlice.actions;
export default authSlice.reducer;
