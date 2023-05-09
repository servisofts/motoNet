import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { STheme } from 'servisofts-component';


type tprops = {
    label: String,
    type: String,
    onPress: Function,
    cargando: Boolean,
}

export default class Boton1 extends Component<tprops> {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    getTexto() {
        if (this.props.cargando) return <ActivityIndicator color={"#fff"} />
        if (typeof this.props.label == Object) {
            return this.props.label;
        }
        return <Text style={{
            color: this.type.color,
        }}>{this.props.label}</Text>
    }
    render() {
        const TYPES = {
            "1": {
                backgroundColor: STheme.color.primary,
                color: STheme.color.secondary
            },
            "2": {
                backgroundColor: STheme.color.primary + "09",
                color: "#000"
            },
            "3": {
                backgroundColor: "transparent",
                color: STheme.color.text
            },
            "4": {
                backgroundColor: "transparent",
                color: STheme.color.primary,
                borderWidth: 1,
                borderColor: STheme.color.primary,
            }
        }
        this.type = TYPES[this.props.type];
        return (
            <TouchableOpacity style={{
                width: "100%",
                height: 40,
                backgroundColor: this.type.backgroundColor,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 4,
                ...this.type
            }} onPress={() => {
                if (this.props.cargando) return;
                if (this.props.onPress) this.props.onPress()
            }}>
                {this.getTexto()}
            </TouchableOpacity>
        );
    }
}
