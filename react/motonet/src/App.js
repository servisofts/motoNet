import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//desde aqui solo llamamos a las paginas que vamos creando en el transcurso del proyecto
import CargaPage from './Pages/CargaPage'
import LoginPage from './Pages/LoginPage'
import InicioPage from './Pages/InicioPage'
import ListaConductorPage from './Pages/ListaConductorPage'
import MapaPage from './Pages/MapaPage'
import TipoViajePage from './Pages/TipoViajePage'
import ParametrosPage from './Pages/ParametrosPage'
import NotificacionPage from './Pages/NotificacionPage'
import AsociacionesMotoPage from './Pages/AsociacionesMotoPage'
import ListaAsociacionMotoPage from './Pages/ListaAsociacionMotoPage'
import HistorialViajePage from './Pages/HistorialViajePage'

import ListaAdministradorPage from './Pages/ListaAdministradorPage'
import UsuarioRegistroPage from './Pages/UsuarioRegistroPage'
import ListaUsuarioPage from './Pages/ListaUsuarioPage'

import ConductorListaPage from './Pages/ConductorListaPage'
import ConductorPerfilPage from './Pages/ConductorPerfilPage'
import ConductorRegistroPage from './Pages/ConductorRegistroPage'

import PublicidadPage from './Pages/PublicidadPage';


function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={CargaPage} />
      <Route exact path='/Login' component={LoginPage} />
      <Route exact path='/Inicio' component={InicioPage} />
      <Route exact path='/ListaUsuario' component={ListaUsuarioPage} />
      <Route exact path='/UsuarioRegistroPage' component={UsuarioRegistroPage} />
      <Route exact path='/UsuarioRegistroPage/:key' component={UsuarioRegistroPage} />
      <Route exact path='/ListaConductor' component={ListaConductorPage} />
      <Route exact path='/MapaPage' component={MapaPage} />
      <Route exact path='/TipoViajePage' component={TipoViajePage} />
      <Route exact path='/ParametrosPage' component={ParametrosPage} />
      <Route exact path='/NotificacionPage' component={NotificacionPage} />
      <Route exact path='/AsociacionesMotoPage' component={AsociacionesMotoPage} />
      <Route exact path='/ListaAsociacionMotoPage' component={ListaAsociacionMotoPage} />
      <Route exact path='/HistorialViajePage' component={HistorialViajePage} />
      <Route exact path='/ConductorListaPage' component={ConductorListaPage} />
      <Route exact path='/ConductorPerfilPage/:key' component={ConductorPerfilPage} />
      <Route exact path='/ConductorRegistroPage' component={ConductorRegistroPage} />
      <Route exact path='/ConductorRegistroPage/:key' component={ConductorRegistroPage} />
      <Route exact path='/PublicidadPage' component={PublicidadPage} />
      
    </BrowserRouter>
  );
}

export default App;
