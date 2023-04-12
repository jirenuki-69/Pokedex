import React, { useState, useEffect } from 'react';
import { useTheme } from 'styled-components';

import api from '../services/api';
import iconTypePokemon from '../assets/types';
import { Pokeball } from '../assets/patterns';

import {
  Container,
  Pokemon,
  PokemonNumber,
  PokemonName,
  PokemonType
} from '../styles/card';

const CardPokemon = ({ name }) => {
  const { colors } = useTheme();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    api.get(`/pokemon/${name}`).then((response) => {
      const { id, types, sprites } = response.data;

      let backgroundColor = types[0].type.name;

      // Cualquier pokémon con dos o más clases y cuya primera clase sea del tipo "normal",
      // Esta codicinal obliga a tomar la segunda clase, la razón de este flujo es un mejor estilo de diseño de la aplicación
      if (backgroundColor === 'normal' && types.length > 1) {
        backgroundColor = types[1].type.name;
      }

      setPokemon({
        id,
        backgroundColor: colors.backgroundType[backgroundColor],
        image: sprites.other['official-artwork'].front_default,
        type: types.map((pokemonType) => {
          const { type: { name: typeName } } = pokemonType;

          return {
            name: typeName,
            icon: iconTypePokemon[typeName],
            color: colors.type[typeName]
          };
        })
      });
    });
  }, [name, colors]);

  return (
    <Container to={`pokemon/${name}`} color={pokemon.backgroundColor}>
      <Pokemon>
        <PokemonNumber>#{pokemon.id}</PokemonNumber>
        <PokemonName>{name}</PokemonName>
        {pokemon.type && (
          <div>
            {pokemon.type.map((pokemonType) => (
              <PokemonType color={pokemonType.color} key={pokemonType.name}>
                {pokemonType.icon} <span>{pokemonType.name}</span>
              </PokemonType>
            ))}
          </div>
        )}
        <Pokeball />
      </Pokemon>
      {pokemon.image && <img src={pokemon.image} alt={`${name} image`} />}
    </Container>
  );
};

export default CardPokemon;
