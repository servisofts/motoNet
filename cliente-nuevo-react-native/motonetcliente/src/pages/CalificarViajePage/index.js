import React, { Component } from 'react';
import { connect } from 'react-redux';
import urlFoto from '../../Json/index.json';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native';
import Svg from '../../Svg';


const { width, height } = Dimensions.get("screen");
class CalificarViajePage extends Component {

    static navigationOptions = {
        headerShown: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            fotoPerfilUri: false,
            calificacion: "",
        }
    };

    // componentWillMount() {
    //     if (!this.props.state.usuarioReducer.usuarioDatos["Foto perfil"]) {
    //         //error no existe foto    
    //         return <View />
    //     }
    //     var url = urlFoto.urlImages + this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato + `?type=getPerfil&key_usuario=${this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario}&date=${Date.now()}`;
    //     this.state.fotoPerfilUri = url;
    // }


    handleChange = (event, id) => {
        this.state[id] = {
            calificacion: event,
        }
        this.setState({ ...this.state })
        return <View />
    };

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "fff",
                alignItems: 'center',
            }}>
                <View style={{
                    flex: 1,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                }}>

                    <View style={{
                        width: 150,
                        height: 150,
                        borderWidth: 1,
                        borderRadius: 100,
                        backgroundColor: "#fff"
                    }}>
                        {!this.state.fotoPerfilUri ? (
                            <View />
                        ) : (
                                <Image source={{ uri: this.state.fotoPerfilUri }}
                                    style={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: 100,
                                    }} />
                            )
                        }
                    </View>

                    <Text>
                        nombre del conductor
                   </Text>

                </View>

                <View style={{
                    flex: 1,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}>

                    <Text style={{
                        color: "#000",
                        marginTop: 20
                    }}>
                        Calificar
                        </Text>

                    <View style={{
                        marginTop: 30,
                        flexDirection: "row"
                    }}>
                        <Svg name="Star"
                            style={{
                                width: 25,
                                height: 25,
                                fill: "red"
                            }} />
                        <Svg name="Star"
                            style={{
                                width: 25,
                                height: 25,
                                fill: "red"
                            }} />
                        <Svg name="Star"
                            style={{
                                width: 25,
                                height: 25,
                                fill: "red"
                            }} />
                        <Svg name="Star"
                            style={{
                                width: 25,
                                height: 25,
                                fill: "red"
                            }} />
                        <Svg name="Star"
                            style={{
                                width: 25,
                                height: 25,
                                fill: "red"
                            }} />
                    </View>

                </View>

                <View style={{
                    flex: 1,
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center"
                }}>

                    <View style={styles.contenedorInput}>
                        <TextInput
                            onChangeText={text => this.handleChange(text, "calificacion")}
                            style={styles.Input}
                            placeholder={"Escribe una nota"}
                            value={this.state.calificacion}
                            placeholderTextColor="#626262"
                            autoCapitalize='none'
                        />
                    </View>

                    {this.props.state.viajesReducer.type == "cancelarBusqueda" && this.props.state.viajesReducer.estado == "cargando" ? (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 5,
                                height: 50,
                                backgroundColor: "red",
                                width: "80%"
                            }}>
                            <ActivityIndicator color="red" size="small" />
                        </View>
                    ) : (
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                    height: 50,
                                    backgroundColor: "red",
                                    width: width / 1.1,
                                }}
                                onPress={() => {
                                    this.props.state.socketClienteReducer.sessiones["motonet"].send({
                                        component: "viaje",
                                        type: "calificarViajeCliente",
                                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                        key_viaje: this.props.state.viajesReducer.viaje.key,
                                        estado: "cargando"
                                    }, true);
                                }}>
                                <Text style={{ color: "#fff" }}>Listo</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View >
        );
    }
}
const styles = StyleSheet.create({
    contenedorInput: {
        width: width / 1.1,
    },
    Input: {
        backgroundColor: "#fff",
        borderRadius: 10,
        color: "#000",
        borderColor: "#fff",
        borderWidth: 1,
        padding: 15
    },
    error: {
        backgroundColor: "#fff",
        borderRadius: 10,
        color: "#000",
        borderColor: "#000",
        borderWidth: 1,
        padding: 15
    },
});

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(CalificarViajePage);

