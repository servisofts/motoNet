import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Page from '../../../Components/Page';
import { SActivityIndicator, SDate, SIcon, SImage, STable, SText, STheme, SView } from '../../../SComponent';
import AppParam from "../../../_nativeSocket/myProps.json"

class UsuariosTablaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
    getCabecera() {
        var reducer = this.props.state.cabeceraDatosReducer;
        var data = reducer.cabeceras;
        if (!data) {
            if (!this.props.state.socketReducer.socket) {
                return false;
            }
            if (reducer.estado == "cargando") {
                return false;
            }
            var objSend = {
                component: "cabeceraDato",
                type: "getAll",
                estado: "cargando"
            };
            this.props.state.socketReducer.send(objSend);
            return false;
        }
        return data;
    }
    getTabla() {
        var data = this.getData();
        var cabeceras = this.getCabecera();
        if (!data) {
            return <SActivityIndicator />
        }
        if (!cabeceras) {
            return <SActivityIndicator />
        }
        return <STable
            headerProps={{
                style: {
                    backgroundColor: STheme().colorPrimary,
                    borderRadius: 2,
                },
                styleText: {
                    color: STheme().colorTextPrimary
                }
            }}
            header={[
                {
                    label: "#",
                    key: "index",
                    width: 30,


                },
                {
                    label: "Key",
                    key: "usuario/key-1",
                    width: 50,
                },
                {
                    label: "Foto",
                    key: "usuario/key",
                    width: 50,
                    render: (data) => {
                        return <SView style={{
                            width: 35,
                            height: 35,
                            borderRadius: 4,
                            overflow: "hidden"
                        }} onPress={() => {
                            window.open(AppParam.images.urlImage + "perfil.png?type=getPerfil&key_usuario=" + data);
                        }}>
                            <SImage source={{ uri: AppParam.images.urlImage + "perfil.png?type=getPerfil&key_usuario=" + data }} />
                        </SView>
                    }
                },

                {
                    label: "CI",
                    key: "data/CI/dato",
                    width: 100,

                },
                {
                    label: "Nombres",
                    key: "data/Nombres/dato",
                    width: 150,

                },
                {
                    label: "Apellidos",
                    key: "data/Apellidos/dato",
                    width: 120,
                },
                {
                    label: "Correo",
                    key: "data/Correo/dato",
                    width: 200,
                },
                {
                    label: "Teléfono",
                    key: "data/Telefono/dato",
                    width: 120,
                },
                {
                    label: "Verificado",
                    key: "data",
                    width: 70,
                    hidden: (this.props.match.params.tipo != "Conductores"),
                    render: (data) => {
                        var verificado = true;
                        delete data["Foto perfil"];
                        delete data["Password"];
                        Object.keys(data).map((key) => {
                            var dato = data[key]
                            if (dato.estado == 0) {
                                verificado = false;
                            }
                        })
                        return <View style={{
                            width: 20,
                            height: 20,
                            borderRadius: 4,
                            backgroundColor: (verificado ? "#060" : "#600")
                        }}>

                        </View>
                    }
                },
                // {
                //     label: "Password",
                //     key: "data/Password/dato",
                //     width: 100,
                // },
                {
                    label: "Fecha Creacion",
                    key: "usuario/fecha_on",
                    width: 180,
                    render: (data) => { return new SDate(data).toString("yyyy-MM-dd hh:mm:ss") }
                },
                {
                    label: "Rol",
                    key: "usuario/key_cabecera",
                    width: 200,
                    render: (data) => {
                        switch (cabeceras[data].descripcion) {
                            case "registro_administrador": return "Administrador";
                            case "registro_conductor": return "Conductor";
                            case "registro_cliente": return "Cliente";
                            default: return "--";
                        }
                    }
                },
                {
                    label: "Gmail",
                    key: "data/Gmail Key/dato",
                    width: 70,
                    hidden: (this.props.match.params.tipo != "Clientes" && this.props.match.params.tipo != "Todos"),

                },
                {
                    label: "Facebook",
                    key: "data/Facebook key/dato",
                    width: 70,
                    hidden: (this.props.match.params.tipo != "Clientes" && this.props.match.params.tipo != "Todos"),

                },

            ]}

            filter={(obj, i) => {
                switch (this.props.match.params.tipo) {
                    case "Administradores": return (cabeceras[obj.usuario.key_cabecera].descripcion == "registro_administrador") ? true : false;
                    case "Conductores": return (cabeceras[obj.usuario.key_cabecera].descripcion == "registro_conductor") ? true : false;
                    case "Clientes": return (cabeceras[obj.usuario.key_cabecera].descripcion == "registro_cliente") ? true : false;
                    default: return true;
                }
            }}
            data={data}
            onAdd={this.props.match.params.tipo != "Todos" ? () => {
                this.props.history.push("/Usuarios/" + this.props.match.params.tipo + "/registro/")
            } : false}
            actionTypes={['edit', "delete"]}
            onAction={(type, obj) => {
                var cabeceraFinal = "";
                switch (cabeceras[obj.usuario.key_cabecera].descripcion) {
                    case "registro_administrador":
                        cabeceraFinal = "Administradores";
                        break;
                    case "registro_conductor":
                        cabeceraFinal = "Conductores";
                        break;
                    case "registro_cliente":
                        cabeceraFinal = "Clientes";
                        break;
                }
                switch (type) {
                    case "edit":
                        this.props.history.push("/Usuarios/" + cabeceraFinal + "/" + obj.key)
                        break;
                    case "delete":
                        // this.deleteAsociaciones(obj.key)
                        break;
                }
            }}
            dataProps={{
                defaultHeight: 40,
            }}
        />
    }

    getIcon = () => {
        switch (this.props.match.params.tipo) {
            case "Administradores": return "usuarios2"
            case "Conductores": return "usuarios1"
            case "Clientes": return "usuarios4"
            default: return "usuarios3";
        }
    }
    render() {
        return (
            <Page
                history={this.props.history}
                title={"Usuarios - " + this.props.match.params.tipo}
                onBack={"/Usuarios"}
                disableScroll={true}
                icon={<SIcon name={this.getIcon()} />}
            >
                {this.getTabla()}
            </Page>
        );
    }
}

const initStates = (state) => {
    return { state }
};


export default connect(initStates)(UsuariosTablaPage);

