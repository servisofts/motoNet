import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Page from '../../../Components/Page';
import { SActivityIndicator, SDate, SIcon, SImage, STable, SText, STheme, SView } from '../../../SComponent';
import AppParam from "../../../_nativeSocket/myProps.json"

class ListaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getUsuarios() {
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
    getAsociaciones() {
        var reducer = this.props.state.asociacionMotoReducer;
        var data = reducer.data;
        if (!data) {
            if (!this.props.state.socketReducer.socket) {
                return false;
            }
            if (reducer.estado == "cargando") {
                return false;
            }
            var objSend = {
                component: "asociacionMoto",
                type: "getAll",
                estado: "cargando",
                data: ""
            };
            this.props.state.socketReducer.send(objSend);
            return false;
        }
        return data;
    }

    getTabla() {
        var data = this.getAsociaciones();
        var usuarios = this.getUsuarios();
        // var cabeceras = this.getCabecera();
        if (!data) {
            return <SActivityIndicator />
        }
        if (!usuarios) {
            return <SActivityIndicator />
        }

        return <STable
            headerProps={{
                style: {
                    backgroundColor: STheme().colorPrimary,
                    borderRadius: 4,
                },
                styleText: {
                    color: STheme().colorTextPrimary
                }
            }}
            onAdd={()=>{
                this.props.history.push("/Asociaciones/Registro")
            }}
            header={[
                { label: "#", key: "index", width: 30, },
                { label: "Descripcion", key: "descripcion", width: 200, },
                { label: "Direccion", key: "direccion", width: 300, },
                {
                    label: "Encargado", key: "key_encargado", width: 200, render: (data) => {
                        if (usuarios[data]) {
                            return JSON.stringify(usuarios[data]);
                        }
                        return data;
                    }
                },
                {
                    label: "Fecha Creacion",
                    key: "fecha_on",
                    width: 150,
                    render: (data) => { return new SDate(data).toString("yyyy-MM-dd hh:mm:ss") }
                },

            ]}
            filter={(obj, i) => {
                if (obj.estado == 0) {
                    return false;
                }
                return true;

            }}
            data={data}
            dataProps={{
                defaultHeight: 40,
            }}
        />
    }

    render() {
        return (
            <Page
                history={this.props.history}
                title={"Asociaciones"}
                onBack={"/Inicio"}
                disableScroll={true}
                icon={<SIcon name={"asociacion"} />}
            >
                {this.getTabla()}
            </Page>
        );
    }
}

const initStates = (state) => {
    return { state }
};


export default connect(initStates)(ListaPage);

