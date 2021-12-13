import React, { useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';
import ListaBusqueda from '../ListaBusqueda';
import * as locationActions from '../../../action/locationActions'
import * as viajesActions from '../../../action/viajesActions'
import Geolocation from '@react-native-community/geolocation';
import HttpConection from '../../../HttpConection';

var secondTextInput;

const BuscadorComponenteMap = (props) => {

    const [data, setData] = React.useState({
        dataUbicacion: false,
        mostrarTexto: false,
        ubicacionActual: props.ubicacionActual || false,
        repuestaInput: false,
        focusInput: false,
        ubicacion: props.state.viajesReducer.ubicacion
    })

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
                <TouchableOpacity style={{
                    // backgroundColor: "#fff",
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: "90%",
                    borderColor: "#fff",
                    borderWidth: 2,
                    borderRadius: 5,
                    height: 40,
                    marginBottom: 5
                }} onPress={() => {
                    props.state.viajesReducer.ubicacion.fin.estado = false
                    props.state.viajesReducer.ubicacion.inicio.estado = true
                    actualizarUbicacion()
                }}>
                    <View style={{
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor:"#ccc"
                    }}>
                        <Svg name={"MarkerW"}
                            style={{
                                width: 20,
                                height: 20,
                                fill: "#fff"
                            }} />
                    </View>

                    <Text style={{
                        flex: 1,
                        fontSize: 10,
                        alignItems: 'center',
                        height: "100%",
                        fontSize: 13,
                        color: "#fff",
                        // paddingLeft: 10,
                        // backgroundColor:"#ccc"
                    }}
                    // onFocus={() => {
                    //     props.state.viajesReducer.ubicacion.fin.estado = false
                    //     props.state.viajesReducer.ubicacion.inicio.estado = true
                    //     actualizarUbicacion()
                    // }}
                    // placeholder={"Calle"}
                    // value = {props.state.viajesReducer.ubicacion.inicio.value}
                    onChangeText={(texto) => hanlechage(texto)}
                    >
                        {props.state.viajesReducer.ubicacion.inicio.value}
                    </Text>
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
                            }}>
                            <Svg name="Cerrar"
                                style={{
                                    width: 20,
                                    height: 20,
                                    fill: "#000000"
                                }} />
                        </TouchableOpacity> */}
                </TouchableOpacity>

                <TouchableOpacity style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: "90%",
                    borderColor: "#fff",
                    borderWidth: 2,
                    borderRadius: 5,
                    height: 40,
                }} onPress={() => {
                    props.state.viajesReducer.ubicacion.fin.estado = true
                    props.state.viajesReducer.ubicacion.inicio.estado = false
                    actualizarUbicacion()
                    props.setVentanaBusqueda(true)
                }} >
                    <View style={{
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor:"#ccc"
                    }}>
                        <Svg name={"Pointer"}
                            style={{
                                width: 20,
                                height: 20,
                                fill: "#fff"
                            }} />
                    </View>

                    <View style={{
                        flex: 1,
                        // alignItems: 'center',
                        justifyContent: "center",
                        height: "100%",
                    }}>
                        <Text style={{
                            fontSize: 13,
                            color: "#fff",
                        }}>
                            {props.state.viajesReducer.ubicacion.fin.value}
                        </Text>
                    </View>
                </TouchableOpacity>
                {/* <ListaBusqueda onchage={hanlechageLista} /> */}
            </View >
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
            
            HttpConection.sendJson({
                component: "locationGoogle",
                type: "autoComplete",
                data: {
                    direccion: text,
                    ...data.ubicacionActual
                },
                estado: "cargando"
            });
        });
    }  

    return (
        <View>
            {buscarInputNuevo()}
        </View>
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