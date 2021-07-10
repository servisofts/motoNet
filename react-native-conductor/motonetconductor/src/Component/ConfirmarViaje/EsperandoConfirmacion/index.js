import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default class EsperandoConfirmacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if (!this.props.state.ViajeReducer) {
            return <View />
        }
        let viaje = this.props.state.ViajeReducer.data;
        let movimientos = viaje.movimientos;
        if (movimientos["negociacion_conductor"]) {
            if (movimientos["negociacion_conductor"].key_referencia != this.props.state.usuarioReducer.usuarioLog.key) {
                return <View />
            }
        } else {
            return <View />

        }
        return (
            <View style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                backgroundColor: "#000000dd",
                zIndex: 999,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <ActivityIndicator color={"#fff"} size={"large"} />
                <Text style={{
                    marginTop: 8,
                    color: "#fff"
                }}>Esperando confirmacion</Text>
            </View>
        );
    }
}
