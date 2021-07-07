import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text } from 'react-native';
import BarraSuperior from './BarraSuperior';
import DetalleViaje from './DetalleViaje';
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
    // getMarker1 = () => {
    //     if (!this.data.direccionInicio) return <View />
    //     // console.log(this.state.direccion1)
    //     return <Marker coordinate={this.data.direccionInicio} />
    // }
    // getMarker2 = () => {
    //     if (!this.data.direccionFin) return <View />
    //     // console.log(this.state.direccion1)
    //     return <Marker coordinate={this.data.direccionFin} />
    // }
    // componentDidMount() {
    //     this.center();
    // }
    // center = async () => {
    //     await delay(500);
    //     this.mapa.fitToCoordinates([this.data.direccionInicio, this.data.direccionFin], {
    //         edgePadding: {
    //             top: 300,
    //             bottom: 500,
    //             left: 50,
    //             right: 50,
    //         },
    //         animated: true,
    //     })
    // }

    setTiempoDuracion(data) {
        if (
            !this.state.duracion
        ) {
            this.setState({ duracion: data })
            console.log(data);
        }
    }

    render() {

        if (!this.props.state.viajesReducer.data) {
            // console.log("dfdf")
            this.props.navigation.replace("ServicioPage");
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
                    backgroundColor: "#f00"
                }}>
                    {/* <MapView
                        style={{
                            width: "100%",
                            flex: 1,
                        }}
                        ref={(ref) => { this.mapa = ref }}
                        onMapReady={() => {
                            this.center();
                        }}
                        initialRegion={{
                            latitude: this.data.direccionInicio.latitude,
                            longitude: this.data.direccionInicio.longitude,
                            latitudeDelta: 0.03,
                            longitudeDelta: 0.03,

                        }}>
                        {this.getMarker1()}
                        {this.getMarker2()}
                        <RutaViaje
                            setTiempoDuracion={(data) => { this.setTiempoDuracion(data) }}
                            direccion1={this.data.direccionInicio}
                            direccion2={this.data.direccionFin}
                        /> */}
                    {/* </MapView> */}
                    <DetalleViaje />
                </View>
            </View>
        );
    }
}


const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ViajeEsperaPage);

