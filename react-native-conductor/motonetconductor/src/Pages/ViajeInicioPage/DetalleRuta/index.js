import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Boton1 from '../../../Component/Boton1';
import AppParams from '../../../Json';
import STheme from '../../../STheme';
import Svg from '../../../Svg';
import PerfilCliente from '../PerfilCliente';
import DetalleProducto from '../DetalleProducto';

class DetalleRuta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            abrirModalProducto: false
        };
    }

    EstadoViaje = () => {
        var mensaje = "Viaje Iniciado";
        // console.log(Object.keys(this.props.state.ViajeReducer.data.movimientos))
        if (!this.props.state.ViajeReducer.data) {
            return <View />
        }

        if (this.props.state.ViajeReducer.data.movimientos["inicio_viaje"]) {
            mensaje = "Dirijite a la ubicacion del cliente"
        }

        if (this.props.state.ViajeReducer.data.movimientos["conductor_cerca"]) {
            mensaje = "Ya estas cerca";
        }

        if (this.props.state.ViajeReducer.data.movimientos["conductor_llego"]) {
            mensaje = "Espera al cliente";
        }

        if (this.props.state.ViajeReducer.data.movimientos["inicio_viaje_conductor"]) {
            mensaje = "Dirijete al destino";
        }

        if (!mensaje) {
            return <View />
        }

        return (
            <View>
                <Text style={{
                    color: "#000",
                    fontSize: 15,
                    fontWeight: "bold"
                }}>
                    {mensaje}
                </Text>
            </View>
        )
    }
    getTiempoEstimado = () => {
        return <TouchableOpacity style={{
            height: 40,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f3f3fd",
            flexDirection: "row",
        }}
            onPress={() => {
                // props.state.locationGoogleMapReducer.route = true;
                // props.setVentanaSelect("tipoDeViaje")
                return <View />
            }}>
            <Svg resource={require("../../../img/relojtestimado.svg")} style={{
                width: 20,
                height: 20,
            }} />
            <Text style={{
                marginStart: 8,
            }}>
                Tiempo estimado de llegada

            </Text>
            <Text style={{
                color: "#000",
                fontWeight: "bold"
            }}> 5 min</Text>
        </TouchableOpacity>
    }
    notificarLlegada = () => {
        return <Boton1 label={"Notificar llegada"} type={1} onPress={() => {
            this.props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "viaje",
                type: "conductorLlegoDestino",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                key_viaje: this.props.state.ViajeReducer.data.key,
                estado: "cargando"
            }, true);
        }} />
    }
    verProductos = () => {
        if (this.props.state.ViajeReducer.data) {
            var viaje = this.props.state.ViajeReducer.data;
            if (viaje.tipo_viaje.codigo != "pedido") {
                return <View />
            }
        }
        return <Boton1 label={"Ver productoss"} type={1} cargando={false}
            // cargando={props.state.ViajesReducer.estado == "cargando"}
            onPress={() => {
                this.setState({ abrirModalProducto: true })
            }} />
    }

    IniciarViaje = () => {
        return <Boton1 label={"Inicar viaje"} type={4} onPress={() => {
            this.props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "viaje",
                type: "iniciarViajeConductor",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                key_viaje: this.props.state.ViajeReducer.data.key,
                estado: "cargando"
            }, true);
        }} />
    }
    TerminarViaje = () => {
        return <Boton1 label={"Finalizar viaje"} type={1} onPress={() => {
            this.props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "viaje",
                type: "finalizarViaje",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                key_viaje: this.props.state.ViajeReducer.data.key,
                estado: "cargando"
            }, true);
        }} />
    }
    getAction = () => {
        if (this.props.state.ViajeReducer.data.movimientos["inicio_viaje_conductor"]) {
            return this.TerminarViaje()
        }
        if (this.props.state.ViajeReducer.data.movimientos["conductor_llego"]) {
            return this.IniciarViaje()
        }
        if (this.props.state.ViajeReducer.data.movimientos["conductor_cerca"]) {
            return this.notificarLlegada()
        }

        //console.log(JSON.stringify(this.props.state.ViajeReducer.data.movimientos))
        // if (this.props.state.ViajeReducer.data.movimientos["conductor_cerca"]) {
        //     return this.verProductos()
        // }

        return this.getTiempoEstimado()
    }
    getDetalleRuta = () => {
        if (!this.props.state.usuarioReducer.data[this.props.state.ViajeReducer.data.key_usuario]) {
            if (this.props.state.usuarioReducer.estado == "cargando") {
                return <View />
            }
            this.props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "usuario",
                type: "getById",
                cabecera: "registro_cliente",
                key: this.props.state.ViajeReducer.data.key_usuario,
                estado: "cargando",
            }, true);
            return <View />
        }

        var dataCondutor = this.props.state.usuarioReducer.data[this.props.state.ViajeReducer.data.key_usuario];

        return (
            <View style={{
                flex: 1,
                margin: 10,
            }}>
                <View style={{
                    // flex: 1,
                    // justifyContent:"center",
                    // alignItems:"center"
                    marginBottom: 10
                }}>
                    <View style={{
                        marginBottom: 5,
                        // backgroundColor:"#ccc"
                    }}>

                    </View>

                    <View style={{
                        flexDirection: "row",
                        // backgroundColor: "#ccc"
                    }}>
                        <View style={{
                            flex: 2,
                            justifyContent: "center",
                            // alignItems: "center",
                        }}>
                            {this.EstadoViaje()}
                        </View>

                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Boton1 type="1"
                                label="Chat"
                                cargando={false}
                                // cargando={props.state.ViajeReducer.estado == "cargando"}
                                onPress={() => this.props.navigation.navigate("ChatPage")}
                            />
                        </View>
                    </View>
                </View>

                <View style={{
                    width: "100%",
                    height: 1.5,
                    backgroundColor: "#ccc"
                }}>
                </View>

                <View style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    // backgroundColor: "#ccc"
                }}>
                    <View style={{
                        width: "100%",
                        justifyContent: "center",
                        // alignItems: "center",
                        // backgroundColor: "#000"
                    }}>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <View style={{
                                backgroundColor: "#ccc",
                                width: 60,
                                height: 60,
                                borderRadius: 100,
                                overflow: "hidden",
                                margin: 10
                            }}>
                                {this.props.state.imageReducer.getImage(AppParams.urlImages + "perfil.png?type=getPerfil&key_usuario=" + this.props.state.ViajeReducer.data.key_usuario, {
                                })}
                            </View>
                            <View style={{
                                // backgroundColor: "#ccc",
                                width: "100%",
                                justifyContent: "center"
                            }}>
                                <Text style={{
                                    color: "#000"
                                }}>{dataCondutor["Nombres"].dato} {dataCondutor["Apellidos"].dato}</Text>
                                {/* }}>sds</Text> */}
                                <TouchableOpacity style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }} onPress={() => {
                                    this.setState({ abrirModal: true })
                                }}>
                                    <Text style={{
                                        fontWeight: "bold",
                                        color: STheme.color.background
                                    }}>Ver perfil  </Text>
                                    <Svg name={"Rightarrow"}
                                        style={{
                                            width: 15,
                                            height: 15,
                                            fill: STheme.color.background
                                        }} />
                                </TouchableOpacity>
                                {this.verProductos()}
                            </View>
                        </View>

                        <View style={{
                            height: 40,
                            width: "100%",
                        }}>

                            {this.getAction()}
                        </View>
                    </View>
                </View>
            </View >
        )
    }
    getPerfilCliente = () => {
        if (this.state.abrirModal) {
            return (
                <PerfilCliente data={this.props.state.usuarioReducer.data[this.props.state.ViajeReducer.data.key_usuario]} close={() => {
                    this.setState({ abrirModal: false })
                }} />
            )
        }
    }
    detalleProducto = () => {
        if (this.state.abrirModalProducto) {
            // alert(JSON.stringify(this.props.state.usuarioReducer.data))
            if (this.props.state.ViajeReducer.data) {
                var viaje = this.props.state.ViajeReducer.data;
                if (viaje.tipo_viaje.codigo != "pedido") {
                    return <View />
                }
            }
            return (
                <DetalleProducto data={this.props.state.usuarioReducer.data[this.props.state.ViajesReducer.data.key_usuario]} close={() => {
                    this.setState({ abrirModalProducto: false })
                }} />
            )
        }
    }
    render() {
        return (
            <>
                <View style={{
                    position: "absolute",
                    width: "100%",
                    // height: Dimensions.get('window').height * 0.3,
                    height: 220,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    backgroundColor: "#fff",
                    // borderColor: "#ccc",
                    flex: 1,
                    bottom: 0
                }}>
                    {this.getDetalleRuta()}
                </View >
                {this.getPerfilCliente()}
                {this.detalleProducto()}
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(DetalleRuta);
