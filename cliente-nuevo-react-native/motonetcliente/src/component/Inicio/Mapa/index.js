import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { View, StyleSheet, } from 'react-native';
var mapa;
const Mapa = (props) => {
    const [zoom, setZoom] = React.useState(false);
    const [currentPos, setCurrentPos] = React.useState(false);
    const [region, setRegion] = React.useState({
        latitude: -17.7799998333333332,
        longitude: -63.180598333333336,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
    });

    const getMarkerFin = () => {
        if (!props.state.locationGoogleMapReducer.markerUbicacionFin) {
            return <View />
        }
        var locoation = {
            latitude: props.state.locationGoogleMapReducer.markerUbicacionFin.latitude,
            longitude: props.state.locationGoogleMapReducer.markerUbicacionFin.longitude
        };
        return (
            <Marker
                coordinate={locoation}
            >
                <Svg name="Logo"
                    style={{
                        width: 25,
                        height: 25,
                    }} />

            </Marker>
        )
    }

    const getMarkerOrigen = () => {

        if (!props.state.locationGoogleMapReducer.markerUbicacion) {
            return <View />
        }

        var locoation = { latitude: props.state.locationGoogleMapReducer.markerUbicacion.latitude, longitude: props.state.locationGoogleMapReducer.markerUbicacion.longitude };
        return (
            <Marker
                coordinate={locoation}
                onRegionChangeComplete={(region) => {
                    props.state.socketClienteReducer.sessiones["motonet"].send({
                        component: "locationGoogle",
                        type: "geocode",
                        data: region,
                        estado: "cargando"
                    }, true);
                    return <View />
                }}
            >
                <Svg name="LogoGlup"
                    style={{
                        width: 25,
                        height: 25,
                        fill: "#000"

                    }} />

            </Marker>
        )
    }
    return (
        <MapView
            onRegionChangeComplete={(region) => {
                props.state.socketClienteReducer.sessiones["motonet"].send({
                    component: "locationGoogle",
                    type: "geocode",
                    data: region,
                    estado: "cargando"
                }, true);
                return <View />
            }}
            style={styles.map}
            initialRegion={region}
            ref={map => { mapa = map }}
        >
            {getMarkerOrigen()}
            {getMarkerFin()}
        </MapView>
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
export default connect(initStates)(Mapa);
