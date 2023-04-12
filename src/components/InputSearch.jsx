/* eslint-disable prettier/prettier */
import React, { useState, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';

import { Container } from '../styles/input';

const InputSearch = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Container isFocused={isFocused}>
      <FaSearch />
      <input
        placeholder={isFocused ? '' : '¿Qué Pokémon andas buscando?'}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </Container>
  );
};

export default InputSearch;
