import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Container } from '../styles/input';

const Input = ({ onChange, onEnterPress, placeholder, icon, required, type }) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onEnterPress(value);
    }
  };

  return (
    <Container isFocused={isFocused}>
      {icon}
      <input
        placeholder={isFocused ? '' : placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        onKeyDown={handleKeyPress}
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
  type: 'text',
  onChange: (value) => {},
  onKeyPress: () => {}
};

Input.propTypes = {
  onChange: PropTypes.func,
  onEnterPress: PropTypes.func,
  placeholder: PropTypes.string,
  icon: PropTypes.element,
  required: PropTypes.bool,
  type: PropTypes.string
};

export default Input;
