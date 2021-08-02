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
        Object.keys(data).map((key) => {
            var obj = data[key];
            if (this.state.exclude.indexOf(obj.dato.descripcion) >= 0) {
                return;
            }
            inputs[obj.dato.descripcion] = { label: obj.dato.descripcion, type: obj.tipo_dato.descripcion, isRequired: obj.dato.requerido }
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
            onSubmit={(dataToInsert) => {
                var arrDatos = [];
                Object.keys(dataToInsert).map((key) => {
                    arrDatos.push({
                        dato: data[key],
                        data: dataToInsert[key]
                    })
                })
                var objSend = {
                    component: "usuario",
                    type: "registro",
                    estado: "cargando",
                    cabecera: this.getCabeceraKey(),
                    data: arrDatos,
                }
                this.props.state.socketReducer.send(objSend)

            }}
        />
    }
    render() {
        if (this.props.state.usuarioReducer.estado == "exito" && this.props.state.usuarioReducer.type == "registro") {
            this.props.state.usuarioReducer.estado = "";
            this.props.history.push("/Usuarios/"+this.props.match.params.tipo)
        }
        return (
            <Page
                history={this.props.history}
                title={"Registro de usuario - " + this.props.match.params.tipo}
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