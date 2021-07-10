import React, { useRef } from 'react';
import { connect } from 'react-redux';
import {
    Animated,
    Dimensions,
    Text,
    TouchableOpacity,
    View,
    PanResponder
} from 'react-native';

import * as SSSocketNative from '../../SSSocketNative';
import ContenidoBarra from './ContenidoBarra';
import Styles from '../../Styles';
const delay = ms => new Promise(res => setTimeout(res, ms));

var lastPing = new Date().getTime();
const BarraDeDesconeccion = (props) => {
    // var _SocketName = "clinica_nj";
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dy < -20 || gestureState.dy > 20,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onPanResponderMove: Animated.event([
                null,
                { moveX: pan.x, moveY: pan.y }
            ], { useNativeDriver: false }),
            onPanResponderRelease: () => {

                // console.log("PanResponder: x:" + pan.x._value + "  y:" + pan.y._value)
                Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
                if (pan.y._value < (Dimensions.get("window").height * 0.3)) {
                    Animated.spring(pan, { toValue: { x: 0, y: 0 }, speed: 1, }).start(() => {
                        pan.flattenOffset();
                    });
                } else {
                    Animated.spring(pan, {
                        toValue: { x: 0, y: Dimensions.get("window").height * 0.9 },
                        speed: 1,
                    }).start(() => {
                        pan.flattenOffset();

                    });
                }
            }
        })
    ).current;
    const closeBar = () => {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, speed: 1, }).start(() => {
            pan.flattenOffset();
        });
    }

    var _SocketName = props.socketName;

    var SessionActual = SSSocketNative.getSession(_SocketName);
    if (!SessionActual) {
        return <View />;
    }
    var config = SessionActual.getConfig();
    const getEstado = () => {
        var backColor = "";
        if (SSSocketNative.getSession(_SocketName).isActivo()) {
            backColor = "#6f6"
        } else {
            backColor = "#f66"
        };
        return (
            <View style={{
                width: Dimensions.get("window").height * 0.02,
                height: Dimensions.get("window").height * 0.02,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#CCC",
                backgroundColor: backColor,
                justifyContent: "center",
                alignItems: "center",
            }}>

            </View>
        )
    }
    const HacerPing = async () => {
        var curTime = new Date().getTime();
        if (curTime - lastPing > 5000) {
            lastPing = new Date().getTime();
            SessionActual.ping();
        }
        await delay(5000);
        HacerPing();
    };

    HacerPing();
    return <View />
    var heightBar = Dimensions.get("window").height * 0.035;
    return (
        <>
            <View style={{
                height: heightBar,
            }}>
            </View>
            <Animated.View
                style={{
                    backgroundColor: pan.y.interpolate({
                        inputRange: [0, Dimensions.get("window").height],
                        outputRange: [Styles.colors.primary + "00", Styles.colors.primary + "F8"]
                    }),
                    height: pan.y.interpolate({
                        inputRange: [0, Dimensions.get("window").height],
                        outputRange: ["0%", "100%"]
                    }),
                    minHeight: Dimensions.get("window").height * 0.035,
                    borderBottomLeftRadius: pan.y.interpolate({
                        inputRange: [0, Dimensions.get("window").height],
                        outputRange: [0, 16]
                    }),
                    borderBottomRightRadius: pan.y.interpolate({
                        inputRange: [0, Dimensions.get("window").height],
                        outputRange: [0, 16]
                    }),
                    width: "100%",
                    position: "absolute",
                    elevation: 99,
                    zIndex: 99,
                    overflow: "hidden",
                    // transform: [ { translateY: pan.y }]
                }}
                {...panResponder.panHandlers}
            >
                <View
                    style={{
                        position: "absolute",
                        bottom: heightBar,
                        width: "100%",
                        height: (Dimensions.get("window").height * 0.9) - heightBar,
                        justifyContent: "center",
                        alignItems: "center",
                        elevation: 999,
                        zIndex: 999,

                    }}>
                    <ContenidoBarra closeBar={closeBar} />
                </View>

                <View style={{
                    flexDirection: "row",
                    position: "absolute",
                    bottom: 0,
                }}>
                    <View style={{
                        // flex: 1,
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        marginStart: 5
                    }}>
                        <Text style={{ color: "#CCC", marginRight: 8, fontSize: Dimensions.get("window").width * 0.04 }}>{props.socketName}</Text>
                        {getEstado()}
                    </View>
                    <View style={{
                        height: "100%",
                        flex: 1,
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row",
                    }}>
                        <Text style={{ color: "#CCC", fontSize: Dimensions.get("window").width * 0.04 }}>{config["ip"]}:{config["puerto"]}</Text>
                        <Text style={{ color: "#CCC", fontSize: Dimensions.get("window").width * 0.04 }}>Ping: {SessionActual.getLastPing()}</Text>
                    </View>
                </View>
            </Animated.View>
        </>
    )
}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(BarraDeDesconeccion);
