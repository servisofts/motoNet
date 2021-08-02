import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import RegistroPage from './RegistroPage';
import ListaPage from './ListaPage';

export const Tarifas = [
    < Route exact path='/Tarifas' component={ListaPage} />,
    <Route exact path='/Tarifas/Registro' component={RegistroPage} />,
    <Route exact path='/Tarifas/Registro/:key' component={RegistroPage} />

]