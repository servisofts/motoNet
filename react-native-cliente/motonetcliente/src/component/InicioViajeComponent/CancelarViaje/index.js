import React, { useRef } from 'react';
import { Text, TouchableOpacity, View, Animated, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../../Svg';

const valor_menor = -380;
var totalViaje;

const CancelarViaje = (props) => {

    const [isVisible, setIsVisible] = React.useState(false);
    const fadeAnim = useRef(new Animated.Value(valor_menor)).current;


    if (!props.state.viajesReducer.viaje) {
        return <View />
    }

    if (props.state.viajesReducer.viaje.estado == 1) {
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
                    {/* {getDetalleRuta()} */}
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
                            borderColor: "#f00",
                            borderWidth: 2,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onPress={() => {
                            AsyncStorage.removeItem("motonet_viaje");
                            props.state.viajesReducer.viaje = false;
                            props.navigation.replace("CargaPage");
                        }}>
                        <Text>
                            CANCELAR MOTONET
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={{
                height: 50,
                width: 50,
                alignItems: "center",
                justifyContent: "center",
                right: 0,
                position: "absolute"
            }}
                onPress={() => {
                    //props.state.locationGoogleMapReducer.route = false;
                    //props.setVentanaSelect("tipoDeViaje")
                    AsyncStorage.removeItem("motonet_viaje");
                    props.navigation.replace("CargaPage");
                }}>
                <Svg name="Close"
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
export default connect(initStates)(CancelarViaje);
