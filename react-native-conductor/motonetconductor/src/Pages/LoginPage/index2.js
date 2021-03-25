import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, TextInput, ScrollView, StyleSheet, NativeModules, KeyboardAvoidingView } from 'react-native';
import Svg from '../../Svg';
// import Theme from '../../Styles/Theme.json'
import AppParams from '../../Json';
import Style from './style'
const _refs = {
    usuario: null,
    pass: null
};
const LoginPage = (props) => {
    const [obj, setObj] = React.useState({
        usr: {
            error: false
        },
        pass: {
            error: false
        },
    });

    if (props.state.usuarioReducer.estado === "exito") {
        props.navigation.estado = ""
        props.navigation.replace("CargaPage");
        return <View />
    }
    if (props.state.usuarioReducer.estado === "error") {
        props.state.usuarioReducer.estado = ""
        obj.pass.error = true;
        setObj({ ...obj })
        return <View />
    }

    const validateImput = () => {
        Object.keys(_refs).map((key) => {
            var elm = _refs[key];
            var natRef = elm.getNativeRef();
            // console.log(natRef);
        })

    }
    const hanlechage = (text, id) => {
        var aux = "";
        if (id === "usr") {
            aux = text.replace(/\s*$/, "")
            obj[id] = {
                value: aux,
                error: false,
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
            backgroundColor: Theme.colors.fondo
        }}>
            <ScrollView>
                <KeyboardAvoidingView>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 30,
                        marginBottom: 30,
                    }}>
                        <Svg name="logoCompleto"
                            style={{
                                width: 200,
                                height: 200,
                            }} />
                    </View>
                    <View style={{
                        // flex: 1,
                        alignItems: "center",
                    }}>
                        <View
                            style={{
                                width: '80%',
                                alignItems: 'center',
                                flexDirection: 'row',
                                marginTop: 30,
                                justifyContent: 'center',
                            }}>
                            <TextInput
                                ref={(item) => { _refs.usuario = item }}
                                style={!obj.usr.error ? Style.touch2 : Style.touch2Error}
                                placeholder={"Usuario"}
                                onChangeText={text => hanlechage(text, "usr")}
                                value={obj.usr.value}
                                autoCompleteType={"email"}
                                autoCapitalize='none'
                                autoFocus={true}
                                returnKeyType={"next"}
                                onSubmitEditing={() => {
                                    _refs.pass.focus();
                                }}
                            />
                        </View>
                        <View
                            style={{
                                width: '80%',
                                alignItems: 'center',
                                flexDirection: 'row',
                                marginTop: 20,
                                justifyContent: 'center',
                            }}>
                            <TextInput
                                ref={(item) => { _refs.pass = item }}
                                style={!obj.pass.error ? Style.touch2 : Style.touch2Error}
                                placeholder={"Contraseña"}
                                onChangeText={text => hanlechage(text, "pass")}
                                value={obj.pass.value}
                                returnKeyType={"join"}
                                autoCompleteType="password"
                                autoCapitalize='none'
                                secureTextEntry
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
                                    validateImput();
                                    // var datas = {}
                                    // var exito = true;
                                    // setObj({ ...obj })
                                    // if (exito) {
                                    //     props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                                    //         component: "usuario",
                                    //         type: "login",
                                    //         data: datas,
                                    //         estado: "cargando"
                                    //     }, true);
                                    // }
                                }}

                                style={Style.touch4}>
                                <Text
                                    style={{
                                        color: '#fff',
                                    }}>
                                    Ingresar
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate("RegistroUsuarioPage")}
                                style={Style.touch4}>
                                <Text
                                    style={{
                                        color: '#fff',
                                    }}>
                                    Crear una cuenta
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                width: '100%',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}>
                            <TouchableOpacity
                                onPress={() =>
                                    props.navigation.navigate("RecuperarPassPage")
                                }
                                style={
                                    Style.touch
                                }>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: "#fff"
                                    }}>
                                    Recuperar la contraseña
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View >
    )
}

const initStates = (state) => {
    return { state }
};

LoginPage.navigationOptions = (nav) => {
    return {
        headerShown: false
    }
}
export default connect(initStates)(LoginPage);