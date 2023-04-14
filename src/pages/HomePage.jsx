import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import InputSearch from '../components/Input';
import {
  ButtonsContainer,
  Container,
  Header,
  LogoutButton
} from '../styles/home';
import { Pokeball } from '../assets/patterns';
import PokemonViewButton from '../components/PokemonViewButton';
import Table from '../components/PokemonTable/Table';
import PokemonGrid from '../components/PokemonGrid';
import { modes } from '../utils/constants';
import {
  setInputSearchValue,
  setCurrentMode
} from '../features/home/homeSlice';
import { logout } from "../features/auth/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { search: pokemonSearch, currentMode } = useSelector(
    (state) => state.home
  );
  const navigate = useNavigate();

  const handleSearchChange = (value) => {
    dispatch(setInputSearchValue(value));
  };

  const handleModeChange = (mode) => {
    dispatch(setCurrentMode(mode));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Container>
      <Pokeball />
      <h1>Pokédex</h1>
      <Header mode={currentMode}>
        <InputSearch
          onChange={() => {}}
          onEnterPress={handleSearchChange}
          placeholder="¡Busca tu Pokémon!"
          icon={<FaSearch />}
        />
        <ButtonsContainer>
          {modes.map(({ label, value }) => (
            <PokemonViewButton
              key={value}
              text={label}
              onClick={() => handleModeChange(value)}
              active={currentMode === value}
            />
          ))}
          <LogoutButton onClick={handleLogout}>
            <p>Cerrar Sesión</p>
          </LogoutButton>
        </ButtonsContainer>
      </Header>
      {currentMode === 'list' && <Table pokemonSearch={pokemonSearch} />}
      {currentMode === 'grid' && <PokemonGrid pokemonSearch={pokemonSearch} />}
    </Container>
  );
};

export default HomePage;
