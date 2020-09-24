import { combineReducers } from 'redux';
import usuarioReducer from './usuarioReducers'
import socketReducer from './socketReducer'

export default combineReducers({
    usuarioReducer,
    socketReducer,
   
});