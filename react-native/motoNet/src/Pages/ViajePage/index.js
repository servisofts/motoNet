import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import PopupViajesComponet from '../../Component/PopupViajesComponet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg from '../../Svg';

var mapa;
const ViajePage = (props) => {
    const [zoom, setZoom] = React.useState(false);
    const [currentPos, setCurrentPos] = React.useState(false);
    const [region, setRegion] = React.useState({
        latitude: -17.7799998333333332,
        longitude: -63.180598333333336,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
    });

    const [regionUbicacion, setRegionUbicacion] = React.useState({
        // latitude: props.ViajeReducer.data.destinos[0].lat,        
        // longitude: props.ViajeReducer.data.destinos[0].lng,
        latitude: props.state.ViajeReducer.data.destinos[1].latitude,
        longitude: props.state.ViajeReducer.data.destinos[1].longitude,
    });

    const [regionDestino, setRegionDestino] = React.useState({
        // latitude: props.ViajeReducer.data.destinos[1].lat,
        // longitude: props.ViajeReducer.data.destinos[1].lng,        
        latitude: props.state.ViajeReducer.data.destinos[0].latitude,
        longitude: props.state.ViajeReducer.data.destinos[0].longitude,
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

    getMarkerSelect = (props) => {
        /*   if (!this.state.marcar) {
              return <View />
          } */
        return (
            <Marker
                coordinate={props}
            >
                <TouchableOpacity
                >
                    <Svg name="LogoMoto"
                        style={{
                            width: 25,
                            height: 25,
                            fill: "#fff"
                        }} />
                </TouchableOpacity>
            </Marker>
        )
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
        <View>
            <MapView
                showsUserLocation = {true}
                style={styles.map}
                initialRegion={region}
                ref={map => { mapa = map }}
            >                
                {getMarkerSelect(regionDestino)}             
                {getMarkerSelect(regionUbicacion)}             
            </MapView>
            <PopupViajesComponet />
        </View>
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
export default connect(initStates)(ViajePage);