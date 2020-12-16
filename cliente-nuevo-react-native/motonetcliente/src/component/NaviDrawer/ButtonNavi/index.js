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
                console.log("ASdas");
                if (props.onPress) {
                    props.onPress(props.pagina);
                }
            }} >

            <View style={{ flex: 0.2 }}>
                <Svg name={props.svg}
                    style={{
                        width: 22,
                        height: 22,
                    }} />
            </View>

            <Text style={{
                flex: 1,
                fontSize: 11,
                color: "#AAA9A9",
                fontWeight: "bold",
                marginStart: 5,

            }}>{props.Nombre}</Text>

        </TouchableOpacity>
    )
}


export default ButtonNavi
