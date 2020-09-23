import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//desde aqui se importa
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

//importar reducers
import reducers from './reducers';
import nativeSocket from './_nativeSocket';


const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk),
);

//conexion socket con ricky
nativeSocket(store);

ReactDOM.render(
  <Provider store={store}>

      <App />

  </Provider>,
  document.getElementById('root')
);
