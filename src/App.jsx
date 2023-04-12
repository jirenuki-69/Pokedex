import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import theme from './styles/theme';
import PokeRoutes from './routes/PokeRoutes';

const App = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <PokeRoutes />
      <GlobalStyle />
    </ThemeProvider>
  </Router>
);

export default App;
