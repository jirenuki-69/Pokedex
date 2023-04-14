import React from 'react';
import PropTypes from 'prop-types';
import { CustomButton } from '../styles/logoutButton';

const LogoutButton = ({ text, onClick, active }) => (
  <CustomButton onClick={onClick} active={active}>
    <p>{text}</p>
  </CustomButton>
);

LogoutButton.defaultValues = {
  active: false
};

LogoutButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool
};

export default LogoutButton;
