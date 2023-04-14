import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import CardPokemon from './CardPokemon';
import { Container } from '../styles/grid';
import {
  getInitialPokemonsList,
  loadMorePokemons,
  searchPokemons
} from '../features/grid/gridActions';
import { incrementOffset } from '../features/grid/gridSlice';
import { PokeballLoader } from '../styles/loader';

const PokemonGrid = ({ pokemonSearch }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.grid);

  const scrollListener = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      dispatch(incrementOffset());
    }
  };

  useEffect(() => {
    //Empieza a buscar pokémons si hay algo en el texto, en caso contrario trae los default
    const isSearch = pokemonSearch.length >= 1;

    if (isSearch) dispatch(searchPokemons(pokemonSearch));
    else dispatch(getInitialPokemonsList());
  }, [pokemonSearch]);

  useEffect(() => {
    if (isEmpty(state.pokemons)) dispatch(getInitialPokemonsList());
    // Listener para saber cuando el usuario se encuentre scrolleando hasta el final
    window.addEventListener('scroll', scrollListener);

    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  useEffect(() => {
    if (state.offset !== 0 && isEmpty(pokemonSearch)) {
      dispatch(loadMorePokemons(state.offset));
    }
  }, [state.offset]);

  return (
    <>
      <Container>
        {state.pokemons.map((pokemon) => (
          <CardPokemon key={pokemon.name} name={pokemon.name} />
        ))}
      </Container>
      {state.loading && <PokeballLoader />}
    </>
  );
};

PokemonGrid.propTypes = {
  pokemonSearch: PropTypes.string.isRequired
};

export default PokemonGrid;
