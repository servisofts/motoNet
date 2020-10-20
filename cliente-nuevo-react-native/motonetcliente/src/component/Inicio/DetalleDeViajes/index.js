import React, { useRef }  from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, Text, TouchableOpacity, View, Animated} from 'react-native';
import { connect } from 'react-redux';

const DetalleDeViajes = (props) => {
    
    const fadeAnim = useRef(new Animated.Value(-100)).current;
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: -100,
            duration: 1000
        }).start();
    };

    if (props.ventanaSelect != "DetalleDeViaje") {
        return <View />
    }
 
    if (props.state.locationGoogleMapReducer.estado == "cargando") {
        return <View />
    }

    if (!props.state.locationGoogleMapReducer.route) {
        props.state.socketClienteReducer.sessiones["motonet"].send({
            component: "locationGoogle",
            type: "route",
            estado: "cargando",
            data: {
                inicio: props.state.viajesReducer.ubicacion["inicio"].data,
                fin: props.state.viajesReducer.ubicacion["fin"].data
            }
        }, true);
        return <View />
    }

    const PedirViaje = (objTipoViaje) => {
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
            props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "viaje",
                type: "buscar",
                data: {
                    destinos: destino
                },
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                key_tipo_viaje: objTipoViaje.key,
                estado: "cargando"
            }, true);
            return <View />
        }
        alert("falta rellenar datos en la carrera")
    }

    const getDetalleRuta = () => {
        if (!props.state.locationGoogleMapReducer.route) {
            return <View />
        }
        var route = props.state.locationGoogleMapReducer.route;
        return (
            <View style={{}}>
                <Text>distancia: {route.distancia} metros</Text>
                <Text>tiempo: {Math.round(route.duracion / 60) - 1} a {Math.round(route.duracion / 60) + 1} minutos.</Text>
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
                    alignItems: "center"
                }}>
                    {getDetalleRuta()}
                </View>

                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TouchableOpacity
                        style={{
                            height: 40,
                            borderRadius: 20,
                            width: 200,
                            backgroundColor: "#fff",
                            borderColor: "#ccc",
                            borderWidth: 2,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onPress={() => PedirViaje(obj)}>
                        <Text>
                            Pedir carrera
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={{
                height: 50,
                borderRadius: 100,
                width: 50,
                backgroundColor: "#fff",
                borderColor: "#ccc",
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                right: 0,
                position: "absolute"
            }}
                onPress={() => {
                    props.state.locationGoogleMapReducer.route = false;
                    props.setVentanaSelect("tipoDeViaje")
                }}>
                <Text>
                    volver
                </Text>
            </TouchableOpacity>
        </Animated.View>
    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(DetalleDeViajes);


