import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import Boton1 from '../../../component/Boton1'

const ModalOferta = (props) => {

    const buscarOtro = () => {
        props.state.socketClienteReducer.sessiones["motonet"].send({
            component: "viaje",
            type: "denegarOferta",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            key_viaje: props.data.key
        }, true);
        return <View />
    }

    const aceptarConductor = () => {
        props.state.socketClienteReducer.sessiones["motonet"].send({
            component: "viaje",
            type: "confirmarBusqueda",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            key_viaje: props.data.key
        }, true);
        return <View />
    }

    const getCondutor = () => {

        if (!props.state.usuarioReducer.data[props.data.key_conductor]) {
            if (props.state.usuarioReducer.estado == "cargando") {
                console.log("entro")
                return <View />
            }
            props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "usuario",
                type: "getById",
                cabecera: "registro_conductor",
                key: props.data.key_conductor,
                estado: "cargando",
            }, true);
            return <View />
        }

        var data = props.state.usuarioReducer.data[props.data.key_conductor]

        return (
            <View style={{
                alignItems: "center"
            }}>
                <View style={{
                    backgroundColor: "#ccc",
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    marginTop: 10,
                    marginBottom: 10
                }}>
                </View>
                <Text>
                    {data["Nombres"].dato} {data["Apellidos"].dato}
                </Text>
                <Text>
                    {data["Correo"].dato}
                </Text>
                <Text style={{
                    color: "#000",
                    fontSize: 20,
                    fontWeight: "bold"
                }}>Bs. {JSON.stringify(props.data.movimientos["negociacion_conductor"].costo.monto)}</Text>

            </View>
        )
    }


    return (
        <View style={{
            flex: 1,
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "#00000050",
            justifyContent: "center",
            alignItems: "center",
        }}>


            <View style={{
                width: 300,
                height: 250,
                backgroundColor: "#fff",
                borderRadius: 20,
                // justifyContent: "center",
                // alignItems: "center"
            }}>
                <View style={{
                    width: "100%",
                    // backgroundColor:"#ccc",
                    alignItems: "center"
                }}>

                    {getCondutor()}

                </View>

                <View style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    alignItems: "center",
                    // backgroundColor: "#ccc"
                }}>
                    <View style={{
                        // flex: 1,
                        width: 100
                    }}>
                        <Boton1
                            label="Aceptar"
                            type="1"
                            onPress={() => { aceptarConductor() }}
                            cargando={false} />
                    </View>

                    <View style={{
                        // flex: 1,
                        width: 100
                    }}>
                        <Boton1
                            label="Buscar Otro"
                            type="4"
                            onPress={() => { buscarOtro() }}
                            cargando={false} />
                    </View>

                </View>
            </View>
        </View>
    )
}


const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ModalOferta);
