import React, { useState, useEffect, useCallback } from 'react';
import InputSearch from '../components/InputSearch';
import CardPokemon from '../components/CardPokemon';
import { Container, Pokemons } from '../styles/home';
import api from '../services/api';
import { Pokeball } from '../assets/patterns';
import { isEmpty } from 'lodash';

const HomePage = () => {
  const { VITE_POKEMON_MAX_NUMBER, VITE_MAX_POKEMON } = import.meta.env;
  const pokemonNumber = Number(VITE_POKEMON_MAX_NUMBER);

  const [pokemons, setPokemons] = useState([]);
  const [pokemonSearch, setPokemonSearch] = useState('');
  const [pokemonsOffsetApi, setPokemonsOffsetApi] = useState(0);

  // Filtrado de Pokémons segun el string del campo
  const handleSearchPokemons = useCallback(async () => {
    const response = await api.get(
      `/pokemon?limit=${Number(VITE_MAX_POKEMON)}`
    );

    setPokemonSearch(pokemonSearch.toLocaleLowerCase());
    // Valida los nombres de los pokemons contenidos en el valor de la variable pokemonSearch
    const pokemonsSearch = response.data.results.filter(({ name }) =>
      name.includes(pokemonSearch)
    );
    setPokemons(pokemonsSearch);
  }, [pokemonSearch]);

  // Carga una lista inicial de Pokémons
  const handlePokemonsListDefault = useCallback(async () => {
    const response = await api.get('/pokemon', {
      params: {
        limit: pokemonNumber
      }
    });
    setPokemons(response.data.results);
  }, []);

  const scrollListener = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPokemonsOffsetApi((state) => state + pokemonNumber);
    }
  };

  useEffect(() => {
    // Empieza a buscar con igual o más de 2 caracteres
    const isSearch = pokemonSearch.length >= 2;

    if (isSearch) handleSearchPokemons();
    else handlePokemonsListDefault();
  }, [pokemonSearch, handlePokemonsListDefault, handleSearchPokemons]);

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
  }, []);

  useEffect(() => {
    const handleMorePokemons = async (offset) => {
      const response = await api.get(`/pokemon`, {
        params: {
          limit: pokemonNumber,
          offset
        }
      });
  
      setPokemons((state) => [...state, ...response.data.results]);
    }

    handleMorePokemons(pokemonsOffsetApi);
  }, [pokemonsOffsetApi]);

  return (
    <Container>
      <Pokeball />
      <h1>Pokédex</h1>
      <InputSearch value={pokemonSearch} onChange={setPokemonSearch} />
      <Pokemons>
        {pokemons.map((pokemon) => (
          <CardPokemon key={pokemon.name} name={pokemon.name} />
        ))}
      </Pokemons>
    </Container>
  );
};

export default HomePage;
