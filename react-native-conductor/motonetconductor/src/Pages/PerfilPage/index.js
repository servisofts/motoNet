import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image, BackHandler } from 'react-native';
import * as popupActions from '../../Actions/popupActions'
import Svg from '../../Svg';
import ImagePicker from 'react-native-image-picker';
import urlFoto from '../../Json/index.json';
import SubirFotoPerfil from '../../Component/SubirFotoPerfil';
import FieldsPerfil from '../../Component/FieldsPerfil';
import { ScrollView } from 'react-native-gesture-handler';

class PerfilPage extends Component {
    static navigationOptions = {
        headerShown: true,
        title: 'Perfil Usuario'
    }
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            fotoPerfilUri: false
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        //BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        if (!this.props.state.usuarioReducer.usuarioDatos["Foto perfil"]) {
            return <View />
        }
        var url = urlFoto.urlImages + this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato + `?type=getPerfil&key_usuario=${this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario}&date=${Date.now()}`;
        this.state.fotoPerfilUri = url;
    }

    componentWillUnmount() {
        //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentDidUpdate() {
        if (!this.props.state.usuarioReducer.usuarioDatos["Foto perfil"]) {
            return <View />
        }
        var url = urlFoto.urlImages + this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato + `?type=getPerfil&key_usuario=${this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario}&date=${Date.now()}`;
        this.state.fotoPerfilUri = url;
    }

    handleBackButtonClick() {
        if (this.state.popup) {
            this.props.cerrarPopup();
            this.state.popup = false
            this.setState(this.state);
            return <View />
        }
        this.props.navigation.goBack();
        return <View />
    }

    render() {
        if (!this.props.state.usuarioReducer.usuarioDatos) {
            return <Text>No existe usuarioDato</Text>
        }

        var objeto = this.props.state.usuarioReducer.usuarioDatos;
        // console.log(objeto)
        // datos = JSON.parse(objeto.data);

        return (
            <View style={{
                height: '100%',
                backgroundColor: "#fff"
            }}>
                <View style={{
                    alignItems: 'center',
                    top: 20
                }} >
                    <SubirFotoPerfil datos={objeto} />
                </View>

                <View style={{
                    top: 80,
                    marginStart: 40,
                    marginEnd: 40
                }}>
                    <FieldsPerfil datos={objeto} />
                </View>
            </View>
        );
    }
};

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(PerfilPage);
