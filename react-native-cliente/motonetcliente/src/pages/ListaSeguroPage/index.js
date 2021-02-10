import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, Image, Dimensions, Alert, FlatList, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import ImgFondoCruces from '../../component/ImgFondoCruces'
import ToolTitle from '../../component/ToolTitle';
import urlFoto from '../../Json/index.json';
import Svg from '../../Svg';
import AppParams from '../../Json';

export class ListaSeguroPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fotoPerfilUri: "",
            isFetching: false,
        }
    }


    componentDidMount() {

    }

    getAllLista = () => {
        console.log("Obtengo datos de servidor autorizacion")
        this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
            component: "codigoSeguro",
            type: "getAllByUsuario",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            estado: "cargando"
        }, true);
        this.state.isFetching = false;
        console.log(this.state.isFetching)
    }

    onRefresh() {
        // console.log(this.state.isFetching)
        // alert("fdfd")
        this.state.isFetching = true;
        // console.log(this.state.isFetching)
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
                alignItems: "center",
                marginBottom: 10,
                // backgroundColor: "#fff",
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
                        color: "#fff",
                    }}>
                        {mensaje}
                    </Text>
                </View>
            </View>
        )
    }

    deleteAddress(id) {
        Alert.alert(
            'ELIMINAR ASEGURADO',
            '¿Estás seguro de que deseas eliminar este asegurado?',
            [
                { text: 'Cancelar', onPress: () => console.log(id), style: 'cancel' },
                { text: 'Aceptar', onPress: () => this.deleteAddressDetail(id) },
            ],
            { cancelable: false }
        )
    }

    deleteAddressDetail(id) {
        this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
            component: "codigoSeguro",
            type: "eliminar",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            key_asegurado: id,
            estado: "cargando"
        }, true);
        return <View />
    }

    getIconClick = (id) => {
        // if (!this.props.navigation.state.params) {
        //     return <View />
        // }
        // if (!this.props.navigation.state.params.tipo) {
        //     return <View />
        // }
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <TouchableOpacity
                    onPress={() => {
                        { this.deleteAddress(id) }
                    }}>
                    <Svg name="Eliminar"
                        style={{
                            width: 30,
                            height: 30,
                            fill: "#F2453E"
                        }} />
                </TouchableOpacity>
            </View>)
    }

    getContentList = (texto, obj) => {
        return (
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10
                // backgroundColor:"#ccc"
            }}>
                <Text style={{
                    flex: 1,
                    color: "#2C4C7E",
                    fontSize: 13,
                }}>
                    {texto}
                </Text>
                <Text style={{
                    flex: 1.6,
                    color: "#2C4C7E",
                    fontSize: 16,
                    fontWeight: "bold",
                    // backgroundColor: "#ccc"
                }}> {obj}</Text>

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
        // if (this.props.state.seguroReducer.estado == "cargando") {
        //     return <Text>Cargando</Text>
        // }
        if (this.props.state.seguroReducer.estado == "cargando") {
            // console.log("entroo")
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
        if (!this.props.state.seguroReducer.data) {
            this.getAllLista();
            return <Text>Cargando</Text>
        }
        var data = this.props.state.seguroReducer.data;
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
            // Object.keys(data).map((key) => {
            renderItem={({ item }) => {
                // Object.keys(data).map((key) => {
                var obj = data[item];
                var url = urlFoto.urlImages + obj.foto + `?type=analisis&key=${item}`;
                this.state.fotoPerfilUri = url;
                return (
                    <View style={{
                        margin: 10,
                        borderRadius: 8,
                        borderWidth: 1.5,
                        borderColor: "#bfbfbf",
                    }}>
                        <View style={{
                            width: "100%",
                            borderRadius: 5,
                            padding: 8,
                            flexDirection: "row"
                        }}>
                            <View style={{
                                flex: 1
                            }}>
                                {this.getContentList("Nombre Completo:", obj.nombre)}
                                {this.getContentList("Código Seguro:", obj.codigo)}
                                {this.getContentList("Tipo de Asegurado:", obj.tipo.toUpperCase())}
                            </View>
                            <View>
                                {this.getIconClick(obj.key)}
                            </View>

                        </View >
                    </View >
                )
            }}
        />
    }

    render() {



        var isRegitroAuto = false;
        var title = "ASEGURADOS";
        if (this.props.navigation.state.params) {
            if (this.props.navigation.state.params.tipo == "asignarAutorizacion") {
                isRegitroAuto = true;
                title = "SELECCIONE UN ASEGURADO";
            }
        }

        return (
            <View style={{
                flex: 1,
            }}>
                <ImgFondoCruces />

                <ToolTitle name={title} />

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

                <TouchableOpacity
                    style={{
                        position: "absolute",
                        backgroundColor: "#2C4C7E",
                        // height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        // margin: 10,
                        width: "100%",
                        bottom: 0,
                        height: Dimensions.get("window").height * 0.08,
                        flexDirection: "row"
                    }}
                    onPress={() => {
                        // alert("dfdf")
                        this.props.navigation.navigate("SubirDocumentoPage");
                    }}>
                    <Text style={{
                        color: "#fff",
                        marginEnd: 40
                    }}>
                        REGISTRAR ASEGURADO
                    </Text>
                    <Svg name="Clicker"
                        style={{
                            width: 25,
                            height: 25,
                            fill: "#fff",
                        }} />
                </TouchableOpacity>
            </View>

        )
    }
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ListaSeguroPage);
