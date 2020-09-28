import { combineReducers } from 'redux';
import usuarioReducer from './usuarioReducers'
import socketReducer from './socketReducer'
import conductoresReducer from './conductoresReducer'

export default combineReducers({
    usuarioReducer,
    socketReducer,
    conductoresReducer
});