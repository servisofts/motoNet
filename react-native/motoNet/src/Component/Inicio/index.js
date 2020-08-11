import React from 'react';
import * as mapaActions from '../../Actions/mapaActions'

import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import Svg from '../../Svg';
import Theme from '../../Styles/Theme.json'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import ModeloComponent from './ModeloComponent';
var mapa;
const Inicio = (props) => {
    const [zoom, setZoom] = React.useState(false);
    const [region] = React.useState({
        latitude: -17.613977,
        longitude: -63.665321,
        latitudeDelta: 13,
        longitudeDelta: 13,
    });






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
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
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

    return (
        <View style={styles.container}>

            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                initialRegion={region}
                showsUserLocation={true}
                ref={map => { mapa = map }}
            >
            </MapView>

            <TouchableOpacity
                onPress={() => {
                    props.state.naviDrawerReducer.openBar()
                }}
                style={styles.icono}>

                <Svg name="LogoGlup"
                    style={{
                        width: 50,
                        height: 50,
                        fill: "#fff"

                    }} />
            </TouchableOpacity>
                
            <ModeloComponent componente={props.state.modeloComponenteReducer.componente} />

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
        backgroundColor: "#4fc2ef",
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
});
const initActions = ({
    ...mapaActions
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Inicio);
