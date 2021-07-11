import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import Svg from '../../Svg';
import AppParams from '../../Json/index.json'
import { ScrollView } from 'react-native-gesture-handler';
import Styles from '../../Styles';
import EsperandoConfirmacion from './EsperandoConfirmacion';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import RutaViaje from './RutaViaje';
import SThread from '../../SThread';
import moment from 'moment';
var mapa = false;
const ConfirmarViaje = (props) => {
    const [isRedirect, setRedirect] = React.useState(false);
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
            if (!viaje.movimientos["negociacion_conductor"]) {
                var tiempoPermitido = viaje.parametros["Tiempo permitido para aceptar viaje conductor"]
                var tiempo = moment(viaje.movimientos["notifico_conductor"].fecha_on)
                var actual = moment(new Date())
                var transcurrido = actual.diff(tiempo);
                if (transcurrido > (tiempoPermitido * 1000)) {
                    console.log("LA NOTIFICACION VENCIO");
                    props.dispatch({
                        component: "viaje",
                        type: "borrarViaje",
                        estado: "exito"
                    })
                    return <View />
                }
            } else {
                var tiempoPermitido = viaje.parametros["Tiempo permitido para aceptar oferta cliente"]
                var tiempo = moment(viaje.movimientos["negociacion_conductor"].fecha_on)
                var actual = moment(new Date())
                var transcurrido = actual.diff(tiempo);
                if (transcurrido > (tiempoPermitido * 1000)) {
                    console.log("LA NEGOCIACION VENCIO");
                    props.dispatch({
                        component: "viaje",
                        type: "borrarViaje",
                        estado: "exito"
                    })
                    return <View />
                }
            }

            // console.log()
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
    if (props.state.ViajeReducer.error == "viaje_cancelado") {
        props.state.ViajeReducer.error = "";
        console.log("el viaje fue cancelado");
        props.dispatch({
            component: "viaje",
            type: "borrarViaje",
            estado: "exito"
        })
        return <View />
    }

    if (isRedirect) {
        props.state.navigationReducer.replace(isRedirect);
        return <View />
    }
    const zoomin = (obj) => {
        // obj = currentPos;
        if (!mapa) {
            return;
        }
        var pos = {
            latitude: obj.latitude,
            longitude: obj.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
        }
        mapa.animateToRegion(pos, 2000);
        // setZoom(true);
        return <View />
    }
    const fitCordinates = (pos) => {
        if (!mapa) {
            return;
        }
        mapa.fitToCoordinates(pos, {
            edgePadding: {
                top: 100,
                right: 100,
                bottom: 100,
                left: 100,
            }
        })
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

    const getDireccion = (type) => {
        if (!datos[type]) {
            return <View />
        }
        return (<TextInput
            style={{
                ...styles.touch,
                fontSize: 12
            }}
            placeholder={""}
            editable={false}
            value={datos[type].direccion}
            autoCapitalize='none'
        />
        )
    }
    return (
        <View style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#f20022",
            alignItems: "center"
        }}>
            <ScrollView style={{
                width: "100%",
                flex: 1,
            }} contentContainerStyle={{
                minHeight: "100%",
                alignItems: "center"
            }}>
                <View style={{
                    width: "100%",
                    alignItems: 'center',
                }}>


                    <Text style={{
                        marginTop: 4,
                        color: "#fff",
                        fontSize: 16,
                        textAlign: "center",

                    }}>
                        {"Nuevo viaje"}
                    </Text>

                    {getDireccion("direccion_inicio")}
                    {getDireccion("direccion_fin")}
                    <Text style={{
                        marginTop: 4,
                        color: "#fff",
                        fontSize: 18,
                        fontWeight: "bold",
                        textAlign: "center",

                    }}>
                        {datos["tipo_viaje"].descripcion}
                    </Text>

                </View>
                <View style={{
                    flex: 1,
                    width: "100%",
                    backgroundColor: "#ddd"
                }}>
                    <MapView
                        showsUserLocation={true}
                        style={{
                            width: "100%",
                            flex: 1,
                        }}
                        initialRegion={{
                            latitude: datos.direccion_inicio.latitude,
                            longitude: datos.direccion_inicio.longitude,
                            latitudeDelta: 0.017,
                            longitudeDelta: 0.017
                        }}
                        ref={map => { mapa = map }}
                        provider={PROVIDER_GOOGLE}
                    >
                        <RutaViaje
                            fitCordinates={(arrpos) => { fitCordinates(arrpos) }}
                            zoomin={(pos) => { zoomin(pos) }}
                        />
                    </MapView>
                </View>
                <View style={{
                    width: "100%",
                    alignItems: "center",
                }}>
                    <Text style={{
                        color: "#fff",
                        fontSize: 16,
                        marginTop: 4,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}>Costo sugerido: {datos.movimientos["inicio_busqueda"].costo.monto} Bs</Text>
                    <View style={{
                        width: "90%",
                        maxWidth: 600,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        flexDirection: "row",
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setPrecio(precio - 1)
                            }}
                            style={{
                                flex: 1,
                                margin: 4,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 8,
                                borderColor: "#fff",
                                borderWidth: 2,
                            }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 20
                            }}>-</Text>
                        </TouchableOpacity>
                        <View
                            // onPress={CancelarViaje}
                            style={{
                                flex: 2,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 8,
                                borderColor: "#fff",
                                borderWidth: 2,
                            }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 20
                            }}>{precio}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setPrecio(precio + 1)
                            }}
                            style={{
                                flex: 1,
                                margin: 4,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 8,
                                borderColor: "#fff",
                                borderWidth: 2,
                            }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 20
                            }}>+</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        width: "100%",
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: "row",

                    }}>

                        <TouchableOpacity
                            onPress={CancelarViaje}
                            style={{
                                width: 130,
                                height: 40,
                                margin: 8,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 8,
                                borderColor: "#fff",
                                borderWidth: 2,
                            }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 16
                            }}>
                                CANCELAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={AceptarViaje}
                            style={{
                                width: 130,
                                height: 40,
                                margin: 8,
                                borderRadius: 8,
                                borderColor: "#fff",
                                borderWidth: 2,
                                backgroundColor: "#fff",
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Text style={{ color: '#f00', fontWeight: 'bold', fontSize: 16 }}>
                                NEGOCIAR
                            </Text>
                        </TouchableOpacity>
                        <View>

                        </View>
                    </View>
                </View>
                <EsperandoConfirmacion state={props.state} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    touch: {
        width: "90%",
        backgroundColor: "#fff",
        textAlign: "center",
        color: "#666",
        marginTop: 16,
        borderWidth: 1,
        borderColor: "#dddddd",
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
