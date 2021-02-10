import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, Dimensions, RefreshControl, ActivityIndicator, TouchableNativeFeedback, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import ImgFondoCruces from '../../component/ImgFondoCruces';
import ToolTitle from '../../component/ToolTitle';
import Svg from '../../Svg'
import urlFoto from '../../Json/index.json';

class ConsultaPage extends Component {

    static navigationOptions = {
        headerShown: true,
        title: "Especialidad"
    }

    constructor(props) {
        super();
        this.state = {
            isFetching: false,
        };
    }

    componentDidMount() {
        if (!this.props.state.especialidadReducer.data) {
            this.getAllLista();
        }
    }

    getAllLista = () => {
        var objSend = {
            component: "especialidad",
            type: "getAll",
            estado: "cargando",
            data: ""
        };
        this.props.state.socketClienteReducer.sessiones["clinica_nj"].send(objSend, true);
        this.state.isFetching = false;
        console.log(this.state.isFetching)
    }

    onRefresh() {
        this.state.isFetching = true;
        this.getAllLista();
    }

    getLista() {

        if (this.props.state.especialidadReducer.estado == "cargando") {
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
        if (this.props.state.especialidadReducer.estado == "error") {
            return <View>{this.props.state.especialidadReducer.error}</View>
        }

        if (!this.props.state.especialidadReducer.data) {
            this.getAllLista();
            return <View />
        }

        if (!this.props.state.doctorReducer.data) {
            if (this.props.state.doctorReducer.estado == "cargando") {
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

            if (this.props.state.doctorReducer.estado == "error") {
                // return <div>{props.state.doctorReducer.error}</div>
                return <Text>Error</Text>
            }
            var objSend = {
                component: "usuario",
                type: "getAllCabecera",
                estado: "cargando",
                cabecera: "registro_doctor",
                data: ""
            };
            this.props.state.socketClienteReducer.sessiones["clinica_nj"].send(objSend, true);
            return <View />
        }

        var data = this.props.state.especialidadReducer.data;
        return <FlatList
            data={Object.keys(data)}
            renderItem={({ item }) => {
                var obj = data[item];
                var url = urlFoto.urlImages + obj.foto_perfil + `?type=especialidad&key=${item}`;
                var descripcion = obj.descripcion;
                var tamanho = 105;
                if (descripcion.length > tamanho) {
                    descripcion = descripcion.substring(0, tamanho);
                    descripcion += "...";
                }
                return (

                    <View style={{
                        flex: 0.5,
                        marginBottom: 10,
                    }}>
                        <View style={{
                            margin: 5,
                            // elevation: 2,
                            borderColor: "#bfbfbf",
                            // borderWidth: 1.5,
                            borderRadius: 8,
                            backgroundColor: "#f6f6f4",
                            shadowOffset: { width: 1, height: 1, },
                            shadowColor: 'black',
                            shadowOpacity: 1.0,
                            shadowRadius: 20,
                            elevation: 3,
                        }}>
                            <TouchableOpacity style={{
                                width: "100%",
                                height: 150,
                                padding: 10,
                                alignItems: "center",
                                justifyContent: "space-evenly"
                            }}
                                onPress={() => {
                                    this.props.navigation.navigate("ListaDoctoresPorEspecialidadPage", { key_especialidad: obj.key });
                                    // alert(JSON.stringify(obj))
                                }}>

                                {/* <Svg style={{
                                    width: 50,
                                    height: 50,
                                    fill: "#2C4C7E"
                                }} name="Consulta" /> */}

                                <Image source={{ uri: url }}
                                    style={{
                                        // width: Dimensions.get("window").width * 0.2,
                                        // height: Dimensions.get("window").width * 0.2,
                                        width: 70,
                                        height: 70,
                                        borderRadius: 100,
                                        // borderColor: "#a4a4a4",
                                        // borderWidth: 1
                                    }} />
                                <Text style={{
                                    fontSize: 13,
                                    color: "#2C4C7E",
                                    textAlign: "center"
                                }}>
                                    {obj.nombre.toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }}
            numColumns={2}
            style={{
                width: "100%",
            }}
        />
    }


    render() {


        return (
            <View style={{
                flex: 1,
                width: "100%"
            }}>

                <ImgFondoCruces />

                <ToolTitle name="AGENDAR CONSULTA" />

                <ScrollView
                    refreshControl={
                        < RefreshControl
                            refreshing={this.state.isFetching}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }>

                    <TouchableOpacity
                        style={{
                            backgroundColor: "#2C4C7E",
                            height: 50,
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                            margin: 10,
                            marginBottom: 0,
                            borderRadius: 8,
                        }}
                        onPress={() => {
                            //alert("dfdf")
                            this.props.state.navigationReducer.navigate("ListaConsultaPage");
                        }}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 20,
                        }}>
                            Mi historial de consultas
                    </Text>
                        <Svg name="Clicker"
                            style={{
                                width: 30,
                                height: 30,
                                fill: "#fff"
                            }} />
                    </TouchableOpacity>
                    <View style={{
                        marginBottom: 25
                    }}>

                        <Text style={{
                            color: "#2C4C7E",
                            textAlign: "center"
                        }}>
                            Para agendar una cita con un especialista, presione sobre la especialidad.
                    </Text>
                        <View style={{
                            // backgroundColor: "#000",
                            paddingEnd: 8,
                            paddingStart: 8
                        }}>
                            {this.getLista()}
                        </View>
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

export default connect(initStates)(ConsultaPage)