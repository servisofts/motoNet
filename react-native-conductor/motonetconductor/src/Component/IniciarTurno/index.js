import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback, ActivityIndicator, PermissionsAndroid } from 'react-native';
import Svg from '../../Svg';
import Geolocation from '@react-native-community/geolocation';
import * as Permisos from '../../Permisos';
const iniciarTurno = (props) => {

    if (props.state.backgroundLocationReducer.isOpen) {
        return <View />
    }

    useEffect(() => {
        // getPosition();
    }, [])


    const getPosition = () => {
        props.dispatch({
            component: "locationEmergencia",
            type: "Miubicacion",
            estado: "cargando"
        });
        Permisos.requestLocationPermission((value) => {
            if (value) {
                props.dispatch({
                    component: "locationEmergencia",
                    type: "Miubicacion",
                    data: {},
                    estado: "exito"
                });
            } else {
                props.dispatch({
                    component: "locationEmergencia",
                    type: "Miubicacion",
                    estado: "error"
                });
            }
        });
        // Geolocation.setRNConfiguration({ authorizationLevel: 'whenInUse', skipPermissionRequests: false, })
        // Geolocation.getCurrentPosition(
        //     (position) => {
        //         var region = {
        //             ...position.coords,
        //             timestamp: position.timestamp
        //         }
        //         console.log("encontro ubicacion")
        //         props.dispatch({
        //             component: "locationEmergencia",
        //             type: "Miubicacion",
        //             data: region,
        //             estado: "exito"
        //         });
        //     },
        //     (error) => {
        //         props.dispatch({
        //             component: "locationEmergencia",
        //             type: "Miubicacion",
        //             estado: "error"
        //         });
        //         console.log("Obteniendo Ubicacion")
        //         console.log(error);
        //         console.log(error.code, error.message);
        //     },
        //     { enableHighAccuracy: false, timeout: 3000, maximumAge: 1000 }
        // );
        return <View />
    }

    if (props.state.locationEmergenciaReducer.estado == "cargando") {
        return (
            <View style={{
                flex: 1,
                width: "100%",
                height: "100%",
                backgroundColor: "#00000050",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute"
            }}>
                <ActivityIndicator color="#2C4C7E" size="large" />
            </View>
        )
    }

    // if (!props.state.locationEmergenciaReducer.region) {
    if (props.state.locationEmergenciaReducer.estado == "error") {
        console.log("que pasoo")
        return (
            <View style={{
                position: "absolute",
                width: 300,
                height: 250,
                borderRadius: 20,
                backgroundColor: "#2c4b81",
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Svg name={"Sinubicacion"}
                    style={{
                        width: 50,
                        height: 50,
                        fill: "#fff"
                    }} />
                <Text style={{
                    marginTop: 10,
                    color: "#fff",
                    textAlign: "center"
                }}>No encontramos su ubicacion como lo esperamos.</Text>
                <Text style={{
                    textAlign: "center",
                    marginTop: 10,
                    color: "#fff"
                }}>Verifique los permisos de ubicacion o su conexion a internet.</Text>
                <TouchableOpacity style={{
                    width: 100,
                    height: 40,
                    borderWidth: 1,
                    borderRadius: 4,
                    margin: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: "#fff"
                }}
                    onPress={() => {
                        getPosition();
                    }}>
                    <Text style={{
                        color: "#fff"
                    }}>REINTENTAR</Text>
                </TouchableOpacity>
            </View>)
    }

    if (props.state.locationEmergenciaReducer.estado == "exito") {
        props.dispatch({
            component: "locationEmergencia",
            type: "Miubicacion",
            estado: false
        });
        props.state.backgroundLocationReducer.open()
        return <View />
    }

    return (
        <View style={{
            position: "absolute",
            width: "80%",
            height: "50%",
            borderRadius: 20,
            backgroundColor: "#2c4b81",
            alignItems: 'center',
            justifyContent: 'center',
        }}>

            <Text style={{ fontSize: 20, color: "#ccc" }}>
                Bienvenido
            </Text>
            <Text style={{ fontSize: 30, color: "#fff", textAlign: 'center' }}>
                {props.state.usuarioReducer.usuarioDatos["Nombres"].dato}
                {" " + props.state.usuarioReducer.usuarioDatos["Apellidos"].dato}
            </Text>

            <TouchableOpacity
                onPress={() => {
                    // props.state.backgroundLocationReducer.open()
                    getPosition();
                }}
                style={{
                    marginTop: 20,
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    backgroundColor: "#fff",
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text>Iniciar Turno</Text>
            </TouchableOpacity>
        </View>
    )
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(iniciarTurno);