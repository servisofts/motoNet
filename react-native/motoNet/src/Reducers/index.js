import { combineReducers } from 'redux';
import navigationReducer from './navigationReducer';
import consoleReducer from './consoleReducer';
import certificadoReducer from './certificadoReducer';
import calendarioReducer from './calendarioReducer';
import popupCalendarioReducer from './popupCalendarioReducer';
import mapaReducer from './mapaReducer';
import naviDrawerReducer from './naviDrawerReducer';
import modeloComponenteReducer from './modeloComponenteReducer';
import locationReducer from './locationReducer';
import socketClienteReducer from './socketClienteReducer';
import usuarioReducer from './usuarioReducer';
import locationGoogleMapReducer from './locationGoogleMapReducer';
import cabeceraDatoReducer from './cabeceraDatoReducer';
export default combineReducers({
    navigationReducer,
    consoleReducer,
    certificadoReducer,
    calendarioReducer,
    popupCalendarioReducer,
    mapaReducer,
    naviDrawerReducer,
    modeloComponenteReducer,
    locationReducer,
    socketClienteReducer,
    usuarioReducer,
    locationGoogleMapReducer,
    cabeceraDatoReducer
});