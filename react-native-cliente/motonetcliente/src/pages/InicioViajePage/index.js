import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Alert, AsyncStorage } from 'react-native';
import Svg from '../../Svg';
import MapaViaje from '../../component/MapaViaje';
// import CancelarViaje from '../../component/InicioViajeComponent/CancelarViaje';
import AppParams from "../../Json"
import EstadoViaje from './EstadoViaje';
import { stat } from 'react-native-fs';
import Geolocation from '@react-native-community/geolocation';
import STheme from '../../STheme';
import Boton1 from '../../component/Boton1';

class InicioViajePage extends Component {

    static navigationOptions = {
        headerShown: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            abrirModal: false
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

    Cancelar() {

        // if (this.props.state.emergenciaReducer.data.movimientos["inicio_ruta"]) {
        //     return <View />
        // }

        return (
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(
                        "Alerta",
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
                                        component: "emergencia",
                                        type: "cancelarViajeCliente",
                                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                        key_viaje: this.props.state.emergenciaReducer.data.key,
                                        estado: "cargando"
                                    }, true);
                                    //this.props.navigation.replace("CargaPage");
                                    return <View />
                                }
                            }
                        ],
                        { cancelable: false }
                    );
                }}
                style={{
                    width: "90%",
                    height: 50,
                    position: "absolute",
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "#2C4C7E",
                    bottom: 30,
                    borderRadius: 10
                }} >
                <Text style={{
                    color: "#fff"
                }}>
                    CANCELAR
                </Text>
            </TouchableOpacity>

        )
        // this.setState({
        //     abrirModal: true
        // })
    }

    closeModal() {
        this.setState({
            abrirModal: false
        })
        return <View />
    }

    getDetalleRuta = () => {

        // var tipos_de_viajes = props.state.tipoViajesReducer.data;

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
                            fontSize: 14,
                        }}>
                            Estado:
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
                            <Text style={{
                                color: STheme.color.textb,
                                fontSize: 16,
                                fontWeight: "bold"
                            }}>Conductor Viene
                            </Text>
                        </View>

                        <View style={{
                            flex: 0.5,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Boton1 type="1"
                                label="Cancelar"
                                cargando={false}
                            // cargando={props.state.viajesReducer.estado == "cargando"}
                            // onPress={() => cancelarViaje()} 
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
                                borderRadius: 100
                            }}>
                            </View>

                            <Text>Ricardo Paz Demiquel</Text>
                        </View>



                        <View style={{
                        }}>
                            <TouchableOpacity style={{
                                height: 40,
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#f3f3fd"
                            }}
                                onPress={() => {
                                    // props.state.locationGoogleMapReducer.route = true;
                                    // props.setVentanaSelect("tipoDeViaje")
                                    return <View />
                                }}>
                                <Text>
                                    Consejos la app y mensajes
                                    <Text style={{
                                        color: "#f00",
                                        fontWeight: "bold"
                                    }}> Ver</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>



                        {/* <View style={{
                            width: "100%",
                            height: "100%",
                            justifyContent: "space-evenly",
                            // backgroundColor: "#ccc"
                        }}>
                            <View style={{
                                flexDirection: "row",
                            }}>
                                <View style={{
                                    flex: 1,
                                    // backgroundColor:"#000"
                                }}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: STheme.color.textb
                                    }}>Efectivo</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: STheme.color.textb
                                    }}>Tipo de pago</Text>
                                </View>

                                <View style={{
                                    flex: 1,
                                }}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: STheme.color.textb
                                    }}>Bs. {33}
                                    </Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: STheme.color.textb
                                    }}>Monto estimado
                                    </Text>
                                </View>
                            </View>
                        </View> */}

                    </View>
                </View>
            </View>
        )
    }

    render() {

        if (!this.props.state.viajesReducer.data) {
            this.props.navigation.replace("CargaPage");
            return <View />
        }

        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                {/* <MapaViaje /> */}
                <EstadoViaje />


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
                    {/* {getAllPrecio()} */}
                    {this.getDetalleRuta()}

                </View >

                {/* {this.Cancelar()} */}
                {/* <CancelarViaje navigation={this.props.navigation} /> */}

            </View >
        )
    }
}


const initStates = (state) => {
    return { state }
};


export default connect(initStates)(InicioViajePage);
