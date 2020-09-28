import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//desde aqui solo llamamos a las paginas que vamos creando en el transcurso del proyecto
import CargaPage from './Pages/CargaPage'
import LoginPage from './Pages/LoginPage'
import InicioPage from './Pages/InicioPage'
import ListaUsuarioPage from './Pages/ListaUsuarioPage'
import MapaPage from './Pages/MapaPage'

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={CargaPage} />
      <Route exact path='/Login' component={LoginPage} />
      <Route exact path='/Inicio' component={InicioPage} />
      <Route exact path='/ListaUsuario' component={ListaUsuarioPage} />
      <Route exact path='/MapaPage' component={MapaPage} />
      
    </BrowserRouter>
  );
}

export default App;
