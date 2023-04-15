import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import PropTypes from 'prop-types';
import {
  Container,
  StyledTable,
  TableHeader,
  TableHead
} from '../../styles/table';
import { isEmpty } from 'lodash';
import TableFooter from './TableFooter';
import { getNewPage } from '../../utils/pagination';
import {
  getInitialPokemonsList,
  loadMorePokemons,
  searchPokemons
} from '../../features/table/tableActions';
import { setCurrentPage } from '../../features/table/tableSlice';
import PokemonRow from './PokemonRow';
import { PokeballLoader } from '../../styles/loader';

const Table = ({ pokemonSearch }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.table);

  const { VITE_POKEMON_MAX_NUMBER } = import.meta.env;

  const { colors } = useTheme();

  const handlePopUpShiny = (pokemon) => {
    window.open(pokemon?.shinySpriteUrl);
  };

  const onPageChange = (newPage) => {
    const value = getNewPage(
      Math.ceil(state.totalPokemonCount / Number(VITE_POKEMON_MAX_NUMBER)),
      state.currentPage,
      newPage
    );
    dispatch(setCurrentPage(value));
  };

  useEffect(() => {
    dispatch(getInitialPokemonsList(colors));
  }, []);

  useEffect(() => {
    dispatch(loadMorePokemons({ currentPage: state.currentPage, colors }));
  }, [state.currentPage]);

  useEffect(() => {
    //Empieza a buscar pokémons si hay algo en el texto, en caso contrario trae los default
    const isSearch = pokemonSearch.length >= 1;

    if (isSearch) dispatch(searchPokemons({ pokemonSearch, colors }));
  }, [pokemonSearch]);

  return (
    <>
      <Container>
        {!isEmpty(state.pokemons) && !state.loading && (
          <StyledTable>
            <TableHead>
              <tr>
                <TableHeader>#</TableHeader>
                <TableHeader>Nombre</TableHeader>
                <TableHeader>Imagen</TableHeader>
                <TableHeader>Tipos</TableHeader>
                <TableHeader>Habilidades</TableHeader>
                <TableHeader>Shiny</TableHeader>
              </tr>
            </TableHead>
            <tbody>
              {state.pokemons.map((pokemon) => (
                <PokemonRow
                  pokemon={pokemon}
                  handlePopUpShiny={handlePopUpShiny}
                />
              ))}
            </tbody>
          </StyledTable>
        )}
      </Container>
      {state.loading && <PokeballLoader />}
      <TableFooter
        currentPage={state.currentPage}
        count={state.totalPokemonCount}
        onPageChange={onPageChange}
      />
    </>
  );
};

Table.propTypes = {
  pokemonSearch: PropTypes.string.isRequired
};

export default Table;
