import React from 'react';
import { connect } from 'react-redux';
import {
    Dimensions,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import * as SSSocketNative from '../../SSSocketNative';
const delay = ms => new Promise(res => setTimeout(res, ms));

var lastPing = new Date().getTime();
const BarraDeDesconeccion = (props) => {
    // var _SocketName = "clinica_nj";
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
                alignItems: "center"
            }}>

            </View>
        )
    }
    const HacerPing = async () => {
        var curTime = new Date().getTime();
        if (curTime - lastPing > 20000) {
            lastPing = new Date().getTime();
            SessionActual.ping();
        }
        await delay(5000);
        HacerPing();
    };

    HacerPing();
    return <View/>
    return (
        <View style={{
            backgroundColor: (!props.color ? "#777" : props.color),
            height: Dimensions.get("window").height * 0.025,
            flexDirection: "row",
            justifyContent: "space-around",

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
    )
}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(BarraDeDesconeccion);
