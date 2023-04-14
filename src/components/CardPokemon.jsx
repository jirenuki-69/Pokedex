import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';

import api from '../services/api';
import iconTypePokemon from '../assets/types';
import { Pokeball } from '../assets/patterns';

import {
  Container,
  Pokemon,
  PokemonNumber,
  PokemonName,
  PokemonType,
  PokemonAbilitiesContainer,
  PokemonAbility,
  PokemonFooter,
  ShinyButton
} from '../styles/grid/card';
import { normalizeAbilities, normalizeSprites } from '../utils/pokemon';

const CardPokemon = ({ name }) => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState({});

  const handlePopUpShiny = () => {
    window.open(pokemon?.shinySpriteUrl);
  };

  useEffect(() => {
    api.get(`/pokemon/${name}`).then((response) => {
      const { id, types, sprites, abilities } = response.data;

      const normalizedAbilities = normalizeAbilities(abilities);
      const shinySpriteUrl = normalizeSprites(sprites)?.find(
        ({ label }) => label === 'Front Shiny'
      )?.image;

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
          const {
            type: { name: typeName }
          } = pokemonType;

          return {
            name: typeName,
            icon: iconTypePokemon[typeName],
            color: colors.type[typeName]
          };
        }),
        abilities: normalizedAbilities,
        shinySpriteUrl
      });
    });
  }, [name, colors]);

  return (
    <Container color={pokemon.backgroundColor}>
      <Pokemon>
        <Pokeball />
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
        <PokemonFooter>
          {pokemon.abilities && (
            <PokemonAbilitiesContainer>
              {pokemon.abilities.map((ability, index) => (
                <PokemonAbility
                  key={`${pokemon.name} ability: ${ability} ${index}`}
                >
                  {ability}
                </PokemonAbility>
              ))}
            </PokemonAbilitiesContainer>
          )}
          <ShinyButton type="button" onClick={handlePopUpShiny}>
            Shiny
          </ShinyButton>
        </PokemonFooter>
      </Pokemon>
      {pokemon.image && (
        <img
          src={pokemon.image}
          alt={`${name} image`}
          onClick={() => navigate(`pokemon/${name}`)}
        />
      )}
    </Container>
  );
};

export default CardPokemon;
