import React, { Component } from 'react';

import { View, Text } from 'react-native';
import { connect } from 'react-redux';


class Carga extends Component {

  constructor(props) {
    super(props);
    this.state = {
        obj:false
    };
  }

  componentDidMount() { // B
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const yourFunction = async () => {
        await delay(3000);
        if (this.props.state.usuarioReducer.usuarioLog) {
            //si tengo un usuario
            if (!this.props.state.viajesReducer.viaje) {
                this.props.state.navigationReducer.replace("InicioPage");
            }
            this.props.state.navigationReducer.replace("ViajeEsperaPage");
            //falta comprovar si tengo viaje 
            // si no tengo viaje voy a incio
            //si tengo viaje voy a la etapa que corresponda del viaje.
        }
        this.props.state.usuarioReducer.estado = ""
        this.props.state.navigationReducer.replace("LoginPage");
        return <View />;
    };
    yourFunction();
  }
  render(){
    return (
        <View >
        </View>
    );
}
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Carga);
