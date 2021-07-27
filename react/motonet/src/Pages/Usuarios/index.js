import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import RegistroPage from './RegistroPage';

import TipoDeUsuario from './TipoDeUsuario';
import UsuariosTablaPage from './UsuariosTablaPage';

export const Usuarios = [
    <Route exact path='/Usuarios' component={TipoDeUsuario} />,
    <Route exact path='/Usuarios/:tipo' component={UsuariosTablaPage} />,
    <Route exact path='/Usuarios/:tipo/registro' component={RegistroPage} />,
    // <Route exact path='/Usuarios/:tipo/:key' component={RegistroPage} />
]