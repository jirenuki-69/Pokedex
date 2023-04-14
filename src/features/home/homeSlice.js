import { createSlice } from '@reduxjs/toolkit';

// Define el slice del estado
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    currentMode: 'list',
    search: ''
  },
  reducers: {
    // Define la acción para cambiar el valor de currentMode
    setCurrentMode: (state, action) => {
      state.currentMode = action.payload;
    },
    // Define la acción para cambiar el valor de search
    setInputSearchValue: (state, action) => {
      state.search = action.payload;
    }
  }
});

// Exporta la acción y el reducer generado automáticamente
export const { setCurrentMode, setInputSearchValue } = homeSlice.actions;
export default homeSlice.reducer;
