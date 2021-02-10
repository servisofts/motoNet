import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import Svg from '../../Svg';

const ConfirmarViaje = (props) => {

    const [obj, setObj] = React.useState(false);
    const [isRedirect, setRedirect] = React.useState(true);
    const [precio, setPrecio] = React.useState()

    const delay = ms => new Promise(res => setTimeout(res, ms));

    var datos;
    if (!props.state.ViajeReducer.data) {
        return <Text>No existe</Text>
    } else {
        datos = props.state.ViajeReducer.data;
        Object.keys(props.state.ViajeReducer.data.movimientos).map((key) => {
            var objMovimiento = props.state.ViajeReducer.data.movimientos[key];
            console.log(objMovimiento)
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

    const yourFunction = async () => {
        await delay(datos.parametros["Tiempo permitido para aceptar viaje conductor"] * 1000);
        console.log("tiempooo");
        setObj(true);
        return <View />;
    };
    if (!obj) {
        yourFunction();
    }
    if (obj) {
        if (!isRedirect) {
            return <View />;
        }
        props.dispatch({
            component: "viaje",
            type: "cancelarBusquedaConductor"
        });
    }

    // console.log(objeto)
    //var datos = JSON.parse(objeto.data);
    if (props.state.ViajeReducer.estado === "error") {
        props.state.ViajeReducer.estado = "";
        props.state.ViajeReducer.data = false;
        return <View />
    }

    if (props.state.ViajeReducer.estado === "exito" && props.state.ViajeReducer.type == "confirmarBusqueda") {
        props.state.navigationReducer.replace("ViajePage");
        return <View />
    }

    if (props.state.ViajeReducer.estado === "exito" && props.state.ViajeReducer.type == "cancelarBusquedaConductor") {
        return <View />
    }

    if (props.state.ViajeReducer.estado === "exito" && props.state.ViajeReducer.type == "negociarViajeConductor") {
        if (isRedirect) {
            setRedirect(false);
        }
    }

    const Negociar = () => {
        props.state.socketClienteReducer.sessiones["motonet"].send({
            component: "viaje",
            type: "negociarViajeConductor",
            estado: "cargando",
            costo: precio,
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            key_viaje: datos.key,
        }, true);
        setRedirect(false);
        return <View />
    }

    const AceptarViaje = () => {
        props.state.socketClienteReducer.sessiones["motonet"].send({
            component: "viaje",
            type: "confirmarBusqueda",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            key_viaje: datos.key,
        }, true);
        return <View />
    }

    const CancelarViaje = () => {
        props.state.socketClienteReducer.sessiones["motonet"].send({
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
            backgroundColor: "red",
        }}>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: "space-evenly",
                }}>
                <Text style={{
                    color: "#fff",
                    fontSize: 45,
                    fontWeight: "bold"
                }}>
                    MotoNet
                    </Text>
                <TextInput
                    style={styles.touch}
                    placeholder={""}
                    onChangeText={text => hanlechage(text, "pass")}
                    value={datos.destinos[0].direccion}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.touch}
                    placeholder={""}
                    onChangeText={text => hanlechage(text, "pass")}
                    value={datos.destinos[1].direccion}
                    autoCapitalize='none'
                />
            </View>

            <View style={{
                flex: 1.5,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>

                <TouchableOpacity
                    onPress={() => {
                        setPrecio(precio + 1)
                    }}
                    style={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Svg name="Arriba"
                        style={{
                            width: 50,
                            height: 50,
                            fill: "#fff"

                        }} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={Negociar}
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: 100,
                        backgroundColor: "#fff",
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                    <Text>
                        {precio} bs.
                    </Text>
                    <Text>
                        Negociar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setPrecio(precio - 1)
                    }}
                    style={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Svg name="Arriba" //flecha abajo
                        style={{
                            width: 50,
                            height: 50,
                            fill: "#fff",
                            transform: [
                                { rotate: '180deg' }
                            ]
                        }} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={AceptarViaje}
                    style={{
                        width: "20%",
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        borderColor: "#fff",
                        borderWidth: 2,
                    }}>
                    <Text style={{
                        color: "#fff"
                    }}>
                        Aceptar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={CancelarViaje}
                    style={{
                        width: "20%",
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        borderColor: "#fff",
                        borderWidth: 2,
                    }}>
                    <Text style={{
                        color: "#fff"
                    }}>
                        Cancelar</Text>
                </TouchableOpacity>

            </View>

            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <View style={{
                    borderRadius: 30,
                    borderWidth: 3,
                    width: "90%",
                    borderColor: "#fff",
                }}>
                    <Text style={{
                        color: "#fff",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 15
                    }}>
                        DETALLE DEL PEDIDO
                        </Text>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: 30
                    }}>
                        <Text style={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 15
                        }}>
                            Tiempo Perdido
                        </Text>

                        <Text style={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 15
                        }}>
                            Tipo de Pago
                        </Text>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: 30,
                        marginBottom: 20
                    }}>
                        <Text style={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 15
                        }}>
                            Tiempo estimado
                        </Text>

                        <Text style={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 15
                        }}>
                            Monto estimado
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    touch: {
        width: "80%",
        backgroundColor: "#fff",
        height: 50,
        paddingLeft: 15,
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
