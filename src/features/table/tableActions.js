import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { getIndividualPokemonDetails } from '../../utils/pokemon';

const { VITE_POKEMON_MAX_NUMBER, VITE_MAX_POKEMON } = import.meta.env;

export const getInitialPokemonsList = createAsyncThunk(
  'table/getInitialPokemonsList',
  async (colors, thunkAPI) => {
    try {
      const response = await api.get('/pokemon', {
        params: {
          limit: Number(VITE_POKEMON_MAX_NUMBER)
        }
      });

      const details = await getIndividualPokemonDetails(
        response.data.results,
        colors
      );

      return {
        count: response.data.count,
        data: details
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadMorePokemons = createAsyncThunk(
  'table/loadMorePokemons',
  async ({ currentPage, colors }, thunkAPI) => {
    try {
      const response = await api.get(`/pokemon`, {
        params: {
          limit: Number(VITE_POKEMON_MAX_NUMBER),
          offset: (currentPage - 1) * Number(VITE_POKEMON_MAX_NUMBER)
        }
      });

      const details = await getIndividualPokemonDetails(
        response.data.results,
        colors
      );

      return details;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchPokemons = createAsyncThunk(
  'table/searchPokemons',
  async ({ pokemonSearch, colors }, thunkAPI) => {
    try {
      const response = await api.get(`/pokemon`, {
        params: { limit: Number(VITE_MAX_POKEMON) }
      });

      // Valida los nombres de los pokemons contenidos en el valor de la variable pokemonSearch
      const pokemonsSearch = response.data.results.filter(({ name }) =>
        name.includes(pokemonSearch.toLocaleLowerCase())
      );
      const details = await getIndividualPokemonDetails(pokemonsSearch, colors);

      return { data: details, count: pokemonsSearch?.length };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
