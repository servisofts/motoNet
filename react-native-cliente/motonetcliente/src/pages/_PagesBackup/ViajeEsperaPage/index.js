import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Animated, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native';
import * as viajesActions from '../../action/viajesActions'
import * as locationActions from '../../action/locationActions'
import Svg from '../../Svg';
import ComponentDetalleViaje from '../../component/Inicio/DetalleDeViajes/ComponentDetalleViaje';

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
        if (this.props.state.viajesReducer.data) {
            // console.log(this.props.state.viajesReducer.data)
            this.props.state.viajesReducer.data.destinos.map((data, key) => {
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

    CancelarViaje = () => {
        if (this.props.state.viajesReducer.type == "cancelarBusqueda" && this.props.state.viajesReducer.estado == "cargando") {
            return (
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
            )
        }

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
                this.props.state.locationGoogleMapReducer.route = true;
                this.props.state.socketClienteReducer.sessiones["motonet"].send({
                    component: "viaje",
                    type: "cancelarBusqueda",
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    key_viaje: this.props.state.viajesReducer.data.key,
                    estado: "cargando"
                }, true);
            }}>
            <Text>CANCELAR VIAJE</Text>
        </TouchableOpacity>
    }

    render() {
        if (this.props.state.viajesReducer.estado === "exito") {
            if (this.props.state.viajesReducer.type === "cancelarBusqueda") {
                this.props.state.viajesReducer.estado = false
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
                this.props.state.viajesReducer.data = false
                AsyncStorage.removeItem("motonet_viaje")
                this.props.navigation.replace("InicioPage")
            }
            if (this.props.state.viajesReducer.data.movimientos) {
                if (this.props.state.viajesReducer.data.movimientos["inicio_viaje"]) {
                    this.props.navigation.replace("ViajeInicioPage");
                }
            }
        }

        const estaNegociando = () => {
            var existe = true;

            if (existe && !this.props.state.viajesReducer.data.movimientos) {
                // return <View />
                existe = false;
            }

            if (existe && !this.props.state.viajesReducer.data.movimientos["negociacion_conductor"]) {
                // return <View />
                existe = false;
            }

            if (existe && !this.props.state.viajesReducer.data.movimientos["negociacion_conductor"].costo) {
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
                            {this.props.state.viajesReducer.data.movimientos["negociacion_conductor"].costo.monto}
                        </Text>
                        <Text style={{
                            color: "#fff"
                        }}>
                            {JSON.stringify(this.props.state.viajesReducer.data.movimientos["negociacion_conductor"].key_referencia)}{"\n"}
                            {JSON.stringify(this.props.state.viajesReducer.data.movimientos["negociacion_conductor"].key)}

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
                                        key_viaje: this.props.state.viajesReducer.data.key,
                                        key_conductor: this.props.state.viajesReducer.data.movimientos["negociacion_conductor"].key_referencia,
                                        key_movimiento: this.props.state.viajesReducer.data.movimientos["negociacion_conductor"].key,
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
                                        key_viaje: this.props.state.viajesReducer.data.key,
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
                    <View style={{
                        width: "100%",
                        alignItems: "center"
                    }}>
                        <Svg name="logoCompletoRecurso"
                            style={{
                                width: 120,
                                height: 120,
                            }} />
                        <Text style={{
                            marginTop: 20,
                            fontSize: 15,
                            fontWeight: "bold",
                            color: "#fff",
                            textAlign: "center"
                        }}>Estamos buscando un conductor.{'\n'}
                            por favor aguarda un momento.</Text>
                    </View>
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
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: "90%",
                    borderColor: "#fff",
                    borderWidth: 2,
                    borderRadius: 5,
                    height: 40,
                    marginTop: 30,
                    marginBottom: 10
                }} >
                    <View style={{
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor:"#ccc"
                    }}>
                        <Svg name={"MarkerW"}
                            style={{
                                width: 20,
                                height: 20,
                                fill: "#fff"
                            }} />
                    </View>

                    <View style={{
                        flex: 1,
                        // alignItems: 'center',
                        justifyContent: "center",
                        height: "100%",
                    }}>
                        <Text style={{
                            fontSize: 13,
                            color: "#fff",
                        }}>
                            {this.state.obj.inicio.direccion}
                        </Text>
                    </View>
                </View>

                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: "90%",
                    borderColor: "#fff",
                    borderWidth: 2,
                    borderRadius: 5,
                    height: 40,
                }} >
                    <View style={{
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor:"#ccc"
                    }}>
                        <Svg name={"Pointer"}
                            style={{
                                width: 20,
                                height: 20,
                                fill: "#fff"
                            }} />
                    </View>

                    <View style={{
                        flex: 1,
                        // alignItems: 'center',
                        justifyContent: "center",
                        height: "100%",
                    }}>
                        <Text style={{
                            fontSize: 13,
                            color: "#fff",
                        }}>
                            {this.state.obj.fin.direccion}
                        </Text>
                    </View>
                </View>

                <View style={{
                    flex: 1,
                    width: "100%",
                    // backgroundColor: "#ccc",
                    justifyContent: "center",
                    // marginTop: 100
                    marginBottom: 220
                }}>

                    {estaNegociando()}

                </View>

                <ComponentDetalleViaje />

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


