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
    getViajes() {
        var reducer = this.props.state.historialViajeReducer;
        var data = reducer.data;
        if (!data) {
            if (!this.props.state.socketReducer.socket) {
                return false;
            }
            if (reducer.estado == "cargando") {
                return false;
            }
            var objSend = {
                component: "historialViaje",
                type: "getAll",
                estado: "cargando",
                data: ""
            };
            this.props.state.socketReducer.send(objSend);
            return false;
        }
        return data;
    }

    getTipoViaje() {
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
        var data = this.getViajes();
        var usuarios = this.getUsuarios();
        var tipo_viaje = this.getTipoViaje();
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
            onAdd={() => {
                this.props.history.push("/Viajes/Registro")
            }}
            header={[
                { label: "#", key: "index", width: 30, },
                {
                    label: "Usuario",
                    key: "key_usuario",
                    width: 150,
                    render: (data) => {
                        //console.log(JSON.stringify(usuarios[data].data["Nombres"].dato))
                        return usuarios[data].data["Nombres"].dato + " " + usuarios[data].data["Apellidos"].dato
                    }
                },
                {
                    label: "Tipo Viaje",
                    key: "key_tipo_viaje",
                    width: 150,
                    render: (data) => {
                        return tipo_viaje[data]["descripcion"]
                    }
                },
                {
                    label: "Estado",
                    key: "estado",
                    width: 70,
                    //hidden: (this.props.match.params.tipo != "Conductores"),
                    render: (data) => {
                        var verificado = true;
                        var dato = data
                        if (dato == 0) {
                            verificado = false;
                        }
                        return <View style={{
                            width: 20,
                            height: 20,
                            borderRadius: 4,
                            backgroundColor: (verificado ? "#060" : "#600")
                        }}>

                        </View>
                    }
                },
                { label: "Distancia", key: "distancia", width: 75, },
                { label: "Monto estimado", key: "monto_estimado", width: 130, },
                { label: "Tiempo", key: "tiempo", width: 70, },
                // {
                //     label: "Movimientos",
                //     key: "movimientos",
                //     width: 150,
                //     render: (data) => {
                //         //console.log(JSON.stringify(data))
                //         const movi = []
                //         Object.keys(data).map((key) => {
                //             var dato = data[key].tipo;
                //             console.log(dato);
                //             movi.push( dato );

                //         })
                //         return movi.map((number) =>
                //         <li style={{color: STheme().colorTextPrimary}}>{number}</li>
                //       );
                //     }
                // },
                {
                    label: "Inició búsqueda",
                    key: "movimientos/inicio_busqueda",
                    width: 130,
                    render: (data) => {
                        return data ? (new SDate(data["fecha_on"]).toString("yyyy-MM-dd hh:mm:ss")) : "NULL"
                    }
                },
                {
                    label: "Canceló búsqueda",
                    key: "movimientos/cancelo_busqueda",
                    width: 130,
                    render: (data) => {
                        return data ? (new SDate(data["fecha_on"]).toString("yyyy-MM-dd hh:mm:ss")) : "NULL"
                    }
                },
                {
                    label: "Inició viaje",
                    key: "movimientos/inicio_viaje",
                    width: 130,
                    render: (data) => {
                        return data ? (new SDate(data["fecha_on"]).toString("yyyy-MM-dd hh:mm:ss")) : "NULL"
                    }
                },
                {
                    label: "Inició viaje conductor",
                    key: "movimientos/inicio_viaje_conductor",
                    width: 155,
                    render: (data) => {
                        return data ? (new SDate(data["fecha_on"]).toString("yyyy-MM-dd hh:mm:ss")) : "NULL"
                    }
                },
                {
                    label: "Sin conductor",
                    key: "movimientos/sin_conductor",
                    width: 130,
                    render: (data) => {
                        return data ? (new SDate(data["fecha_on"]).toString("yyyy-MM-dd hh:mm:ss")) : "NULL"
                    }
                },
                {
                    label: "Cancelo viaje",
                    key: "movimientos/cancelo_viaje",
                    width: 130,
                    render: (data) => {
                        return data ? (new SDate(data["fecha_on"]).toString("yyyy-MM-dd hh:mm:ss")) : "NULL"
                    }
                },
                {
                    label: "Notificó conductor",
                    key: "movimientos/notifico_conductor",
                    width: 140,
                    render: (data) => {
                        return data ? (new SDate(data["fecha_on"]).toString("yyyy-MM-dd hh:mm:ss")) : "NULL"
                    }
                },
                {
                    label: "Negociación conductor",
                    key: "movimientos/negociacion_conductor",
                    width: 165,
                    render: (data) => {
                        return data ? (new SDate(data["fecha_on"]).toString("yyyy-MM-dd hh:mm:ss")) : "NULL"
                    }
                },
                {
                    label: "Conductor cerca",
                    key: "movimientos/conductor_cerca",
                    width: 140,
                    render: (data) => {
                        return data ? (new SDate(data["fecha_on"]).toString("yyyy-MM-dd hh:mm:ss")) : "NULL"
                    }
                },
                {
                    label: "Conductor llegó",
                    key: "movimientos/conductor_llego",
                    width: 140,
                    render: (data) => {
                        return data ? (new SDate(data["fecha_on"]).toString("yyyy-MM-dd hh:mm:ss")) : "NULL"
                    }
                },
                {
                    label: "Finalizar viaje",
                    key: "movimientos/finalizar_viaje",
                    width: 140,
                    render: (data) => {
                        return data ? (new SDate(data["fecha_on"]).toString("yyyy-MM-dd hh:mm:ss")) : "NULL"
                    }
                },
                {
                    label: "Fecha Creación",
                    key: "fecha_on",
                    width: 150,
                    render: (data) => { return new SDate(data).toString("yyyy-MM-dd hh:mm:ss") }
                },

            ]}
            filter={(obj, i) => {
                // if (obj.estado == 0) {
                //     return false;
                // }
                return true;

            }}
            data={data}
            actionTypes={["edit", "delete"]}
            onAction={(type, obj) => {
                switch (type) {
                    case "edit":
                        this.props.history.push("./Asociaciones/Registro/" + obj.key)
                        break;
                    case "delete":
                        this.deleteAsociaciones(obj.key)
                        break;
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
                title={"Viajes"}
                onBack={"/Inicio"}
                disableScroll={true}
                icon={<SIcon name={"calendario-png"} />}
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

