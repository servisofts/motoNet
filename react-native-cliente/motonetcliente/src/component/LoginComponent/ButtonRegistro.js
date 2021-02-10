import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Svg from '../../Svg'


const ButtonRegistro = (props) => {

    const style = props.estilo;

    return (
        <TouchableOpacity
            onPress={props.click}
            style={styles[style]}>
            {props.svg ? (
                <Svg name={props.svg}
                    style={{
                        width: 35,
                        height: 35,
                    }} />) : (
                    < Text style={styles.Texto}>{props.titulo}</Text>
                )
            }
        </TouchableOpacity >
    )
}
const styles = StyleSheet.create({
    Texto: {
        textAlign: "center",
        // flex: 0.8,
        color: "#fff",
        width: '100%',
    },
    sign: {
        marginTop: 20,
        width: "40%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // backgroundColor: "#2176E7",
        backgroundColor: "#2c4b81",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
        marginRight: 5
    },
    create: {
        marginTop: 20,
        width: "40%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // backgroundColor: "#a4a4a4",
        backgroundColor: "#2c4b81",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },
    facebook: {
        marginTop: 20,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#3D5893",
        borderRadius: 100,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },
    email: {
        marginTop: 20,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderRadius: 100,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },
    CreateRegister: {
        marginTop: 20,
        width: "80%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#2c4b81",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },

})

export default ButtonRegistro
