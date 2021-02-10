import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Svg from '../../../Svg'

const ButtonNavi = (props) => {
    return (
        <TouchableOpacity style={{
            flexDirection: "row",
            width: "100%",
            height: 50,
            alignItems: "center",
        }}
            onPress={() => {
                if (props.onPress) {
                    props.onPress(props.pagina);
                }
            }} >

            <View style={{ flex: 0.2 }}>
                <Svg name={props.svg}
                    style={{
                        fill:(!props.color?"#666":props.color),
                        width: 22,
                        height: 22,
                    }} />
            </View>

            <Text style={{
                flex: 1,
                fontSize: 11,
                color:(!props.color?"#AAA9A9":props.color),
                fontWeight: "bold",
                marginStart: 5,

            }}>{props.Nombre}</Text>

        </TouchableOpacity>
    )
}


export default ButtonNavi
