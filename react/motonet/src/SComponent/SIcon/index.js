import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { SImage } from '../../SComponent';
import { ReactComponent as Calendario } from './Icons/calendario.svg'
import { ReactComponent as Engranaje2 } from './Icons/engranaje2.svg'
import { ReactComponent as Engranaje } from './Icons/engranaje.svg'
import { ReactComponent as AddRed } from './Icons/addRed.svg'
import { ReactComponent as Reload } from './Icons/reload.svg'
import { ReactComponent as Reloadbox } from './Icons/reloadbox.svg'
import { ReactComponent as Salir } from './Icons/salir.svg'
import { ReactComponent as Tarifa } from './Icons/tarifa.svg'
import { ReactComponent as Drag } from './Icons/drag.svg'
import { ReactComponent as Marker } from './Icons/marker.svg'


export type SIconsType = "add"
    | "addRed"
    | "ajustes"
    | "ajustesMano"
    | "asociacion"
    | "calendario" | "calendario-png"
    | "drag"
    | "editar"
    | "eliminar"
    | "engranaje"
    | "engranaje2"
    | "marker"
    | "publicidad"
    | "reload"
    | "reloadbox"
    | "salir" | "salir-png"
    | "tarifa" | "tarifa-png"
    | "usuarios"
    | "usuarios1"
    | "usuarios2"
    | "usuarios3"
    | "usuarios4";
export type IconsNames = SIconsType | [SIconsType]

export type IconsPropsType = {
    name: SIconsType
}


export default class SIcon extends Component<IconsPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        switch (this.props.name) {
            case "add": return <SImage source={{ uri: require("./Icons/add.png") }} style={this.props.style} />
            case "addRed": return <AddRed style={this.props.style} />
            case "ajustes": return <SImage source={{ uri: require("./Icons/ajustes.png") }} style={this.props.style} />
            case "ajustesMano": return <SImage source={{ uri: require("./Icons/ajustesMano.png") }} style={this.props.style} />
            case "asociacion": return <SImage source={{ uri: require("./Icons/asociacion.png") }} style={this.props.style} />
            case "calendario": return <Calendario style={this.props.style} />
            case "calendario-png": return <SImage source={{ uri: require("./Icons/calendario.png") }} style={this.props.style} />
            case "drag": return <Drag style={this.props.style} />
            case "editar": return <SImage source={{ uri: require("./Icons/editar.png") }} style={this.props.style} />
            case "eliminar": return <SImage source={{ uri: require("./Icons/eliminar.png") }} style={this.props.style} />
            case "engranaje": return <Engranaje style={this.props.style} />
            case "engranaje2": return <Engranaje2 style={this.props.style} />
            case "marker": return <Marker style={this.props.style} />
            case "publicidad": return <SImage source={{ uri: require("./Icons/publicidad.png") }} style={this.props.style} />
            case "reload": return <Reload style={this.props.style} />
            case "reloadbox": return <Reloadbox style={this.props.style} />
            case "salir": return <Salir style={this.props.style} />
            case "salir-png": return <SImage source={{ uri: require("./Icons/salir.png") }} style={this.props.style} />
            case "tarifa": return <Tarifa style={this.props.style} />
            case "tarifa-png": return <SImage source={{ uri: require("./Icons/tarifa.png") }} style={this.props.style} />
            case "usuarios": return <SImage source={{ uri: require("./Icons/usuarios.png") }} style={this.props.style} />
            case "usuarios1": return <SImage source={{ uri: require("./Icons/usuarios1.png") }} style={this.props.style} />
            case "usuarios2": return <SImage source={{ uri: require("./Icons/usuarios2.png") }} style={this.props.style} />
            case "usuarios3": return <SImage source={{ uri: require("./Icons/usuarios3.png") }} style={this.props.style} />
            case "usuarios4": return <SImage source={{ uri: require("./Icons/usuarios4.png") }} style={this.props.style} />
            case "usuarios4": return <SImage source={{ uri: require("./Icons/usuarios4.png") }} style={this.props.style} />
            default: return <View />
        }
    }
}
