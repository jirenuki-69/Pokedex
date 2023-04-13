import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import {
  Container,
  GoBack,
  BackgroundNamePokemon,
  Content,
  Header,
  PokemonLoader,
  SectionsName,
  SectionsNameButton,
  ContentSection
} from '../../styles/details';
import { FaChevronLeft } from 'react-icons/fa';
import api from '../../services/api';
import { getPokemonDetails } from '../../utils/pokemon';
import { PokemonName, PokemonNumber, PokemonType } from '../../styles/card';
import { Pokeball } from '../../assets/patterns';
import About from './screens/About';
import Stats from './screens/Stats';
import Evolution from './screens/Evolution';
import Moves from './screens/Moves';
import { tabs } from '../../utils/constants';
import Gallery from './screens/Gallery';

const PokemonDetailPage = () => {
  const { colors } = useTheme();
  const { name } = useParams();

  const [activeSection, setActiveSection] = useState(tabs[0].value);
  const [pokemon, setPokemon] = useState({});
  const [backgroundColor, setBackgroundColor] = useState('normal');

  const getDetails = () => {
    api.get(`/pokemon/${name}`).then(async (response) => {
      const { types } = response.data;

      setBackgroundColor(types[0].type.name);

      if (types[0].type.name === 'normal' && types.length > 1) {
        setBackgroundColor(types[1].type.name);
      }

      const details = await getPokemonDetails(response.data, colors);

      setPokemon(details);
    });
  };

  const screenSelected = useMemo(() => {
    const color = colors.type[backgroundColor];
    switch (activeSection) {
      case 'about':
        return <About pokemon={pokemon} colorText={color} />;
      case 'stats':
        return pokemon.stats && <Stats stats={pokemon.stats} color={color} />;
      case 'moves':
        return pokemon.moves && <Moves moves={pokemon.moves} />;
      case 'evolutions':
        return <Evolution name={name} color={color} />;
      case 'gallery':
        return (
          <Gallery
            sprites={pokemon.spritesGallery.filter(
              ({ image }) => typeof image !== 'object'
            )}
          />
        );
      default:
        return null;
    }
  }, [activeSection, colors, backgroundColor, pokemon, name]);

  useEffect(() => {
    getDetails();
  }, [name, colors]);

  return (
    <Container color={colors.backgroundType[backgroundColor]}>
      <GoBack to="/">
        <FaChevronLeft size={36} />
      </GoBack>
      <BackgroundNamePokemon>
        <h1>{name}</h1>
      </BackgroundNamePokemon>
      <Content>
        <Header>
          <img src={pokemon.image} alt={`${name} img`} />
          <PokemonLoader
            colorBackground={colors.backgroundType[backgroundColor]}
            colorType="rgba(255,255,255,0.6)"
          >
            <span />
          </PokemonLoader>
          <div>
            <PokemonNumber>{pokemon.number}</PokemonNumber>
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
          </div>
        </Header>

        <SectionsName>
          {tabs.map(({ label, value }) => (
            <SectionsNameButton
              key={value}
              type="button"
              onClick={() => setActiveSection(value)}
              active={value === activeSection}
            >
              {label}
            </SectionsNameButton>
          ))}
        </SectionsName>

        <ContentSection>{screenSelected}</ContentSection>
      </Content>
    </Container>
  );
};

export default PokemonDetailPage;
