/* eslint-disable prettier/prettier */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Container } from '../styles/input';

const Input = ({ value, onChange, placeholder, icon, required, type }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Container isFocused={isFocused}>
      {icon}
      <input
        placeholder={isFocused ? '' : placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        type={type}
        required={required}
      />
    </Container>
  );
};

Input.defaultValues = {
  placeholder: '',
  icon: null,
  required: false,
  type: 'text'
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.element,
  required: PropTypes.bool,
  type: PropTypes.string
};

export default Input;
