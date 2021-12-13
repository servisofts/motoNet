import React, { useRef } from 'react';
import { View, Animated } from 'react-native';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import Svg from '../../../Svg';

var _marker;
var currentValue = 0;
var inverted = false;
var curAnimate = {
    time: 0,
    duration: 0,
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const MarkerConductores = (props) => {
    const [MarkerRegion, setMarkerRegion] = React.useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current

    const fadeInMarker = (toValue) => {
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
                // console.log("REINICIAR ANIMATE  --- --- --- --- --- -- --");
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

        if ((new Date().getTime() - curAnimate.time) < duration) {
            return;
        }
        if (MarkerRegion !== toValue) {

            var time1 = new Date(props.state.posicionConductorReducer.history[props.state.posicionConductorReducer.history.length - 1].fecha_on).getTime();
            var time2 = new Date(props.state.posicionConductorReducer.history[props.state.posicionConductorReducer.history.length - 2].fecha_on).getTime();
            duration = (time1 - time2) + 100;
            if (duration > 2000) {
                duration = 2000;
            }
            if (Platform.OS === 'android') {
                if (_marker) {
                    // console.log(_marker)
                    _marker.animateMarkerToCoordinate(
                        toValue,
                        duration
                    );

                }
            } else {
                MarkerRegion.timing({
                    ...toValue,
                    duration
                }).start();
            }
            curAnimate = {
                time: new Date().getTime(),
                duration: duration,
            }
        }
    };


    if (!MarkerRegion) {
        setMarkerRegion({
            latitude: props.latitude,
            longitude: props.longitude
        })
        return <View />
    }




    return (
        <Marker.Animated
            ref={marker => { _marker = marker }}
            coordinate={MarkerRegion}
        // anchor={{ x: -1, y: -0.5 }}
        >
            <Animated.View style={{
                width: 50,
                height: 50,
                // backgroundColor:"#000",
                transform: [
                    {
                        rotate: fadeAnim.interpolate({
                            inputRange: [0, 360],
                            outputRange: ["0deg", '360deg'],
                            useNativeDriver: true
                        })
                    },
                    // { scale: 1 }
                    // { translateX: 1 },
                ],
            }}>
                <Svg name="Ambulancia"
                    style={{
                        width: 50,
                        height: 50,
                        fill: "#fff",
                    }} />
            </Animated.View>
        </Marker.Animated>
    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(MarkerConductores);
