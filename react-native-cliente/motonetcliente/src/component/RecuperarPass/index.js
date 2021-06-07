import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, TextInput, ScrollView, StyleSheet, NativeModules, ActivityIndicator } from 'react-native';
import Svg from '../../Svg';
import ImgFondoCruces from '../ImgFondoCruces'

const RecuperarPass = (props) => {

    const [obj, setObj] = React.useState({
        usr: {
            value: "",
            error: false
        },
    });

    const hanlechage = (text, id) => {
        if (id === "usr") {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(text) === false) {
                obj[id] = {
                    value: text,
                    error: true,
                }
            }
            else {
                obj[id] = {
                    value: text,
                    error: false,
                }
            }
            setObj({ ...obj })
            return <View />
        }
        obj[id] = {
            value: text,
            error: false,
        }
        setObj({ ...obj })
        return <View />
    };


    return (

        <View style={{
            flex: 1,
        }}>


            <ScrollView>

                <View style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}>

                    <View
                        style={{
                            marginTop: 20,
                            width: '100%',
                            alignItems: 'center',
                            // flexDirection: 'column',
                        }}>
                        <Svg name="logoCompletoRecurso"
                            style={{
                                width: 200,
                                height: 200,
                            }} />
                    </View>

                    <View
                        style={{
                            width: "80%",
                            marginTop: 30,
                            // backgroundColor: "#ccc"
                        }}>

                        <Text style={styles.texto}>Recuperar contraseña:</Text>

                        <TextInput
                            style={!obj.usr.error ? styles.touch2 : styles.touch2Error}
                            placeholder={"Ingrese su correo electrónico"}
                            onChangeText={text => hanlechage(text, "usr")}
                            value={obj.usr.value}
                            autoCapitalize='none'
                            autoFocus={true}
                            multiline={false}
                            placeholderTextColor={'#626262'}
                            keyboardType={'email-address'}
                            autoCorrect={false}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>

                    <View
                        style={{
                            marginTop: 10,
                            width: '80%',
                            alignItems: 'center',
                            justifyContent: "center",
                            // backgroundColor:"#ccc",
                            marginBottom: 20
                        }}>
                        {props.state.usuarioReducer.estadoEmail == "cargando" ? (
                            <View style={styles.touch4}>
                                <ActivityIndicator color="#fff" size="small" />
                            </View>
                        ) : (
                            <TouchableOpacity
                                onPress={() => {
                                    var datas = {}
                                    var exito = true;
                                    for (const key in obj) {
                                        if (!obj[key].value || obj[key].value.length <= 0) {
                                            obj[key].error = true;
                                            exito = false;
                                        } else {
                                            obj[key].error = false;
                                            datas[key] = obj[key].value
                                        }
                                    }
                                    setObj({ ...obj })
                                    if (exito) {
                                        props.state.socketClienteReducer.sessiones["clinica_nj"].send({
                                            component: "usuario",
                                            type: "recuperarPass",
                                            data: obj.usr.value,
                                            estado: "cargando"
                                        }, true);
                                    }
                                    // obj.usr = ""
                                    // setObj({ ...obj })
                                }}
                                /*onPress={() => props.navigation.navigate("CodigoRecibidoPage")}*/
                                style={styles.touch4}>
                                <Text
                                    style={{
                                        color: '#fff',
                                    }} >
                                    Enviar
                        </Text>
                            </TouchableOpacity>
                        )
                        }

                        <TouchableOpacity
                            style={styles.touch5}
                            onPress={() => {
                                props.navigation.navigate("CodigoRecibidoPage")
                                return <View />
                                // props.navigation.navigate(props.page);
                            }}>
                            <Text
                                style={{
                                    color: '#fff',
                                    padding: 10,
                                }} >
                                Verificar Codigo
                        </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({

    touch2: {
        backgroundColor: "#EAEAE2",
        width: "100%",
        height: 50,
        paddingLeft: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    touch2Error: {
        backgroundColor: "#EAEAE2",
        width: "100%",
        height: 50,
        paddingLeft: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        borderColor: "red",
        borderWidth: 1
    },

    touch4: {
        backgroundColor: "#2C4C7E",
        width: "80%",
        height: 40,
        margin: 2,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },


    texto: {
        color: "#000",
        fontSize: 15,
    },

    touch5: {
        backgroundColor: "#a4a4a4",
        width: "80%",
        height: 40,
        margin: 2,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RecuperarPass);
