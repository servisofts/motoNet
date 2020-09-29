import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    StyleSheet
} from 'react-native';
import * as viajesActions from '../../action/viajesActions'
import Svg from '../../Svg';

class ViajeEsperaPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            startValue: new Animated.Value(1),
            endValue: 1.3,
        };
    }
    componentDidMount() { // B
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
        if (this.props.state.viajesReducer.estado === "exito") {
            if (this.props.state.viajesReducer.type === "cancelarBusqueda") {
                this.props.state.viajesReducer.estado = ""
                this.props.state.viajesReducer.viaje = false
                this.props.state.viajesReducer.ubicacion = {
                    inicio: {
                        value: "",
                        estado: true,
                        data: false
                    },
                    fin: {
                        value: "",
                        estado: false,
                        data: false
                    }
                }
                this.props.actualizarUbicacion(this.props.state.viajesReducer.ubicacion)
                this.props.navigation.replace("InicioPage")

            }
            if (this.props.state.viajesReducer.type === "confirmarBusqueda") {
                this.props.state.viajesReducer.estado = ""
                this.props.navigation.replace("ComenzarCarreraPage");
            }
        }
        return (
            <View style={{
                flex: 1,
                backgroundColor: "red",
                alignItems: 'center',
            }}>

                <View style={{
                    width: "90%",
                    height: 35,
                    marginTop: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "#fff",
                    borderRadius: 5,
                    flexDirection: 'row',
                    borderColor: "#fff",
                    borderWidth: 2,

                }}>
                    <Svg name="ubicacion"
                        style={{

                            width: 25,
                            height: 25,
                            fill: "#f00"

                        }} />

                    <Text style={{
                        color: "red",
                        fontSize: 13,
                        margin: 5,
                    }}>
                        Inicio

                        </Text>

                    <Text style={{
                        flex: 0.9,
                        fontSize: 9,
                        margin: 5,

                    }}>{this.props.state.viajesReducer.ubicacion.inicio.value}</Text>

                </View>
                <View style={{
                    width: "90%",
                    height: 35,
                    marginTop: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "#fff",
                    borderRadius: 5,
                    flexDirection: 'row',

                }}>
                    <Svg name="ubicacion"
                        style={{

                            width: 25,
                            height: 25,
                            fill: "#f00"

                        }} />

                    <Text style={{
                        color: "red",
                        margin: 5,
                        fontSize: 13,
                    }}>
                        Fin

                        </Text>

                    <Text style={{
                        flex: 0.9,
                        fontSize: 9,
                        margin: 5,

                    }}>{this.props.state.viajesReducer.ubicacion.fin.value}</Text>

                </View>
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
                    ]}
                >

                    <Svg name="Logo"
                        style={{
                            width: 100,
                            height: 100,
                        }} />
                    <Text style={
                        {
                            marginTop: 10,
                            fontSize: 30,
                            fontWeight: "bold",
                            color: "#fff"
                        }}>MotoNet</Text>

                </Animated.View>
                < Text style={{
                    width: "50%",
                    color: "#fff",
                    fontSize: 10,
                    margin: 5,
                    textAlign: "center"
                }}>
                    Estamos buscando un conductor.
                    porfavor aguarda un minuto
                </Text>

                <TouchableOpacity
                    onPress={() => {
                        this.props.state.socketClienteReducer.sessiones["motonet"].send({
                            component: "viaje",
                            type: "cancelarBusqueda",
                            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                            key_viaje: this.props.state.viajesReducer.viaje.key,
                            estado: "cargando"
                        }, true);
                    }}

                    style={{
                        width: 80,
                        height: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        backgroundColor: "#fff",
                    }}>
                    <Text>Cancelar carrera</Text>
                </TouchableOpacity>
                <View style={{
                    marginTop: 10,
                    width: "80%",
                    height: 100,
                    borderWidth: 2,
                    borderColor: "#fff",
                    borderRadius: 10,
                    alignItems: 'center',
                }}>
                    <Text
                        style={{ color: "#fff" }}
                    >Detalle del pedido</Text>
                    <View style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: "80%",
                        justifyContent: 'space-between',
                    }}>
                        <Text
                            style={{ color: "#fff", fontSize: 10, }}
                        >TIPO DE PAGO</Text>
                        <Text
                            style={{ color: "#fff", fontSize: 10 }}
                        >TIEMPO PERDIDO</Text>

                    </View>

                    <View style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: "80%",
                        justifyContent: 'space-between',
                    }}>
                        <Text
                            style={{ color: "#fff", fontSize: 10, }}
                        >TIEMPO ESTIMADO</Text>
                        <Text
                            style={{ color: "#fff", fontSize: 10 }}
                        >MONTO ESTIMADO</Text>

                    </View>
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
});
const initStates = (state) => {
    return { state }
};
const initActions = ({
    ...viajesActions
});


export default connect(initStates, initActions)(ViajeEsperaPage);


