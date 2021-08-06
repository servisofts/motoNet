import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Page from '../../../Components/Page';
import { SActivityIndicator, SForm, SIcon, SInput, SView } from '../../../SComponent';

class RegistroPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exclude: ["Foto perfil", "Facebook key", "Gmail Key"]
        };
    }
    getIcon = () => {
        switch (this.props.match.params.tipo) {
            case "Administradores": return "usuarios2"
            case "Conductores": return "usuarios1"
            case "Clientes": return "usuarios4"
            default: return "usuarios3";
        }
    }
    getCabeceraKey = () => {
        switch (this.props.match.params.tipo) {
            case "Administradores": return "registro_administrador"
            case "Conductores": return "registro_conductor"
            case "Clientes": return "registro_cliente"
            default: return "";
        }
    }
    getData() {
        var reducer = this.props.state.usuarioReducer;
        var data = reducer.data;
        if (!data) {
            if (!this.props.state.socketReducer.socket) {
                return false;
            }
            if (reducer.estado == "cargando") {
                return false;
            }
            var objSend = {
                component: "usuario",
                type: "getAll",
                estado: "cargando",
                cabecera: "%%",
                data: ""
            };
            this.props.state.socketReducer.send(objSend);
            return false;
        }
        return data;
    }

    getButtonName() {
        var usuario = {};
        var usuarios = this.getData();
        if (!usuarios) {
            return <View />
        }
        var usrAll = usuarios[this.props.match.params.key];
        if (!usrAll) {
            return <View />;
        }
        usuario = usrAll["data"];
        var verificado = true;
        Object.keys(usuario).map((key) => {
            var dato = usuario[key]
            if (dato.estado == 0) {
                verificado = false;
            }
        })
        return (verificado ? "Bloquear" : "Desbloquear")

    }
    getCabecera(cabecera) {
        var reducer = this.props.state.cabeceraDatosReducer;
        var datosCabecera = reducer.data[cabecera];
        var dataCabecera = reducer.dataCabecera[cabecera];
        if (!datosCabecera || !dataCabecera) {
            if (!this.props.state.socketReducer.socket) {
                return false;
            }
            if (reducer.estado == "cargando") {
                return false;
            }
            var objSend = {
                component: "cabeceraDato",
                type: "getDatoCabecera",
                estado: "cargando",
                cabecera: cabecera
            }
            this.props.state.socketReducer.send(objSend)
            return false;
        }
        return dataCabecera;
    }

    getForm() {
        var data = this.getCabecera(this.getCabeceraKey());
        if (!data) return <SActivityIndicator />
        var inputs = {};
        var usuario = {};
        if (this.props.match.params.key) {
            if (this.props.match.params.key != "registro") {
                var usuarios = this.getData();
                if (!usuarios) {
                    return <View />
                }
                var usrAll = usuarios[this.props.match.params.key];
                if (!usrAll) {
                    return <View />;
                }
                usuario = usrAll["data"];
            }

        }
        Object.keys(data).map((key) => {
            var obj = data[key];
            var defaultv = "";
            if (this.state.exclude.indexOf(obj.dato.descripcion) >= 0) {
                return;
            }
            if (usuario[obj.dato.descripcion]) {
                defaultv = usuario[obj.dato.descripcion].dato;
            }
            inputs[obj.dato.descripcion] = { label: obj.dato.descripcion, type: obj.tipo_dato.descripcion, isRequired: obj.dato.requerido, defaultValue: defaultv , editable: false}
        })
        return <SForm
            props={{
                variant: "center",
                col: "xs-12 md-6",
            }}
            inputProps={{
                customStyle: "primary",
            }}
            inputs={inputs}

            onSubmit={() => {
                // var objSend = {
                //     component: "parametrosViaje",
                //     type: (this.props.match.params.key?"modificar":"registro"),
                //     estado: "cargando",
                //     key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                //     data: {

                //         ...data
                //     }
                // };
                //this.sendBlock()
                var usuario = {};
                var usuarios = this.getData();
                if (!usuarios) {
                    return <View />
                }
                var usrAll = usuarios[this.props.match.params.key];
                if (!usrAll) {
                    return <View />;
                }
                usuario = usrAll["data"];
               // alert(JSON.stringify(usuario) + "dddd")
               
                var objSend = {
                    component: "usuario",
                    type: "bloquear" ,
                    estado: "cargando",
                    cabecera: this.getCabeceraKey(),
                    data: usuario,
                    ...(this.props.match.params.key ? {
                        key_usuario: this.props.match.params.key
                    } : {})
                }
                console.log(JSON.stringify(objSend))
                // this.props.state.socketReducer.send(objSend)
                // this.props.history.goBack();
            }}
            onSubmitName={this.getButtonName()}



        />
    }
    render() {
        if (this.props.state.usuarioReducer.estado == "exito" && this.props.state.usuarioReducer.type == "registro") {
            this.props.state.usuarioReducer.estado = "";
            this.props.history.push("/Usuarios/" + this.props.match.params.tipo)
            return <SView />
        }
        return (
            <Page
                history={this.props.history}
                title={"Bloqueo de usuario - " + this.props.match.params.tipo}
                onBack={"goBack"}
                icon={<SIcon name={this.getIcon()} />}
            >
                <SView props={{
                    variant: "center",
                    col: "xs-12",
                }}>
                    {this.getForm()}
                </SView>
            </Page>
        );
    }
}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(RegistroPage);