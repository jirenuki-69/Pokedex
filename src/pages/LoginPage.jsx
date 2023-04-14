import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Divider,
  FormContainer,
  LogoContainer
} from '../styles/login';
import logo from '../assets/img/bg.png';
import Input from '../components/Input';
import { FaLock, FaMailBulk } from 'react-icons/fa';
import { setText, login, reset } from '../features/login/loginSlice';
import { setAuth, login as authLogin } from '../features/auth/authSlice';
import { sendToast } from '../utils';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { email, password, success, error, errorMessage } = useSelector(
    (state) => state.login
  );
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(login());
  };

  const handleLogin = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (success) {
      dispatch(setAuth(true));
      dispatch(authLogin({ email, password }));
      dispatch(reset());
      navigate('/');
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      sendToast({ message: errorMessage, type: 'error' });
    }
  }, [error]);

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
            onChange={(value) => dispatch(setText({ field: 'email', value }))}
            icon={<FaMailBulk />}
            type="email"
            required
          />
          <Input
            value={password}
            placeholder="Contraseña"
            onChange={(value) =>
              dispatch(setText({ field: 'password', value }))
            }
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
