import React,{useEffect} from 'react';
import { Text, TouchableWithoutFeedback, View,BackHandler } from 'react-native';
import ListaAsegurados from './ListaAsegurados';
const handleback = ()=>{
    property.onClose();
    return true;
}
var property;

const PopupSeleccionarAsegurado = (props) => {
    property = props;
    if (!props.visible) {
        BackHandler.removeEventListener('hardwareBackPress',handleback)
        return <View />
    }
    BackHandler.addEventListener('hardwareBackPress',handleback);

    return (
        <TouchableWithoutFeedback onPress={() => {
            props.onClose();
        }}>
            <View style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "#00000066",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <TouchableWithoutFeedback onPress={(evt) => {
                    evt.stopPropagation();
                }}>
                    <View style={{
                        width: "80%",
                        height: "80%",
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius:10,
                    }}>
                        <ListaAsegurados callback={props.callback}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    );

    
}
export default PopupSeleccionarAsegurado;
