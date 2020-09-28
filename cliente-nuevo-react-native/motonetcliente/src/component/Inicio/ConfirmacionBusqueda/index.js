import React from 'react';
import { ActivityIndicator, AsyncStorage, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

const ConfirmacionBusqueda = (props) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',

        }}>
            <TouchableOpacity
                onPress={() => {
                    var exito = true
                    var datas = {}
                    Object.keys(props.state.viajesReducer.ubicacion).map((key) => {
                        var obj = props.state.viajesReducer.ubicacion[key]
                        if (!obj.data) {
                            exito = false
                        }

                    })
                    
                    if (exito) {
                        props.state.socketClienteReducer.sessiones["motonet"].send({
                            component: "viaje",
                            type: "buscar",
                            data: props.state.viajesReducer.ubicacion,
                            estado: "cargando"
                        }, true);
                        return<View/>
                    }
                    alert("falta rellenar datos en la carrera")
                }}
                style={{
                    justifyContent: "center",
                    alignItems: 'center',
                    position: "absolute",
                    bottom: 10,
                    width: 180,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "red"
                }}>
                {props.state.viajesReducer.estado === "cargando" ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 18,
                            }}>
                            Confirmar viaje
                        </Text>
                    )}
            </TouchableOpacity>
            <TouchableOpacity style={{
             justifyContent: "center",
             alignItems: 'center',
             position: "absolute",
             bottom: 10,
             width: 180,
             left:0,
             height: 40,
             borderRadius: 20,
             backgroundColor: "red"
            }}
                onPress={() => {
                    AsyncStorage.removeItem("motonet_usuarioLog");
                    props.state.usuarioReducer.usuarioLog = false
                    props.state.navigationReducer.replace("CargaPage")
                    return <View />
                }}
            >
                <Text>salir</Text>
            </TouchableOpacity>
        </View>
    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ConfirmacionBusqueda);


