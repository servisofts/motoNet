import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';
import { NavigationApps, actions, googleMapsTravelModes, mapsTravelModes } from "react-native-navigation-apps";
import SNavigationApps from '../SNavigationApps';

const EstadoViaje = (props) => {

    var mensaje = false;
    if (!props.state.ViajeReducer.data) {
        return <View />
    }
    var movimientos = props.state.ViajeReducer.data.movimientos;

    // console.log(Object.keys(movimientos))
    if (movimientos["inicio_viaje"]) {
        mensaje = "Dirijete a recojer al cliente."
    }
    if (movimientos["conductor_cerca"]) {
        mensaje = "Ya estas cerca. "
    }
    if (movimientos["conductor_llego"]) {
        mensaje = "Espera a el cliente. Recuerda se amable."
    }
    if (movimientos["termino_viaje_conductor"]) {
        mensaje = "Esperamos que ayas tenido un buen viaje."
    }

    if (movimientos["cancelo_viaje_cliente"]) {
        mensaje = "Viaje Cancelado"
    }

    if (!mensaje) {
        return <View />
    }

    var viaje = props.state.ViajeReducer.data;
    
    return (
        <>
            {/* <View
                style={{
                    width: "90%",
                    height: 50,
                    position: "absolute",
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "#f00",
                    top: 30,
                    borderRadius: 10
                }} >
                <Text style={{ color: "#fff", fontSize: 18 }}>
                    {mensaje}
                </Text>

            </View> */}
            <View style={{
                position: "absolute",
                right: 8,
                top: 8,
            }}>
                <Text style={{ color: "#666", fontSize: 12, textAlign: "center" }}>
                    Navega con:
                </Text>
                <SNavigationApps />
                {/* <NavigationApps
                    iconSize={40}
                    row
                    address='some default address to navigate' // address to navigate by for all apps 
                    waze={{ address: '', lat: viaje.latitude, lon: viaje.longitude, action: actions.navigateByLatAndLon }} // specific settings for waze
                    googleMaps={{ address: '', lat: viaje.latitude, lon: viaje.longitude, action: actions.navigateByLatAndLon, travelMode: googleMapsTravelModes.driving }} // specific settings for google maps
                    maps={{ address: '', lat: viaje.latitude, lon: viaje.longitude, action: actions.navigateByLatAndLon, travelMode: mapsTravelModes.driving }} // specific settings for maps
                /> */}

            </View>
        </>
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(EstadoViaje);
