import React from 'react';
import { ActivityIndicator, AsyncStorage, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

const ConfirmacionBusqueda = (props) => {
    if (props.state.viajesReducer.estado == "exito") {
        props.state.viajesReducer.estado = ""
        props.navigation.navigate("ViajeEsperaPage")
    }

    return (
        <View style={{
            position: "absolute",
            bottom: 10,
            width: "100%",
            alignItems: "center"
        }}>
            <TouchableOpacity
                onPress={() => {
                    var exito = true
                    var destino = []
                    var contador = 1
                    Object.keys(props.state.viajesReducer.ubicacion).map((key) => {
                        var obj = props.state.viajesReducer.ubicacion[key]

                        if (!obj.data) {
                            exito = false
                        }
                        var dato = {
                            index: contador,
                            latitude: obj.data.latitude,
                            longitude: obj.data.longitude,
                            direccion: obj.data.direccion
                        }
                        destino.push(dato)
                        contador++
                    })

                    if (exito) {
                        props.state.socketClienteReducer.sessiones["motonet"].send({
                            component: "viaje",
                            type: "buscar",
                            data: {
                                destinos: destino
                            },
                            key_usuario: props.state.usuarioReducer.usuarioLog.key,
                            key_tipo_viaje: "viaje",
                            estado: "cargando"
                        }, true);
                        return <View />
                    }
                    alert("falta rellenar datos en la carrera")
                }}
                style={{
                    justifyContent: "center",
                    alignItems: 'center',
                    height: 40,
                    width: "50%",
                    borderRadius: 20,
                    backgroundColor: "red"
                }}>
                {/*  {props.state.viajesReducer.estado === "cargando" ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : ( */}
                <Text
                    style={{
                        color: '#fff',
                        fontSize: 18,
                    }}>
                    Confirmar viaje
                        </Text>
                {/*   )} */}
            </TouchableOpacity>

            <View style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
            }}>

                <TouchableOpacity style={{
                    height: 100,
                    borderRadius: 20,
                    width: 150,
                    backgroundColor: "#fff",
                    borderColor: "red",
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text>
                        MOTO
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    height: 100,
                    borderRadius: 20,
                    width: 150,
                    backgroundColor: "#fff",
                    borderColor: "red",
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text>
                        TORITO
                    </Text>
                </TouchableOpacity>

            </View>


        </View>
    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ConfirmacionBusqueda);


