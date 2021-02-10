import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';
import { NavigationApps, actions, googleMapsTravelModes, mapsTravelModes } from "react-native-navigation-apps";

const EstadoViaje = (props) => {

    var mensaje = false;

    if (!props.state.ViajeReducer.data) {
        return <View />
    }

    if (props.state.ViajeReducer.data.movimientos["acepto_conductor"]) {
        mensaje = "Dirijete a recojer al paciente."
    }

    if (props.state.ViajeReducer.data.movimientos["ambulancia_cerca"]) {
        mensaje = "Ya estas llegando."
    }
    if (props.state.ViajeReducer.data.movimientos["conductor_llego_destino"]) {
        mensaje = "Espera a el cliente. Recuerda se amable."
    }
    if (props.state.ViajeReducer.data.movimientos["termino_viaje_conductor"]) {
        mensaje = "Esperamos que ayas tenido un buen viaje."
    }

    if (props.state.ViajeReducer.data.movimientos["cancelo_viaje_cliente"]) {
        mensaje = "Viaje Cancelado"
    }

    if (!mensaje) {
        return <View />
    }

    var viaje = props.state.ViajeReducer.data;
    return (
        <>
            <View
                style={{
                    width: "90%",
                    height: 50,
                    position: "absolute",
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "#2c4c7e",
                    top: 30,
                    borderRadius: 10
                }} >
                <Text style={{ color: "#fff", fontSize: 18 }}>
                    {mensaje}
                </Text>

            </View>
            <View style={{
                position: "absolute",
                right: 8,
                top: 80,
            }}>
                <Text style={{ color: "#666", fontSize: 12, textAlign:"center" }}>
                    Navega con:
                </Text>
                <NavigationApps
                    iconSize={40}
                    row
                    address='some default address to navigate' // address to navigate by for all apps 
                    waze={{ address: '', lat: viaje.latitude, lon: viaje.longitude, action: actions.navigateByLatAndLon }} // specific settings for waze
                    googleMaps={{ address: '', lat: viaje.latitude, lon: viaje.longitude, action: actions.navigateByLatAndLon, travelMode: googleMapsTravelModes.driving }} // specific settings for google maps
                    maps={{ address: '', lat: viaje.latitude, lon: viaje.longitude, action: actions.navigateByLatAndLon, travelMode: mapsTravelModes.driving }} // specific settings for maps
                />

            </View>
        </>
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(EstadoViaje);
