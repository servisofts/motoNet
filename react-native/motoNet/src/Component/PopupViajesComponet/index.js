import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Image } from 'react-native';
import Svg from '../../Svg';

const ConfirmarViaje = (props) => {

    return (
        <View style={{
            position: "absolute",
            width: "100%",
            height: "35%",
            bottom: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: "red",
        }}>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: "space-evenly",
                }}>

                <Svg name="LogoMoto"
                    style={{
                        width: 40,
                        height: 40,
                    }} />

                <Text style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "bold"
                }}>
                    Su moto esta en camino.
                    </Text>
            </View>

            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
            }}>

                <View style={{
                    flex: 1,
                    alignItems: "center"
                }}>
                    <Image
                        style={{
                            backgroundColor: "#fff",
                            width: 40,
                            height: 40,
                            borderRadius: 100,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                        source={{ uri: 'https://www.designthinking.services/wp-content/uploads/2015/07/HERRAMIENTAS-DESIGN-THINKING-METODO-PERSONA.png' }}
                    />

                    <Text style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 15
                    }}>
                        Nombre del Conductor
                        </Text>

                    <Text style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 15
                    }}>
                        Su puntuacion
                        </Text>
                </View>

                <View style={{
                    flex: 1,
                    alignItems:"center"
                }}>
                    <Text style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 15
                    }}>
                        Tiempo en espera
                        </Text>
                    <Text style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 15
                    }}>
                       11:00
                        </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    touch: {
        width: "80%",
        backgroundColor: "#fff",
        height: 50,
        paddingLeft: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ConfirmarViaje);
