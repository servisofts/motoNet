import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';

const ConfirmarViaje = (props) => {

    return (
        <View style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "red",
        }}>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: "space-evenly",
                }}>

                <Text style={{
                    color: "#fff",
                    fontSize: 45,
                    fontWeight: "bold"
                }}>
                    MotoNet
                    </Text>
                <TextInput
                    style={styles.touch}
                    placeholder={""}
                    onChangeText={text => hanlechage(text, "pass")}
                    //value={obj.pass.value}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.touch}
                    placeholder={""}
                    onChangeText={text => hanlechage(text, "pass")}
                    //value={obj.pass.value}
                    autoCapitalize='none'
                />
            </View>

            <View style={{
                flex: 1.5,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TouchableOpacity
                    onPress={() => {
                        props.state.backgroundLocationReducer.open()
                    }}
                    style={{
                        width: 200,
                        height: 200,
                        borderRadius: 100,
                        backgroundColor: "#fff",
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text>
                        CONFIRMAR VIAJE
                </Text>
                </TouchableOpacity>
            </View>

            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <View style={{
                    borderRadius: 30,
                    borderWidth: 3,
                    width: "90%",
                    borderColor: "#fff",
                }}>
                    <Text style={{
                        color: "#fff",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 15
                    }}>
                        DETALLE DEL PEDIDO
                        </Text>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: 30
                    }}>
                        <Text style={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 15
                        }}>
                            Tiempo Perdido
                        </Text>

                        <Text style={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 15
                        }}>
                            Tipo de Pago
                        </Text>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: 30,
                        marginBottom: 20
                    }}>
                        <Text style={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 15
                        }}>
                            Tiempo estimado
                        </Text>

                        <Text style={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 15
                        }}>
                            Monto estimado
                        </Text>
                    </View>
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
