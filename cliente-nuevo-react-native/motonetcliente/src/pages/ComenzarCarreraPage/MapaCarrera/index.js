import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { View, StyleSheet, } from 'react-native';
var mapa;
const MapaCarrera = (props) => {
    const [zoom, setZoom] = React.useState(false);
    const [currentPos, setCurrentPos] = React.useState(false);
    const [region, setRegion] = React.useState({
        latitude: -17.7799998333333332,
        longitude: -63.180598333333336,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
    });
    return (
        <MapView
            style={styles.map}
            initialRegion={region}
            ref={map => { mapa = map }}
        >
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
export default connect(initStates)(MapaCarrera);
