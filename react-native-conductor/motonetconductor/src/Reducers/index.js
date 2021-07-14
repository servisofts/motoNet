import { combineReducers } from 'redux';
import navigationReducer from './navigationReducer';
import certificadoReducer from './certificadoReducer';
import calendarioReducer from './calendarioReducer';
import popupCalendarioReducer from './popupCalendarioReducer';
import mapaReducer from './mapaReducer';
import naviDrawerReducer from './naviDrawerReducer';
import modeloComponenteReducer from './modeloComponenteReducer';
import locationReducer from './locationReducer';
import socketClienteReducer from './socketClienteReducer';
import usuarioReducer from './usuarioReducer';
import locationGoogleReducer from './locationGoogleReducer';
import cabeceraDatoReducer from './cabeceraDatoReducer';
import backgroundLocationReducer from './backgroundLocationReducer';
import componenteInicioReducer from './componenteInicioReducer';
import ViajeReducer from './ViajeReducer';
import socketTestReducer from './socketTestReducer';
import locationEmergenciaReducer from './locationEmergenciaReducer';
import imageReducer from './imageReducer';

export default combineReducers({
    navigationReducer,
    certificadoReducer,
    calendarioReducer,
    popupCalendarioReducer,
    mapaReducer,
    backgroundLocationReducer,
    naviDrawerReducer,
    modeloComponenteReducer,
    locationReducer,
    socketClienteReducer,
    usuarioReducer,
    locationGoogleReducer,
    cabeceraDatoReducer,
    componenteInicioReducer,
    ViajeReducer,
    socketTestReducer,
    locationEmergenciaReducer,
    imageReducer

});