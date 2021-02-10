import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, TextInput, ScrollView, StyleSheet, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import Svg from '../../Svg';
import Theme from '../../Styles/Theme.json'
import Estado from '../Estado';
import AppParam from '../../Json/index.json'
import ImgFondoCruces from '../ImgFondoCruces'


const NuevoPass = (props) => {
    const [respuesta, setRespuesta] = React.useState({ registro: "registro" })
    const [paisCodigo, setCodigo] = React.useState()
    const [obj, setObj] = React.useState({
        pass: {
            value: "",
            error: false
        },
        confirmar: {
            value: "",
            error: false
        },
    });


    const hanlechage = (text, id) => {
        obj[id] = {
            value: text,
            error: false,
        }
        setObj({ ...obj })
        return <View />
    };


    const Registrar = (event) => {

        var jsonFinal = [];
        Object.keys(objToSend).map((key) => {
            switch (key) {

                case "pass":
                    jsonFinal.push({
                        dato: getKeyDato("Password"),
                        data: objToSend[key]
                    })
                    break;
            }
        })

        if (exito) {

            switch (respuesta.registro) {
                case "registro":
                    props.registro(props.state.socketClienteReducer.sessiones[AppParam.socket.name], jsonFinal);
                    break;
            }

            return <View />
        }
    }


    return (
        <ScrollView>
            <ImgFondoCruces />
            <View style={{
                width: "100%",
                height: 700,
                alignItems: 'center',
            }}>
                <View style={{ marginBottom: 50 }}>
                    <Svg name="logoCompletoRecurso"
                        style={{
                            top: 35,
                            width: 200,
                            height: 200,
                            fill: "#fff"
                        }} />
                </View>

                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Contraseña</Text>
                    <TextInput placeholder="Ingresar nueva contraseña" style={(obj.pass.error ? styles.error : styles.input)}
                        onChangeText={text => hanlechage(text, "pass")}
                        value={obj.pass.value}
                        autoCapitalize='none'
                        secureTextEntry
                    />
                </View>
                <View
                    style={styles.view}>
                    <Text style={styles.texto}>Confirmar contraseña</Text>
                    <TextInput placeholder="Confirme su nueva contraseña" style={(obj.confirmar.error ? styles.error : styles.input)}
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
                                Guardar Contraseña
                            </Text>
                        )}
                </TouchableOpacity>

            </View>

        </ScrollView>
    )
}
const styles = StyleSheet.create({

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
        backgroundColor: "#EAEAE2",
        width: "100%",
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#f00",
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
        top: 15,
        borderWidth: 3,
        borderColor: "#fff",
        backgroundColor: "#2c4b81",
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

    view: {
        margin: 5,
        width: '80%',
        height: 70
    },
    texto: {
        width: '100%',
        textAlign: "left",
        color: "#000",
        fontSize: 17,
        margin: 5,
    }

});

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(NuevoPass);
