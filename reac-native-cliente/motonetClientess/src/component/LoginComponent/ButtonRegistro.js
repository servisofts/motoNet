import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Svg from '../../Svg'

const ButtonRegistro = (props) => {

    const style = props.estilo;

    return (
        <TouchableOpacity
            onPress={props.click}           
            style={styles[style]}>
            {/* <Svg name="facebook"
                style={{
                    width: 35,
                    height: 35,
                }} /> */}
            <Text style={styles.Texto}>{props.titulo}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    Texto: {
        textAlign: "center",
        flex: 0.8,
        color: "#fff",
        width: '100%',
    },
    sign: {
        marginTop: 20,
        width: "80%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#2176E7",
        borderRadius: 25,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },
    create: {
        marginTop: 20,
        width: "80%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#56AD4C",
        borderRadius: 25,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },
    facebook: {
        marginTop: 20,
        width: "80%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#3D5893",
        borderRadius: 25,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },    
    email: {
        marginTop: 20,
        width: "80%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#D50A16",
        borderRadius: 25,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },
})

export default ButtonRegistro
