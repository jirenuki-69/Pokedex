import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import InputSearch from '../components/Input';
import { ButtonsContainer, Container, Header } from '../styles/home';
import { Pokeball } from '../assets/patterns';
import PokemonViewButton from '../components/PokemonViewButton';
import Table from '../components/PokemonTable/Table';
import PokemonGrid from '../components/PokemonGrid';

const HomePage = () => {
  const [pokemonSearch, setPokemonSearch] = useState('');
  const [activeMode, setActiveMode] = useState('list');

  return (
    <Container>
      <Pokeball />
      <h1>Pokédex</h1>
      <Header mode={activeMode}>
        <InputSearch
          onEnterPress={setPokemonSearch}
          placeholder="¡Busca tu Pokémon!"
          icon={<FaSearch />}
        />
        <ButtonsContainer>
          <PokemonViewButton
            text="Lista"
            onClick={() => setActiveMode('list')}
            active={activeMode === 'list'}
          />
          <PokemonViewButton
            text="Cuadrícula"
            onClick={() => setActiveMode('grid')}
            active={activeMode === 'grid'}
          />
        </ButtonsContainer>
      </Header>
      {activeMode === 'list' && <Table pokemonSearch={pokemonSearch} />}
      {activeMode === 'grid' && <PokemonGrid pokemonSearch={pokemonSearch} />}
    </Container>
  );
};

export default HomePage;
