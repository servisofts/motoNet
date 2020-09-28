import { combineReducers } from 'redux';
import navigationReducer from './navigationReducer';
import socketClienteReducer from './socketClienteReducer';
import cabeceraDatoReducer from './cabeceraDatoReducer';
import componenteInicioReducer from './componenteInicioReducer';
import naviDrawerReducer from './naviDrawerReducer';
import locationGoogleMapReducer from './locationGoogleMapReducer';
import usuarioReducer from './usuarioReducer';

export default combineReducers({
    navigationReducer,
    socketClienteReducer,
    cabeceraDatoReducer,
    componenteInicioReducer,
    naviDrawerReducer,
    locationGoogleMapReducer,
    usuarioReducer

});