import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, Animated, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';
import AppParams from '../../../Json/index.json'

const valor_menor = -380;
var totalViaje;

const TerminarViaje = (props) => {

    const [isVisible, setIsVisible] = React.useState(false);
    const fadeAnim = useRef(new Animated.Value(valor_menor)).current;

    if (!props.state.ViajeReducer.data) {
        return <View />
    }

    if (!props.state.ViajeReducer.data.movimientos["ambulancia_cerca"]) {
        return <View />
    }

    if (props.state.ViajeReducer.data.movimientos["termino_viaje_conductor"]) {
        AsyncStorage.removeItem("clinica_viaje");
        props.navigation.replace("CargaPage");
        return <View />
    }

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

    // if (props.state.viajesReducer.viaje) {
    //     props.navigation.replace("ViajeEsperaPage");
    //     return <View />
    // }

    // if (isVisible == true) {
    //     fadeOut();
    // }
    if (!isVisible) {
        fadeIn();
        setIsVisible(true)
    }
    // if (!isVisible) {
    //     return <View />
    // }
    return (
        <Animated.View style={{
            position: "absolute",
            bottom: fadeAnim,
            width: "100%",
        }}>
            <View style={{
                width: "100%",
                height: 150,
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
                    <Svg name="logoCompletoRecurso"
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
                    <Text>
                        Ya estas cerca, Preciona salir para confirmar la llegada.
                        </Text>
                </View>

                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <TouchableOpacity
                        style={{
                            height: 40,
                            borderRadius: 20,
                            width: 200,
                            backgroundColor: "#fff",
                            borderColor: "#799cb3",
                            borderWidth: 2,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onPress={() => {
                            props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                                component: "emergencia",
                                type: "terminarViajeConductor",
                                estado: "cargando",
                                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                                key_viaje: props.state.ViajeReducer.data.key,
                            }, true);
                            AsyncStorage.removeItem("clinica_viaje");
                            props.navigation.replace("CargaPage");
                        }}>
                        <Text>
                            Salir
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>



        </Animated.View>
    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TerminarViaje);
