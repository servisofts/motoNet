import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as viajesActions from '../../action/viajesActions'

class Carga extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: false,
            existe: true,
            parser: false
        };
    }

    componentDidMount() { // B
        const delay = ms => new Promise(res => setTimeout(res, ms));
        const yourFunction = async () => {
            await delay(3000);

            if (this.props.state.usuarioReducer.usuarioLog) {
                //si tengo un usuario
                AsyncStorage.getItem("motonet_viaje").then((value) => {
                    if (!value) {
                        this.state.existe = false
                        // this.setState(this.state)
                        this.props.state.navigationReducer.replace("InicioPage");
                        return <View/>
                    } else {
                        this.state.parser = JSON.parse(value)
                        this.props.state.viajesReducer.viaje = this.state.parser
                        this.props.actualizarViaje(this.props.state.viajesReducer.viaje)
                        this.props.state.navigationReducer.replace("ViajeEsperaPage");
                        return <View/>
                    }


                    // this.props.state.navigationReducer.replace("ViajeEsperaPage");
                });

                //falta comprovar si tengo viaje 
                // si no tengo viaje voy a incio
                //si tengo viaje voy a la etapa que corresponda del viaje.
            } else {
                this.props.state.usuarioReducer.estado = ""
                this.props.state.navigationReducer.replace("LoginPage");
            }

            return <View />;
        };

        yourFunction();
    }
    render() {
        return (
            <View >
            </View>
        );
    }
}

const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...viajesActions
});


export default connect(initStates, initActions)(Carga);
