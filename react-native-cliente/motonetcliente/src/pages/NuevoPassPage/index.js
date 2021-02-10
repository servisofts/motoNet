import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, TextInput, ScrollView, StyleSheet, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import Svg from '../../Svg';
// import Theme from '../../Styles/Theme.json'
import AppParam from '../../Json/index.json'
import ImgFondoCruces from '../../component/ImgFondoCruces';

class NuevoPassPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pass: {
                value: "",
                error: false
            },
            confirmarPass: {
                value: "",
                error: false
            },
        }
    }

    handleChange = (event, id) => {
        this.state[id] = {
            value: event,
            error: false,
        }
        this.setState({ ...this.state })
        return <View />
    };


    Registrar = () => {
        var exito = true;
        var campos1 = false;
        var campos2 = false;

        if (this.state.pass.value.length <= 0) {
            this.state.pass.error = true;
            exito = false;
            campos1 = true;
        }

        if (this.state.confirmarPass.value.length <= 0) {
            this.state.confirmarPass.error = true;
            exito = false;
            campos2 = true;
        }

        // if (campos1 == false && campos2 == false) {
        //     this.state.confirmarPass.error = true;
        //     alert("La contraseña no coinciden")
        //     exito = false;
        // }

        this.setState({ ...this.state })

        if (exito) {
            this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
                component: "usuario",
                type: "cambiarPassByCodigo",
                data: this.state.pass.value,
                estado: "cargando",
                usuario_recuperado: this.props.state.usuarioReducer.usuarioRecuperado
            }, true);
            return <View />
        }
    }


    render() {

        if (this.props.state.usuarioReducer.estadoEmail == "exito" && this.props.state.usuarioReducer.type == "cambiarPassByCodigo") {
            alert("Contraseña modificada exitosamente")
            this.props.state.usuarioReducer.estadoEmail = false
            this.props.navigation.replace("LoginPage")
        }

        if (this.props.state.usuarioReducer.estadoEmail == "error" && this.props.state.usuarioReducer.type == "cambiarPassByCodigo") {
            alert("Algo salío mal")
            this.props.state.usuarioReducer.estadoEmail = false
        }

        return (
            <View style={{
                flex: 1
            }}>

                <ImgFondoCruces />

                <ScrollView>
                    <View style={{
                        width: "100%",
                        // height: 700,
                        alignItems: 'center',
                    }}>
                        <View style={{
                            // marginBottom: 50
                        }}>
                            <Svg name="logoCompletoRecurso"
                                style={{
                                    marginTop: 35,
                                    width: 200,
                                    height: 200,
                                    fill: "#fff"
                                }} />
                        </View>

                        <View
                            style={styles.view}>
                            <Text style={styles.texto}>Contraseña</Text>
                            <TextInput
                                style={(this.state.pass.error ? styles.error : styles.input)}
                                placeholder="Ingresar nueva contraseña"
                                onChangeText={text => this.handleChange(text, "pass")}
                                value={this.state.pass.value}
                                autoCapitalize='none'
                                secureTextEntry
                            />
                        </View>
                        <View
                            style={styles.view}>
                            <Text style={styles.texto}>Confirmar contraseña</Text>
                            <TextInput
                                style={(this.state.confirmarPass.error ? styles.error : styles.input)}
                                placeholder="Confirme su nueva contraseña"
                                onChangeText={text => this.handleChange(text, "confirmarPass")}
                                value={this.state.confirmarPass.value}
                                secureTextEntry
                                autoCapitalize='none'
                            />
                        </View>


                        {this.props.state.usuarioReducer.estadoEmail === "cargando" && this.props.state.usuarioReducer.type == "cambiarPassByCodigo" ? (
                            <View style={styles.touch3}>
                                <ActivityIndicator size="small" color="#fff" />
                            </View>
                        ) : (
                                <TouchableOpacity
                                    style={styles.touch3}
                                    onPress={this.Registrar}>
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 18,
                                        }}>
                                        Guardar Contraseña
                                            </Text>
                                </TouchableOpacity>
                            )}


                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    input: {
        backgroundColor: "#EAEAE2",
        width: "100%",
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        shadowColor: "#000",
        paddingLeft: 15,
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    error: {
        backgroundColor: "#EAEAE2",
        width: "100%",
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#f00",
        shadowColor: "#000",
        paddingLeft: 15,
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    touch3: {
        marginTop: 15,
        backgroundColor: "#2c4b81",
        width: "50%",
        height: 40,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    view: {
        margin: 5,
        width: '80%',
    },
    texto: {
        width: '100%',
        textAlign: "left",
        color: "#000",
        fontSize: 17,
        margin: 5,
    }
});

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(NuevoPassPage);
