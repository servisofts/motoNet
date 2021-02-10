import React from 'react';
import { Polyline, Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import Svg from '../../../Svg';
const RutaViaje = (props) => {

    // if (props.state.locationGoogleReducer.estado == "cargando") {
    //     return <View />
    // }
    if (!props.state.ViajeReducer.data) {
        return <View />
    }
    if (props.state.ViajeReducer.data.estado == 0) {
        return <View />
    }

    var dato = props.state.ViajeReducer.data;
    var json = { latitude: dato.latitude, longitude: dato.longitude };
    return (
        <View>
            <Marker
                coordinate={json}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
            >
                {/* <Svg name="volver"
                    style={{
                        width: 40,
                        height: 40,
                    }} /> */}
            </Marker>
        </View>
    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RutaViaje);
