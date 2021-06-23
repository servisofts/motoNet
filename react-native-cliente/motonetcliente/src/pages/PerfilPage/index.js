import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image, BackHandler, Dimensions } from 'react-native';
// import * as popupActions from '../../action/popupActions'
import Svg from '../../Svg';
import ImagePicker from 'react-native-image-picker';
import FieldsPerfil from '../../component/FieldsPerfil';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs'
import urlFoto from '../../Json/index.json';
import ImgFondoCruces from '../../component/ImgFondoCruces';
import { ScrollView } from 'react-native-gesture-handler';
import SubirFotoPerfil from '../../component/SubirFotoPerfil';
import BarraSuperior from '../../component/BarraSuperior';
//import PerfilConductorPage from '../PerfilConductorPage';

// const { width, height } = Dimensions.get("window");


class PerfilPage extends Component {
    static navigationOptions = {
        headerShown: false
    }
    constructor(props) {
        super(props);
        this.state = {
            // popup: false,
            fotoPerfilUri: "",
            isVentana: false,
        }
    }

    componentWillMount() {
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        if (!this.props.state.usuarioReducer.usuarioDatos["Foto perfil"]) {
            return <View />
        }
        // var url = urlFoto.urlImages + this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato + `?type=getPerfil&key_usuario=${this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario}&date=${Date.now()}`;
        var url = urlFoto.urlImages + this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato + `?type=getPerfil&key_usuario=${this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario}`;
        this.state.fotoPerfilUri = url;
    }

    componentWillUnmount() {
        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);    
    }
    componentDidUpdate() {
        if (!this.props.state.usuarioReducer.usuarioDatos["Foto perfil"]) {
            return <View />
        }
        var url = urlFoto.urlImages + this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato + `?type=getPerfil&key_usuario=${this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario}&date=${Date.now()}`;
        this.state.fotoPerfilUri = url;
    }


    handleClik = (props) => {
        this.state.isVentana = props
        this.setState({ ...this.state })
    }


    SetComponent = () => {
        if (!this.state.isVentana) {
            return (
                <View />
            )
        }
        return (
            <SubirFotoPerfil handleClik={this.handleClik} />
        )
    }

    render() {

        if (this.props.state.usuarioReducer.type == "insertarDato"
            && this.props.state.usuarioReducer.estado == "exito") {
            if (!this.props.state.usuarioReducer.usuarioDatos["Foto perfil"]) {
                return <View />
            }
            // var url = urlFoto.urlImages + this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato + `?type=getPerfil&key_usuario=${this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario}&date=${Date.now()}`;
            var url = urlFoto.urlImages + this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato + `?type=getPerfil&key_usuario=${this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario}`;
            this.state.fotoPerfilUri = url;
            this.props.state.usuarioReducer.estado = "";
        }
        // var url = urlFoto.urlImages + this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato + `?type=getPerfil&key_usuario=${this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario}&date=${Date.now()}`;
        // this.state.fotoPerfilUri = url;

        if (!this.props.state.usuarioReducer.usuarioDatos) {
            return <Text>No existe usuarioDato</Text>
        }
        var datos = this.props.state.usuarioReducer.usuarioDatos;
        //var datos = JSON.parse(objeto.data);

        return (
            <View style={{
                backgroundColor: "#fff",
                width: "100%",
                flex: 1,
                alignItems: "center"
            }}>
                <BarraSuperior title={"Perfil"} goBack={() => {
                    this.props.navigation.goBack();
                }} />
                <ScrollView style={{
                    width: "100%"
                }}>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View style={{
                            height: 250,
                            // backgroundColor: "#ccc",
                            justifyContent: "center"
                        }}>
                            <TouchableOpacity
                                onPress={() => { this.handleClik(true) }}
                                style={{

                                }}>
                                {!this.state.fotoPerfilUri ? (
                                    <View style={{
                                        width: 150,
                                        height: 150,
                                        borderWidth: 1,
                                        borderColor: "#000",
                                        borderRadius: 100,
                                    }}>
                                    </View>
                                ) : (
                                    //<Image source={this.state.fotoPerfilUri}
                                    <Image source={{ uri: this.state.fotoPerfilUri }}
                                        style={{
                                            width: 150,
                                            height: 150,
                                            borderWidth: 1,
                                            borderColor: "#000",
                                            borderRadius: 100,
                                        }} />
                                )
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            width: "80%",
                        }}>
                            <FieldsPerfil datos={datos} />
                        </View>

                    </View>
                </ScrollView>
                {/* <PerfilConductorPage /> */}
                {this.SetComponent()}

            </View>
        );
    }
};

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(PerfilPage);
