import React, { Component } from 'react';
import { connect } from 'react-redux'
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Animated, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import Svg from '../../Svg';
import styles from './styles'

class RecuperarPass extends Component {

    // Default props
    static defaultProps = {
        backgroundColor: "white",
        titleText: "Recuperar Contraseña",
        submitText: "Enviar",
        placeHolderText: "Correo Electronico"
    };

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            error: false,
        };
    }

    // Validar Correo
    validarEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    // Boton Enviar
    btnEnviar() {
        if (this.state.email.trim().length == 0) {
            // console.log("Ingrese su correo");
            // this.state.error = true
            // this.setState()
        } else if (this.validarEmail(this.state.email) == false) {
            console.log("Correo Invalido");

        } else {
            this.callRecuperarPass();
        }
    }

    // Llamada al webservice para reperar contrasena
    callRecuperarPass() {
        // alert('contrasena recuperada...');
        this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
            component: "usuario",
            type: "recuperarPass",
            estado: "cargando",
            data: this.state.email,
        }, true);
    }

    // Boton Cerrar
    btnCerrar() {
        this.props.callbackAfterRecuperarPass(0, this.props.otherParamsToSend);
    }

    render() {

        // if (!this.state.usuarioReducer.usuarioRecuperado) {
        //     return <View />
        // }
        // if (this.state.usuarioReducer.usuarioRecuperado) {
        //     alert("Contraseña recuperada")
        //     // return <View />
        // }

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.props.callbackAfterRecuperarPass(0, this.props.otherParamsToSend);
                }}>
                <View style={styles.container} >
                    <TouchableWithoutFeedback
                        onPress={(evt) => {
                            evt.stopPropagation()
                        }}>
                        <View style={[styles.bottomView, { backgroundColor: this.props.backgroundColor }]}>
                            <TouchableOpacity style={styles.btnClose} activeOpacity={0.6}
                                onPress={() => this.btnCerrar()}>
                                <Svg name="Close"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        fill: "#2C4C7E",
                                    }} />
                            </TouchableOpacity>
                            <Text style={styles.textHeader}>
                                {this.props.titleText}
                            </Text>
                            <View style={styles.starView}>
                                <View style={styles.inputView}>
                                    <TextInput style={styles.inputText}
                                        placeholder={this.props.placeHolderText}
                                        multiline={false}
                                        placeholderTextColor={'#626262'}
                                        autoCapitalize={'none'}
                                        keyboardType={'email-address'}
                                        autoCorrect={false}
                                        underlineColorAndroid={'transparent'}
                                        onChangeText={(email) => this.setState({ email })}
                                        value={this.state.email}>
                                    </TextInput>
                                </View>
                                {this.props.state.usuarioReducer.estadoEmail == "cargando" ? (
                                    <View style={styles.btnCancel} activeOpacity={0.6}>
                                        <ActivityIndicator color="#fff" size="small" />
                                    </View>
                                ) : (
                                        <TouchableOpacity style={styles.btnCancel} activeOpacity={0.6}
                                            onPress={() => this.btnEnviar()}>
                                            <Text style={styles.textCancel} numberOfLines={1}>
                                                {this.props.submitText}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }

                            </View>
                        </View>
                    </TouchableWithoutFeedback >

                </View >

            </TouchableWithoutFeedback >
        );
    }
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(RecuperarPass);
