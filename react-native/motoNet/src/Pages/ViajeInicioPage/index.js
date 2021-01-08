import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Text, AsyncStorage, Alert } from 'react-native';
import Svg from '../../Svg';
import RutaViaje from './RutaViaje';
import EstadoViaje from './EstadoViaje';
import ConductorLlego from './ConductorLlego';
import IniciarViaje from './IniciarViaje';
import CancelarViaje from './CancelarViaje';
import TerminarViaje from './TerminarViaje';
import CobrarViaje from './CobrarViaje';

var mapa;

const ViajeInicioPage = (props) => {
    const [zoom, setZoom] = React.useState(false);
    const [currentPos, setCurrentPos] = React.useState(false);
    const [region, setRegion] = React.useState({
        latitude: -17.7799998333333332,
        longitude: -63.180598333333336,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
    });
    console.log(props.navigation)
    if (!zoom) {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        const yourFunction = async () => {
            await delay(1500);
            //zoomin(currentPos)
        };
        yourFunction();
    }

    const markerClick = (obj) => {
        console.log(obj);
        if (!zoom)
            zoomin(obj);
        else
            zoomout(obj);
    }


    const zoomin = (obj) => {
        obj = currentPos;

        obj = {
            latitude: obj.latitude,
            longitude: obj.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }
        mapa.animateToRegion(obj, 2000);
        setZoom(true);
        return <View />
    }

    const zoomout = (obj) => {
        obj = {
            latitude: obj.latitude,
            longitude: obj.longitude,
            latitudeDelta: 17,
            longitudeDelta: 17
        }
        mapa.animateToRegion(obj, 3000);
        setZoom(false);
    }


    const Cancelar = () => {
        props.state.socketClienteReducer.sessiones["motonet"].send({
            component: "viaje",
            type: "cancelarViajeConductor",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            key_viaje: props.state.ViajeReducer.data.key,
            estado: "cargando"
        }, true);
        // AsyncStorage.removeItem("motonet_viaje");
        // props.state.ViajeReducer.data= false;
        // props.navigation.replace("CargaPage");    
        return <View />
    }

    const cancelarViaje = () => {
        if (!props.state.ViajeReducer.data) {
            return <View />
        }
        if (props.state.ViajeReducer.data.estado == 0) {
            return <View />
        }
        if (props.state.ViajeReducer.data.movimientos["inicio_ruta"]) {
            return <View />
        }
        if (props.state.ViajeReducer.data.movimientos["conductor_cobro_viaje"]) {
            return <View />
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    // this.Cancelar()
                    Alert.alert(
                        "Alerta",
                        "Al aceptar la cancelación, puede que tenga un costo",
                        [
                            {
                                text: "Cancelar",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            {
                                text: "Aceptar",
                                onPress: () => Cancelar()
                            }
                        ],
                        { cancelable: false }
                    );
                }}
                style={{
                    width: "90%",
                    height: 50,
                    position: "absolute",
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "#f00",
                    bottom: 30,
                    borderRadius: 10
                }} >
                <Text style={{
                    color: "#fff"
                }}>
                    CANCELAR VIAJE
            </Text>
            </TouchableOpacity>)
    }
    return (
        <View style={{
            justifyContent: "center",
            alignItems: "center"
        }}>
            <MapView
                showsUserLocation={true}
                style={styles.map}
                initialRegion={region}
                ref={map => { mapa = map }}
                provider={PROVIDER_GOOGLE}
                customMapStyle={[
                    {
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#fff0f0"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "elementType": "labels",
                        "stylers": [
                            {
                                "color": "#ff0000"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#401717"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ff0000"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#b30000"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#757575"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#15a3c6"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#2faee4"
                            }
                        ]
                    }
                ]}
            >
                <RutaViaje />
            </MapView>
            <CancelarViaje navigation={props.navigation} />
            <EstadoViaje />
            <IniciarViaje />
            <TerminarViaje />
            <ConductorLlego />
            <CobrarViaje />
            {cancelarViaje()}

        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: "100%",
    },
});

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ViajeInicioPage);
