import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//desde aqui solo llamamos a las paginas que vamos creando en el transcurso del proyecto
import CargaPage from './Pages/CargaPage'
import LoginPage from './Pages/LoginPage'
import InicioPage from './Pages/InicioPage'
import ListaUsuarioPage from './Pages/ListaUsuarioPage'
import MapaPage from './Pages/MapaPage'
import TipoViajePage from './Pages/TipoViajePage'
import ParametrosPage from './Pages/ParametrosPage'
import NotificacionPage from './Pages/NotificacionPage'

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={CargaPage} />
      <Route exact path='/Login' component={LoginPage} />
      <Route exact path='/Inicio' component={InicioPage} />
      <Route exact path='/ListaUsuario' component={ListaUsuarioPage} />
      <Route exact path='/MapaPage' component={MapaPage} />
      <Route exact path='/TipoViajePage' component={TipoViajePage} />
      <Route exact path='/ParametrosPage' component={ParametrosPage} />
      <Route exact path='/NotificacionPage' component={NotificacionPage} />
      
    </BrowserRouter>
  );
}

export default App;
