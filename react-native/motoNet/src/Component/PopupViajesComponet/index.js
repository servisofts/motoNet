import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import Svg from '../../Svg';

const ConfirmarViaje = (props) => {

    return (
        <View style={{
            position: "absolute",
            width: "100%",
            height: "40%",
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
                flexDirection: "row"
            }}>

                <View style={{
                    flex: 1,
                    width: "90%",
                    borderColor: "#fff",
                }}>

                    <TouchableOpacity
                        onPress={() => {
                            this.state.popup = true
                            this.setState(this.stater);
/*                     this.abrirPopup()
 */                }}
                        style={{
                            paddingLeft: 10, backgroundColor: "#00c3f3", width: '100%', height: "100%",
                            borderRadius: 10,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >                        
                        <Svg name="Editar"
                            style={{
                                width: 20,
                                height: 20,
                                fill: "#fff"
                            }} />
                    </TouchableOpacity>
                    <Text style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 15
                    }}>
                        Nombre del Conductor
                        </Text>
                </View>

                <View style={{
                    width: "90%",
                    borderColor: "#fff",
                    flex: 1,
                }}>
                    <Text style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 15
                    }}>
                        Tipo de Pago
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
