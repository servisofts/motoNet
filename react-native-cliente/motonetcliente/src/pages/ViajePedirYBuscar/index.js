import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, ActivityIndicator } from 'react-native';
import BarraSuperior from './BarraSuperior';
import DetalleViaje from './DetalleViaje';
import MapView, { Marker } from 'react-native-maps';
import RutaViaje from './RutaViaje';
import MarkerConductores from './MarkerConductores';
import SThread from '../../SThread';
const delay = ms => new Promise(res => setTimeout(res, ms));

class ViajePedirYBuscar extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);

        this.state = {
        };

    }
    getAllConductores = (dataConductores) => {
        Object.keys(dataConductores).map((key) => {
            var data = dataConductores[key]
            var marketDAta = {
                longitude: data.longitude,
                latitude: data.latitude
            }
            return <MarkerConductores latitude={data.latitude} longitude={data.longitude} />
        })
    }
    getMarker1 = () => {
        if (!this.data.direccionInicio) return <View />
        // console.log(this.state.direccion1)
        return <Marker coordinate={this.data.direccionInicio} />
    }
    getMarker2 = () => {
        if (!this.data.direccionFin) return <View />
        // console.log(this.state.direccion1)
        return <Marker coordinate={this.data.direccionFin} />
    }
    componentDidMount() {
        this.center();
    }
    center = async () => {
        await delay(500);
        if (!this.mapa) return
        this.mapa.fitToCoordinates([this.data.direccionInicio, this.data.direccionFin], {
            edgePadding: {
                top: 300,
                bottom: 500,
                left: 50,
                right: 50,
            },
            animated: true,
        })
    }
    setTiempoDuracion(data) {
        if (
            !this.state.duracion
        ) {
            this.setState({ duracion: data })
            console.log(data);
        }
    }
    getData(force) {
        var reducer = this.props.state.seguimientoConductorReducer;
        var data = reducer.dataConductores;
        if (!data || force) {
            if (reducer.estado == "cargando" && reducer.type == "getAll") return;
            this.props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "seguimientoConductor",
                type: "getAll",
                estado: "cargando"
            }, true);
            return;
        }
        return data;
    }
    hilo() {
        new SThread(5000, "buscandoConductores", true).start(() => {

            this.getData(true)
            this.hilo();
        })
    }
    render() {

        if (this.props.state.viajesReducer.data) {
            console.log("sdsds")

            // console.log("dfdf")
            this.props.navigation.replace("ViajeEsperaPage");
            return <View />
        }
        this.hilo()
        var dataConductores = this.getData()
        if (!dataConductores) {
            return <ActivityIndicator color="#fff" />
        }

        this.data = this.props.navigation.getParam("data");
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#fff",
            }}>
                <BarraSuperior title={this.data.tipo_viaje}
                    estadoBuscando={this.props.state.viajesReducer.estadoBuscando}
                    tipo_viaje={this.data.tipo_viaje}
                    direccion1={this.data.direccionInicio}
                    direccion2={this.data.direccionFin}
                    goBack={() => {
                        this.props.navigation.goBack();
                    }} />
                <View style={{
                    flex: 1,
                }}>
                    <MapView
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
                        {
                            Object.keys(dataConductores).map((key) => {
                                var data = dataConductores[key]
                                var marketDAta = {
                                    longitude: data.longitude,
                                    latitude: data.latitude
                                }
                                return <MarkerConductores latitude={data.latitude} longitude={data.longitude} />
                            })
                        }
                        {this.getMarker1()}
                        {this.getMarker2()}
                        <RutaViaje
                            setTiempoDuracion={(data) => { this.setTiempoDuracion(data) }}
                            direccion1={this.data.direccionInicio}
                            direccion2={this.data.direccionFin}
                        />
                    </MapView>
                    <DetalleViaje tipo_viaje={this.data} duracion={this.state.duracion} />
                </View>
            </View>
        );
    }
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ViajePedirYBuscar);

