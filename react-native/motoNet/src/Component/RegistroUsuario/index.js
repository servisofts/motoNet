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
import { LoginManager } from "react-native-fbsdk";
import Theme from '../../Styles/Theme.json'
const RegistroUsuario = (props) => {

    const [obj, setObj] = React.useState({
        usr: {
            value: "",
            error: false
        },
        nombres: {
            value: "",
            error: false
        },
        apellidos: {
            value: "",
            error: false
        },
        telefono: {
            value: "591",
            error: false 

        },

        correo: {
            value: "",
            error: false
        },
        pass: {
            value: "",
            error: false
        },
        confirmar: {
            value: "",
            error: false
        },


    });

    if (props.state.usuarioReducer.estado === "exito") {
        props.navigation.estado = ""
        props.navigation.goBack();
        return <View />
    }

    const hanlechage = (text, id) => {
        obj[id] = {
            value: text,
            error: false,
        }
        setObj({ ...obj })
        return <View />
    };
    const Registrar = (event) => {
        console.log(obj)



        var objToSend = {
            component: "usuario",
            type: "registro",
            data: {},
            mensaje: "",
            estado: "enviando"
        };

        var exito = true;

        for (const key in obj) {

            if (!obj[key].value || obj[key].value.lenth <= 0) {
                obj[key].error = true;
                exito = false;
            } else {
                obj[key].error = false;
                objToSend.data[key] = obj[key].value
            }
        }
        if (!obj.telefono.value || obj.telefono.value.length < 10) {
            obj.telefono.error = true;
            exito = false;

        }
        if (obj.pass.value !== obj.confirmar.value) {
            obj.confirmar.error = true
            exito = false;

        }
        
        setObj({ ...obj })
        if (exito) {
            props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "usuario",
                type: "registro",
                data: objToSend.data,
                estado: "cargando"
            }, true);
            return <View />
        }
    }


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
                marginTop: 10,
            }}>

                <Svg name="LogoMoto"
                    style={{
                        width: 100,
                        height: 100,
                        fill: "#fff"

                    }} />

                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Usuario</Text>
                    <TextInput placeholder="Ingrese nombre de usuario" style={styles.input}
                        style={(obj.usr.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "usr")}
                        value={obj.usr.value}
                        autoFocus = {true}
                        autoCapitalize = 'none'
                    />
                </View>


                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Nombres</Text>
                    <TextInput placeholder="Ingrese un nombre"  style={styles.input}
                        style={(obj.nombres.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "nombres")}
                        value={obj.nombres.value}
                        autoCapitalize = 'none'
                    />
                </View>


                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Apellidos</Text>
                    <TextInput placeholder="Ingrese un apellido" 
                        style={(obj.apellidos.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "apellidos")}
                        value={obj.apellidos.value}
                        autoCapitalize = 'none'
                    />
                </View>
                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Correo</Text>
                    <TextInput placeholder="Ingrese un correo válido"  
                    style={(obj.correo.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "correo")}
                        value={obj.correo.value}
                        autoCapitalize = 'none'
                    />
                </View>
                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Telefono</Text>
                    <TextInput placeholder="Ingrese un número de telefono" 
                    style={(obj.telefono.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "telefono")}
                        value={obj.telefono.value}
                        keyboardType = 'numeric'
                        
                    />
                    
                </View>
                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Password</Text>
                    <TextInput placeholder="Ingresar contraseña"  style={(obj.pass.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "pass")}
                        value={obj.pass.value}
                        autoCapitalize = 'none'
                        secureTextEntry
                    />
                </View>

                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Confirmar password</Text>
                    <TextInput placeholder="Confirme su contraseña"  style={(obj.confirmar.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "confirmar")}
                        value={obj.confirmar.value}
                        secureTextEntry
                        autoCapitalize = 'none'
                    />
                </View>
                <TouchableOpacity
                    onPress={Registrar}

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
        borderWidth: 3,
        borderColor: "#fff",
        width: "80%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
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
        backgroundColor: "#EAEAE2",
        width: "100%",
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
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
    error: {
        flex: 1,
        backgroundColor: "#F7F7B6",
        width: "100%",
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#FFFF00",
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
        borderWidth: 3,
        borderColor: "#fff",
        backgroundColor: "red",
        width: "50%",
        height: 40,
        marginBottom: 10,
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


    },
    texto: {

        width: '100%',
        textAlign: "left",
        color: "#fff",
        fontSize: 17,
        margin: 5,
    }

});

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RegistroUsuario);
