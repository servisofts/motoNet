import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import Svg from '../../Svg';
import AppParams from '../../Json/index.json'
import { ScrollView } from 'react-native-gesture-handler';
import Styles from '../../Styles';

const ConfirmarViaje = (props) => {
    const [obj, setObj] = React.useState(false);
    const [isRedirect, setRedirect] = React.useState(true);
    const [precio, setPrecio] = React.useState(0)

    const delay = ms => new Promise(res => setTimeout(res, ms));

    var datos;

    if (!props.state.ViajeReducer.data) {
        props.navigation.replace("InicioPage");
        return <Text>No existe</Text>

    } else {
        datos = props.state.ViajeReducer.data;
        if (datos.estado == 0) {
            props.dispatch({
                component: "emergencia",
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
            }
            return <View />
        })
    }

    // const yourFunction = async () => {
    //     await delay(datos.parametros["Tiempo permitido para aceptar viaje conductor"] * 1000);
    //     console.log("tiempooo");
    //     setObj(true);
    //     return <View />;
    // };
    // if (!obj) {
    //     yourFunction();
    // }
    // if (obj) {
    //     if (!isRedirect) {
    //         return <View />;
    //     }
    //     props.dispatch({
    //         component: "viaje",
    //         type: "cancelarBusquedaConductor"
    //     });
    // }

    // console.log(objeto)
    //var datos = JSON.parse(objeto.data);
    if (props.state.ViajeReducer.estado === "error") {
        props.state.ViajeReducer.estado = "";
        props.state.ViajeReducer.data = false;
        return <View />
    }

    if (props.state.ViajeReducer.estado === "exito" && props.state.ViajeReducer.type == "confirmarBusquedaConductor") {
        props.state.navigationReducer.replace("ViajeInicioPage");
        return <View />
    }

    if (props.state.ViajeReducer.estado === "exito" && props.state.ViajeReducer.type == "cancelarBusquedaConductor") {
        props.state.navigationReducer.replace("CargaPage");
        return <View />
    }

    if (props.state.ViajeReducer.estado === "exito" && props.state.ViajeReducer.type == "negociarViajeConductor") {
        if (isRedirect) {
            setRedirect(false);
        }
    }


    const AceptarViaje = () => {
        props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
            component: "emergencia",
            type: "confirmarBusquedaConductor",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            key_viaje: datos.key,
        }, true);
        return <View />
    }

    const CancelarViaje = () => {
        props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
            component: "emergencia",
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
                flex: 1,
                alignItems: 'center',
                justifyContent: "space-evenly",
            }}>

                <View style={{ top: 20, paddingBottom: 10 }}>
                    <Svg name="logoCompletoRecurso"
                        style={{
                            width: Dimensions.get("window").height*0.2,
                            height: Dimensions.get("window").height*0.2,
                            fill: "#fff"

                        }} />
                </View>

                <Text style={{
                    color: "#2c4c7e",
                    fontSize: Dimensions.get("window").width*0.07,
                    fontWeight: "bold",
                    textAlign: "center",
                    
                }}>
                    Emergencia Entrante
                    </Text>
                <TextInput
                    style={{
                        ...styles.touch,
                        fontSize:12
                    }}
                    placeholder={""}
                    editable={false}
                    value={datos.direccion}
                    autoCapitalize='none'
                />

            </View>

            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <TouchableOpacity
                    onPress={AceptarViaje}
                    style={{
                        width: Dimensions.get("window").height*0.2,
                        height: Dimensions.get("window").height*0.2,
                        borderRadius: 100,
                        backgroundColor: "#2c4c7e",
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...Styles.sombra
                    }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>
                        Aceptar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={CancelarViaje}
                    style={{
                        width: "50%",
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        borderColor: "#2c4c7e",
                        borderWidth: 2,
                    }}>
                    <Text style={{
                        color: "#a4a4a4",
                        fontSize: 20
                    }}>
                        Cancelar</Text>
                </TouchableOpacity>
                <View>

                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    touch: {
        width: "90%",
        backgroundColor: "#fff",
        textAlign:"center",
        color:"#666",
        height: 50,
        paddingLeft: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ConfirmarViaje);
