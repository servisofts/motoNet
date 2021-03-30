import React, { useRef } from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, Text, TouchableOpacity, View, Animated, Easing } from 'react-native';
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
                width: "90%",
            }}>

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

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: "bold"
                    }}>TOTAL:</Text>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: "bold"
                    }}>Bs. {totalViaje}</Text>
                </View>
                {/* <Text>TOTAL {totalViaje} bs.</Text> */}
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
                height: 300,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                backgroundColor: "#fff",
                borderColor: "#ccc",
                borderTopWidth: 2,
                borderLeftWidth: 2,
                borderRightWidth: 2,
                flex: 1,
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Svg name="MarkerMoto"
                        style={{
                            width: 50,
                            height: 50,
                            fill: "#000"
                        }} />
                </View>

                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {getDetalleRuta()}
                </View>

                <View style={{
                    flex: 1,
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
                                height: 50,
                                borderRadius: 2,
                                width: "90%",
                                backgroundColor: "red",
                                borderColor: "#f00",
                                borderWidth: 2,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => PedirViaje()}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                color: "#fff",
                            }}>
                                CONFIRMAR MOTONET
                            </Text>
                        </TouchableOpacity>
                    )
                    }
                </View>
            </View>

            <TouchableOpacity style={{
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
            </TouchableOpacity>
        </Animated.View>
    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(DetalleDeViajes);


