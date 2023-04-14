import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import PropTypes from 'prop-types';
import {
  Container,
  Image,
  StyledTable,
  TableCell,
  TableHeader,
  Label,
  PokemonType,
  TableRow,
  ShinyButton,
  TableHead
} from '../../styles/table';
import api from '../../services/api';
import { capitalize, isEmpty } from 'lodash';
import { getIndividualPokemonDetails } from '../../utils/pokemon';
import TableFooter from './TableFooter';
import { getNewPage } from '../../utils/pagination';

const Table = ({ pokemonSearch }) => {
  // @ts-ignore
  const { VITE_POKEMON_MAX_NUMBER, VITE_MAX_POKEMON } = import.meta.env;
  const pokemonNumber = Number(VITE_POKEMON_MAX_NUMBER);

  const { colors } = useTheme();
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemonCount, setTotalPokemonCount] = useState();
  const [loading, setLoading] = useState(false);

  const handlePopUpShiny = (pokemon) => {
    window.open(pokemon?.shinySpriteUrl);
  };

  // Carga una lista inicial de Pokémons
  const handlePokemonsListDefault = async () => {
    setLoading(true);
    const response = await api.get('/pokemon', {
      params: {
        limit: pokemonNumber
      }
    });

    const details = await getIndividualPokemonDetails(
      response.data.results,
      colors
    );

    setTotalPokemonCount(response.data.count);
    setPokemons(details);
    setLoading(false);
  };

  const onPageChange = (newPage) => {
    const value = getNewPage(
      Math.ceil(totalPokemonCount / pokemonNumber),
      currentPage,
      newPage
    );
    setCurrentPage(value);
  };

  const handleMorePokemons = useCallback(async () => {
    if (isEmpty(pokemons)) {
      return;
    }

    setLoading(true);
    const response = await api.get(`/pokemon`, {
      params: {
        limit: pokemonNumber,
        offset: (currentPage - 1) * pokemonNumber
      }
    });

    const details = await getIndividualPokemonDetails(
      response.data.results,
      colors
    );

    setPokemons(details);
    setLoading(false);
  }, [currentPage]);

  const handleSearchPokemons = useCallback(async () => {
    setLoading(true);
    const response = await api.get(`/pokemon`, {
      params: { limit: Number(VITE_MAX_POKEMON) }
    });

    // Valida los nombres de los pokemons contenidos en el valor de la variable pokemonSearch
    const pokemonsSearch = response.data.results.filter(({ name }) =>
      name.includes(pokemonSearch.toLocaleLowerCase())
    );
    const details = await getIndividualPokemonDetails(
      pokemonsSearch, // pokemonsSearch?.slice(0, 12),
      colors
    );

    setPokemons(details);
    setCurrentPage(1);
    setTotalPokemonCount(pokemonsSearch?.length);
    setLoading(false);
  }, [pokemonSearch]);

  useEffect(() => {
    handlePokemonsListDefault();
  }, []);

  useEffect(() => {
    handleMorePokemons();
  }, [handleMorePokemons]);

  useEffect(() => {
    //Empieza a buscar pokémons si hay algo en el texto, en caso contrario trae los default
    const isSearch = pokemonSearch.length >= 1;

    if (isSearch) handleSearchPokemons();
  }, [pokemonSearch, handleSearchPokemons]);

  return (
    <>
      <Container>
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
            {!isEmpty(pokemons) &&
              !loading &&
              pokemons.map((pokemon) => (
                <TableRow color={pokemon.backgroundColor} key={pokemon.id}>
                  <TableCell>
                    <Label>{pokemon.id}</Label>
                  </TableCell>
                  <TableCell>
                    <Label>{capitalize(pokemon.name)}</Label>
                  </TableCell>
                  <TableCell>
                    <Link to={`pokemon/${pokemon.name}`}>
                      <Image src={pokemon.image} alt={`${pokemon.name} img`} />
                    </Link>
                  </TableCell>
                  <TableCell>
                    {pokemon.type?.map((pokemonType) => (
                      <PokemonType
                        color={pokemonType.color}
                        key={`${pokemon.name} type: ${pokemonType.name}`}
                      >
                        {pokemonType.icon} <span>{pokemonType.name}</span>
                      </PokemonType>
                    ))}
                  </TableCell>
                  <TableCell>
                    {pokemon.abilities?.map((ability, index) => (
                      <Label
                        key={`${pokemon.name} ability: ${ability} ${index}`}
                      >
                        {capitalize(ability)}
                      </Label>
                    ))}
                  </TableCell>
                  <TableCell>
                    <ShinyButton
                      type="button"
                      onClick={() => handlePopUpShiny(pokemon)}
                    >
                      Shiny
                    </ShinyButton>
                  </TableCell>
                </TableRow>
              ))}
          </tbody>
        </StyledTable>
        {loading && <h1>Loading...</h1>}
      </Container>
      <TableFooter
        currentPage={currentPage}
        count={totalPokemonCount}
        onPageChange={onPageChange}
      />
    </>
  );
};

Table.propTypes = {
  pokemonSearch: PropTypes.string.isRequired
};

export default Table;
