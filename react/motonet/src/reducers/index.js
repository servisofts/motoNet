import { combineReducers } from 'redux';
import usuarioReducer from './usuarioReducers'
import socketReducer from './socketReducer'
import tipoViajeReducer from './tipoViajeReducer'
import parametrosViajeReducer from './parametrosViajeReducer'
import notificacionReducer from './notificacionReducer'
import tipoTarifaViajeReducer from './tipoTarifaViajeReducer'
import seguimientoConductorReducer from './seguimientoConductorReducer'

export default combineReducers({
    usuarioReducer,
    socketReducer,
    tipoViajeReducer,
    parametrosViajeReducer,
    notificacionReducer,
    tipoTarifaViajeReducer,
    seguimientoConductorReducer
});