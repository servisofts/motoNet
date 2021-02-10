import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl, ActivityIndicator, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import ImgFondoCruces from '../../component/ImgFondoCruces';
import ToolTitle from '../../component/ToolTitle';
import urlFoto from '../../Json/index.json';

class ListaConsultaPage extends Component {

    constructor(props) {
        super();
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            fotoPerfilUri: false
        };
    }


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        if (!this.props.state.consultaReducer.data) {
            this.getAllLista();
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }


    getAllLista = () => {
        console.log("Obtengo datos de servidor consulta")
        this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
            component: "consulta",
            type: "getAllByUsuario",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            estado: "cargando",
        }, true);
        this.state.isFetching = false;
        console.log(this.state.isFetching)
    }


    handleBackButtonClick() {
        // this.props.navigation.goBack(null);
        // const resetAction = NavigationActions.navigate({
        //     routeName: 'ServicioPage',
        //     params: {},
        //     actions: [
        //         NavigationActions.navigate({ routeName: "ListaConsultaPage" })
        //     ],
        // });
        this.props.navigation.setParams({ "backTo": "ServicioPage" });
        this.props.navigation.dispatch({
            routeName: "ServicioPage",
            type: "GoToRoute"
        });
        return true;
    }

    onRefresh() {
        this.state.isFetching = true;
        this.getAllLista();
    }

    estadoCitaCirculo(estado) {
        var colorEstado
        if (estado == 1) {
            colorEstado = "#E88133"
        }
        if (estado == 2) {
            colorEstado = "#090"
        }
        if (estado == 3) {
            colorEstado = "#f00"
        }
        return (
            <View style={{
                width: 30,
                height: 30,
                borderRadius: 100,
                backgroundColor: colorEstado,
                marginRight: 10
            }}>
            </View>
        )
    }


    gegPerfilDoctor = (obj) => {

        if (!this.props.state.usuarioReducer.data[obj.key_doctor]) {
            if (this.props.state.usuarioReducer.estado == "cargando") {
                return (
                    < ActivityIndicator size="small" color="#2C4C7E" />
                )
            }
            this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
                component: "usuario",
                type: "getById",
                key: obj.key_doctor,
                cabecera: "registro_doctor",
                estado: "cargando"
            }, true);
            this.props.state.usuarioReducer.estado = "cargando"
            return <View />
        }

        var usuario = this.props.state.usuarioReducer.data[obj.key_doctor];
        var url = "";
        // console.log(usuario)
        if (usuario["Foto perfil"]) {
            url = urlFoto.urlImages + usuario["Foto perfil"].dato + `?type=getPerfil&key_usuario=${usuario["Foto perfil"].key_usuario}`;
        } else {
            url = urlFoto.urlImages + "perfil.png" + `?type=getPerfil&key_usuario=${usuario["Nombres"].key_usuario}`;
        }
        // if (usuario["Foto perfil"]) {
        //     url = urlFoto.urlImages + usuario["Foto perfil"].dato + `?type=getPerfil&key_usuario=${usuario["Foto perfil"].key_usuario}`;
        // }

        return <>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                {
                    !url ? (
                        <View style={{
                            width: 80,
                            height: 80,
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: "#ccc",
                            marginRight: 10,
                            // backgroundColor: "#ccc"
                        }} >
                        </View>
                    ) : (
                            <View style={{
                                marginRight: 10,
                                marginBottom: 10
                            }} >
                                <Image source={{ uri: url }}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 100,
                                        borderWidth: 1,
                                        borderColor: "#ccc",
                                    }} />
                            </View>
                        )
                }
            </View>

            <View style={{
                flex: 2,
            }}>
                <Text style={{
                    fontSize: 18,
                    color: "#2C4C7E",
                    marginRight: 10
                    // textAlign:"center"
                }}>
                    {usuario["Nombres"].dato + " " + usuario["Apellidos"].dato}
                </Text>
            </View>
        </>
    }

    ordenador = (listaKeys, data) => {
        listaKeys.sort(function (a, b) {
            var textA = new Date(data[a].fecha_on).getTime();
            var textB = new Date(data[b].fecha_on).getTime();
            return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
        });
        return listaKeys;
    }

    getContentlist = (texto, obj) => {

        return (
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                // marginTop: 10
                marginLeft: 10,
                marginRight: 10,
                // backgroundColor: "#ccc"
            }}>
                <Text style={{
                    fontSize: 15,
                    color: "#2C4C7E",
                    flex: 1,
                    // textAlign: "center"
                }}>
                    {texto}
                </Text>
                <Text style={{
                    color: "#4d4d4d",
                    fontSize: 15,
                    flex: 1.3,
                }}>{obj}</Text>
            </View>
        )
    }

    getLista() {
        // if (this.props.state.consultaReducer.estado == "cargando") {
        //     return <Text>Cargando</Text>;
        // }
        if (this.props.state.consultaReducer.estado == "cargando") {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <ImgFondoCruces />
                    <ActivityIndicator size="large" color="#2C4C7E" />
                </View>
            )
        }
        if (!this.props.state.consultaReducer.data) {
            this.getAllLista();
            return <View />
        }

        var data = this.props.state.consultaReducer.data;
        if (Object.keys(data).length <= 0) {
            return <View style={{
                width: "100%",
                height: 300,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text>No se encontraron resultados.</Text>
            </View>
        }

        return <FlatList
            data={this.ordenador(Object.keys(data), data)}
            renderItem={({ item }) => {
                var obj = this.props.state.consultaReducer.data[item];
                var mensaje;
                var estado;

                if (obj.movimientos["solicitar_cita"]) {
                    mensaje = "Esperando confirmación."
                    estado = 1
                }

                if (obj.movimientos["confirmar_cita"]) {
                    mensaje = "Su cita fue aceptada";
                    estado = 2
                }

                if (obj.movimientos["cancelar_cita"]) {
                    mensaje = "Su cita fue denegada";
                    estado = 3
                }

                return (
                    <View style={{
                        flex: 1,
                        margin: 15,
                        marginBottom: 7,
                        borderRadius: 8,
                        borderWidth: 1.5,
                        borderColor: "#bfbfbf",
                        // backgroundColor:"#ccc"
                    }}>
                        <View style={{
                            flexDirection: "row",
                            marginTop: 10,
                            alignItems: "center",
                        }}>
                            {this.gegPerfilDoctor(obj)}
                        </View>

                        {!obj.especialidad ? (
                            this.getContentlist("Especialidad:", "not Found")
                        ) : (
                                this.getContentlist("Especialidad:", obj.especialidad.nombre)
                            )}

                        {this.getContentlist("Consulta:", obj.tipo_consulta.descripcion)}
                        {this.getContentlist("Fecha de consulta:", moment(obj.fecha_consulta).format("DD/MM/YYYY hh:mm A"))}

                        {!obj.detalle ? (
                            <View />
                        ) : (
                                this.getContentlist("Link", obj.detalle)
                            )}

                        <View style={{
                            flexDirection: "row",
                            marginTop: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 10
                        }}>
                            {this.estadoCitaCirculo(estado)}
                            <Text style={{
                                fontSize: 15,
                                color: "#4d4d4d",
                                textAlign: "center"
                            }}>
                                {mensaje}
                            </Text>
                        </View>
                    </View >
                )
            }}
            style={{
                width: "100%"
            }}
        />
    }

    render() {

        // if (this.props.state.consultaReducer.estado == "cargando") {
        //     return (
        //         <View style={{
        //             flex: 1,
        //             justifyContent: "center",
        //             alignItems: "center"
        //         }}>
        //             <ImgFondoCruces />
        //             <ActivityIndicator size="large" color="#2C4C7E" />
        //         </View>
        //     )
        // }

        // if (!this.props.state.consultaReducer.data) {

        //     if (this.props.state.consultaReducer.estado == "cargando") {
        //         return <View />
        //     }
        //     if (this.props.state.consultaReducer.estado == "error") {
        //         return <View>{this.props.state.consultaReducer.error}</View>
        //     }
        //    }

        return (
            <View style={{
                flex: 1,
                // justifyContent: "center"
            }}>
                <ImgFondoCruces />

                <ToolTitle name="CONSULTAS" />

                <ScrollView refreshControl={
                    < RefreshControl
                        refreshing={this.state.isFetching}
                        onRefresh={this.onRefresh.bind(this)}
                    />
                }>
                    <View style={{
                        marginBottom: 60
                    }}>
                        {this.getLista()}
                    </View>

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    button: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(44, 75, 129)",
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#000",
        height: 150
    },
    texto: {
        color: "#fff"
    },

});

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ListaConsultaPage)