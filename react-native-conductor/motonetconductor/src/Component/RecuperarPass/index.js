import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, TextInput, ScrollView, StyleSheet, NativeModules } from 'react-native';
import Svg from '../../Svg';
import Theme from '../../Styles/Theme.json'

const RecuperarPass = (props) => {

    const [obj, setObj] = React.useState({
        usr: {
            value: "",
            error: false
        },
    });

    const hanlechage = (text, id) => {
        if (id === "correo") {
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

        <ScrollView>

            <View
                style={{
                    marginTop: 20,
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginBottom: 30
                }}>
                <Svg name="logoCompleto"
                    style={{
                        width: 200,
                        height: 200,
                        fill: "#fff"
                    }} />

                <View
                    style={{
                        width: '80%',
                        flexDirection: 'column',
                        marginTop: 30,
                    }}>
                    <Text style={styles.texto}>Recuperar contraseña:</Text>
                    <TextInput
                        style={!obj.usr.error ? styles.touch2 : styles.touch2Error}
                        placeholder={"Ingrese su correo electrónico"}
                        onChangeText={text => hanlechage(text, "usr")}
                        value={obj.usr.value}
                        autoCapitalize='none'
                        autoFocus={true}
                    />
                </View>

                <View
                    style={{
                        marginTop: 10,
                        flex: 1,
                        width: '80%',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
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
                                    data: datas,
                                    estado: "cargando"
                                }, true);
                            }
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

                </View>

            </View>

        </ScrollView>
    )

}
const styles = StyleSheet.create({

    touch2: {
        flex: 1,
        backgroundColor: "#EAEAE2",
        width: "100%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    touch2Error: {
        flex: 1,
        backgroundColor: "#EAEAE2",
        width: "100%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        borderRadius: 10,
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
        marginTop: 10,
        backgroundColor: Theme.colors.button,
        width: "100%",
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    texto: {
        width: '100%',
        color: "#fff",
        fontSize: 12,
        margin: 5,
    }

});
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RecuperarPass);
