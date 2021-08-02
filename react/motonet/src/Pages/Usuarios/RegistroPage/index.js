import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Page from '../../../Components/Page';
import { SActivityIndicator, SForm, SIcon, SInput, SView } from '../../../SComponent';

class RegistroPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exclude: ["Foto perfil",]
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
        if (!datosCabecera) {
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
        return datosCabecera;
    }
    getForm() {
        var data = this.getCabecera(this.getCabeceraKey());
        if (!data) return <SActivityIndicator />
        var inputs = {};
        data.map((obj) => {
            if (this.state.exclude.indexOf(obj.dato.descripcion) >= 0) {
                return;
            }
            inputs[obj.dato.descripcion] = { label: obj.dato.descripcion, type: obj.tipo_dato.descripcion, isRequired: obj.dato.requerido }
        })
        console.log(data);
        return <SForm
            props={{
                variant: "center",
                col: "xs-12 md-6",
            }}
            inputProps={{
                customStyle: "primary",
            }}
            inputs={inputs}
            onSubmit={(data) => {
                console.log(data);
            }}
        />
    }
    render() {
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