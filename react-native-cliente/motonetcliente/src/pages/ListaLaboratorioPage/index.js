import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, Image, Dimensions, FlatList, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import ImgFondoCruces from '../../component/ImgFondoCruces'
import ToolTitle from '../../component/ToolTitle';
import urlFoto from '../../Json/index.json';
import AppParams from '../../Json';
import ModalPage from '../ModalPage';

export class ListaLaboratorioPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fotoPerfilUri: "",
            isFetching: false,
            ModalVisible: false,
            otherParamsToSend: 1,
            fotoUriAux: "",
        }
    }

    componentDidMount() {
        if (!this.props.state.laboratorioReducer.data) {
            this.getAllLista();
        }
    }

    btnOpenModal(uri) {
        this.state.fotoUriAux = uri
        this.setState({ ModalVisible: true });
    };


    callbackAfterCloseModal(success, otherValue) {
        this.setState({ ModalVisible: false });
        console.log("success >> " + success + " otherValue >> " + otherValue);
    }


    getAllLista = () => {
        console.log("Obtengo datos de servidor autorizacion")
        this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
            component: "laboratorio",
            type: "getAllByUsuario",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            estado: "cargando"
        }, true);
        this.state.isFetching = false;
        console.log(this.state.isFetching)
    }

    onRefresh() {
        console.log(this.state.isFetching)
        // alert("fdfd")
        this.state.isFetching = true;
        console.log(this.state.isFetching)
        this.getAllLista();
        // return <View />
    }


    estadoCitaCirculo(estado, mensaje) {
        var colorEstado
        if (estado == 1) {
            colorEstado = "#E88133"
        }
        if (estado == 2) {
            colorEstado = "#090"
        }
        return (

            <View style={{
                flexDirection: "row",
                marginTop: 10,
                // justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
                // backgroundColor: "#fff",
                // height:"15%"
            }}>

                <View style={{
                    width: 30,
                    height: 30,
                    borderRadius: 100,
                    backgroundColor: colorEstado,
                    marginRight: 10
                }}>
                </View>

                <View style={{
                    flex: 1
                }}>
                    <Text style={{
                        fontSize: 15,
                        color: "#2C4C7E",
                    }}>
                        {mensaje}
                    </Text>
                </View>

            </View>

        )
    }

    ordenador = (listaKeys, data) => {
        listaKeys.sort(function (a, b) {
            var textA = new Date(data[a].fecha_on).getTime();
            var textB = new Date(data[b].fecha_on).getTime();
            return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
        });
        return listaKeys;
    }


    getLista = () => {

        if (this.props.state.laboratorioReducer.estado == "cargando") {
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

        if (!this.props.state.laboratorioReducer.data) {
            this.getAllLista();
            return <View />
        }
        var data = this.props.state.laboratorioReducer.data;
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

        return (
            <FlatList
                data={this.ordenador(Object.keys(data), data)}
                // Object.keys(data).map((key) => {
                renderItem={({ item }) => {
                    var obj = data[item];
                    var url = urlFoto.urlImages + "laboratorio_small.png" + `?type=laboratorio&key=${item}`;
                    var urlLarge = urlFoto.urlImages + "laboratorio.png" + `?type=laboratorio&key=${item}`;
                    this.state.fotoPerfilUri = url;
                    var mensaje;
                    var estado;
                    if (!obj.cotizacion) {
                        mensaje = "Esperando confirmación."
                        estado = 1
                    }

                    if (obj.cotizacion) {
                        mensaje = "Su cotización fue aceptada";
                        estado = 2
                    }

                    return (
                        <View style={{
                            margin: 10,
                            borderRadius: 8,
                            borderWidth: 1.5,
                            borderColor: "#bfbfbf",
                        }}>
                            <View style={{
                                width: "100%",
                                // backgroundColor: "#2C4C7E",
                                borderRadius: 5,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 8
                            }}>

                                <View style={{
                                    flex: 1,
                                }}>
                                    <TouchableOpacity
                                        onPress={() => this.btnOpenModal(urlLarge)}
                                        style={{
                                            borderRadius: 10,
                                            height: 202,
                                            width: (Dimensions.get("window").width * 0.42) + 2,
                                            borderWidth: 1,
                                            borderColor: "#bfbfbf",
                                            overflow: "hidden",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                        <View style={{ position: "absolute", width: "60%", justifyContent: "center" }}>
                                            <ActivityIndicator color="#bfbfbf" size="large"></ActivityIndicator>
                                        </View>
                                        <Image source={{ uri: this.state.fotoPerfilUri }}
                                            style={{
                                                width: Dimensions.get("window").width * 0.42,
                                                height: 200,
                                                borderRadius: 10,
                                                // resizeMode: "center",
                                            }} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{
                                    flex: 1,
                                }}>
                                    {!obj.cotizacion ? <View /> : (
                                        <Text style={{
                                            color: "#2C4C7E",
                                            fontSize: 20
                                        }}>
                                            Cotización: {obj.cotizacion} Bs.
                                        </Text>
                                    )}

                                    {!obj.glosa ? <View /> : (
                                        <Text style={{
                                            color: "#2C4C7E",
                                            fontSize: 15
                                        }}>
                                            Glosa: {obj.glosa}
                                        </Text>
                                    )}

                                    {!obj.fecha_cotizacion ? <View /> : (
                                        <Text style={{
                                            color: "#2C4C7E",
                                            fontSize: 15
                                        }}>
                                            Fecha de cotización: {new Date(obj.fecha_cotizacion).toLocaleDateString()}
                                        </Text>
                                    )}
                                    {this.estadoCitaCirculo(estado, mensaje)}
                                </View>
                            </View>
                        </View >
                    )
                }}
            />
        )
    }

    render() {


        return (
            <View style={{
                flex: 1,
            }}>

                <ImgFondoCruces />

                <ToolTitle name="LABORATORIO" />

                <ScrollView refreshControl={
                    < RefreshControl
                        refreshing={this.state.isFetching}
                        onRefresh={this.onRefresh.bind(this)}
                    />
                }>
                    <View style={{
                        // marginBottom: 0

                    }}>
                        {this.getLista()}

                    </View>
                </ScrollView>

                <ModalPage
                    fotoUriAux={this.state.fotoUriAux}
                    ventana="ModalImage"
                    callbackAfterCloseModal={this.callbackAfterCloseModal.bind(this)}
                    otherParamsToSend={this.state.otherParamsToSend}
                    ModalVisible={this.state.ModalVisible}
                    closeModal={() => {
                        this.state.ModalVisible = false;
                        this.setState({ ...this.state })
                    }}
                />

                {/* <TouchableOpacity
                    style={{
                        position: "absolute",
                        backgroundColor: "#a4a4a4",
                        justifyContent: "center",
                        alignItems: "center",
                        // margin: 10,
                        width: "100%",
                        bottom: 65,
                        height: 65
                    }}
                    onPress={() => {
                        // alert("dfdf")
                        this.props.navigation.navigate("LaboratorioPage");
                    }}>
                    <Text style={{
                        color: "#fff"
                    }}>
                        Ver web de resultados
                        </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        position: "absolute",
                        backgroundColor: "#2C4C7E",
                        justifyContent: "center",
                        alignItems: "center",
                        // margin: 10,
                        width: "100%",
                        bottom: 0,
                        height: 65
                    }}
                    onPress={() => {
                        // alert("dfdf")
                        this.props.navigation.navigate("SubirLaboratorioPage");
                    }}>
                    <Text style={{
                        color: "#fff"
                    }}>
                        Cotizar laboratorio
                        </Text>
                </TouchableOpacity> */}
            </View>

        )
    }
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ListaLaboratorioPage);

