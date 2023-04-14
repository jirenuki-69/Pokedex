import axios from 'axios';
import pokemonTypes from '../assets/types';
import { capitalizeSnakeCase } from '.';
import api from '../services/api';

export const normalizeAbilities = (abilities) => {
  return abilities.map(({ ability: { name } }) => name);
};

export const normalizeMoves = async (moves, colors) => {
  moves = moves.sort(() => Math.random() - Math.random()).slice(0, 10);
  const results = await Promise.all(
    moves.map(async (move) => {
      const response = await axios.get(move.move.url);

      const { accuracy, power, type } = response.data;

      return {
        name: move.move.name,
        power: power || 'N/A',
        accuracy: accuracy || 'N/A',
        type: type.name,
        color: colors.type[type.name]
      };
    })
  );

  return results;
};

export const normalizeSprites = (sprites) => {
  const results = Object.entries(sprites)
    .reverse()
    .map(([key, value]) => ({
      label: capitalizeSnakeCase(key),
      image: value
    }))
    .filter(({ label, image }) => image !== null);

  return results;
};

export const getPokemonDetails = async (data, colors) => {
  const { id, weight, height, stats, sprites, types, species, moves } = data;

  const normalizedMoves = await normalizeMoves(moves, colors);
  const normalizedSprites = normalizeSprites(sprites);

  return {
    id,
    number: `#${'000'.substr(id.toString().length)}${id}`,
    image:
      sprites.other['official-artwork'].front_default || sprites.front_default,
    weight: `${weight / 10} kg`,
    specie: species.name,
    height: `${height / 10} m`,
    stats: {
      hp: stats[0].base_stat,
      attack: stats[1].base_stat,
      defense: stats[2].base_stat,
      specialAttack: stats[3].base_stat,
      specialDefense: stats[4].base_stat,
      speed: stats[5].base_stat
    },
    type: types.map((pokemonType) => ({
      name: pokemonType.type.name,
      icon: pokemonTypes[pokemonType.type.name],
      color: colors.type[pokemonType.type.name]
    })),
    moves: normalizedMoves,
    spritesGallery: normalizedSprites
  };
};

export const pokemonPreviousSprite = (currentSprite, spritesLength) =>
  currentSprite === 0 ? spritesLength - 1 : currentSprite - 1;

export const pokemonNextSprite = (currentSprite, spritesLength) =>
  currentSprite === spritesLength - 1 ? 0 : currentSprite + 1;

export const getIndividualPokemonDetails = async (data, colors) => {
  return await Promise.all(
    data.map(async ({ name }) => {
      return await api.get(`/pokemon/${name}`).then((response) => {
        const { id, types, sprites, abilities } = response.data;

        const normalizedAbilities = normalizeAbilities(abilities);
        const shinySpriteUrl = normalizeSprites(sprites)?.find(
          ({ label }) => label === 'Front Shiny'
        )?.image;

        let backgroundColor = types[0].type.name;

        if (backgroundColor === 'normal' && types.length > 1) {
          backgroundColor = types[1].type.name;
        }

        return {
          id,
          name,
          backgroundColor: colors.backgroundType[backgroundColor],
          image: sprites.other['official-artwork'].front_default,
          type: types.map((pokemonType) => {
            const {
              type: { name: typeName }
            } = pokemonType;

            return {
              name: typeName,
              icon: pokemonTypes[typeName],
              color: colors.type[typeName]
            };
          }),
          abilities: normalizedAbilities,
          shinySpriteUrl
        };
      });
    })
  );
};
