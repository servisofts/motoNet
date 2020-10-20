import React from 'react';
import { View } from 'react-native';
import Svg from '../../../Svg';
const MarkerMedio = (props) => {
    if(props.ventanaSelect == "DetalleDeViaje"){
        return <View/>
    }
    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: "absolute",
                bottom: "50%",
            }}>
            <Svg name="MarkerMoto"
                style={{
                    width: 25,
                    height: 25,
                    fill: "#000"

                }} />
        </View>
    )
}

export default MarkerMedio;
