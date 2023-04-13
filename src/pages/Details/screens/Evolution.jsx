import React, { useCallback, useEffect, useState } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';

import { Pokeball } from '../../../assets/patterns';
import api from '../../../services/api';

import {
  SectionEvolution,
  EvolutionPokemon,
  EvolutionPokemonImage
} from '../../../styles/evolution';

const Evolution = ({ name, color }) => {
  const [pokemonsFamily, setPokemonsFamily] = useState([]);

  const [evolvesPokemon, setEvolvesPokemon] = useState([]);

  // Creando una función recursiva para navegar por el árbol de evolución de Pokémon
  // En cada llamada, se extrae el nombre de la especie y se concatena con la lista de nombres.
  const handleNameSpecies = useCallback(
    ({ species, evolves_to, evolution_details }) => {
      let namesPokemons = [
        {
          name: species.name,
          level: 0
        }
      ];
      if (evolution_details.length)
        namesPokemons[0].level = evolution_details[0].min_level;

      evolves_to.forEach((evolves) => {
        namesPokemons = namesPokemons.concat(handleNameSpecies(evolves));
      });

      return namesPokemons;
    },
    []
  );

  useEffect(() => {
    // La ruta /pokemon-species devuelve los atributos de las especies de Pokémon
    api.get(`/pokemon-species/${name}`).then((responseSpecies) => {
      // Y en la propiedad evolution_chain se da la url de la cadena evolutiva del Pokémon
      // Se extrae una parte de la url porque el axios ya tiene la ruta raiz de la api
      const url = responseSpecies.data.evolution_chain.url.split('v2')[1];
      api.get(url).then((responseEvolution) => {
        const species = handleNameSpecies(responseEvolution.data.chain);
        setPokemonsFamily(species);
      });
    });
  }, [name, handleNameSpecies]);

  useEffect(() => {
    if (pokemonsFamily.length) {
      const urlsAxios = pokemonsFamily.map((p) =>
        api.get(`/pokemon/${p.name}`)
      );

      Promise.all([...urlsAxios]).then((responses) => {
        const result = responses.map((response, index) => {
          const { id, sprites } = response.data;
          return {
            ...pokemonsFamily[index],
            number: `#${'000'.substr(id.toString().length)}${id}`,
            image: sprites.other['official-artwork'].front_default
          };
        });
        setEvolvesPokemon(result);
      });
    }
  }, [pokemonsFamily]);

  return (
    <SectionEvolution>
      {evolvesPokemon.length ? (
        evolvesPokemon.slice(0, 6).map((evolves, index) => (
          <React.Fragment key={evolves.level}>
            {index !== 0 && (
              <EvolutionPokemon>
                <FaLongArrowAltRight size={80} color="rgba(0, 0, 0, 0.06)" />
                <p>(Nivel {evolves.level || 'null'})</p>
              </EvolutionPokemon>
            )}
            <EvolutionPokemon>
              <EvolutionPokemonImage to={`/pokemon/${evolves.name}`}>
                <Pokeball />
                <img
                  src={evolves.image}
                  alt={`Imagem do pokémon ${evolves.name}`}
                />
              </EvolutionPokemonImage>
              <p>{evolves.number}</p>
              <h4>{evolves.name}</h4>
            </EvolutionPokemon>
          </React.Fragment>
        ))
      ) : (
        <h1 style={{ textAlign: 'center' }}>Carregando...</h1>
      )}
    </SectionEvolution>
  );
};

export default Evolution;
