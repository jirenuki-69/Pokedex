import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from '../utils/ProtectedRoutes';

// Importamos los componentes de las páginas
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import PokemonDetailPage from '../pages/PokemonDetailPage';

const PokeRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route element={<HomePage />} path="/" exact />
        <Route element={<PokemonDetailPage />} path="/pokemon/:id" />
      </Route>
      <Route element={<LoginPage />} path="/login" />
    </Routes>
  );
};

export default PokeRoutes;
