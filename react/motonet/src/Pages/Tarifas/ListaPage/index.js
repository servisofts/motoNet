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
    getTarifas() {
        var reducer = this.props.state.tipoViajeReducer;
        var data = reducer.data;
        if (!data) {
            if (!this.props.state.socketReducer.socket) {
                return false;
            }
            if (reducer.estado == "cargando") {
                return false;
            }
            var objSend = {
                component: "tipoViaje",
                type: "getAll",
                estado: "cargando",
                data: ""
            };
            this.props.state.socketReducer.send(objSend);
            return false;
        }
        return data;
    }

    deleteAsociaciones(key) {
        if (!key) {
            return <View />
        }
        var bool = window.confirm("Seguro de eliminar el dato?");
        if (bool) {
            var objSend = {
                component: "asociacionMoto",
                type: "eliminar",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                key: key
            };
            this.props.state.socketReducer.send(objSend);
        }
    }

    getTabla() {
        var data = this.getTarifas();
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
            // onAdd={() => {
            //     this.props.history.push("/Parametros/Registro")
            // }}
            header={[
                { label: "#", key: "index", width: 30, },
                { label: "Descripción", key: "descripcion", width: 120 },
                
                {
                    label: "Monto por Km",
                    key: "key-1",
                    width: 200,
                    render: (data) => {
                         var dataTarifaViaje = this.props.state.tipoViajeReducer.data[data].tarifas;
                        return dataTarifaViaje["Monto por kilometro"].monto
                    }
                },
                {
                    label: "Monto por tiempo",
                    key: "key-2",
                    width: 220,
                    render: (data) => {
                         var dataTarifaViaje = this.props.state.tipoViajeReducer.data[data].tarifas;
                        return dataTarifaViaje["Monto por tiempo"].monto
                    }
                },
                {
                    label: "Fecha Creación",
                    key: "fecha_on",
                    width: 150,
                    render: (data) => { return new SDate(data).toString("yyyy-MM-dd hh:mm:ss") }
                }

            ]}
            filter={(obj, i) => {
                if (obj.estado == 0) {
                    return false;
                }
                return true;

            }}
            data={data}
            onAction={(type, obj) => {
                switch (type) {
                    case "edit":
                        this.props.history.push("./Tarifas/Registro/" + obj.key)
                        break;
                    // case "delete":
                    //     this.deleteAsociaciones(obj.key)
                    //     break;
                }
            }}
            dataProps={{
                defaultHeight: 40,
            }}
        />
    }

    render() {
        return (
            <Page
                history={this.props.history}
                title={"Tarifas"}
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

