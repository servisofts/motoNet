import React, { useRef } from 'react';
import { View, Animated, } from 'react-native';
import { connect } from 'react-redux';
import STheme from '../../../STheme';
import ComponenentDetalleViaje from './ComponentDetalleViaje';
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

    return (
        <Animated.View style={{
            // position: "absolute",
            bottom: fadeAnim,
            width: "100%",
        }}>

            <ComponenentDetalleViaje botonConfirmar={true} />

        </Animated.View >
    )
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(DetalleDeViajes);


