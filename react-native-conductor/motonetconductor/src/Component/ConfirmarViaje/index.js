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
const delay = ms => new Promise(res => setTimeout(res, ms));

var mapa = false;
const ConfirmarViaje = (props) => {
    const [isRedirect, setRedirect] = React.useState(false);
    const [precio, setPrecio] = React.useState(0)
    const [state, setState] = React.useState({});


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
                        if (objMovimiento.costo.monto == 0) {
                            setPrecio(1)
                        } else {
                            setPrecio(objMovimiento.costo.monto)
                        }
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
                var tiempo = moment(new Date(viaje.movimientos["notifico_conductor"].fecha_on))
                var actual = moment(new Date())
                console.log(tiempo.toISOString());
                var transcurrido = actual.diff(tiempo);
                console.log(transcurrido);
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
                var tiempo = moment(new Date(viaje.movimientos["negociacion_conductor"].fecha_on))
                
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

    const hilo = async () => {
        await delay(1000);
        setState({...state});
    }
    //hilo();
    return (
        <View style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#F10023",
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
                    paddingBottom: 8,
                }}>
                    <Text style={{
                        marginTop: 4,
                        color: "#fff",
                        fontSize: 16,
                        textAlign: "center",

                    }}>
                        {"Nuevo viaje"}
                    </Text>
                    <Text style={{
                        color: "#fff",
                        fontSize: 14,
                        textAlign: "center",
                    }}>
                        {datos["tipo_viaje"].descripcion}
                    </Text>
                    {getDireccion("direccion_inicio")}
                    {getDireccion("direccion_fin")}
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
                        width: "80%",
                        color: "#eee",
                        fontSize: 10,
                        marginTop: 4,
                        textAlign: "center",
                    }}>Coloca tu oferta y preciona negociar!</Text>
                    <View style={{
                        width: "80%",
                        maxWidth: 600,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        flexDirection: "row",
                    }}>
                        {/* <TouchableOpacity
                            onPress={() => {
                                setPrecio(precio - 1)
                            }}
                            style={{
                                flex: 1,
                                margin: 4,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 4,
                                borderColor: "#fff",
                                borderWidth: 1,
                            }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 20
                            }}>-</Text>
                        </TouchableOpacity> */}
                        <View style={{
                            flex: 1,
                        }}>

                        </View>
                        <View
                            // onPress={CancelarViaje}
                            style={{
                                flex: 3,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 4,
                                borderColor: "#fff",
                                borderWidth: 1,
                            }}>
                            <TextInput
                                value={precio + ""}
                                style={{
                                    padding: 0,
                                    textAlign: "center",
                                    color: "#fff",
                                    fontSize: 20,
                                    width: "100%",
                                    flex: 1,
                                }}
                                keyboardType={"phone-pad"}
                                onBlur={(e) => {
                                    if (precio == "_") {
                                        setPrecio(0);
                                    }
                                }}
                                onChangeText={(_value) => {

                                    if (!_value) {
                                        setPrecio("_");
                                        return _value;
                                    }
                                    var value = _value;
                                    value = value.trim();
                                    value = value.replace(/\D/, "");
                                    setPrecio(parseInt(value));
                                }}
                            />
                        </View>

                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 20
                            }}>Bs.</Text>
                        </View>
                        {/* <TouchableOpacity
                            onPress={() => {
                                setPrecio(precio + 1)
                            }}
                            style={{
                                flex: 1,
                                margin: 4,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 4,
                                borderColor: "#fff",
                                borderWidth: 1,
                            }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 20
                            }}>+</Text>
                        </TouchableOpacity> */}

                    </View>
                    <Text style={{
                        width: "80%",
                        color: "#eee",
                        fontSize: 10,
                        marginTop: 4,
                        textAlign: "center",
                    }}> Costo sugerido: {datos.movimientos["inicio_busqueda"].costo.monto} Bs</Text>
                    <View style={{
                        width: "80%",
                        paddingTop: 8,
                        paddingBottom: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: "row",

                    }}>

                        <TouchableOpacity
                            onPress={CancelarViaje}
                            style={{
                                width: 130,
                                height: 40,
                                // margin: 4,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 4,
                                borderColor: "#fff",
                                borderWidth: 1,
                            }}>
                            <Text style={{
                                color: "#fff",
                                fontSize: 16
                            }}>
                                CANCELAR</Text>
                        </TouchableOpacity>
                        <View style={{
                            flex: 1,
                        }}>

                        </View>
                        <TouchableOpacity
                            onPress={AceptarViaje}
                            style={{
                                width: 130,
                                height: 40,
                                // margin: 4,
                                borderRadius: 4,
                                borderColor: "#fff",
                                borderWidth: 1,
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
        width: "95%",
        // backgroundColor: "#fff",
        textAlign: "center",
        color: "#fff",
        marginTop: 8,
        borderWidth: 1,
        borderColor: "#dddddd",
        height: 40,
        paddingLeft: 10,
        borderRadius: 4,
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
