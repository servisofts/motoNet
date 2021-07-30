import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import RegistroPage from './RegistroPage';
import ListaPage from './ListaPage';

export const Asociacion = [
    < Route exact path='/Asociaciones' component={ListaPage} />,
    <Route exact path='/Asociaciones/Registro' component={RegistroPage} />,
    <Route exact path='/Asociaciones/Registro/:key' component={RegistroPage} />

]