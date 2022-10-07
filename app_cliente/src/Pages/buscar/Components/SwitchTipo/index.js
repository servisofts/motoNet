import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { STheme } from 'servisofts-component';

export default class SwitchTipo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
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
            borderColor: STheme.color.card
        }} onPress={() => {
            if (this.props.onChange) this.props.onChange(key)
        }}>
            <View style={{
                width: 22,
                height: 22,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: STheme.color.primary,
                padding: 1,
            }}>
                {isSelect ? <View style={{ flex: 1, borderRadius: 100, backgroundColor: STheme.color.primary }}></View> : <View />}
            </View>
            <Text style={{
                marginStart: 8,
                color: "#000",
                fontSize: 14,
            }}>{label}</Text>

        </TouchableOpacity>
    }
    render() {
        if (this.props.value) {
            this.state.value = this.props.value;
        }
        return (
            <View>
                {this.getTipo({ key: "mensajeria-sobre", label: "Sobre" })}
                {this.getTipo({ key: "mensajeria-paquete", label: "Paquete" })}
            </View>
        );
    }
}
