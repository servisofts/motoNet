import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import Svg from '../../Svg';
import RutaViaje from './RutaViaje';

var mapa;
const ViajeInicioPage = (props) => {
    const [zoom, setZoom] = React.useState(false);
    const [currentPos, setCurrentPos] = React.useState(false);
    const [region, setRegion] = React.useState({
        latitude: -17.7799998333333332,
        longitude: -63.180598333333336,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
    });

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
        <View>
            <MapView
                showsUserLocation={true}
                style={styles.map}
                initialRegion={region}
                ref={map => { mapa = map }}
            >
                <RutaViaje />
            </MapView>
            <TouchableOpacity style={{
                position:"absolute",
                bottom:10,
                backgroundColor:"#f00",
                width:200,
                height:40,
                justifyContent:"center",
                alignItems:"center"
            }}
                onPress={()=>{
                    AsyncStorage.removeItem("motonet_viaje");
                    props.state.ViajeReducer.data= false;
                    props.navigation.replace("CargaPage");

                }}
            >
                <Text>CANCELAR</Text>
            </TouchableOpacity>
            
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
export default connect(initStates)(ViajeInicioPage);
