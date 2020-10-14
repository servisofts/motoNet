import { combineReducers } from 'redux';
import usuarioReducer from './usuarioReducers'
import socketReducer from './socketReducer'
import tipoViajeReducer from './tipoViajeReducer'
import parametrosViajeReducer from './parametrosViajeReducer'

export default combineReducers({
    usuarioReducer,
    socketReducer,
    tipoViajeReducer,
    parametrosViajeReducer
});