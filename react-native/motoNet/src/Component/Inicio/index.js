import React from 'react';
import * as mapaActions from '../../Actions/mapaActions'
import * as locationActions from '../../Actions/locationActions'

import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    NativeModules,
    NativeEventEmitter,

} from 'react-native';
import Svg from '../../Svg';
import Theme from '../../Styles/Theme.json'

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

var mapa;
const Inicio = (props) => {
    const [zoom, setZoom] = React.useState(false);
    const [region] = React.useState({
        latitude: -17.7799998333333332,
        longitude: -63.180598333333336,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
    });

    const [lugar, setlugar] = React.useState({
        latitude: 0,
        longitude: 0,
    });
    if (!props.state.locationReducer.isOpen) {
        props.state.locationReducer.open();
    }



    const start = () => {
        props.state.naviDrawerReducer.openBar()

    }

    const markerClick = (obj) => {
        console.log(obj);
        if (!zoom)
            zoomin(obj);
        else
            zoomout(obj);
    }

    const zoomin = (obj) => {
        obj = {
            latitude: obj.latitude,
            longitude: obj.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        }
        mapa.animateToRegion(obj, 1000);
        setZoom(true);
    }

    const zoomout = (obj) => {
        obj = {
            latitude: obj.latitude,
            longitude: obj.longitude,
            latitudeDelta: 17,
            longitudeDelta: 17
        }
        mapa.animateToRegion(obj, 1000);
        setZoom(false);
    }




    const getMarker = () => {
        if (!props.state.locationReducer.data) {
            return <View />
        }
        var data = props.state.locationReducer.data;
        var json = { latitude: data.latitude, longitude: data.longitude };
        return (
            <Marker
                coordinate={json}
            >
                <Svg name="MarkerMoto"
                    style={{
                        width: 50,
                        height: 50,

                    }} />
            </Marker>
        )
    }


    const getMarkersAll = () => {
        if (!props.state.locationReducer.locations) {
            return <View />
        }
        var data = props.state.locationReducer.locations;
        var resp;
        return Object.keys(data).map((key)=>{
            var obj=data[key];
            var jsons = { latitude: obj.latitude, longitude: obj.longitude };
            return (
                <Marker
                    coordinate={jsons}
                >
                    <Svg name="MarkerMoto"
                        style={{
                            width: 50,
                            height: 50,
    
                        }} />
                </Marker>
            )
        })
        
        
    }
    const getIconoMoto = () => {
        var texto = "Ocultar"
        var colors = "#f00"
        if (!props.state.locationReducer.isMotos) {
            colors = "#242"
             texto = "Ver motos"
        }
        return (<TouchableOpacity
            onPress={() => {
                if (props.state.locationReducer.isMotos) {
                    props.getAllClose(props.state.socketClienteReducer);
                    return <View />
                }
                props.getAllOpen(props.state.socketClienteReducer)
                return <View />
            }}
            style={[styles.icono2, {
                backgroundColor: colors,
            }]}>

            <Svg name="MarkerMoto"
                style={{
                    width: 30,
                    height: 30,

                }} />
            <Text style={{ color: "#fff", fontSize: 10, }}>
                {texto}
            </Text>
        </TouchableOpacity>)




    }
    return (
        <View style={styles.container}>

            <MapView

                style={styles.map}
                initialRegion={region}
                // showsUserLocation={true}
                ref={map => { mapa = map }}
            >
                {getMarker()}
                {getMarkersAll()}

            </MapView>

            <TouchableOpacity
                onPress={start}
                style={styles.icono}>

                <Svg name="LogoMoto"
                    style={{
                        width: 50,
                        height: 50,

                    }} />
            </TouchableOpacity>

            {getIconoMoto()}
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: "100%",
    },
    buttOn1: {
        borderRadius: 10,
        backgroundColor: "#4fc2ef",
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    buttOn2: {
        width: 200,
        height: 60,
        borderRadius: 10,
        backgroundColor: "red",
        position: "absolute",
        bottom: 200,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    icono: {

        width: 65,
        height: 65,
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: "red",
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        top: 10,
        left: 10,
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    icono2: {

        width: 65,
        height: 65,

        borderRadius: 100,
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        top: 10,
        right: 10,
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});
const initActions = ({
    ...mapaActions,
    ...locationActions
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates,initActions)(Inicio);
