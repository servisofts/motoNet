import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, Image, RefreshControl, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import ImgFondoCruces from '../../component/ImgFondoCruces';
import ToolTitle from '../../component/ToolTitle';
import urlFoto from '../../Json/index.json';

class ListaDoctoresPorEspecialidadPage extends Component {


    static navigationOptions = {
        headerShown: true,
        title: "Doctores"
    }

    constructor(props) {
        super();
        this.state = {
            fotoPerfilUri: false,
            isFetching: false,
        };
    }
    getAllLista = () => {
        var objSend = {
            component: "doctorEspecialidad",
            type: "getAllByKeyEspecialidad",
            estado: "cargando",
            data: "",
            key_especialidad: this.props.navigation.state.params.key_especialidad
        };
        this.props.state.socketClienteReducer.sessiones["clinica_nj"].send(objSend, true);
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
    getFotoPerfil(props) {
        if (!props) {
            return <View
                style={{
                    width: 80,
                    height: 80,
                    borderColor: "#fff",
                    borderWidth: 1,
                    borderRadius: 100,
                    // margin: 10
                }}>
            </View>
        }
        var url = "";
        if (props.data["Foto perfil"]) {
            // url = urlFoto.urlImages + props.data["Foto perfil"].dato + `?type=getPerfil&key_usuario=${props.data["Foto perfil"].key_usuario}&date=${Date.now()}`;
            url = urlFoto.urlImages + props.data["Foto perfil"].dato + `?type=getPerfil&key_usuario=${props.data["Foto perfil"].key_usuario}`;
        } else {
            // url = urlFoto.urlImages + "perfil.png" + `?type=getPerfil&key_usuario=${props.data["Nombres"].key_usuario}&date=${Date.now()}`;
            url = urlFoto.urlImages + "perfil.png" + `?type=getPerfil&key_usuario=${props.data["Nombres"].key_usuario}`;
        }

        return (

            <View
                style={{
                    margin: 10
                }}>
                <Image source={{ uri: url }}
                    style={{
                        width: 80,
                        height: 80,
                        // borderWidth: 1,
                        // borderColor: "#fff",
                        borderRadius: 100,
                        elevation: 6
                    }} />
            </View>
        )
    }

    getLista() {

        if (!this.props.state.doctorEspecialidadReducer.data[this.props.navigation.state.params.key_especialidad]) {
            if (this.props.state.doctorEspecialidadReducer.estado == "cargando") {
                return (
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#ccc"
                    }}>
                        <ImgFondoCruces />
                        <ActivityIndicator size="large" color="#2C4C7E" />
                    </View>
                )
            }
            if (this.props.state.doctorEspecialidadReducer.estado == "error") {
                return <Text>Error</Text>
            }
            this.getAllLista();
            return <View />
        }
        var data = this.props.state.doctorEspecialidadReducer.data[this.props.navigation.state.params.key_especialidad];
        return <FlatList
            data={Object.keys(data)}
            renderItem={({ item }) => {
                var doctor = this.props.state.doctorReducer.data[item];
                if (!doctor) {
                    return <View />
                }
                return (
                    <View style={{
                        flex: 1,
                        margin: 15,
                        marginBottom: 7,
                        // marginTop:,
                        borderRadius: 8,
                        // borderWidth: 1.5,
                        // borderColor: "#bfbfbf",
                        paddingEnd: 10,
                        paddingStart: 10,
                        backgroundColor: "#f6f6f4",
                        shadowOffset: { width: 1, height: 1, },
                        shadowColor: 'black',
                        shadowOpacity: 1.0,
                        shadowRadius: 20,
                        elevation: 5,
                    }}>

                        <TouchableOpacity style={{
                            width: "100%",
                            alignItems: "center",
                            //justifyContent: "center",
                            // backgroundColor: "rgb(44, 75, 129)",
                            // borderRadius: 5,
                            // height: 150,
                            // borderWidth: 3,
                            // borderColor: "#66666644"
                            flexDirection: "row"
                        }}
                            onPress={() => {
                                this.props.navigation.push("AgendarCitaPage", { Doctor: doctor, key_especialidad: this.props.navigation.state.params.key_especialidad });
                            }}>

                            <View style={{
                            }}>
                                {this.getFotoPerfil(doctor)}
                            </View>

                            <View style={{
                                flex: 1,
                                // backgroundColor:"#000"
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    color: "#2C4C7E",
                                    // textAlign: "center",
                                    fontWeight: "bold",
                                    // backgroundColor: "#ccc"
                                }}>
                                    Dr. {doctor.data["Nombres"].dato} {doctor.data["Apellidos"].dato}
                                </Text>
                                <Text style={{
                                    fontSize: 15,
                                    color: "#2C4C7E",
                                    // textAlign: "center"
                                }}>
                                    {doctor.data["Correo"].dato}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }}
            style={{
                width: "100%"
            }}
        />
    }

    render() {

        return (
            <View style={{
                flex: 1,
            }}>
                <ImgFondoCruces />
                <ToolTitle name="Seleccione el doctor de su preferencia." />
                <ScrollView refreshControl={
                    < RefreshControl
                        refreshing={this.state.isFetching}
                        onRefresh={this.onRefresh.bind(this)}
                    />
                }>
                    <View style={{
                        marginBottom: 20
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

export default connect(initStates)(ListaDoctoresPorEspecialidadPage)