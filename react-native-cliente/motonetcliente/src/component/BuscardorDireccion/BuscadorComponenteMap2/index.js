import React, { useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';
import ListaBusqueda from '../ListaBusqueda';
import * as locationActions from '../../../action/locationActions'
import * as viajesActions from '../../../action/viajesActions'
import Geolocation from '@react-native-community/geolocation';

var secondTextInput;
const valor_menor = -200;

const BuscadorComponenteMap = (props) => {

    const [data, setData] = React.useState({
        dataUbicacion: false,
        mostrarTexto: false,
        ubicacionActual: props.ubicacionActual || false,
        repuestaInput: false,
        focusInput: false,
        ubicacion: props.state.viajesReducer.ubicacion
    })

    const [isVisible, setIsVisible] = React.useState(false);
    const fadeAnim = useRef(new Animated.Value(valor_menor)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: valor_menor,
            duration: 500,
        }).start(() => {
            if (fadeAnim._value < valor_menor + 100) {
                if (isVisible) {
                    setIsVisible(false);
                }
            }
        });
    };

    if (props.ventanaSelect != "tipoDeViaje") {
        if (isVisible == true) {
            fadeOut();
        }
    } else {
        if (!isVisible) {
            fadeIn();
            setIsVisible(true)
        }
    }
    if (!isVisible) {
        return <View />
    }


    const actualizarUbicacion = () => {
        props.dispatch({
            component: "viaje",
            type: "actualizarUbicacion",
            data: props.state.viajesReducer.ubicacion,
            estado: "exito"
        })
        return <View />
    }

    if (props.state.locationGoogleMapReducer.estado === "exito") {
        props.state.locationGoogleMapReducer.estado = ""
        if (props.state.locationGoogleMapReducer.type === "autoComplete") {
            if (props.state.viajesReducer.ubicacion.inicio.estado) {
                props.state.viajesReducer.ubicacion.inicio.value = props.state.locationGoogleMapReducer.data.direccion
                props.state.viajesReducer.ubicacion.inicio.data = props.state.locationGoogleMapReducer.data
            }
            if (props.state.viajesReducer.ubicacion.fin.estado) {
                props.state.viajesReducer.ubicacion.fin.data = props.state.locationGoogleMapReducer.data
                props.state.viajesReducer.ubicacion.fin.value = props.state.locationGoogleMapReducer.data.direccion
            }
            actualizarUbicacion()
        }

        if (props.state.locationGoogleMapReducer.type === "geocode") {
            if (props.state.viajesReducer.ubicacion.inicio.estado) {
                props.state.viajesReducer.ubicacion.inicio.value = props.state.locationGoogleMapReducer.data.direccion
                props.state.viajesReducer.ubicacion.inicio.data = props.state.locationGoogleMapReducer.data
                // props.setMarkerOrigen(props.state.locationGoogleMapReducer.data)
            }
            if (props.state.viajesReducer.ubicacion.fin.estado) {
                props.state.viajesReducer.ubicacion.fin.data = props.state.locationGoogleMapReducer.data
                props.state.viajesReducer.ubicacion.fin.value = props.state.locationGoogleMapReducer.data.direccion
                props.state.locationGoogleMapReducer.markerUbicacionFin = props.state.locationGoogleMapReducer.data
                // props.setMarkerFin(props.state.locationGoogleMapReducer.data)
            }
            actualizarUbicacion()
        }
    }

    const buscarInputNuevo = () => {
        return (
            <View style={{
                flexDirection: 'column',
                width: "100%",
                alignItems: 'center',
                // backgroundColor:"#ccc"
            }}>
                <View style={{
                    backgroundColor: "#fff",
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: "90%",
                    borderRadius: 20,
                    height: 40,
                    marginBottom: 5
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "#f00",
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        height: "100%"
                    }}>
                        <Text style={{ color: "#fff" }}>
                            Inicio
                        </Text>
                    </View>
                    <View style={{
                        width: "80%",
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        height: "100%",
                    }}>
                        <TextInput style={{
                            flex: 1,
                            fontSize: 10,
                            alignItems: 'center',
                            height: "100%",
                            paddingLeft: 10
                        }}
                            onFocus={() => {
                                props.state.viajesReducer.ubicacion.fin.estado = false
                                props.state.viajesReducer.ubicacion.inicio.estado = true
                                actualizarUbicacion()
                            }}
                            placeholder={"Calle"}
                            value={props.state.viajesReducer.ubicacion.inicio.value}
                            onChangeText={(texto) => hanlechage(texto)}
                        />

                        {/* <TouchableOpacity style={{
                            marginEnd: 10,
                            marginStart: 10,
                        }}
                            onPress={() => {
                                props.state.viajesReducer.ubicacion.fin.estado = false
                                props.state.viajesReducer.ubicacion.inicio.estado = true
                                props.state.viajesReducer.ubicacion.inicio.value = ""
                                props.state.viajesReducer.ubicacion.inicio.data = false
                                actualizarUbicacion()
                            }}
                        >
                            <Svg name="Cerrar"
                                style={{
                                    width: 20,
                                    height: 20,
                                    fill: "#000000"
                                }} />
                        </TouchableOpacity> */}
                    </View>
                </View>


                <View style={{
                    backgroundColor: "#fff",
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: "90%",
                    borderRadius: 20,
                    height: 40,
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "#f00",
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                        height: "100%"
                    }}>
                        <Text style={{ color: "#fff" }}>
                            Fin
                        </Text>
                    </View>
                    <View style={{
                        width: "80%",
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        height: "100%",
                    }}>
                        <TextInput style={{
                            flex: 1,
                            fontSize: 10,
                            alignItems: 'center',
                            height: "100%",
                            paddingLeft: 10
                        }}
                            onFocus={() => {
                                props.state.viajesReducer.ubicacion.fin.estado = true
                                props.state.viajesReducer.ubicacion.inicio.estado = false
                                actualizarUbicacion()
                            }}
                            placeholder={"Calle"}
                            value={props.state.viajesReducer.ubicacion.fin.value}
                            onChangeText={(texto) => hanlechage(texto)}
                        />

                        {/* <TouchableOpacity style={{
                            marginEnd: 10,
                            marginStart: 10,
                        }}
                            onPress={() => {
                                props.state.viajesReducer.ubicacion.fin.estado = true
                                props.state.viajesReducer.ubicacion.fin.data = ""
                                props.state.viajesReducer.ubicacion.inicio.estado = false
                                props.state.viajesReducer.ubicacion.fin.value = ""
                                actualizarUbicacion()
                            }}
                        >
                            <Svg name="Cerrar"
                                style={{
                                    width: 20,
                                    height: 20,
                                    fill: "#000000"
                                }} />
                        </TouchableOpacity> */}
                    </View>
                </View>
                <ListaBusqueda onchage={hanlechageLista} />
            </View>
        )
    }

    const hanlechageLista = (obj) => {
        peticion(obj.direccion)
        return <View />
    };

    const peticion = (text) => {
        Geolocation.getCurrentPosition((info) => {
            data.ubicacionActual = {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            }
            var direccions = false

            props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "locationGoogle",
                type: "autoComplete",
                data: {
                    direccion: text,
                    ...data.ubicacionActual
                },
                estado: "cargando"
            }, true);
        });
    }


    const hanlechage = (text) => {
        if (text.length > 5) {
            if (props.state.viajesReducer.ubicacion.inicio.estado) {
                props.state.viajesReducer.ubicacion.inicio.value = text
            }
            if (props.state.viajesReducer.ubicacion.fin.estado) {
                props.state.viajesReducer.ubicacion.fin.value = text
            }
            actualizarUbicacion()
            peticion(text)
        }
        if (props.state.viajesReducer.ubicacion.inicio.estado) {
            props.state.viajesReducer.ubicacion.inicio.value = text

        }
        if (props.state.viajesReducer.ubicacion.fin.estado) {
            props.state.viajesReducer.ubicacion.fin.value = text

        }
        actualizarUbicacion()
        return <View />
    };

    return (
        <Animated.View style={{
            width: "100%",
            alignItems: 'center',
            justifyContent: 'space-evenly',
            position: "absolute",
            top: fadeAnim,
            flexDirection: 'column',
            // height: 200,
            marginTop: 50,
            // backgroundColor: "#ccc"
        }}>
            {buscarInputNuevo()}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    buscar: {
        width: 300,
        height: 40,
        borderColor: "#00000022",
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: "#FFF",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    touchableOpacity: {
        width: 150,
        height: 50,
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        borderRadius: 10,
        bottom: 10
    },
    touchableOpacity2: {
        width: 150,
        height: 50,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        borderRadius: 10,
        bottom: 10
    },

});
const initActions = ({
    ...locationActions,
    ...viajesActions
});
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(BuscadorComponenteMap);