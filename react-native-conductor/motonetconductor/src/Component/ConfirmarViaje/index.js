import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import Svg from '../../Svg';
import AppParams from '../../Json/index.json'
import { ScrollView } from 'react-native-gesture-handler';
import Styles from '../../Styles';
import EsperandoConfirmacion from './EsperandoConfirmacion';

const ConfirmarViaje = (props) => {
    const [obj, setObj] = React.useState(false);
    const [isRedirect, setRedirect] = React.useState(false);
    const [precio, setPrecio] = React.useState(0)

    const delay = ms => new Promise(res => setTimeout(res, ms));

    var datos;
    if (!props.state.ViajeReducer.data) {
        props.navigation.replace("InicioPage");
        return <Text>No existe</Text>
    } else {
        datos = props.state.ViajeReducer.data;
        // if (datos.key_conductor != props.state.usuarioReducer.usuarioLog.key) {
        //     props.dispatch({
        //         component: "viaje",
        //         type: "borrarViaje",
        //         estado: "exito"
        //     })
        //     return <View />
        // }
        if (datos.estado == 0) {
            props.dispatch({
                component: "viaje",
                type: "borrarViaje",
                estado: "exito"
            })
            return <View />
        }
        Object.keys(props.state.ViajeReducer.data.movimientos).map((key) => {
            var objMovimiento = props.state.ViajeReducer.data.movimientos[key];
            // console.log(objMovimiento)
            switch (objMovimiento.tipo) {
                case "inicio_busqueda":
                    if (!precio) {
                        setPrecio(objMovimiento.costo.monto)
                    }
                    break;
                case "inicio_viaje":
                    if (!isRedirect) {
                        setRedirect("ViajeInicioPage")
                    }
                    break;
            }
            return <View />
        })
    }

    if (props.state.ViajeReducer) {
        var viaje = props.state.ViajeReducer.data;
        if (viaje.movimientos["notifico_conductor"]) {
            if (viaje.movimientos["notifico_conductor"].key_referencia != props.state.usuarioReducer.usuarioLog.key) {
                props.dispatch({
                    component: "viaje",
                    type: "borrarViaje",
                    estado: "exito"
                })
                return <View />
            }
        } else {
            console.log("BORRADO POR ALGON MOTIVO")
            console.log(viaje)
            props.dispatch({
                component: "viaje",
                type: "borrarViaje",
                estado: "exito"
            })
            return <View />
        }
    }


    const yourFunction = async () => {
        await delay(datos.parametros["Tiempo permitido para aceptar viaje conductor"] * 1000);
        console.log("tiempooo");
        setObj(true);
        return <View />;
    };
    if (!obj) {
        // yourFunction();
    }
    if (obj) {
        props.dispatch({
            component: "viaje",
            type: "borrarViaje",
            estado: "exito"
        })
    }

    if (isRedirect) {
        props.state.navigationReducer.replace(isRedirect);
        return <View />
    }

    const AceptarViaje = () => {
        props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
            component: "viaje",
            type: "negociarViajeConductor",
            estado: "cargando",
            costo: precio,
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            key_viaje: datos.key,
        }, true);
        return <View />
    }

    const CancelarViaje = () => {
        props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
            component: "viaje",
            type: "cancelarBusquedaConductor",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            key_viaje: datos.key,
        }, true);
        return <View />
    }


    return (
        <View style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            //backgroundColor: "#2c4c7e",
            backgroundColor: "#fff",
        }}>
            <View style={{
                flex: 2,
                alignItems: 'center',
                justifyContent: "space-evenly",
            }}>

                <View style={{ top: 20, }}>
                    <Svg name="logoRecurso"
                        style={{
                            width: Dimensions.get("window").width * 0.2,
                            height: Dimensions.get("window").height * 0.2,
                            fill: "#fff"
                        }} />
                </View>
                <Text style={{
                    color: "#ff0000",
                    fontSize: Dimensions.get("window").width * 0.07,
                    fontWeight: "bold",
                    textAlign: "center",

                }}>
                    Viaje entrante.
                </Text>
                <TextInput
                    style={{
                        ...styles.touch,
                        fontSize: 12
                    }}
                    placeholder={""}
                    editable={false}
                    value={datos.direccion_inicio.direccion}
                    autoCapitalize='none'
                />
                <Text style={{
                    color: "#ff0000",
                    fontSize: Dimensions.get("window").width * 0.06,
                    fontWeight: "bold",
                    textAlign: "center",
                }}>Costo sugerido: {datos.movimientos["inicio_busqueda"].costo.monto} Bs</Text>

            </View>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: "row",
            }}>
                <TouchableOpacity
                    onPress={() => {
                        setPrecio(precio - 1)
                    }}
                    style={{
                        width: Dimensions.get("window").width * 0.2,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                        borderColor: "#ff9999",
                        borderWidth: 2,
                    }}>
                    <Text style={{
                        color: "#f00",
                        fontSize: 20
                    }}>-</Text>
                </TouchableOpacity>
                <View
                    // onPress={CancelarViaje}
                    style={{
                        width: Dimensions.get("window").width * 0.4,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                        borderColor: "#ff9999",
                        borderWidth: 2,
                    }}>
                    <Text style={{
                        color: "#f00",
                        fontSize: 20
                    }}>{precio}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setPrecio(precio + 1)
                    }}
                    style={{
                        width: Dimensions.get("window").width * 0.2,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                        borderColor: "#ff9999",
                        borderWidth: 2,
                    }}>
                    <Text style={{
                        color: "#f00",
                        fontSize: 20
                    }}>+</Text>
                </TouchableOpacity>

            </View>
            <View style={{
                flex: 1,
                width: "100%",
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: "row",
            }}>

                <TouchableOpacity
                    onPress={CancelarViaje}
                    style={{
                        width: Dimensions.get("window").width * 0.4,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        borderColor: "#ff9999",
                        borderWidth: 2,
                    }}>
                    <Text style={{
                        color: "#f00",
                        fontSize: 20
                    }}>
                        CANCELAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={AceptarViaje}
                    style={{
                        width: Dimensions.get("window").width * 0.4,
                        height: 50,
                        borderRadius: 20,
                        borderColor: "#ff9999",
                        borderWidth: 2,
                        backgroundColor: "#ff0000",
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>
                        NEGOCIAR
                    </Text>
                </TouchableOpacity>
                <View>

                </View>
            </View>
            <EsperandoConfirmacion state={props.state} />
        </View>
    )
}

const styles = StyleSheet.create({
    touch: {
        width: "90%",
        backgroundColor: "#fff",
        textAlign: "center",
        color: "#666",
        height: 50,
        paddingLeft: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // elevation: 5,
    },
});

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ConfirmarViaje);
