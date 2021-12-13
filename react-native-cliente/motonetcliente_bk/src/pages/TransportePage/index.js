import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BarraSuperiorTransporte from './BarraSuperiorTransporte';
import MapView, { Marker } from 'react-native-maps';
import RutaViaje from './RutaViaje';
import TipoDeViaje from './TipoDeViaje';
export default class TransportePage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: -17.7799998333333332,
                longitude: -63.180598333333336,
                latitudeDelta: 0.07,
                longitudeDelta: 0.07,
            },
            direccion1: false,
            direccion2: false,
        };
    }

    getMarker1 = () => {
        if (!this.state.direccion1) return <View />
        // console.log(this.state.direccion1)
        return <Marker coordinate={this.state.direccion1} />
    }
    getMarker2 = () => {
        if (!this.state.direccion2) return <View />
        // console.log(this.state.direccion1)
        return <Marker coordinate={this.state.direccion2} />
    }

    ruta = () => {

    }
    pedirViaje = (tipoSelect) => {
        var tipo = tipoSelect;
        if (!this.state.direccion1) return <View />
        if (!this.state.direccion2) return <View />
        var OBJ = {
            tipo_viaje: "transporte",
            tipo: tipoSelect,
            direccionInicio: this.state.direccion1,
            direccionFin: this.state.direccion2
        }
        this.props.navigation.navigate("ViajePedirYBuscar", {
            data: OBJ
        });
    }
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#fff",
            }}>
                <BarraSuperiorTransporte
                    ref={(ref) => { this.barra = ref }}
                    title={"Transporte"}
                    navigation={this.props.navigation}
                    goBack={() => { this.props.navigation.goBack() }}
                    onChangeDir1={(direccion) => {
                        console.log("cambio dir 1")
                        console.log(direccion)
                        this.setState({ direccion1: direccion })
                    }}
                    onChangeDir2={(direccion) => {
                        console.log("cambio dir 2")
                        console.log(direccion)
                        this.setState({ direccion2: direccion })
                    }}
                />
                <View style={{
                    flex: 1,
                }}>
                    <MapView
                        style={{
                            width: "100%",
                            flex: 1,
                        }}
                        initialRegion={this.state.region}>
                        {this.getMarker1()}
                        {this.getMarker2()}
                        <RutaViaje
                            direccion1={this.state.direccion1}
                            direccion2={this.state.direccion2}
                        />
                    </MapView>
                    <TipoDeViaje pedir={(tipo) => {
                        this.pedirViaje(tipo);
                    }}
                        dir1={this.state.direccion1}
                        dir2={this.state.direccion2}
                    />
                </View>
            </View>
        );
    }
}
