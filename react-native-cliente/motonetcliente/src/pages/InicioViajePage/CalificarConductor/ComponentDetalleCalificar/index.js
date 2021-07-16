import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, Dimensions, TextInput } from 'react-native';
import { connect } from 'react-redux';
import STheme from '../../../../STheme';
import Svg from '../../../../Svg';
import Boton1 from '../../../../component/Boton1';
import EstadoViaje from '../../EstadoViaje';
import TrabajoFinalizado from '../../TrabajoFinalizado';
import AppParams from "../../../../Json"

const ComponentDetalleCalificar = (props) => {

    console.log("edson " + JSON.stringify(props.data))

    const [obj, setObj] = React.useState({
        sugerencia: {
            value: "",
        },
        rating: {
            value: 0,
        },
    });

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
                                overflow: "hidden",
                                margin: 10
                            }}>
                                {props.state.imageReducer.getImage(AppParams.urlImages + "perfil.png?type=getPerfil&key_usuario=" + props.state.viajesReducer.data.key_conductor, {
                                })}
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

                    <TrabajoFinalizado obj={obj} setObj={setObj} />

                    <View style={{
                        marginTop: 15
                    }}>
                        <TextInput style={{
                            width: "100%",
                            // height: 100,
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 4,
                            paddingStart: 8,
                            textAlignVertical: 'top'
                        }}
                            value={obj.sugerencia.value}
                            onChangeText={(text) => {
                                obj.sugerencia.value = text
                                setObj({ ...obj });
                            }}
                            placeholder="Sugerencias"
                            placeholderTextColor={STheme.color.placeholder}
                            color="#000"
                            numberOfLines={4}
                            multiline={true}
                        />
                    </View>

                    <View style={{
                        // width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                        // backgroundColor: "#ccc"
                    }}>
                        <View style={{
                            width: '100%',
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 5
                        }}>
                            <Boton1 type="1"
                                label="Calificar"
                                cargando={false}
                                // cargando={props.state.viajesReducer.estado == "cargando"}
                                onPress={() => {
                                    var exito = false;
                                    if (obj.rating.value > 0) {
                                        exito = true
                                    }
                                    if (exito) {
                                        props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                                            component: "viaje",
                                            type: "calificar",
                                            estado: "cargando",
                                            key_usuario: props.state.usuarioReducer.usuarioLog.key,
                                            key_viaje: props.state.viajesReducer.data.key,
                                            calificacion: obj.rating.value,
                                            sugerencia: obj.sugerencia.value,
                                        }, true);
                                    }
                                    props.navigation.replace("CargaPage");
                                    props.state.viajesReducer.data = false
                                }}
                            />
                        </View>

                        <View style={{
                            width: '100%',
                            justifyContent: "center",
                        }}>
                            <Boton1 type="4"
                                label="Omitir"
                                cargando={false}
                                // cargando={props.state.viajesReducer.estado == "cargando"}
                                onPress={() => {
                                    props.navigation.replace("CargaPage");
                                    props.state.viajesReducer.data = false
                                }}
                            />
                        </View>

                    </View>

                </View >
            </View >
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


