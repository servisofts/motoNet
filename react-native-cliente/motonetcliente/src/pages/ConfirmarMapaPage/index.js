import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Alert, AsyncStorage } from 'react-native';
// import Svg from '../../Svg';
// import MapaViaje from '../../component/MapaViaje';
// import CancelarViaje from '../../component/InicioViajeComponent/CancelarViaje';
// import AppParams from "../../Json"
// import EstadoViaje from '../../component/InicioViajeComponent/EstadoViaje';
// import { stat } from 'react-native-fs';
import Geolocation from '@react-native-community/geolocation';
import MapaAux from '../../component/MapaAux';
import Svg from '../../Svg';

class ConfirmarMapaPage extends Component {

    static navigationOptions = {
        headerShown: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            abrirModal: false
        }
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(
            (position) => {
                // if (!this.state.region) {
                //     return <View />
                // }
                // if (data.region.isRender) {
                //     return <View />
                // }
                var region = {
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                }
                this.props.dispatch({
                    component: "locationEmergencia",
                    type: "Miubicacion",
                    data: region,
                });
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
                throw error;
            },
        );
    }
    render() {

        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <MapaAux />
                <TouchableOpacity
                    // onPress={() => this.props.navigation.goBack()}
                    style={{
                        width: "100%",
                        height: 50,
                        position: "absolute",
                        bottom: 5,
                        justifyContent: "center",
                        alignItems: 'center',
                        backgroundColor: "#929292"
                    }}>
                    <Text>
                        Confirmar
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={{
                        width: 50,
                        height: 50,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        justifyContent: "center",
                        alignItems: 'center',
                        // backgroundColor: "#000"
                    }}>
                    <Svg name="Close"
                        style={{
                            width: 25,
                            height: 25,
                            fill: "#000"
                        }} />
                </TouchableOpacity>

            </View >
        )
    }
}


const initStates = (state) => {
    return { state }
};


export default connect(initStates)(ConfirmarMapaPage);
