import React from 'react';

import { connect } from 'react-redux';
import {
    View, TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
    StyleSheet
} from 'react-native';
import Svg from '../../Svg';
import base64 from 'react-native-base64'
import { LoginManager } from "react-native-fbsdk";
import Theme from '../../Styles/Theme.json'
import { color } from 'react-native-reanimated';
const RegistroUsuario = (props) => {






    return (
        <ScrollView
            style={{
                flex: 1,
                width: '100%',
                backgroundColor: Theme.colors.fondo,

            }}>

            <View style={{
                flex: 1,
                width: "100%",
                alignItems: 'center',
                flexDirection: 'column',
            }}>

                <Svg name="LogoGlup"
                    style={{
                        width: 100,
                        height: 100,
                        fill: "#fff"

                    }} />

                <View
                    style={styles.view}>

                    <Text
                        style={{
                            width: '85%',
                            textAlign: "left",
                            color: "#fff",
                            fontSize: 20

                        }}>Usuario</Text>
                    <TextInput
                        style={styles.input} />
                </View>


                <View
                    style={styles.view}>

                    <Text
                        style={{
                            width: '85%',
                            textAlign: "left",
                            color: "#fff",
                            fontSize: 20

                        }}>Edad</Text>
                    <TextInput
                        style={styles.input} />
                </View>


                <View
                    style={styles.view}>

                    <Text
                        style={{
                            width: '85%',
                            textAlign: "left",
                            color: "#fff",
                            fontSize: 20

                        }}>Correo </Text>
                    <TextInput
                        style={styles.input} />
                </View>

                <View
                    style={styles.view}>

                    <Text
                        style={{
                            width: '85%',
                            textAlign: "left",
                            color: "#fff",
                            fontSize: 20

                        }}>Telefono</Text>
                    <TextInput
                        style={styles.input} />
                </View>
                <View
                    style={styles.view}>

                    <Text
                        style={{
                            width: '85%',
                            textAlign: "left",
                            color: "#fff",
                            fontSize: 20

                        }}>Sexo</Text>
                    <TextInput
                        style={styles.input} />
                </View>


                <View
                    style={styles.view}>

                    <Text
                        style={{
                            width: '85%',
                            textAlign: "left",
                            color: "#fff",
                            fontSize: 20

                        }}>Nacionalidad</Text>
                    <TextInput
                        style={styles.input} />
                </View>
                <View
                    style={styles.view}>

                    <Text
                        style={{
                            width: '85%',
                            textAlign: "left",
                            color: "#fff",
                            fontSize: 20

                        }}>Domicilio actual</Text>
                    <TextInput
                        style={styles.input} />
                </View>
                <View
                    style={styles.view}>

                    <Text
                        style={{
                            width: '85%',
                            textAlign: "left",
                            color: "#fff",
                            fontSize: 20

                        }}>Insertar documento</Text>
                    <TouchableOpacity
                        style={styles.touchDoc} >
                        <Text
                            style={{
                                fontSize: 20,
                                textAlign: "left"
                            }}>
                            Click
                            </Text>

                    </TouchableOpacity>
                </View>


                <TouchableOpacity
                    style={styles.touch3}>
                    <Text
                        style={{
                            color: '#fff',

                        }}
                    >
                        Registrar
                        </Text>
                </TouchableOpacity>
            </View>


            <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                style={{
                    width: 50,
                    height: 50,
                    position: "absolute",
                    top: 10,
                    alignItems: 'center',
                }}>
                <Svg name="volver"
                    style={{
                        width: 30,
                        height: 30,
                        fill: "#fff"
                    }} />
            </TouchableOpacity>

        </ScrollView>
    )

}
const styles = StyleSheet.create({

    touch: {
        flex: 1,
        width: "70%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 25,

    },
    touchDoc: {
        flex: 1,
        backgroundColor: "red",
        width: "100%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 25,
        shadowColor: "#000",
        paddingLeft: 15,
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    input: {
        flex: 1,
        backgroundColor: "#fff",
        width: "100%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 25,
        shadowColor: "#000",
        paddingLeft: 15,
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    touch3: {
        marginTop: 10,
        flex: 1,
        backgroundColor: "#4fc2ef",
        width: "50%",
        height: 40,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    touch4: {
        flex: 1,
        backgroundColor: "#53af45",
        width: "80%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    view: {
        width: '80%',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 5,
        justifyContent: 'center',
    }

});
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RegistroUsuario);
