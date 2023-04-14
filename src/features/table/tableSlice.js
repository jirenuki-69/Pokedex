import { createSlice } from '@reduxjs/toolkit';
import {
  getInitialPokemonsList,
  loadMorePokemons,
  searchPokemons
} from './tableActions';

// Define el slice del estado
const tableSlice = createSlice({
  name: 'table',
  initialState: {
    pokemons: [],
    currentPage: 1,
    totalPokemonCount: 0,
    loading: false,
    error: false,
    errorMessage: ''
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalPokemonCount = action.payload;
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
        state.pokemons = action.payload.data;
        state.totalPokemonCount = action.payload.count;
      })
      .addCase(getInitialPokemonsList.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      })
      .addCase(loadMorePokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadMorePokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.pokemons = action.payload;
      })
      .addCase(loadMorePokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      })
      .addCase(searchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.currentPage = 1;
        state.pokemons = action.payload.data;
        state.totalPokemonCount = action.payload.count;
      })
      .addCase(searchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      });
  }
});

// Exporta la acción y el reducer generado automáticamente
export const { setCurrentPage, setTotalCount } = tableSlice.actions;
export default tableSlice.reducer;
