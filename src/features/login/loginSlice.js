import { createSlice } from '@reduxjs/toolkit';
import { isValidEmail, isValidPassword } from '../../utils';

const initialState = {
  email: localStorage.getItem('email') || '',
  password: localStorage.getItem('password') || '',
  error: false,
  errorMessage: '',
  success: false
};

// Define el slice del estado
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setText: (state, action) => {
      const { value, field } = action.payload;

      state[field] = value;
    },
    login: (state) => {
      const validEmail = isValidEmail(state.email);
      const validPassword = isValidPassword(state.password);

      if (!validEmail || !validPassword) {
        state.success = false;
        state.error = true;
        state.errorMessage = 'Inicio de sesión inválido';
      } else {
        state.success = true;
        state.error = false;
        state.errorMessage = '';
      }
    },
    reset: (state) => {
      state.success = false;
      state.email = '';
      state.password = '';
    }
  }
});

// Exporta la acción y el reducer generado automáticamente
export const { setText, login, reset } = loginSlice.actions;
export default loginSlice.reducer;
