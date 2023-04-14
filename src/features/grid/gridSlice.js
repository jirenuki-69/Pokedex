import { createSlice } from '@reduxjs/toolkit';
import {
  getInitialPokemonsList,
  loadMorePokemons,
  searchPokemons
} from './gridActions';

// Define el slice del estado
const gridSlice = createSlice({
  name: 'grid',
  initialState: {
    pokemons: [],
    offset: 0,
    loading: false,
    error: false,
    errorMessage: ''
  },
  reducers: {
    incrementOffset: (state) => {
      state.offset =
        state.offset + Number(import.meta.env.VITE_POKEMON_MAX_NUMBER);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInitialPokemonsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInitialPokemonsList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.pokemons = action.payload;
      })
      .addCase(getInitialPokemonsList.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      })
      .addCase(loadMorePokemons.pending, (state) => {
        state.loading = true
      })
      .addCase(loadMorePokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.pokemons = [...state.pokemons, ...action.payload];
      })
      .addCase(loadMorePokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      })
      .addCase(searchPokemons.pending, (state) => {
        state.loading = true
      })
      .addCase(searchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.pokemons = action.payload;
      })
      .addCase(searchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      });
  }
});

// Exporta la acción y el reducer generado automáticamente
export const { incrementOffset } = gridSlice.actions;
export default gridSlice.reducer;
