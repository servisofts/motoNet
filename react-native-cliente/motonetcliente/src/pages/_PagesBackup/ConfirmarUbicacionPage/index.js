import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, TouchableOpacity, View, PermissionsAndroid, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Mapa from '../../component/BuscardorDireccion/Mapa';
import MarkerMedio from '../../component/BuscardorDireccion/MarkerMedio';
import ButtonAceptarMap from '../../component/BuscardorDireccion/ButtonAceptarMap';
import BuscadorComponenteMap from '../../component/BuscardorDireccion/BuscadorComponenteMap';
import Geolocation from '@react-native-community/geolocation';
import Svg from '../../Svg';
class ConfirmarUbicacionPage extends Component {

    constructor(props) {
        super(props);
    }

    getPosition = () => {
        this.props.dispatch({
            component: "locationEmergencia",
            type: "Miubicacion",
            estado: "cargando"
        });
        Geolocation.setRNConfiguration({ authorizationLevel: 'whenInUse', skipPermissionRequests: false, })
        Geolocation.getCurrentPosition(
            (position) => {
                // if (!this.state.region) {
                //     return <View />
                // }
                // if (data.region.isRender) {
                //     return <View />
                // }
                var region = {
                    ...position.coords,
                    timestamp: position.timestamp
                }
                // console.log("encontro ubicacion")
                this.props.dispatch({
                    component: "locationEmergencia",
                    type: "Miubicacion",
                    data: region,
                    estado: "exito"
                });                
            },
            (error) => {
                this.props.dispatch({
                    component: "locationEmergencia",
                    type: "Miubicacion",
                    estado: "error"
                });
                console.log("Obteniendo Ubicacion")
                console.log(error);
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );
    }

    componentDidMount() {
        if (!this.props.state.locationEmergenciaReducer.region) {
            this.getPosition();
        }
    }

    render() {

        if (this.props.state.locationEmergenciaReducer.estado == "cargando") {
            return (
                <View style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#EDEDED",
                    justifyContent: "center",
                    alignItems: "center",

                }}>
                    <View style={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        // backgroundColor: "#0000000",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <ActivityIndicator color="#2C4C7E" size="large" />
                    </View>

                </View>
            )
        }

        if (!this.props.state.locationEmergenciaReducer.region) {
            return (
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: "center",
                    }}>
                    <Svg name={"Sinubicacion"} style={{ width: 100, height: 100, fill: "#666" }} />
                    <Text style={{ marginTop: 10, }}>Porfavor active su ubicacion.</Text>
                    <TouchableOpacity style={{
                        width: 100,
                        height: 40,
                        borderWidth: 1,
                        borderRadius: 4,
                        margin: 10,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                        onPress={() => {
                            this.getPosition();
                        }}>
                        <Text>REINTENTAR</Text>
                    </TouchableOpacity>
                </View>)
        }
        const getContenido = () => {
            return (
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: "center",
                    }}>
                    <Mapa navigation={this.props.navigation} />
                    <MarkerMedio navigation={this.props.navigation} />
                    <BuscadorComponenteMap navigation={this.props.navigation} />
                    <ButtonAceptarMap navigation={this.props.navigation} />
                </View>
            )
        }
        return (
            <View style={{
                flex: 1,
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <View style={{
                    flex: 1,
                    // backgroundColor: "#fff",
                    width: "100%"
                }}>

                    {getContenido()}
                </View>
            </View>
        )
    }
};

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ConfirmarUbicacionPage);
