import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import RegistroPage from './RegistroPage';
import ListaPage from './ListaPage';

export const Viajes = [
    < Route exact path='/Viajes' component={ListaPage} />,
    // <Route exact path='/Viajes/Registro' component={RegistroPage} />,
    // <Route exact path='/Viajes/Registro/:key' component={RegistroPage} />

]