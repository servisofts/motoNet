import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback, TextInput, ScrollView } from 'react-native';
import Svg from '../../../Svg';
const Lista = (props) => {
    const botones = ["servicio", "productos"];
    const [posicion, setposicion] = React.useState(0);
    const Repuesta = (text) => {
        props.setComponent(text)
        return <View />
    };

    const ModeloLista = () => {
        return (
            <LinearGradient colors={['#ffffff99', '#1ec3f3', '#1ec3f3', '#1ec3f3']} style={styles.container}>
                <LinearGradient colors={['#fff', '#fff', '#fff', '#fff']}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 100,
                        borderColor: "#fff",
                        alignItems: 'center',
                        position: "absolute",
                        top: -10,
                        left: -20,
                        shadowColor: "#fff",
                        shadowOffset: {
                            width: 0,
                            height: -2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    }}>
                    <Svg name="glupMano"
                        style={{
                            width: 60,
                            height: 60,
                            fill: "#FFFF00"

                        }} />

                </LinearGradient>
                <View style={{
                    width: "100%",
                    height: 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 25,
                }}>
                    <Text style={{ flex: 0.5, alignItems: 'flex-end', textAlign: "right", fontSize: 20 }}>Alejandro</Text>
                    <View style={{
                        flex: 0.4,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {[0, 0, 1, 1, 0].map((obj) => {


                            return <Svg name="estrella"
                                style={{
                                    width: 15,
                                    height: 15,
                                    fill: "#FFFF00"

                                }} />
                        })}
                    </View>
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 30,
                            backgroundColor: "#04d710",
                            borderRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>

                        <Text style={{ color: "#fff" }}>Poner oferta</Text>
                    </TouchableOpacity>

                </View>
                <TextInput style={{
                    width: "90%",
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    height: 50,
                }} />


            </LinearGradient >
        )
    }
    return (
        <View style={{
            flex: 1,
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
            position: "absolute",
            top: 1,
            height: "100%",
            backgroundColor: "#dff7ff88",
        }}>
            <ScrollView style={{
                flex: 1, width: "100%",
                borderWidth: 2,
            }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: "100%",
                    flex: 1,
                    flexDirection: 'column',
                    borderWidth: 2,

                }}>

                    {[0, 0, 0, 0,].map(() => {
                        var color = "#425"

                        return (
                            <View
                                style={styles.buttOn1}>
                                {ModeloLista()}
                            </View >

                        )
                    })}

                </View>

            </ScrollView>

            <TouchableOpacity
                onPress={() => {
                    props.setComponent("inicio")
                    return <View />
                }}
                style={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    backgroundColor: "#1ec3f3",
                    borderColor: "#fff",
                    borderWidth: 3,
                    width: 60, height: 60,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Svg name="volver"
                    style={{
                        width: 15,
                        height: 15,
                        margin: 1,
                        fill: "#fff"

                    }} />
                <Text style={{ color: "#fff", fontSize: 10 }}>Volver</Text>
            </TouchableOpacity>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'column',
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
    container2: {
        flex: 1,
        width: "80%",
        height: 90,
        flexDirection: 'column',
        alignItems: 'center',
    },
    container3: {
        flex: 0.5,
        width: "90%",
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttOn1: {
        width: 300,
        height: 180,
        marginTop: 50,
        alignItems: 'center',
        flexDirection: 'column',
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
    check: {
        width: 20,
        height: 20,
        borderRadius: 100,
        borderWidth: 2,
        backgroundColor: "#fff",
        borderColor: "#fff",
        margin: 5,
    },
    buttOn2:
    {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 100,
        borderColor: "#fff",
        backgroundColor: "#fff",
        borderColor: "#fff",



    }
    ,

});
export default Lista;
