import { combineReducers } from 'redux';
import usuarioReducer from './usuarioReducers'
import socketReducer from './socketReducer'
import tipoViajeReducer from './tipoViajeReducer'
import parametrosViajeReducer from './parametrosViajeReducer'
import notificacionReducer from './notificacionReducer'
import tipoTarifaViajeReducer from './tipoTarifaViajeReducer'
import seguimientoConductorReducer from './seguimientoConductorReducer'
import asociacionMotoReducer from './asociacionMotoReducer'
import historialViajeReducer from './historialViajeReducer'
import conductorReducer from './conductorReducer'
import cabeceraDatosReducer from './cabeceraDatosReducer'
import rolReducer from './rolReducer'
import imagePickerReducer from './imagePickerReducer'
import publicidadReducer from './publicidadReducer'
import conductorAsociacionMotoReducer from './conductorAsociacionMotoReducer'


export default combineReducers({
    usuarioReducer,
    socketReducer,
    tipoViajeReducer,
    parametrosViajeReducer,
    notificacionReducer,
    tipoTarifaViajeReducer,
    seguimientoConductorReducer,
    asociacionMotoReducer,
    historialViajeReducer,
    conductorReducer,
    cabeceraDatosReducer,
    rolReducer,
    imagePickerReducer,
    publicidadReducer,
    conductorAsociacionMotoReducer
});