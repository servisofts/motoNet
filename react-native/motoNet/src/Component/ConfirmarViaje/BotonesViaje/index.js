import React from 'react'
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import Svg from '../../Svg';

const BotonesViaje = () => {
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
                    value={datos.destinos[0].direccion}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.touch}
                    placeholder={""}
                    onChangeText={text => hanlechage(text, "pass")}
                    value={datos.destinos[1].direccion}
                    autoCapitalize='none'
                />
            </View>

            <View style={{
                flex: 1.5,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>

                <TouchableOpacity
                    onPress={() => {
                        setPrecio(precio + 1)
                    }}
                    style={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Svg name="Arriba"
                        style={{
                            width: 50,
                            height: 50,
                            fill: "#fff"

                        }} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={Negociar}
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: 100,
                        backgroundColor: "#fff",
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>

                    <Text>
                        {precio} bs.
                    </Text>
                    <Text>
                        Negociar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setPrecio(precio - 1)
                    }}
                    style={{
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Svg name="Arriba" //flecha abajo
                        style={{
                            width: 50,
                            height: 50,
                            fill: "#fff",
                            transform: [
                                { rotate: '180deg' }
                            ]
                        }} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={AceptarViaje}
                    style={{
                        width: "20%",
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        borderColor: "#fff",
                        borderWidth: 2,
                    }}>
                    <Text style={{
                        color: "#fff"
                    }}>
                        Aceptar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={CancelarViaje}
                    style={{
                        width: "20%",
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        borderColor: "#fff",
                        borderWidth: 2,
                    }}>
                    <Text style={{
                        color: "#fff"
                    }}>
                        Cancelar</Text>
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

export default BotonesViaje;
