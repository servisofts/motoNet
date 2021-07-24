import { combineReducers } from 'redux';
import navigationReducer from './navigationReducer';
import socketClienteReducer from './socketClienteReducer';
import usuarioReducer from './usuarioReducer';
import cabeceraDatoReducer from './cabeceraDatoReducer';
import naviDrawerReducer from './naviDrawerReducer'
import posicionConductorReducer from './posicionConductorReducer'
import locationGoogleReducer from './locationGoogleReducer'
import locationEmergenciaReducer from './locationEmergenciaReducer'
import emergenciaReducer from './emergenciaReducer'
import locationGoogleMapReducer from './locationGoogleMapReducer'
import publicidadReducer from './publicidadReducer'
import tipoViajesReducer from './tipoViajesReducer';
import viajesReducer from './viajesReducer';
import mensajeReducer from './mensajeReducer';
import imageReducer from './imageReducer';
import historialViajeReducer from './historialViajeReducer';

export default combineReducers({
    navigationReducer,
    socketClienteReducer,
    usuarioReducer,
    cabeceraDatoReducer,
    emergenciaReducer,
    naviDrawerReducer,
    posicionConductorReducer,
    locationGoogleReducer,
    locationEmergenciaReducer,
    locationGoogleMapReducer,
    publicidadReducer,
    tipoViajesReducer,
    viajesReducer,
    mensajeReducer,
    imageReducer,
    historialViajeReducer

});