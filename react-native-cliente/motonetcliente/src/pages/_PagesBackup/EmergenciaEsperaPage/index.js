import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Animated, StyleSheet, AsyncStorage, ActivityIndicator, Dimensions } from 'react-native';
import Svg from '../../Svg';
import ImgFondoCruces from '../../component/ImgFondoCruces';
import AppParams from "../../Json"
const delay = ms => new Promise(res => setTimeout(res, ms));
var lastSend = new Date().getTime();

class EmergenciaEsperaPage extends Component {

    static navigationOptions = {
        headerShown: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            startValue: new Animated.Value(1),
            obj: {},
            endValue: 1.3,
        };
    }

    componentDidMount() {
        Animated.loop(
            Animated.spring(this.state.startValue, {
                toValue: this.state.endValue,
                friction: 1,
                useNativeDriver: true,
            }),
            { iterations: 3000 },
        ).start();
    }

    render() {

        if (this.props.state.emergenciaReducer.estado === "exito") {
            if (this.props.state.emergenciaReducer.type === "cancelarBusqueda") {
                this.props.state.emergenciaReducer.estado = ""
                this.props.state.emergenciaReducer.data = false
                AsyncStorage.removeItem("emergencia_viaje")
                this.props.navigation.replace("ServicioPage")
            }
            if (this.props.state.emergenciaReducer.data.movimientos) {
                if (this.props.state.emergenciaReducer.data.movimientos["acepto_secretaria"]) {
                    this.props.navigation.replace("EmergenciaViajePage");
                }
            }
        }
        var _instProps = this.props;
        const getViajeHilo = async () => {
            await delay(10000);
            var timeActual = new Date().getTime();
            if (timeActual - lastSend < 10000) {
                getViajeHilo();
                return;
            }
            lastSend = timeActual;
            console.log("HILO DEL VIAJE COMPLETADO");
            if (!_instProps.state.emergenciaReducer.data) {
                return;
            }
            if (!_instProps.state.emergenciaReducer.data["key"]) {
                return;
            }
            _instProps.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "emergencia",
                type: "getViajeByKeyUsuario",
                key_usuario: _instProps.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            }, true);
            getViajeHilo();
        };
        getViajeHilo();
        const estaNegociando = () => {
            return (
                <Animated.View
                    style={[
                        styles.square,
                        {
                            transform: [
                                {
                                    scale: this.state.startValue,
                                },
                            ],
                        },
                    ]}>
                    <Text style={
                        {
                            textAlign: "center",
                            marginBottom: 10,
                            // fontSize: 30,
                            fontSize: Dimensions.get("window").height * 0.04,
                            fontWeight: "bold",
                            color: "#fff",
                            letterSpacing: 3,
                        }} >Notificando emergencia</Text>
                    <Svg name="Warning"
                        style={{
                            width: 100,
                            height: 100,
                        }} />
                    <Text style={{
                        color: "#fff",
                        fontSize: Dimensions.get("window").height * 0.016
                    }}>Por favor aguarde un momento.</Text>
                </Animated.View>
            )
        }

        return (
            <View style={{
                flex: 1,
                backgroundColor: "#2C4C7E",
                alignItems: 'center',
            }}>

                {/* <ImgFondoCruces /> */}

                <View style={{
                    flex: 1,
                    width: "100%",
                    // backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <View style={{
                        width: 100,
                        height: 100,
                        borderRadius: 100,
                        padding: 8,
                        backgroundColor: "#fff"
                    }}>
                        <Svg name="logoRecurso"
                            style={{
                                width: "100%",
                                height: "100%",
                            }} />
                    </View>
                </View>

                <View style={{
                    flex: 1,
                    width: "75%",
                    // backgroundColor:"#ccc",
                    justifyContent: "center"
                }}>
                    {estaNegociando()}

                </View>

                <View style={{
                    flex: 1,
                    width: "100%",
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor:"#ccc"
                }}>

                    {this.props.state.emergenciaReducer.type == "cancelarBusqueda" && this.props.state.emergenciaReducer.estado == "cargando" ? (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 5,
                                height: 50,
                                backgroundColor: "#f00",
                                width: "80%"
                            }}>
                            <ActivityIndicator color="#fff" size="small" />
                        </View>
                    ) : (
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                    height: 50,
                                    backgroundColor: "#f00",
                                    width: "80%"
                                }}
                                onPress={() => {
                                    this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
                                        component: "emergencia",
                                        type: "cancelarBusqueda",
                                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                        key_viaje: this.props.state.emergenciaReducer.data.key,
                                        estado: "cargando"
                                    }, true);
                                }}>
                                <Text style={{ color: "#FFF", fontWeight: "bold" }}>CANCELAR EMERGENCIA</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    square: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
});

const initStates = (state) => {
    return { state }
};


export default connect(initStates)(EmergenciaEsperaPage);
