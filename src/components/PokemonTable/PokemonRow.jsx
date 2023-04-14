import React from 'react';
import { Link } from "react-router-dom";
import { capitalize } from 'lodash';
import {
  TableRow,
  TableCell,
  Image,
  Label,
  PokemonType,
  ShinyButton
} from '../../styles/table/index';

const PokemonRow = ({ pokemon, handlePopUpShiny }) => (
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
        <Label key={`${pokemon.name} ability: ${ability} ${index}`}>
          {capitalize(ability)}
        </Label>
      ))}
    </TableCell>
    <TableCell>
      <ShinyButton type="button" onClick={() => handlePopUpShiny(pokemon)}>
        Shiny
      </ShinyButton>
    </TableCell>
  </TableRow>
);

export default PokemonRow;
