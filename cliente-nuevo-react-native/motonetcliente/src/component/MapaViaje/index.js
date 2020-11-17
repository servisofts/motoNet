import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, DatePickerIOS, } from 'react-native';
import Svg from '../../Svg';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';

var mapa;
const Mapa = (props) => {

    const [data, setdata] = React.useState({
        region: {
            latitude: -17.78629,
            longitude: -63.18117,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
            isRender: false,
        },
        origen: false,
        ubicacionActual: false
    })

    const getMarkerSelect = () => {
        
        if (!props.state.posicionConductorReducer.posicion) {
            return <View />
        }
        var posicion = props.state.posicionConductorReducer.posicion
        return (
            <Marker
                coordinate={{
                    latitude: posicion.latitude,
                    longitude: posicion.longitude
                }}>
                <Svg name="Logo"
                    style={{
                        width: 25,
                        height: 25,
                        fill: "#fff",
                        transform: [{ rotate: posicion.deegre + 'deg' }]
                    }} />
            </Marker>
        )
    }

    const getMarkerInicio = () => {
        if (!props.state.viajesReducer.viaje) {
            return <View />
        }
        var dato = props.state.viajesReducer.viaje.destinos[0];
        var json = { latitude: dato.latitude, longitude: dato.longitude };
        return (
            <Marker
                coordinate={json}
            >
                <Svg name="Marcador"
                    style={{
                        width: 20,
                        height: 20,
                    }} />
            </Marker>
        )
    }


    const PartidaMotonet = () => {
        

    }

    return (
        <View style={{ width: "100%", height: "100%" }}>
            < MapView
                style={{
                    flex: 1,
                    width: '100%',
                    height: "100%",
                }}
                // ref={map => { mapa = map }}
                showsUserLocation={true}
                initialRegion={data.region}>
                {/* {getMarkerOrigen()}
                {getMarkerFin()} */}

                {getMarkerInicio()}
                {getMarkerSelect()}

                {/* <RutaViaje ventanaSelect={props.ventanaSelect} setVentanaSelect={props.setVentanaSelect} /> */}

            </MapView >
            {/* <TouchableOpacity
                style={{
                    position: "absolute",
                    bottom: 200,
                    right: 10
                }}
                onPress={() => {
                    data.region = { isReder: false };
                    setdata({ ...data })
                    return <View />
                }}
            >
                <Svg name="Gps"
                    style={{
                        width: 50,
                        height: 50,
                        fill: "#f00"
                    }} />
            </TouchableOpacity> */}
        </View>
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Mapa);
