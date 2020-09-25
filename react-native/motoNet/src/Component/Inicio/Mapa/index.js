import React from 'react';
import * as mapaActions from '../../../Actions/mapaActions'
import * as locationActions from '../../../Actions/locationActions'
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';

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
    /*   if (!props.state.locationReducer.isOpen) {
          props.state.locationReducer.open();
          return <View></View>
      }
   */
    if (!zoom) {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        const yourFunction = async () => {
            await delay(1500);
            //zoomin(currentPos)
        };
        yourFunction();
    }


    const markerClick = (obj) => {
        console.log(obj);
        if (!zoom)
            zoomin(obj);
        else
            zoomout(obj);
    }

    const zoomin = (obj) => {
        obj = currentPos;

        obj = {
            latitude: obj.latitude,
            longitude: obj.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }
        mapa.animateToRegion(obj, 2000);
        setZoom(true);
        return <View />
    }

    const zoomout = (obj) => {
        obj = {
            latitude: obj.latitude,
            longitude: obj.longitude,
            latitudeDelta: 17,
            longitudeDelta: 17
        }
        mapa.animateToRegion(obj, 3000);
        setZoom(false);
    }
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
const initActions = ({
    ...mapaActions,
    ...locationActions
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Mapa);
