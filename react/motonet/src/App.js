import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//desde aqui solo llamamos a las paginas que vamos creando en el transcurso del proyecto
import CargaPage from './Pages/CargaPage'
import LoginPage from './Pages/LoginPage'
import InicioPage from './Pages/InicioPage'
import MapaPage from './Pages/MapaPage'

import PublicidadPage from './Pages/PublicidadPage';
import AjustesPage from './Pages/AjustesPage';


import { Asociacion } from './Pages/Asociacion';
import { Usuarios } from './Pages/Usuarios';
import { Parametros } from './Pages/Parametros';
import { Tarifas } from './Pages/Tarifas';
function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={CargaPage} />
      <Route exact path='/Login' component={LoginPage} />
      <Route exact path='/Inicio' component={InicioPage} />
      <Route exact path='/AjustesPage' component={AjustesPage} />
      <Route exact path='/Publicidad' component={PublicidadPage} />
      <Route exact path='/MapaPage' component={MapaPage} />

      {Usuarios}
      {Asociacion}
      {Parametros}
      {Tarifas}
    </BrowserRouter>
  );
}

export default App;
