import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../Json';
import STheme from '../../../STheme';
import * as SSBackgroundLocation from '../../../SSBackgroundLocation';
import { SThread } from '../../../SComponent';

class PerfilUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getDato(key) {
        var usuario = this.props.state.usuarioReducer.usuarioDatos;
        if (!usuario) return "NoData";
        if (!usuario[key]) return "NoKey"
        return usuario[key].dato;
    }
    render() {
        if (!this.props.state.usuarioReducer.usuarioLog) {
            return <Text>Usuario No encontrado</Text>
        }
        if (!this.props.state.usuarioReducer.usuarioDatos) {//Cuando no existe Datos de usuario
            if (this.props.state.usuarioReducer.estado == "cargando") {
                new SThread(2000, "algoUsr",true).start(()=>{
                    this.props.state.usuarioReducer.estado = "";
                });
                return <Text>datos de Usuario No encontrado</Text>
            }
            this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "usuario",
                type: "getById",
                key: this.props.state.usuarioReducer.usuarioLog.key,
                cabecera: "registro_conductor",
                estado: "cargando"
            }, true);
            return <View />
        }
        var estados = false
        Object.keys(this.props.state.usuarioReducer.usuarioDatos).map((key) => {
            var obj = this.props.state.usuarioReducer.usuarioDatos[key]
            if (key === "Foto perfil") return <View />
            if (key === "Password") return <View />
            if (obj.estado === 0) {
                estados = true
                return <View />
            }
        })
        if (estados) {
            this.props.state.usuarioReducer.estado = ""
            SSBackgroundLocation.getInstance().stop();
            this.props.navigation.replace("EsperandoConfirmacionPage");
            return <View />
        }
        return (
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <View style={{
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                    backgroundColor: STheme.color.primary + "44",
                    overflow: "hidden",
                }}>
                    {this.props.state.imageReducer.getImage(AppParams.urlImages + "perfil.png?type=getPerfil&key_usuario=" + this.props.state.usuarioReducer.usuarioLog.key, {
                    })}
                </View>
                <View>
                    <Text style={{
                        color: "#fff",
                        fontSize: 16,
                        textAlign: "center"
                    }}> {this.getDato("Nombres")}  {this.getDato("Apellidos")}</Text>
                    <Text style={{
                        color: "#fff",
                        textAlign: "center"
                    }}> {this.getDato("Correo")} </Text>
                </View>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(PerfilUsuario);
