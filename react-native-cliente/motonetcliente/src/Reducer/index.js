import { combineReducers } from 'redux';
import navigationReducer from './navigationReducer';
import socketClienteReducer from './socketClienteReducer';
import usuarioReducer from './usuarioReducer';
import cabeceraDatoReducer from './cabeceraDatoReducer';
import especialidadReducer from './especialidadReducer';
import emergenciaReducer from './emergenciaReducer'
import doctorEspecialidadReducer from './doctorEspecialidadReducer'
import doctorReducer from './doctorReducer'
import naviDrawerReducer from './naviDrawerReducer'
import horarioAtencionReducer from './horarioAtencionReducer'
import tipoConsultaDoctorReducer from './tipoConsultaDoctorReducer'
import tipoConsultaReducer from './tipoConsultaReducer'
import consultaReducer from './consultaReducer'
import posicionConductorReducer from './posicionConductorReducer'
import farmaciaReducer from './farmaciaReducer'
import analisisReducer from './analisisReducer'
import seguroReducer from './seguroReducer'
import ordenReducer from './ordenReducer'
import laboratorioReducer from './laboratorioReducer'
import locationGoogleReducer from './locationGoogleReducer'
import locationEmergenciaReducer from './locationEmergenciaReducer'
import locationGoogleMapReducer from './locationGoogleMapReducer'
import publicidadReducer from './publicidadReducer'

import tipoViajesReducer from './tipoViajesReducer';
import viajesReducer from './viajesReducer';

export default combineReducers({
    navigationReducer,
    socketClienteReducer,
    usuarioReducer,
    cabeceraDatoReducer,
    especialidadReducer,
    emergenciaReducer,
    doctorEspecialidadReducer,
    doctorReducer,
    naviDrawerReducer,
    horarioAtencionReducer,
    tipoConsultaDoctorReducer,
    tipoConsultaReducer,
    consultaReducer,
    posicionConductorReducer,
    farmaciaReducer,
    analisisReducer,
    seguroReducer,
    ordenReducer,
    laboratorioReducer,
    locationGoogleReducer,
    locationEmergenciaReducer,
    locationGoogleMapReducer,
    publicidadReducer,
    tipoViajesReducer,
    viajesReducer,
});