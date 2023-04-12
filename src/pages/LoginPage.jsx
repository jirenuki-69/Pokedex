import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Divider,
  FormContainer,
  LogoContainer
} from '../styles/login';
import logo from '../assets/img/bg.png';
import Input from '../components/Input';
import { FaLock, FaMailBulk } from 'react-icons/fa';
import { isValidEmail, isValidPassword, sendToast, setLocalStorageItems } from '../utils';

//! IMPLEMENTAR REDUX
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const validEmail = isValidEmail(email);
    const validPassword = isValidPassword(password);

    if (!validEmail || !validPassword) {
      sendToast({ message: 'Inicio de sesión inválido', type: 'error' })
    }
    else {
      setLocalStorageItems({ email, password });
      navigate('/');
    }
      
  };

  const handleLogin = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Container>
        <LogoContainer>
          <img src={logo} alt="Logo Pokémon" title="Logo Pokémon" />
        </LogoContainer>
        <Divider />
        <FormContainer onSubmit={handleLogin}>
          <h1>¡Bienvenido a la Pokédex!</h1>
          <Input
            value={email}
            placeholder="Correo electrónico"
            onChange={setEmail}
            icon={<FaMailBulk />}
            type="email"
            required
          />
          <Input
            value={password}
            placeholder="Contraseña"
            onChange={setPassword}
            icon={<FaLock />}
            type="password"
            required
          />
          <button type="button" onClick={handleSubmit}>
            Iniciar Sesión
          </button>
        </FormContainer>
      </Container>
    </>
  );
};

export default LoginPage;
