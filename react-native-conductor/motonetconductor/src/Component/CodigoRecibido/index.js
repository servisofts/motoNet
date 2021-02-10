import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, TextInput, ScrollView, StyleSheet, NativeModules } from 'react-native';
import Svg from '../../Svg';
import ImgFondoCruces from '../ImgFondoCruces'

const CodigoRecibido = (props) => {

    const [obj, setObj] = React.useState({
        usr: {
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

    return (
        <ScrollView>
            <ImgFondoCruces />
            <View style={{
                height: 700
            }}>
                <View
                    style={{
                        marginTop: 20,
                        width: '100%',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                    <Svg name="logoCompletoRecurso"
                        style={{
                            width: 200,
                            height: 200,
                            fill: "#fff"

                        }} />
                    <View
                        style={{
                            width: '80%',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginTop: 80,
                            justifyContent: 'center',
                        }}>

                        <TextInput
                            style={!obj.usr.error ? styles.touch2 : styles.touch2Error}
                            placeholder={"Ingrese codigo recibido"}
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
                            /*onPress={() => {
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
                                        type: "login",
                                        data: datas,
                                        estado: "cargando"
                                    }, true);
                                }
                            }}*/
                            onPress={() => props.navigation.navigate("NuevoPassPage")}
                            style={styles.touch4}>
                            <Text
                                style={{
                                    color: '#fff',

                                }} >
                                Validar
                        </Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </View >

        </ScrollView>
    )

}
const styles = StyleSheet.create({
    touch: {
        flex: 1,
        width: "80%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 25,
    },
    touch2: {
        flex: 1,
        backgroundColor: "#EAEAE2",
        width: "80%",
        top: -20,
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
        width: "80%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: "#f00",
        borderWidth: 1,
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
    touch3: {
        marginTop: 10,
        flex: 1,
        backgroundColor: "#F7F7B6",
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
    touch4: {
        flex: 1,
        top: 15,
        backgroundColor: "#2c4b81",
        width: "80%",
        height: 50,
        borderColor: "#fff",
        margin: 2,
        borderWidth: 3,
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
    texto: {
        padding: 20,
        top: 20,
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
export default connect(initStates)(CodigoRecibido);
