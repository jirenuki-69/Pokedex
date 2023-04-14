import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const { VITE_POKEMON_MAX_NUMBER, VITE_MAX_POKEMON } = import.meta.env;

export const getInitialPokemonsList = createAsyncThunk(
  'grid/getInitialPokemonsList',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/pokemon', {
        params: {
          limit: Number(VITE_POKEMON_MAX_NUMBER)
        }
      });

      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadMorePokemons = createAsyncThunk(
  'grid/loadMorePokemons',
  async (offset, thunkAPI) => {
    try {
      const response = await api.get(`/pokemon`, {
        params: {
          limit: Number(VITE_POKEMON_MAX_NUMBER),
          offset
        }
      });

      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchPokemons = createAsyncThunk(
  'grid/searchPokemons',
  async (pokemonSearch, thunkAPI) => {
    try {
      const response = await api.get(`/pokemon`, {
        params: { limit: Number(VITE_MAX_POKEMON) }
      });

      // Valida los nombres de los pokemons contenidos en el valor de la variable pokemonSearch
      const filteredData = response.data.results.filter(({ name }) =>
        name.includes(pokemonSearch.toLocaleLowerCase())
      );

      return filteredData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
