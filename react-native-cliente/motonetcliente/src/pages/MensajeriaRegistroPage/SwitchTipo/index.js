import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import STheme from '../../../STheme';

export default class SwitchTipo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "sobre"
        };
    }
    getValue() {
        return this.state.value;
    }

    getTipo = ({ key, label }) => {
        var isSelect = (this.state.value == key)
        return <TouchableOpacity style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            paddingBottom: 12,
            paddingTop: 12,
            borderBottomWidth: 1,
            borderColor: "#666"
        }} onPress={() => {
            this.setState({ value: key })
        }}>
            <View style={{
                width: 25,
                height: 25,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: STheme.color.background,
                padding: 1,
            }}>
                {isSelect ? <View style={{ flex: 1, borderRadius: 100, backgroundColor: STheme.color.background }}></View> : <View />}
            </View>
            <Text style={{
                marginStart: 8,
                color: "#000",
                fontSize: 16,
            }}>{label}</Text>

        </TouchableOpacity>
    }
    render() {
        return (
            <View>
                {this.getTipo({ key: "sobre", label: "Sobre" })}
                {this.getTipo({ key: "paquete", label: "Paquete" })}
            </View>
        );
    }
}
