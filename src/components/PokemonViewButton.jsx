import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ViewButton } from '../styles/pokemonViewButton';

const PokemonViewButton = ({ text, onClick, active }) => {
  return (
    <ViewButton onClick={onClick} active={active}>
      <p>{text}</p>
    </ViewButton>
  );
};

PokemonViewButton.defaultValues = {
  active: false
};

PokemonViewButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool
};

export default PokemonViewButton;
