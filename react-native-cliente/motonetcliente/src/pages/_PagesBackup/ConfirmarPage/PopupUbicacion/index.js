import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux'
import MapView, { Marker } from 'react-native-maps';
import VerificarUbicacionPage from '../../VerificarUbicacionPage';

const PopupUbicacion = (props) => {

    if (!props.visible) {
        return <View />
    }
    var dato = props.state.locationEmergenciaReducer.region;

    return (
        <View style={{
            width: "90%",
            height: "90%",
            position: "absolute",
            backgroundColor: "#fff",
            elevation: 9,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden"
        }}>
            {/* <Text
                style={{
                    color: "#f00",
                    fontSize: 16,
                    textAlign: "center",
                }}>Detectamos irregularidades en su ubicación.</Text>
            <Text
                style={{
                    color: "#600",
                    fontSize: 12,
                    textAlign: "center",
                }}>Mueva el mapa hasta que el punto rojo quede en su ubicacion actual.</Text> */}
            <View style={{
                flex: 1,
                backgroundColor: "#fff",
                width: "100%"
            }}>
                <VerificarUbicacionPage />
            </View>

        </View>
    )
};


const initStates = (state) => {
    return { state }
};

export default connect(initStates)(PopupUbicacion);
