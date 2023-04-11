import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoutes from './utils/PrivateRoute';

// Importamos los componentes de las páginas
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PokemonDetailPage from './pages/PokemonDetailPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route element={<HomePage />} path="/" exact />
          <Route element={<PokemonDetailPage />} path="/pokemon/:id" />
        </Route>
        <Route element={<LoginPage />} path="/login" />
      </Routes>
    </Router>
  );
};

export default App;
