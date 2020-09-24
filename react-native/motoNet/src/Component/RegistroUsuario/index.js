import React from 'react';

import { connect } from 'react-redux';
import {
    View, TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Image,
     ActivityIndicator
} from 'react-native';
import Svg from '../../Svg';
import { LoginManager } from "react-native-fbsdk";
import Theme from '../../Styles/Theme.json'
import Estado from '../Estado';
import IntlPhoneInput from 'react-native-intl-phone-input';
import * as usuarioActions from '../../Actions/usuarioActions'
const RegistroUsuario = (props) => {
    const [respuesta, setRespuesta] = React.useState({ registro: "registro" })
    const [paisCodigo, setCodigo] = React.useState()
    const [obj, setObj] = React.useState({

        nombres: {
            value: "",
            error: false
        },
        apellidos: {
            value: "",
            error: false
        },
        telefono: {
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
    });
    if (props.state.cabeceraDatoReducer.estado === "cargando") {
        return <Estado estado={"Cargando"} />
    }
    if (!respuesta) {
        switch (props.navigation.state.params.registro) {
            case "facebook":
                obj.nombres.value = props.navigation.state.params.data.name;
                setObj({ ...obj });
                setRespuesta(props.navigation.state.params);
                return <View />
            case "registro":
                setRespuesta(props.navigation.state.params);
                return <View />
            default:
                setRespuesta("");
        }
    }
    if (props.state.cabeceraDatoReducer.estado === "cargando") {
        return <Estado estado={"Cargando"} />
    }

    if (props.state.usuarioReducer.estado === "exito") {
        props.navigation.estado = ""
        props.navigation.goBack();
        return <View />
    }
    var cabecera = "registro_conductor";
    if (!props.state.cabeceraDatoReducer.data[cabecera]) {
        props.state.socketClienteReducer.sessiones["motonet"].send({
            component: "cabeceraDato",
            type: "getDatoCabecera",
            estado: "cargando",
            cabecera: cabecera
        });
    }
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


    const Registrar = (event) => {
        var objToSend = {
        };
        var exito = true;
        for (const key in obj) {
            if (key === "telefono") {
                continue;
            }
            if (!obj[key].value || obj[key].value.lenth <= 0) {
                obj[key].error = true;
                exito = false;
            } else {
                obj[key].error = false;
                objToSend[key] = obj[key].value
            }
        }
        if (!obj.telefono.value) {
            obj.telefono.error = true;
            exito = false;
        }
        setObj({ ...obj })
        objToSend["telefono"] = paisCodigo + obj.telefono.value
        const getKeyDato = (keyDescripcion) => {
            var key = "undefined"
            for (let i = 0; i < props.state.cabeceraDatoReducer.data[cabecera].length; i++) {
                const obj = props.state.cabeceraDatoReducer.data[cabecera][i];
                if (obj.dato.descripcion == keyDescripcion) {
                    return obj;
                }
            }
            return {
                key
            }
        }
        var jsonFinal = [];
        Object.keys(objToSend).map((key) => {
            switch (key) {
                case "nombres":
                    jsonFinal.push({
                        dato: getKeyDato("Nombres"),
                        data: objToSend[key]
                    })
                    break;
                case "apellidos":
                    jsonFinal.push({
                        dato: getKeyDato("Apellidos"),
                        data: objToSend[key]
                    })
                    break;
                case "telefono":
                    jsonFinal.push({
                        dato: getKeyDato("Telefono"),
                        data: objToSend[key]
                    })
                    break;
                case "correo":
                    jsonFinal.push({
                        dato: getKeyDato("Correo"),
                        data: objToSend[key]
                    })
                    break;
                case "pass":
                    jsonFinal.push({
                        dato: getKeyDato("Password"),
                        data: objToSend[key]
                    })
                    break;
            }
        })

        /* jsonFinal.push({
            dato: getKeyDato("Carnet de identidad"),
            data: {
                front: props.state.subirDocReducer.data.foto1,
                back: props.state.subirDocReducer.data.foto2
            }
        }) */
        if (exito) {

            switch (respuesta.registro) {
                case "facebook":
                    jsonFinal.push({
                        dato: getKeyDato("Facebook key"),
                        data: respuesta.data.id
                    })
                    props.registro(props.state.socketClienteReducer.sessiones["motonet"], jsonFinal);
                    break;
                case "registro":
                    props.registro(props.state.socketClienteReducer.sessiones["motonet"], jsonFinal);
                    break;
            }

            return <View />
        }
    }
    const registriIcono = () => {
        switch (respuesta.registro) {
            case "facebook":
                return (
                    <View style={{
                        flex: 0.4,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 10
                        }}>
                            Facebook
                            </Text>
                        <Image source={{ uri: "http://graph.facebook.com/" + respuesta.data.id + "/picture?type=large" }} style={{ width: 100, height: 100, borderRadius: 100, }} />
                    </View>
                )

            default:
                <View />
        }
    }
    const onChangeText = ({ dialCode, unmaskedPhoneNumber, phoneNumber, isVerified }) => {
        obj.telefono.value = unmaskedPhoneNumber
        setObj({ ...obj })
        setCodigo(dialCode)
        return <View />
    };

    return (
        <ScrollView
            style={{
                flex: 1,
                width: '100%',
                backgroundColor: Theme.colors.fondo,

            }}>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                <View style={{
                    flex: 1,
                    marginTop: 30,
                    width: "80%",
                    height: 100,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}>

                    <Svg name="LogoMoto"
                        style={{
                            width: 100,
                            height: 100,
                            fill: "#fff"

                        }} />
                    {registriIcono()}
                </View>

                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Nombres</Text>
                    <TextInput placeholder="Ingrese un nombre" style={styles.input}
                        style={(obj.nombres.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "nombres")}
                        value={obj.nombres.value}
                        autoCapitalize='none'
                    />
                </View>


                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Apellidos</Text>
                    <TextInput placeholder="Ingrese un apellido"
                        style={(obj.apellidos.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "apellidos")}
                        value={obj.apellidos.value}
                        autoCapitalize='none'
                    />
                </View>
                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Correo</Text>
                    <TextInput placeholder="Ingrese un correo válido"
                        style={(obj.correo.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "correo")}
                        value={obj.correo.value}
                        autoCapitalize='none'
                    />
                </View>
                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Telefono</Text>

                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        borderRadius: 10,
                        backgroundColor: "#EAEAE2",
                        shadowColor: "#000",
                        paddingLeft: 15,
                        shadowOffset: {
                            width: 0,
                            height: -2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}>
                        <IntlPhoneInput
                            onChangeText={onChangeText}
                            defaultCountry="BO"
                            lang="TR" />
                    </View>
                </View>
                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Password</Text>
                    <TextInput placeholder="Ingresar contraseña" style={(obj.pass.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "pass")}
                        value={obj.pass.value}
                        autoCapitalize='none'
                        secureTextEntry
                    />
                </View>
                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Confirmar password</Text>
                    <TextInput placeholder="Confirme su contraseña" style={(obj.confirmar.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "confirmar")}
                        value={obj.confirmar.value}
                        secureTextEntry
                        autoCapitalize='none'
                    />
                </View>
                <TouchableOpacity
                    style={styles.touch3}>
                    {props.state.usuarioReducer.estado === "cargando" ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                            <Text
                                onPress={Registrar}
                                style={{
                                    color: '#fff',
                                    fontSize: 18,
                                }}>
                                Registrar
                            </Text>
                        )}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={{
                        width: 50,
                        height: 50,
                        position: "absolute",
                        top: 10,
                        left: 0,
                        alignItems: 'center',
                    }}>
                    <Svg name="volver"
                        style={{
                            width: 30,
                            height: 30,
                            fill: "#fff"
                        }} />
                </TouchableOpacity>
            </View>

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
    inputTelf: {
        flex: 1,
        width: "100%",
        height: 40,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',


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
const initActions = ({
    ...usuarioActions,
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(RegistroUsuario);
