import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, TextInput, ScrollView, StyleSheet, NativeModules, ActivityIndicator } from 'react-native';
import Svg from '../../Svg';
import ImgFondoCruces from '../ImgFondoCruces'
import STheme from "../../STheme";
import BarraSuperior from '../../Component/BarraSuperior';

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
            backgroundColor:"#F7001D"
        }}>

            <BarraSuperior title={" "} goBack={() => { props.navigation.goBack() }} />
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
                        <Svg name="logoCompleto"
                            style={{
                                fill: STheme.color.primary,
                                width: 100,
                                height: 100,
                            }} />
                    </View>

                    <View
                        style={{
                            marginTop: 20,
                            width: '100%',
                            alignItems: 'center',
                            // flexDirection: 'column',
                        }}>
                        <Text style={styles.textoTitulo}>Recuperar contraseña</Text>
                    </View>

                    <View
                        style={{
                            marginTop: 10,
                            width: '100%',
                            alignItems: 'center',
                            // flexDirection: 'column',
                        }}>
                        <Text style={styles.texto}>Por favor ingresar su correo electrónico para recuperar su contraseña</Text>
                    </View>

                    <View
                        style={{
                            width: "90%",
                            marginTop: 30,
                            alignItems: 'center',
                            backgroundColor: "#fff",
                            padding:10,
                            borderRadius:10
                        }}>

                            <View
                             style={{
                                width: "100%",
                                //marginTop: 30,
                                alignItems: 'center',
                                padding:10
                            }}> 

                        <TextInput
                            style={!obj.usr.error ? styles.touch2 : styles.touch2Error }
                            placeholder={"Ingresar correo"}
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

<View
                        style={{
                            marginTop: 10,
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: "center",
                            // backgroundColor:"#ccc",
                            //marginBottom: 20
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
                                        props.state.socketClienteReducer.sessiones["motonet"].send({
                                            component: "usuario",
                                            type: "recuperarPass",
                                            data: obj.usr.value,
                                            estado: "cargando"
                                        }, true);
                                    }
                                    //alert(obj.usr.value)
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
                                    color: '#F7001D',
                                    //padding: 10,
                                }} >
                                Verificar Código
                        </Text>
                        </TouchableOpacity>

                    </View>

                        </View>
                    </View>

                    
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({

    touch2: {
        backgroundColor: "#F7F7F7",
        width: "100%",
        height: 50,
        paddingLeft: 15,
        borderRadius: 5,
        shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: -2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 2,
        color:"#707070"
    },
    touch2Error: {
        backgroundColor: "#F7F7F7",
        width: "100%",
        height: 50,
        paddingLeft: 15,
        borderRadius: 10,
        shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: -2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 2,
        borderColor: "red",
        borderWidth: 1,
        color:"#707070"
    },

    touch4: {
        backgroundColor: "#F7001D",
        width: "100%",
        height: 40,
        margin: 2,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: -2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 2,
    },


    texto: {
        color: "#fff",
        fontSize: 15,
        textAlign:"center"
    },

    textoTitulo: {
        color: "#fff",
        fontSize: 27,
        fontWeight:'bold'
    },

    touch5: {
        backgroundColor: "#fff",
        borderStyle:"solid",
        borderColor:"#F7001D",
        width: "100%",
        height: 40,
        //margin: 2,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: -2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        //elevation: 2,
        borderWidth: 2,
    },
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RecuperarPass);
