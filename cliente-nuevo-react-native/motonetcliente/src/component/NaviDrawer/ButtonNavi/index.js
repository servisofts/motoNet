import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Svg from '../../../Svg'

const ButtonNavi = (props) => {
    return (
        <TouchableOpacity style={{
            flexDirection: "row",
            width: "100%",
            height: 40,
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

            <View style={{ flex: 0.1 }}>
                <Svg name="FLECHAVER"
                    style={{

                        width: 25,
                        height: 25,
                    }} />
            </View>

            <View style={{
                height: 1,
                backgroundColor: '#ccc'
            }} />
        </TouchableOpacity>
    )
}


export default ButtonNavi
