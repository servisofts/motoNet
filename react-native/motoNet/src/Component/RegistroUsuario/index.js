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

    const [obj, setObj] = React.useState({
        user: {
            value: "",
            error: false
        },
        nombres: {
            value: "",
            error: false
        },
        apellidos: {},
        telefono: {
            value: "591"
        },
        fecha_nacimiento: {
            value: "",
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
        sexo: {
            value: "",
            error: false
        }

    });



    const hanlechage = (event) => {



        obj[event.id] = {
            value: event.text,
            error: false,
        }
        setObj({ ...obj })
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
        if (obj.fecha_nacimiento.value === "") {
            obj.fecha_nacimiento.error = true;
            exito = false;
        }




        setObj({ ...obj })
/*         objToSend.fecha_nacimiento = Moment(objToSend.fecha_nacimiento, "DD/MM/YYYY").format("YYYY-MM-DD");
 */        if (exito) {
            setestado(true)
            props.Registro(props.state.socketReducer.socket, objToSend);
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
                    <TextInput style={styles.input}
                        style={(obj.user.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "user")} />
                </View>


                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Nombres</Text>
                    <TextInput style={styles.input}
                        style={(obj.nombres.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "nombres")} />
                </View>


                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Apellidos</Text>
                    <TextInput
                        style={(obj.apellidos.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "apellidos")} />
                </View>

                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Telefono</Text>
                    <TextInput style={(obj.telefono.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "telefono")} />
                </View>
                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Password</Text>
                    <TextInput style={(obj.pass.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "pass")} />
                </View>

                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Confirmar password</Text>
                    <TextInput style={(obj.confirmar.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "confirmar")} />
                </View>
              
                <View
                    style={styles.view}>

                    {/* <Text style={styles.texto}>Insertar documento</Text>
                    <TouchableOpacity
                        style={styles.touchDoc} >
                        <Text
                            style={{
                                fontSize: 20,
                                textAlign: "left",
                                color: "#fff"

                            }}>
                            Click
                            </Text>

                    </TouchableOpacity> */}
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
        backgroundColor: "#ffffff99",
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
        backgroundColor: "#ffffff99",
        width: "100%",
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#fff",
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
