import React from 'react';
import { connect } from 'react-redux';
import {
    ActivityIndicator,
    Dimensions,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import * as SSSocketNative from '..';
const AlertaDesconectado = (props) => {
    // var _SocketName = "clinica_nj";
    var _SocketName = props.socketName;
    

    var SessionActual = SSSocketNative.getSession(_SocketName);
    if (!SessionActual) {
        return <View />;
    }
    
    if (!SSSocketNative.getSession(_SocketName)) {
        return <View />;
    }

    if (SSSocketNative.getSession(_SocketName).isActivo()) {
        return <View />;
    }

    if(props.state.socketClienteReducer.sessiones[_SocketName]){
        if(props.state.socketClienteReducer.sessiones[_SocketName].isOpen){
            return <View/>;
        }
    }
    if(SSSocketNative.getSession(_SocketName).cantidadIntentos <= 3){
        return <View/>
    }
    var config = SessionActual.getConfig();
    const getBtnConect = () => {
        return (
            <TouchableOpacity style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
                onPress={() => {
                    SSSocketNative.open(_SocketName);
                }}
            >
                <Text style={{
                    color: "#000",
                    fontSize: 12,
                }}>Reintentar</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{
            position: "absolute",
            backgroundColor: "#000000AA",
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            elevation: 999
        }}>
            <View style={{
                backgroundColor: "#ffffffDD",
                height: "80%",
                width: "80%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center"
            }}>
                {getBtnConect()}
                <Text style={{
                    fontSize: 10,
                }}>Conexion perdida.</Text>
                <Text>Verifique su conexion a internet.</Text>
                {/* <ActivityIndicator color={"#000"} size={"large"}/> */}
            </View>
        </View>
    )
}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(AlertaDesconectado);
