import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Animated, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native';
import * as viajesActions from '../../action/viajesActions'
import * as locationActions from '../../action/locationActions'
import Svg from '../../Svg';

class ViajeEsperaPage extends Component {
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
        var contador = 1
        if (this.props.state.viajesReducer.viaje) {
            this.props.state.viajesReducer.viaje.destinos.map((data, key) => {
                if (contador === 1) {
                    this.state.obj["inicio"] = data
                    contador++
                } else {
                    this.state.obj["fin"] = data
                }
            })
        }
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
                this.props.setMarkerFin(false)
                this.props.setMarkerOrigen(false)
                this.props.actualizarUbicacion(this.props.state.viajesReducer.ubicacion)
                this.props.navigation.replace("InicioPage")
                AsyncStorage.removeItem("motonet_viaje")
            }
            if (this.props.state.viajesReducer.viaje.movimientos) {
                if (this.props.state.viajesReducer.viaje.movimientos["inicio_viaje"]) {
                    this.props.navigation.replace("ViajeInicioPage");
                }
            }
        }

        const estaNegociando = () => {
            var existe = true;

            if (existe && !this.props.state.viajesReducer.viaje.movimientos) {
                // return <View />
                existe = false;
            }

            if (existe && !this.props.state.viajesReducer.viaje.movimientos["negociacion_conductor"]) {
                // return <View />
                existe = false;
            }

            if (existe && !this.props.state.viajesReducer.viaje.movimientos["negociacion_conductor"].costo) {
                existe = false;
            }
            if (existe) {
                return (
                    <View style={{
                        width: "100%",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            color: "#fff"
                        }}>
                            {this.props.state.viajesReducer.viaje.movimientos["negociacion_conductor"].costo.monto}
                        </Text>

                        <View style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-evenly"
                        }}>
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                    height: 50,
                                    backgroundColor: "#fff",
                                    width: "30%"

                                }}
                                onPress={() => {
                                    this.props.state.socketClienteReducer.sessiones["motonet"].send({
                                        component: "viaje",
                                        type: "confirmarBusqueda",
                                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                        key_viaje: this.props.state.viajesReducer.viaje.key,
                                        estado: "cargando"
                                    }, true);
                                }}>
                                <Text>Confirmar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                    height: 50,
                                    backgroundColor: "#fff",
                                    width: "30%"
                                }}
                                onPress={() => {
                                    this.props.state.socketClienteReducer.sessiones["motonet"].send({
                                        component: "viaje",
                                        type: "notificarSiguiente",
                                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                        key_viaje: this.props.state.viajesReducer.viaje.key,
                                        estado: "cargando"
                                    }, true);
                                }}>
                                <Text>Buscar otro viaje</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            } else {
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
                )
            }
        }

        return (
            <View style={{
                flex: 1,
                backgroundColor: "red",
                alignItems: 'center',
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <View style={{
                        width: "90%",
                        height: 35,
                        marginTop: 50,
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
                        }}>{this.state.obj.inicio.direccion}</Text>
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

                        }}>{this.state.obj.fin.direccion}</Text>

                    </View>
                </View>


                <View style={{
                    flex: 1,
                    width: "100%"
                }}>

                    {estaNegociando()}

                </View>

                <View style={{
                    flex: 1,
                    width: "100%",
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                    <View style={{
                        width: "80%",
                        borderWidth: 2,
                        borderColor: "#fff",
                        borderRadius: 10,
                        alignItems: 'center',
                        marginBottom: 20,
                        height: 100
                    }}>
                        <Text
                            style={{
                                color: "#fff"
                            }}>
                            Detalle del pedido
                        </Text>

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
                            <Text style={{ color: "#fff", fontSize: 10, }}>TIEMPO ESTIMADO</Text>
                            <Text style={{ color: "#fff", fontSize: 10 }}>MONTO ESTIMADO</Text>
                        </View>
                    </View>

                    {this.props.state.viajesReducer.type == "cancelarBusqueda" && this.props.state.viajesReducer.estado == "cargando" ? (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 5,
                                height: 50,
                                backgroundColor: "#fff",
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
                                    backgroundColor: "#fff",
                                    width: "80%"
                                }}
                                onPress={() => {
                                    this.props.state.socketClienteReducer.sessiones["motonet"].send({
                                        component: "viaje",
                                        type: "cancelarBusqueda",
                                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                        key_viaje: this.props.state.viajesReducer.viaje.key,
                                        estado: "cargando"
                                    }, true);
                                }}>
                                <Text>CANCELAR VIAJE</Text>
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
const initActions = ({
    ...viajesActions,
    ...locationActions
});


export default connect(initStates, initActions)(ViajeEsperaPage);


