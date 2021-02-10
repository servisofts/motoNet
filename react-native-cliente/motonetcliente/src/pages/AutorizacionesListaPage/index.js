import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Text, View, TouchableOpacity, ScrollView, Dimensions, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import Svg from '../../Svg'
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs'
import SubirDocumentoPage from '../SubirDocumentoPage';
import ImgFondoCruces from '../../component/ImgFondoCruces';
import ToolTitle from '../../component/ToolTitle';
import EsperarFoto from '../../component/EsperarFoto';
import urlFoto from '../../Json/index.json';
import moment from 'moment';
import ModalPage from '../ModalPage';
class AutorizacionesListaPage extends Component {

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
        if (!this.props.state.ordenReducer.data) {
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
        this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
            component: "ordenSeguro",
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

    resize(image) {
        ImageResizer.createResizedImage("data:image/jpeg;base64," + image, 500, 500, 'PNG', 100).then((uri) => {
            console.log(uri)
            RNFS.readFile(uri.path, 'base64').then((resp) => {
                //this.props.registrarFoto(resp)
                this.state.foto = resp;
            });
        }).catch(err => {
            console.log(err);
        });
        this.setState({ ...this.state.foto })
        return <View />
    }


    pickPhoto = () => {

        ImagePicker.showImagePicker((response) => {
            if (response.didCancel) {
                return <View />
            } else if (response.error) {
                return <View />
            } else if (response.customButton) {
                return <View />
            } else {
                this.resize(response.data);
                return <View />
            }
        });
    }

    // getButton(nombre) {
    //     return (
    //         <View style={{
    //             width: "100%",
    //             height: 200,
    //             alignItems: "center",
    //             justifyContent: "center",
    //         }}>

    //             <TouchableOpacity style={{
    //                 alignItems: "center",
    //                 width: "60%",
    //                 height: 200
    //             }}
    //                 onPress={() => {
    //                     this.props.navigation.navigate("SubirDocumentoPage", { nombre: nombre });
    //                     return <View />
    //                 }}>

    //                 <Svg name={nombre}
    //                     style={{
    //                         width: "100%",
    //                         height: "100%",
    //                     }}
    //                 />
    //             </TouchableOpacity>
    //         </View>
    //     )
    // }

    estadoCitaCirculo(estado, mensaje) {
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
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
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
        if (this.props.state.ordenReducer.estado == "cargando") {
            // console.log("entroo")
            return (
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    // width: "100%",
                }}>
                    <ImgFondoCruces />
                    <ActivityIndicator size="large" color="#2C4C7E" />
                </View>
            )
        }
        if (!this.props.state.ordenReducer.data) {
            this.getAllLista();
            return <View />
        }
        var data = this.props.state.ordenReducer.data;
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
                    var url = urlFoto.urlImages + "orden_seguro_small.png" + `?type=orden_seguro&key=${item}`;
                    var urlLarge = urlFoto.urlImages + obj.foto + `?type=orden_seguro&key=${item}`;
                    this.state.fotoPerfilUri = url;
                    var mensaje;
                    var estado;
                    if (!obj.accion) {
                        mensaje = "Esperando confirmación."
                        estado = 1
                    }

                    if (obj.accion) {
                        if (obj.accion == "aceptar") {
                            mensaje = "Su Orden fue aceptada";
                            estado = 2
                        }
                        if (obj.accion == "denegar") {
                            mensaje = "Su Orden fue denegada";
                            estado = 3
                        }
                    }
                    // alert(obj.seguro.codigo)
                    // console.log(obj.seguro.codigo)
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
                                    // padding: 8
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
                                    // padding:10
                                }}>

                                    <Text style={{
                                        color: "#2C4C7E",
                                        fontSize: 16
                                    }}>
                                        Nombre: {obj.seguro.nombre}
                                    </Text>

                                    <Text style={{
                                        color: "#2C4C7E",
                                        fontSize: 16
                                    }}>
                                        C. Seguro: {obj.seguro.codigo}
                                    </Text>
                                    {!obj.fecha_accion ? <View /> : (
                                        <Text style={{
                                            color: "#2C4C7E",
                                        }}>
                                            Fecha: { moment(obj.fecha_accion).format("DD/MM/YYYY hh:mm A")}
                                        </Text>
                                    )}

                                    {!obj.detalle ? <View /> : (
                                        <Text style={{
                                            color: "#2C4C7E",
                                            // fontSize: 15
                                        }}>
                                            Detalle: {obj.detalle}
                                        </Text>
                                    )}

                                    {!obj.detalle2 ? <View /> : (
                                        <Text style={{
                                            color: "#2C4C7E",
                                            // fontSize: 15
                                        }}>
                                            Contáctate: {obj.detalle2}
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


        // if (this.props.state.usuarioReducer.usuarioDatos["Codigo seguro"]) {
        //     if (this.props.state.usuarioReducer.usuarioDatos["Codigo seguro"].estado === 1) {
        //         // return <Lista setComponent={props.setComponent} />
        //     }
        //     return <EsperarFoto datos={this.props.state.usuarioReducer.usuarioDatos} />
        // }

        return (

            <View style={{
                flex: 1,
                width: "100%",
                alignItems: "center"
            }}>

                <ImgFondoCruces />

                <ToolTitle name="AUTORIZACIONES DE SEGUROS" />

                {/* <ScrollView>

                    <View style={{
                        flex: 1,
                    }}>

                        {this.getButton("bisa")}
                        {this.getButton("alianza")}
                        {this.getButton("nacional")}

                    </View>
                </ScrollView> */}

                <ScrollView style={{
                    width: "100%",
                }}
                    refreshControl={
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

                <TouchableOpacity
                    style={{
                        position: "absolute",
                        backgroundColor: "#2C4C7E",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        bottom: 0,
                        // borderRadius: 10,
                        height: Dimensions.get("window").height * 0.08,
                        flexDirection: "row"
                    }}
                    onPress={() => {
                        // alert("dfdf")
                        this.props.navigation.navigate("SubirOrdenPage");
                        // this.props.navigation.navigate("ListaSeguroPage",{tipo:"asignarAutorizacion"});
                    }}>
                    <Text style={{
                        color: "#fff",
                        marginEnd: 40
                    }}>
                        NUEVA AUTORIZACIÓN
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

export default connect(initStates)(AutorizacionesListaPage);
