import { combineReducers } from 'redux';
import usuarioReducer from './usuarioReducers'
import socketReducer from './socketReducer'
import tipoViajeReducer from './tipoViajeReducer'

export default combineReducers({
    usuarioReducer,
    socketReducer,
    tipoViajeReducer
});