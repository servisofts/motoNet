import React from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';
import STheme from '../../../STheme';

const TiposDeViajes = (props) => {

    const [Obj, setObj] = React.useState(false)
    const [Select, setSelect] = React.useState("Moto")

    if (props.ventanaSelect != "tipoDeViaje") {
        return <View />
    }

    if (props.state.tipoViajesReducer.estado == "cargando") {
        return <View />
    }

    if (!props.state.tipoViajesReducer.data) {
        props.state.socketClienteReducer.sessiones["motonet"].send({
            component: "tipoViaje",
            type: "getAll",
            estado: "cargando"
        }, true);
        return <View />
    }

    const EnviarDetalleViaje = () => {
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
            props.state.viajesReducer.key_tipo_viaje = Obj.key;
            //props.state.locationGoogleMapReducer.route = false;
            props.dispatch({
                component: "locationGoogle",
                type: "route",
                estado: "exito",
                data: false
            })
            console.log("entro al renderrr.............")
            props.setVentanaSelect("DetalleDeViaje")
            return <View />
        }
        alert("falta rellenar datos en la carrera")
    }

    const mostrarPedido = (obj, svg) => {
        if (obj.descripcion == Select) {

            if (!Obj) {
                setObj(obj)
            }

            return (
                <TouchableOpacity style={{
                    height: 80,
                    borderRadius: 20,
                    width: 150,
                    borderColor: "red",
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <View style={{
                        // width: 90,
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor: "#ccc",
                        flexDirection: "row"
                    }}>
                        <Svg name={svg}
                            style={{
                                width: 50,
                                height: 50,
                                // fill: "#000"
                            }} />
                        <Text style={{
                            color: "#000",
                            fontSize: 15,
                            fontWeight: "bold"
                        }}>
                            {obj.descripcion}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={{
                    height: 80,
                    borderRadius: 20,
                    width: 150,
                    alignItems: "center",
                    justifyContent: "center"
                }} onPress={() => {
                    setObj(obj)
                    setSelect(obj.descripcion)
                }}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor: "#ccc",
                        flexDirection: "row"
                    }}>
                        <Svg name={svg}
                            style={{
                                width: 50,
                                height: 50,
                            }} />
                        <Text style={{
                            color: "#000",
                            fontSize: 15,
                            fontWeight: "bold"
                        }}>
                            {obj.descripcion}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }

    }


    const ListaTiposDeViajes = () => {
        return Object.keys(props.state.tipoViajesReducer.data).map((key) => {
            var obj = props.state.tipoViajesReducer.data[key];
            if (obj.descripcion === "Moto") {
                return (
                    <>
                        {mostrarPedido(obj, "Moto")}
                    </>
                )
            }
            if (obj.descripcion === "Torito") {
                return (
                    <>
                        { mostrarPedido(obj, "Torito")}
                    </>
                )
            }
        })
    }

    return (
        <View style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            alignItems: "center",
            backgroundColor: "#fff"
        }}>
            <View style={{
                marginTop: 10,
                // flexDirection: "row",
                // justifyContent: "space-evenly",
                width: "100%",
            }}>
                {/* <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} style={{
                    flex: 1,
                }}> */}
                {/* {ListaTiposDeViajes()} */}
                {/* </ScrollView> */}
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around"
                }}>
                    {ListaTiposDeViajes()}
                </View>

                <View style={{
                    width: "100%",
                    // backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 70
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            EnviarDetalleViaje()
                        }}
                        style={{
                            width: "90%",
                            height: 50,
                            // position: "absolute",
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: "#f00",
                            borderRadius: 5
                        }}>
                        <Text style={{
                            fontSize: 18,
                            color: STheme.color.text
                        }}>
                            Pedir ahora
                    </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TiposDeViajes);


