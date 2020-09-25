import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//desde aqui solo llamamos a las paginas que vamos creando en el transcurso del proyecto
import CargaPage from './Pages/CargaPage'
import LoginPage from './Pages/LoginPage'
import InicioPage from './Pages/InicioPage'


function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={CargaPage} />
      <Route exact path='/Login' component={LoginPage} />
      <Route exact path='/Inicio' component={InicioPage} />
      
    </BrowserRouter>
  );
}

export default App;
