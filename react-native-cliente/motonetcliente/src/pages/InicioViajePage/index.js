import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Alert, AsyncStorage } from 'react-native';
import Svg from '../../Svg';
import MapaViaje from '../../component/MapaViaje';
import AppParams from "../../Json"
import EstadoViaje from './EstadoViaje';
import { stat } from 'react-native-fs';
import Geolocation from '@react-native-community/geolocation';
import STheme from '../../STheme';
import Boton1 from '../../component/Boton1';
import BarraViaje from '../../component/BarraViaje'
import PerfilConductor from './PerfilConductor';
import CalificarConductor from './CalificarConductor';
import DetalleProducto from './DetalleProducto';

class InicioViajePage extends Component {

    static navigationOptions = {
        headerShown: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            abrirModal: false,
            abrirModalProducto: false
        }
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(
            (position) => {
                // if (!this.state.region) {
                //     return <View />
                // }
                // if (data.region.isRender) {
                //     return <View />
                // }
                var region = {
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                }
                this.props.dispatch({
                    component: "locationEmergencia",
                    type: "Miubicacion",
                    data: region,
                });
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
                throw error;
            },
        );
    }



    cancelar() {
        // if (this.props.state.emergenciaReducer.data.movimientos["inicio_ruta"]) {
        //     return <View />
        // }
        return (
            Alert.alert(
                "Cancelar",
                "Al aceptar la cancelación, puede que tenga un costo",
                [
                    {
                        text: "Cancelar",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "Aceptar",
                        onPress: () => {
                            this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                                component: "viaje",
                                type: "cancelarViajeCliente",
                                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                key_viaje: this.props.state.viajesReducer.data.key,
                                estado: "cargando"
                            }, true);
                            //this.props.navigation.replace("CargaPage");
                            return <View />
                        }
                    }
                ],
                { cancelable: false }
            )
        )
    }

    closeModal() {
        this.setState({
            abrirModal: false
        })
        return <View />
    }

    getDetalleRuta = () => {

        if (!this.props.state.usuarioReducer.data[this.props.state.viajesReducer.data.key_conductor]) {
            if (this.props.state.usuarioReducer.estado == "cargando") {
                return <View />
            }
            this.props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "usuario",
                type: "getById",
                cabecera: "registro_conductor",
                key: this.props.state.viajesReducer.data.key_conductor,
                estado: "cargando",
            }, true);
            return <View />
        }

        var dataCondutor = this.props.state.usuarioReducer.data[this.props.state.viajesReducer.data.key_conductor];

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
                        <Text style={{
                            color: STheme.color.textb,
                            fontSize: 14, fontWeight: 'bold',
                        }}>
                            El conductor acepto tu pedido
                        </Text>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        // backgroundColor: "#ccc"
                    }}>
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            // alignItems: "center",
                        }}>
                            <EstadoViaje />
                        </View>

                        <View style={{
                            flex: 0.5,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Boton1 type="1"
                                label="Chat"
                                cargando={false}
                                // cargando={props.state.viajesReducer.estado == "cargando"}
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
                                {this.props.state.imageReducer.getImage(AppParams.urlImages + "perfil.png?type=getPerfil&key_usuario=" + this.props.state.viajesReducer.data.key_conductor, {
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
                            </View>
                        </View>

                        {this.props.state.viajesReducer.data.tipo_viaje.descripcion == "Pedido" ?
                            <View style={{
                                // flex: 0,
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Boton1 type="1"
                                    label="Ver Productos"
                                    cargando={false}
                                    // cargando={props.state.viajesReducer.estado == "cargando"}
                                    onPress={() => {
                                        this.setState({ abrirModalProducto: true })
                                    }}
                                />
                            </View>
                            : <View style={{
                            }}>
                                {/*  <TouchableOpacity style={{
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
                                    <Svg resource={require("../../img/relojtestimado.svg")} style={{
                                        width: 20,
                                        height: 20,
                                    }} />
                                    <Text style={{
                                        marginStart: 8,
                                    }}>
                                        El conductor acepto tu pedido llegara en
                                    </Text>
                                    <Text style={{
                                        color: "#000",
                                        fontWeight: "bold"
                                    }}> 5 min</Text>
                                </TouchableOpacity> */}
                            </View>
                        }


                    </View>
                </View>
            </View >
        )
    }

    perfilConductor = () => {
        if (this.state.abrirModal) {
            return (
                <PerfilConductor data={this.props.state.usuarioReducer.data[this.props.state.viajesReducer.data.key_conductor]} close={() => {
                    this.setState({ abrirModal: false })
                }} />
            )
        }
    }

    detalleProducto = () => {
        if (this.state.abrirModalProducto) {
            return (
                <DetalleProducto data={this.props.state.usuarioReducer.data[this.props.state.viajesReducer.data.key_conductor]} close={() => {
                    this.setState({ abrirModalProducto: false })
                }} />
            )
        }
    }

    render() {

        if (this.props.state.viajesReducer.estado == "exito" && this.props.state.viajesReducer.type == "calificar") {
            // console.log(this.props.state.viajesReducer.data)
            this.props.navigation.replace("CargaPage");
            this.props.state.viajesReducer.data = false
            return <View />
        }

        if (this.props.state.viajesReducer.data.movimientos["cancelo_viaje"]) {
            // console.log(this.props.state.viajesReducer.data)
            this.props.navigation.replace("CargaPage");
            this.props.state.viajesReducer.data = false
            return <View />
        }

        return (
            <>
                <BarraViaje title={this.props.state.viajesReducer.data.tipo_viaje.descripcion} onpress={() => this.cancelar()} />

                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ccc"
                }}>

                    <MapaViaje />

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

                    {this.perfilConductor()}

                    {!this.props.state.viajesReducer.data.movimientos["finalizar_viaje"] ? <View /> :
                        <CalificarConductor navigation={this.props.navigation} data={this.props.state.usuarioReducer.data[this.props.state.viajesReducer.data.key_conductor]} />
                    }

                    {this.detalleProducto()}

                </View >
            </>
        )
    }
}


const initStates = (state) => {
    return { state }
};


export default connect(initStates)(InicioViajePage);
