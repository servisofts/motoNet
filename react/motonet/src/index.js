import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//desde aqui se importa
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

//importar reducers
import reducers from './reducers';
import nativeSocket from './_nativeSocket';

import ShowImagePicker from './elementsM/ImagePickerWeb';
import { SComponentClass } from './SComponent';


const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk),
);

//conexion socket con ricky
nativeSocket(store);

export default class AppMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {

    store.dispatch({
      component: 'imagePicker',
      type: 'exito',
      estado: 'exito',
      url: "",
      imagePicker: (calback) => {
        if (calback == false) {
          this.setState({ imagePicker: false, });
          return <div />
        } else {
          this.setState({ imagePicker: true, calback: calback });
          return <div />
        }

      },
    });
  }
  render() {
    return (
      <Provider store={store}>
        <SComponentClass >
          <App />
          {this.state.imagePicker ? (<ShowImagePicker calback={this.state.calback} />) : (<div />)}
        </SComponentClass>
      </Provider>
    );
  }
}

ReactDOM.render(
  <AppMobile />,
  document.getElementById('root')
);
