import React, { useRef } from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, Text, TouchableOpacity, View, Animated, Easing, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';

const valor_menor = -380;
var totalViaje;
const DetalleDeViajes = (props) => {

    const [isVisible, setIsVisible] = React.useState(false);
    const fadeAnim = useRef(new Animated.Value(valor_menor)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 700
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: valor_menor,
            duration: 500,
        }).start(() => {
            if (fadeAnim._value < valor_menor + 100) {
                if (isVisible) {
                    setIsVisible(false);
                }
            }
        });
    };

    if (props.state.viajesReducer.data) {
        props.navigation.replace("ViajeEsperaPage");
        return <View />
    }

    if (props.ventanaSelect != "DetalleDeViaje") {
        if (isVisible == true) {
            fadeOut();
        }
    } else {
        if (!isVisible) {
            fadeIn();
            setIsVisible(true)
        }
    }
    if (!isVisible) {
        return <View />
    }

    const PedirViaje = (tarifas) => {
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
                direccion: obj.data.direccion,
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
                costoViaje: parseFloat(totalViaje),
                key_tipo_viaje: props.state.viajesReducer.key_tipo_viaje,
                estado: "cargando"
            }, true);
            return <View />
        }
        alert("falta rellenar datos en la carrera")
    }

    const getPrecio = (distancia, duracion) => {
        var keyTipoViaje = props.state.viajesReducer.key_tipo_viaje;
        if (!keyTipoViaje) {
            return <Text style={{ color: "#ccc" }}>Error. (keyTipoViaje) Not found</Text>
        }
        var TipoViaje = props.state.tipoViajesReducer.data[keyTipoViaje];
        if (!TipoViaje) {
            return <Text>Error. (TipoViaje) Not found</Text>
        }
        var tarifas = TipoViaje.tarifas;
        if (!tarifas) {
            return <Text>Error. (tarifas) Not found</Text>
        }
        var montoTiempo = tarifas["Monto por tiempo"]
        var montoKm = tarifas["Monto por kilometro"]
        var totalTiempo = (montoTiempo.monto / (60)) * distancia;
        var totalDistancia = (montoKm.monto / 1000) * distancia;
        var totalCalculado = totalTiempo + totalDistancia;
        totalViaje = Math.round(totalCalculado / 60)

        return (
            <View style={{
                width: "100%",
            }}>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: "bold"
                    }}>Efectivo</Text>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: "bold"
                    }}>Bs. {totalViaje}</Text>
                </View>
                {/* <Text>TOTAL {totalViaje} bs.</Text> */}

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 20
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: "bold"
                    }}>TIPO DE VIAJE:</Text>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: "bold"
                    }}>{TipoViaje.descripcion}</Text>
                </View>

                {/* <Text>Tipo viaje: {TipoViaje.descripcion}</Text> */}
                {/* <Text>distancia: {distancia / 1000} km</Text> */}
                {/* <Text>Tiempo: {Math.round(duracion / 60) - 1} a {Math.round(duracion / 60) + 1} minutos.</Text> */}
                {/* <Text>Monto por kilometro {montoKm.monto}</Text>
                <Text>Monto por tiempo {montoTiempo.monto}</Text>
                <Text>Monto por km * distancia {totalDistancia}</Text>
                <Text>Monto por tiempo * duracion {totalTiempo}</Text>  */}


            </View>
        )
    }

    const getDetalleRuta = () => {
        if (!props.state.locationGoogleMapReducer.route) {
            return <View />
        }
        var route = props.state.locationGoogleMapReducer.route;
        return (
            <View style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center"
            }}>
                {getPrecio(route.distancia, route.duracion)}
            </View>
        )
    }
    return (
        <Animated.View style={{
            position: "absolute",
            bottom: fadeAnim,
            width: "100%",
        }}>
            <View style={{
                width: "100%",
                // height: Dimensions.get('window').height * 0.3,
                height: 250,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                backgroundColor: "#fff",
                // borderColor: "#ccc",
                flex: 1,
            }}>

                <View style={{
                    flex: 1,
                    margin: 10,
                }}>

                    <View style={{
                        flex: 1,
                        // backgroundColor: "#ccc"
                    }}>
                        <Text>
                            Confirme el viaje
                    </Text>
                        <View style={{
                            flexDirection: "row",
                        }}>

                            <View style={{
                                flex: 0.5,
                                justifyContent: "center",
                                // alignItems: "center",
                            }}>
                                <Text>30 min Aprox</Text>
                            </View>

                            <View style={{
                                flex: 0.5,
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                {props.state.viajesReducer.estado == "cargando" ? (
                                    <View
                                        style={{
                                            height: 50,
                                            borderRadius: 2,
                                            width: "90%",
                                            backgroundColor: "red",
                                            borderColor: "#f00",
                                            borderWidth: 2,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}>
                                        <ActivityIndicator color="#fff" size="small" />
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        style={{
                                            height: 40,
                                            borderRadius: 10,
                                            width: 140,
                                            backgroundColor: "red",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                        onPress={() => PedirViaje()}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: "bold",
                                            color: "#fff",
                                        }}>
                                            Confirmar
                            </Text>
                                    </TouchableOpacity>
                                )
                                }
                            </View>

                        </View>

                    </View>

                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        // backgroundColor: "#ccc"
                    }}>
                        {getDetalleRuta()}
                    </View>

                </View>

            </View>

            {/* <TouchableOpacity style={{
                height: 50,
                width: 50,
                alignItems: "center",
                justifyContent: "center",
                left: 0,
                position: "absolute"
            }}
                onPress={() => {
                    props.state.locationGoogleMapReducer.route = true;
                    props.setVentanaSelect("tipoDeViaje")
                    return <View />
                }}>
                <Svg name="Cerrar"
                    style={{
                        width: 30,
                        height: 30,
                        fill: "#000"
                    }} />
            </TouchableOpacity> */}

        </Animated.View >
    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(DetalleDeViajes);


