import React from 'react';
import {
    View, StyleSheet, TouchableOpacity, Button,
    BackHandler,
    TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import * as popupActions from '../../Actions/popupActions';
const Popup = (props) => {
    if (!props.state.popupReducer.estado) {
        return <View />
    }
    const cerrarVentana = () => {
        props.cerrarPopup();
        return <View />
    }
    return (
        <View style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <TouchableOpacity onPress={cerrarVentana} style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "#00000022"
            }}>
            </TouchableOpacity>
            <View style={{
                width: "94%",
                minHeight: "80%",
                maxHeight: "90%",
/*                 backgroundColor:"#00000099",
 */                overflow: "hidden",
                borderRadius: 10,
            }}>
                <props.state.popupReducer.element />
            </View>
        </View>
    );
}
const initActions = ({
    ...popupActions
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(Popup);
