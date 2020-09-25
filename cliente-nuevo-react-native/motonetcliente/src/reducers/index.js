import { combineReducers } from 'redux';
import navigationReducer from './navigationReducer';
import socketClienteReducer from './socketClienteReducer';
import cabeceraDatoReducer from './cabeceraDatoReducer';

export default combineReducers({
    navigationReducer,
    socketClienteReducer,
    cabeceraDatoReducer,

});