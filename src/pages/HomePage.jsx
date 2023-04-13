import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import { isEmpty } from 'lodash';
import InputSearch from '../components/Input';
import CardPokemon from '../components/CardPokemon';
import { Container, Pokemons } from '../styles/home';
import api from '../services/api';
import { Pokeball } from '../assets/patterns';

const HomePage = () => {
  const { VITE_POKEMON_MAX_NUMBER, VITE_MAX_POKEMON } = import.meta.env;
  const pokemonNumber = Number(VITE_POKEMON_MAX_NUMBER);

  const [pokemons, setPokemons] = useState([]);
  const [pokemonSearch, setPokemonSearch] = useState('');
  const [pokemonsOffsetApi, setPokemonsOffsetApi] = useState(0);
  const [loading, setLoading] = useState(false);

  // Filtrado de Pokémons segun el string del campo
  const handleSearchPokemons = useCallback(async () => {
    setLoading(true);
    const response = await api.get(
      `/pokemon?limit=${Number(VITE_MAX_POKEMON)}`
    );

    setPokemonSearch(pokemonSearch.toLocaleLowerCase());
    // Valida los nombres de los pokemons contenidos en el valor de la variable pokemonSearch
    const pokemonsSearch = response.data.results.filter(({ name }) =>
      name.includes(pokemonSearch)
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
      <Pokeball />
      <h1>Pokédex</h1>
      <InputSearch
        value={pokemonSearch}
        onChange={setPokemonSearch}
        placeholder="¡Busca tu Pokémon!"
        icon={<FaSearch />}
      />
      <Pokemons>
        {pokemons.map((pokemon) => (
          <CardPokemon key={pokemon.name} name={pokemon.name} />
        ))}
      </Pokemons>
      {loading && <h1>Loading...</h1>}
    </Container>
  );
};

export default HomePage;
