import React from 'react';

import { View, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

// import { Container } from './styles';

const ModeloInicio = (props) => {

    const ayudo = () => {
        console.log("te ayudo");

    }
    const ayuda = () => {
        console.log("me ayuda");
    }
    
    return (
        <View
            style={{
                width:200,
                height: 150,
                position: "absolute",
                top: 250,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <TouchableOpacity
                onPress={ayudo}
                style={styles.buttOn1}>

                <Text
                    style={{
                        color: "#fff",
                        fontSize: 20
                    }}>
                    TE AYUDO
                    </Text>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={ayuda}
                style={styles.buttOn2}>
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 20
                    }}>
                    ME AYUDAS
                    </Text>

            </TouchableOpacity>
        </View>

    )


}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    buttOn1: {
        width: 200,
        height: 60,
        borderRadius: 10,
        backgroundColor: "#4fc2ef",
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    buttOn2: {
        width: 200,
        height: 60,
        borderRadius: 10,
        backgroundColor: "red",
        position: "absolute",
        bottom:0,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

});
export default ModeloInicio;
