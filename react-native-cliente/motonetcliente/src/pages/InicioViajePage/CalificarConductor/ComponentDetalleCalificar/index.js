import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import STheme from '../../../../STheme';
import Svg from '../../../../Svg';
import Boton1 from '../../../../component/Boton1';
import EstadoViaje from '../../EstadoViaje';
import TrabajoFinalizado from '../../TrabajoFinalizado';

const ComponentDetalleCalificar = (props) => {

    console.log("edson " + JSON.stringify(props.data))

    const getDetalleRuta = () => {
        // var tipos_de_viajes = props.state.tipoViajesReducer.data;
        return (
            <View style={{
                flex: 1,
                margin: 10,
            }}>

                <View style={{
                    marginBottom: 5,
                    // backgroundColor:"#ccc"
                }}>
                    <Text style={{
                        color: STheme.color.textb,
                        fontSize: 14,
                    }}>
                        Calificar servicio:
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
                </View>

                <View style={{
                    width: "100%",
                    height: 1.5,
                    backgroundColor: "#ccc",
                    marginTop: 10
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
                                margin: 10
                            }}>
                            </View>
                            <View style={{
                                // backgroundColor: "#ccc",
                                width: "100%",
                                justifyContent: "center"
                            }}>
                                <Text style={{
                                    color: "#000"
                                }}>{props.data["Nombres"].dato} {props.data["Apellidos"].dato}
                                </Text>
                                <Text style={{
                                    color: "#000"
                                }}>{props.data["Correo"].dato}
                                </Text>
                                {/* <Text style={{
                                    color: "#000"
                                }}>{props.data["Telefono"].dato}
                                </Text> */}
                            </View>
                        </View>
                    </View>

                    <TrabajoFinalizado />

                    <View style={{
                        // width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20,
                        marginBottom: 20,
                        backgroundColor: "#ccc"
                    }}>

                        <TouchableOpacity
                            style={{
                                height: 40,
                                width: 150,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: STheme.color.background,
                                borderRadius: 30,
                                borderColor: "#fff",
                                borderWidth: 2,
                            }}
                            onPress={() => {
                                var datos = {};
                                var exito = true;
                                for (const key in obj2) {
                                    if (obj2[key]) {
                                        // obj[key].error = true;
                                        // exito = false;
                                        // } else {
                                        // obj[key].error = false;
                                        datos[key] = obj2[key]
                                    }
                                }
                                // setObj({ ...obj2 })
                                if (exito) {
                                    // props.state.socketClienteReducer.sessiones["glup"].send({
                                    //     component: "glup",
                                    //     type: "movimientos",
                                    //     estado: "cargando",
                                    //     movimiento: "calificar_glup",
                                    //     key_usuario: props.state.usuarioReducer.usuarioLog.key,
                                    //     key_glup: props.state.glupReducer.glupEnCurso.key,
                                    //     calificacion: obj.rating,
                                    //     extras: datos,
                                    // }, true);
                                }
                            }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 15,
                                // fontWeight: "bold"
                            }}>
                                ENVIAR</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

    return (

        <View style={{
            position: "absolute",
            width: "100%",
            // height: Dimensions.get('window').height * 0.55,
            height: 400,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: "#fff",
            // borderColor: "#ccc",
            flex: 1,
            bottom: 0
        }}>
            {getDetalleRuta()}

        </View >
    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ComponentDetalleCalificar);


