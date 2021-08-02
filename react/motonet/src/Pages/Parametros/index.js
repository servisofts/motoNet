import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import RegistroPage from './RegistroPage';
import ListaPage from './ListaPage';

export const Parametros = [
    < Route exact path='/Parametros' component={ListaPage} />,
    // <Route exact path='/Parametros/Registro' component={RegistroPage} />,
    // <Route exact path='/Parametros/Registro/:key' component={RegistroPage} />

]