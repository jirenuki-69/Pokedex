import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import api from '../services/api';
import CardPokemon from './CardPokemon';
import { Container } from '../styles/grid';

const PokemonGrid = ({ pokemonSearch }) => {
  const { VITE_POKEMON_MAX_NUMBER, VITE_MAX_POKEMON } = import.meta.env;
  const pokemonNumber = Number(VITE_POKEMON_MAX_NUMBER);

  const [pokemons, setPokemons] = useState([]);
  const [pokemonsOffsetApi, setPokemonsOffsetApi] = useState(0);
  const [loading, setLoading] = useState(false);

  // Filtrado de Pokémons segun el string del campo
  const handleSearchPokemons = useCallback(async () => {
    setLoading(true);
    const response = await api.get(`/pokemon`, {
      params: { limit: Number(VITE_MAX_POKEMON) }
    });

    // Valida los nombres de los pokemons contenidos en el valor de la variable pokemonSearch
    const pokemonsSearch = response.data.results.filter(({ name }) =>
      name.includes(pokemonSearch.toLocaleLowerCase())
    );

    setPokemons(pokemonsSearch);
    setLoading(false);
  }, [pokemonSearch]);

  // Carga una lista inicial de Pokémons
  const handlePokemonsListDefault = useCallback(async () => {
    setLoading(true);
    const response = await api.get('/pokemon', {
      params: {
        limit: pokemonNumber
      }
    });

    setPokemons(response.data.results);
    setLoading(false);
  }, [pokemonNumber]);

  const handleMorePokemons = useCallback(
    async (offset) => {
      setLoading(true);
      const response = await api.get(`/pokemon`, {
        params: {
          limit: pokemonNumber,
          offset
        }
      });

      setPokemons((state) => [...state, ...response.data.results]);
      setLoading(false);
    },
    [pokemonsOffsetApi]
  );

  const scrollListener = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPokemonsOffsetApi((state) => state + pokemonNumber);
    }
  };

  useEffect(() => {
    //Empieza a buscar pokémons si hay algo en el texto, en caso contrario trae los default
    const isSearch = pokemonSearch.length >= 1;

    if (isSearch) handleSearchPokemons();
    else handlePokemonsListDefault();
  }, [pokemonSearch, handleSearchPokemons, handlePokemonsListDefault]);

  useEffect(() => {
    handlePokemonsListDefault();
    // Listener para saber cuando el usuario se encuentre scrolleando hasta el final
    window.addEventListener('scroll', scrollListener);

    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  useEffect(() => {
    if (pokemonsOffsetApi !== 0 && isEmpty(pokemonSearch)) {
      handleMorePokemons(pokemonsOffsetApi);
    }
  }, [handleMorePokemons, pokemonsOffsetApi]);

  return (
    <Container>
      {pokemons.map((pokemon) => (
        <CardPokemon key={pokemon.name} name={pokemon.name} />
      ))}
      {loading && <h1>Loading...</h1>}
    </Container>
  );
};

PokemonGrid.propTypes = {
  pokemonSearch: PropTypes.string.isRequired
};

export default PokemonGrid;
