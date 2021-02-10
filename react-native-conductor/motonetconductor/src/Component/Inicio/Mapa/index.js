import React, { useRef } from 'react';
import * as mapaActions from '../../../Actions/mapaActions'
import * as locationActions from '../../../Actions/locationActions'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image, Animated, Platform } from 'react-native';
import Svg from '../../../Svg/';
var mapa, _marker;
var currentValue = 0;
var curAnimate = {
    time: 0,
    duration: 0,
}
const delay = ms => new Promise(res => setTimeout(res, ms));

const Mapa = (props) => {
    const [zoom, setZoom] = React.useState(false);
    const [currentPos, setCurrentPos] = React.useState(false);
    const [MarkerRegion, setMarkerRegion] = React.useState(false);
    const [region, setRegion] = React.useState({
        latitude: -17.7799998333333332,
        longitude: -63.180598333333336,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
    });
    const fadeAnim = useRef(new Animated.Value(0)).current
    /*   if (!props.state.locationReducer.isOpen) {
          props.state.locationReducer.open();
          return <View></View>
      }
   */

    const fadeInMarker = (toValue) => {
        // Will change fadeAnim value to 1 in 5 seconds
        // if (toValue == 0) {
        //     return;
        // }
        // if (toValue == currentValue) {
        //     return;
        // }

        // var g_horario = (360-currentValue)-(360-toValue);
        toValue = parseInt(toValue);
        var g_horario = toValue - currentValue;
        var g_anti_horario = currentValue - toValue;
        var rebaseHorario = false;
        var rebaseAntiHorario = false;
        if (g_horario < 0) {
            //REINICIAR ANIMATE
            g_horario = (360 - currentValue) + toValue;
            rebaseHorario = true;
        }
        if (g_anti_horario < 0) {
            //REINICIAR ANIMATE
            g_anti_horario = (360 - toValue) + currentValue;
            rebaseAntiHorario = true;
        }
        // console.log("FROM : "+currentValue+ "  -- TO: "+toValue);
        // console.log("g_horario : "+g_horario+ "  -- g_anti_horario: "+g_anti_horario);
        currentValue = toValue;

        const EsperarAnim = async (time) => {
            await delay(time);
            Animated.timing(fadeAnim, {
                toValue: toValue,
                duration: 300
            }).start();
        };

        if (g_horario > g_anti_horario) {

            // console.log("GIRAR EN SENTIDO ANTI HORARIO ");
            if (rebaseAntiHorario) {
                // console.log("REINICIAR ANIMATE  --- --- --- --- --- -- --");
                Animated.timing(fadeAnim, {
                    toValue: 360,
                    duration: 0
                }).start();
                EsperarAnim(100);
                return;
            }
        } else {
            // console.log("GIRAR EN SENTIDO HORARIO");
            if (rebaseHorario) {
                console.log("REINICIAR ANIMATE  --- --- --- --- --- -- --");
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 0
                }).start();
                EsperarAnim(100);
                return;
            }
        }
        EsperarAnim(0);

    };
    const moveMarker = (toValue) => {
        var duration = 500;
        if (props.state.backgroundLocationReducer.history.length < 2) {
            return;
        }
        if ((new Date().getTime() - curAnimate.time) < duration) {
            return;
        }
        var time1 = props.state.backgroundLocationReducer.history[props.state.backgroundLocationReducer.history.length - 1].time;
        var time2 = props.state.backgroundLocationReducer.history[props.state.backgroundLocationReducer.history.length - 2].time;
        duration = (time1 - time2) + 100;
        if (duration > 2000) {
            duration = 1000;
        }
        if (MarkerRegion !== toValue) {
            if (Platform.OS === 'android') {
                if (_marker) {
                    // console.log(_marker)
                    _marker.animateMarkerToCoordinate(
                        toValue,
                        duration
                    );
                    curAnimate = {
                        time: new Date().getTime(),
                        duration: duration,
                    }
                }
            } else {
                MarkerRegion.timing({
                    ...toValue,
                    duration
                }).start();
            }
        }
    };

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



    const getPosicionConductor = () => {

        if (!props.state.backgroundLocationReducer) {
            return <View />
        }

        if (!props.state.backgroundLocationReducer.history) {
            return <View />
        }
        var posicion = props.state.backgroundLocationReducer.history[props.state.backgroundLocationReducer.history.length - 1];
        if (!posicion) {

            return <View />

        }

        if (!MarkerRegion) {
            setMarkerRegion({
                latitude: posicion.latitude,
                longitude: posicion.longitude
            })
        }
        fadeInMarker(posicion.deegre);
        moveMarker({
            latitude: posicion.latitude,
            longitude: posicion.longitude,

        });
        // console.log(posicion);
        return (
            <Marker.Animated
                ref={marker => { _marker = marker }}
                coordinate={MarkerRegion}
                anchor={{ x: 0.5, y: 0.5 }}
            >
                <Animated.View style={{
                    transform: [
                        {
                            rotate: fadeAnim.interpolate({
                                inputRange: [0, 360],
                                outputRange: ["0deg", '360deg']
                            })
                        },
                        { translateY: 10 },
                    ],
                }}>
                    <Svg name="Ambulancia"
                        style={{
                            width: 60,
                            height: 60,
                            fill: "#fff",

                        }} />
                </Animated.View>

            </Marker.Animated>
        )
    }

    return (
        <MapView
            style={styles.map}
            initialRegion={region}
            ref={map => { mapa = map }}
            provider={PROVIDER_GOOGLE}
            // showsUserLocation={true}
            showsMyLocationButton={true}
        >
            {getPosicionConductor()}
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
