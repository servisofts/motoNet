import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text } from 'react-native';
import BarraSuperior from './BarraSuperior';
import DetalleViaje from './DetalleViaje';
import Svg from '../../Svg';
import STheme from '../../STheme';
import ModalOferta from './ModalOferta';
// import MapView, { Marker } from 'react-native-maps';
// import RutaViaje from './RutaViaje';
const delay = ms => new Promise(res => setTimeout(res, ms));

class ViajeEsperaPage extends Component {

    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    setTiempoDuracion(data) {
        if (
            !this.state.duracion
        ) {
            this.setState({ duracion: data })
            console.log(data);
        }
    }

    getConductorOferta = () => {
        if (this.props.state.viajesReducer.data.movimientos["negociacion_conductor"]) {
            console.log(this.props.state.viajesReducer.data.movimientos["negociacion_conductor"])
            // this.props.navigation.replace("ServicioPage");
            return (
                <ModalOferta data={this.props.state.viajesReducer.data.movimientos["negociacion_conductor"]} />
            )
        }
        // console.log("dsd")
    }

    render() {

        if (this.props.state.viajesReducer.data.movimientos["inicio_viaje"]) {
            this.props.navigation.replace("InicioViajePage");
            return <View />
        }


        if (!this.props.state.viajesReducer.data) {
            this.props.navigation.replace("ServicioPage");
            return <View />
        }

        this.data = this.props.navigation.getParam("data");

        return (
            <View style={{
                flex: 1,
                backgroundColor: "#fff",
            }}>
                <BarraSuperior
                    data={this.props.state.viajesReducer.data}
                />
                <View style={{
                    flex: 1,
                    backgroundColor: "#f00",
                    // justifyContent:"center",
                    paddingTop: 50,
                    alignItems: "center",
                    backgroundColor: STheme.color.background,
                }}>
                    <Svg name={"logoCompletoRecurso"}
                        style={{
                            width: 200,
                            height: 200,
                            fill: "#fff"
                        }} />
                    <DetalleViaje />
                </View>

                {this.getConductorOferta()}
                {/* <ModalOferta /> */}

            </View>
        );
    }
}


const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ViajeEsperaPage);

