import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

import {
  SectionAbout,
  SectionAboutContent,
  Weaknesses
} from '../../../styles/about';
import pokemonTypes from '../../../assets/types';
import api from '../../../services/api';

const About = ({ pokemon, colorText }) => {
  const { colors } = useTheme();
  const [weaknesses, setWeaknesses] = useState([]);
  const [pokemonSpecie, setPokemonSpecie] = useState({});

  useEffect(() => {
    if (pokemon.type && pokemon.type.length) {
      api.get(`/type/${pokemon.type[0].name}`).then((response) => {
        const {
          damage_relations: { double_damage_from }
        } = response.data;
        const auxWeaknesses = double_damage_from.map((typeDamage) => ({
          icon: pokemonTypes[typeDamage.name],
          color: colors.type[typeDamage.name],
          name: typeDamage.name
        }));
        setWeaknesses(auxWeaknesses);
      });
    }
  }, [pokemon.type, colors.type]);

  useEffect(() => {
    if (pokemon.specie) {
      api.get(`/pokemon-species/${pokemon.specie}`).then((response) => {
        const {
          capture_rate,
          base_happiness,
          growth_rate,
          flavor_text_entries
        } = response.data;

        setPokemonSpecie({
          capture_rate,
          base_happiness,
          growth_rate: growth_rate.name.replace('-', ' '),
          description: flavor_text_entries[0].flavor_text
        });
      });
    }
  }, [pokemon]);

  return (
    <SectionAbout colorText={colorText}>
      <p>{pokemonSpecie.description}</p>

      <SectionAboutContent>
        <div>
          <h3>Datos de la Pokédex</h3>
          <ul>
            <li>
              <strong>Especie</strong> <span>{pokemon.specie}</span>
            </li>
            <li>
              <strong>Altura</strong> <span>{pokemon.height}</span>
            </li>
            <li>
              <strong>Peso</strong> <span>{pokemon.weight}</span>
            </li>
            <li>
              <strong>Debilidades</strong>
              {weaknesses &&
                weaknesses.map((weaknesse) => (
                  <Weaknesses key={weaknesse.color} color={weaknesse.color}>
                    {weaknesse.icon}
                  </Weaknesses>
                ))}
            </li>
          </ul>
        </div>

        <div>
          <h3>Entrenamiento</h3>

          <ul>
            <li>
              <strong>Tasa de Caotura</strong>
              <span>{pokemonSpecie.capture_rate}</span>
            </li>
            <li>
              <strong>Amistad base</strong>
              <span>{pokemonSpecie.base_happiness}</span>
            </li>
            <li>
              <strong>Tasa de Crecimiento</strong>
              <span>{pokemonSpecie.growth_rate}</span>
            </li>
          </ul>
        </div>
      </SectionAboutContent>
    </SectionAbout>
  );
};

export default About;
