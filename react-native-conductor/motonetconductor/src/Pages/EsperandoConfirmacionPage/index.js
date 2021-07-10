import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage, Dimensions } from 'react-native';
import { connect } from 'react-redux';
// import ImgComponent from '../../Component/ImgComponent';
import PushNotification from "react-native-push-notification";
import Svg from '../../Svg';
import MapView, { Marker } from 'react-native-maps';
import AppParams from "../../Json/index.json"
import * as SSBackgroundLocation from '../../SSBackgroundLocation'

class EsperandoConfirmacionPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super();
        this.state = {
            region: {
                latitude: -17.7799998333333332,
                longitude: -63.180598333333336,
                latitudeDelta: 0.07,
                longitudeDelta: 0.07,
            }
        };
    }
    notificacion() {
        var entro = true
        var texto = ""
        Object.keys(this.props.state.usuarioReducer.usuarioDatos).map((key) => {
            var obj = this.props.state.usuarioReducer.usuarioDatos[key]
            if (key === "Foto perfil") {
                return <View />
            }
            if (key === "Password") {
                return <View />
            }
            if (obj.estado === 0) {
                entro = false
                texto = texto + key + " -- "
            }
        })

        if (entro) {
            this.props.navigation.replace("InicioPage")
            this.props.state.usuarioReducer.estado = ""
            return <View></View>

        } else {
            this.props.state.usuarioReducer.estado = ""
        }
    }
    faltanteDatos() {
        var texto = ""
        Object.keys(this.props.state.usuarioReducer.usuarioDatos).map((key) => {
            var obj = this.props.state.usuarioReducer.usuarioDatos[key]
            if (key === "Foto perfil") {
                return <View />
            }
            if (key === "Password") {
                return <View />
            }
            if (obj.estado === 0) {
                texto = texto + key + ", "
            }
        })
        return (
            <Text
                style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "#000",
                    width: "100%",
                    textAlign: "center"
                }}>{texto}</Text>
        );
    }
    render() {
        if (this.props.state.usuarioReducer.estado === "exito") {
            this.notificacion()
            this.props.state.usuarioReducer.estado = ""
        }

        return (
            <View style={{
                flex: 1,
            }}>
                <View style={{ flex: 1, backgroundColor: "#000" }}>
                    <MapView
                        style={{
                            width: '100%',
                            height: "100%"
                        }}
                        initialRegion={this.state.region}
                    >
                    </MapView>
                </View>
                <View style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#00000055",
                    justifyContent: "center",
                    flex: 1,
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 30,
                        marginBottom: 30,
                    }}>
                        <View style={{
                            width: Dimensions.get("window").width * 0.3,
                            height: Dimensions.get("window").width * 0.3,
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}>
                            <Svg style={{
                                width: "100%",
                                height: "100%",
                            }} name="logoCompletoRecurso" />
                        </View>
                    </View>
                    <View style={{
                        flex: 2,
                        alignItems: "center"
                    }}>
                        <View style={{
                            backgroundColor: "#f00",
                            borderRadius: 20,
                            width: 400,
                            height: Dimensions.get("window").height * 0.5,
                            maxWidth: "90%",
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                color: "#fff",
                                padding: 15,
                                textAlign: "center"
                            }}>
                                Estamos verificando tu usuario. Por favor ten paciencia.
                            </Text>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                color: "#fff",
                                padding: 15,
                                textAlign: "center"
                            }}>Datos pendientes de verificación:</Text>
                            {this.faltanteDatos()}
                        </View>
                    </View>
                </View>

                <View style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    flexDirection: 'column',
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            AsyncStorage.removeItem(AppParams.storage.usuarioLog)
                            this.props.state.usuarioReducer.usuarioLog = false
                            this.props.state.usuarioReducer.estado = ""
                            SSBackgroundLocation.getInstance().stop();
                            // this.props.state.backgroundLocationReducer.close()
                            this.props.navigation.replace("CargaPage")

                            return <View />
                        }}
                        style={{
                            width: 60,
                            height: 60,
                            borderWidth: 2,
                            borderRadius: 100,
                            borderColor: "#fff",
                            backgroundColor: '#f00',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 20,
                        }}>
                            Salir
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(EsperandoConfirmacionPage);