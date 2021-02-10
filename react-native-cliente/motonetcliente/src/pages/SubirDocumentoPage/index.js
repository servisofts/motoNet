import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs'
import Svg from '../../Svg';
import ImgFondoCruces from '../../component/ImgFondoCruces';
import MiCheckBox from '../../component/MiCheckBox';
import AppParams from '../../Json';
import ModalPage from '../ModalPage';


const SubirDocumentoPage = (props) => {

    const [obj, setObj] = React.useState({
        codigo: {
            value: "",
            error: false
        },
        tipo: {
            value: "",
            error: false
        },
        nombre: {
            value: "",
            error: false
        },
    });
    const [modalVisible, setModalVisible] = React.useState(true);

    const SubirSeguro = () => {


        var exito = true
        var User = props.state.usuarioReducer.usuarioLog;
        if (!User) {
            return "no hay usr";
        }

        if (obj.codigo.value.length <= 0) {
            obj.codigo.error = true
            exito = false;
            setObj({ ...obj })
        }
        // } else {
        //     var valor = obj.codigo.value;
        //     if (valor) {
        //         var aux = valor
        //         valor = aux.trim();
        //     }            
        // }

        if (obj.nombre.value.length <= 0) {
            obj.nombre.error = true
            exito = false;
            setObj({ ...obj })
        }

        if (obj.tipo.value.length <= 0) {
            obj.tipo.error = true
            exito = false;
            setObj({ ...obj })
        }

        if (exito) {
            props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "codigoSeguro",
                type: "registro",
                estado: "cargando",
                tipo: obj.tipo.value,
                descripcion: "",
                nombre: obj.nombre.value.trim(),
                codigo: obj.codigo.value.trim(),
                key_usuario: User.key,
            }, true);
            // props.navigation.goBack(null)
            // props.navigation.pop()
            // props.navigation('Dashboard')
            // props.navigation.navigate('Dashboard')
            // props.navigation.dispatch(NavigationActions.back())
        }
        return <View />
    }

    const replacePage = () => {
        props.state.seguroReducer.estado = false
        setModalVisible(false)
        props.navigation.goBack(null)
        return <View />
    }

    const estadoCargando = () => {
        if (props.state.seguroReducer.estado == "cargando" && props.state.seguroReducer.type == "registro") {
            return (
                <View style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#00000050",
                    justifyContent: "center",
                    alignItems: "center",
                    position: 'absolute',
                }}>
                    <ActivityIndicator color="#2C4C7E" size="large" />
                </View>
            )
        }
        if (props.state.seguroReducer.estado == "exito" && props.state.seguroReducer.type == "registro") {
            return (
                <ModalPage
                    ventana="ModalSuccess"
                    ModalVisible={modalVisible}
                    replacePage={() => replacePage()}
                    closeModal={() => {
                        props.state.seguroReducer.estado = false
                        setModalVisible(false)
                    }}
                />
            )
        }
    }

    const handleChange = (event, id) => {
        obj[id] = {
            value: event,
            error: false,
        }
        setObj({ ...obj })
        return <View />
    };

    return (
        <View style={{
            height: "100%"
        }}>

            <ImgFondoCruces />

            <ScrollView>

                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    // backgroundColor:"#ccc"
                }}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: "70%",
                        marginTop: 50
                    }}>
                        <Svg style={{
                            width: 150,
                            height: 150,
                        }} name="logoCompletoRecurso" />

                        <View style={{
                            height: 1,
                            width: "90%",
                            backgroundColor: '#ccc'
                        }} />

                    </View>

                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: 'center',
                        marginTop: 30,
                        // backgroundColor: "#ccc",
                        width: "70%",
                        justifyContent: "space-evenly"

                    }} >
                        <View style={{
                            // backgroundColor:"#ccc",
                            alignItems: "center"
                        }}>
                            <MiCheckBox ischeck={obj.tipo.value == "titular"} onChange={() => {
                                if (obj.tipo.value == "titular") {
                                    //settipo("");
                                    obj.tipo.value = "";
                                    setObj({ ...obj })
                                    return <View />
                                }
                                //settipo("servicio");
                                obj.tipo.value = "titular";
                                setObj({ ...obj })
                                return <View />
                            }} />
                            <Text>TITULAR</Text>
                        </View>

                        <View style={{
                            // backgroundColor:"#ccc",
                            alignItems: "center"
                        }}>
                            <MiCheckBox ischeck={obj.tipo.value == "beneficiario"} onChange={() => {
                                if (obj.tipo.value == "beneficiario") {
                                    //settipo("");
                                    obj.tipo.value = "";
                                    setObj({ ...obj })
                                    return <View />
                                }
                                //settipo("servicio");
                                obj.tipo.value = "beneficiario";
                                setObj({ ...obj })
                                return <View />
                            }} />
                            <Text>BENEFICIARIO</Text>
                        </View>

                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        marginTop: 10,
                        //backgroundColor: "#ff",
                        width: "70%"
                    }} >

                        <View style={styles.contenedorInput}>
                            <TextInput
                                onChangeText={text => handleChange(text, "nombre")}
                                //style={styles.Input}
                                style={(obj.nombre.error ? styles.error : styles.Input)}
                                placeholder={"Nombre Completo"}
                                value={obj.nombre.value}
                                placeholderTextColor="#626262"
                                autoCapitalize='none'
                            />
                        </View>

                        <View style={styles.contenedorInput}>
                            <TextInput
                                onChangeText={text => handleChange(text, "codigo")}
                                //style={styles.Input}
                                style={(obj.codigo.error ? styles.error : styles.Input)}
                                placeholder={"Codigo de seguro"}
                                value={obj.codigo.value}
                                placeholderTextColor="#626262"
                                autoCapitalize='none'
                            />
                        </View>

                        {/* {props.state.seguroReducer.estado == "cargando" && props.state.seguroReducer.type == "registro" ? (
                            <View style={styles.button}>
                                <ActivityIndicator color="#fff" size="large" />
                            </View >
                        ) : ( */}
                        <TouchableOpacity
                            onPress={() => {
                                SubirSeguro();
                            }}
                            style={styles.button}>
                            <Text style={{
                                textAlign: 'center',
                                color: "#fff",
                                fontSize: 15,
                                fontWeight: "bold",
                            }}>
                                REGISTRAR </Text>
                        </TouchableOpacity>
                        {/* ) */}
                        {/* } */}
                    </View>
                </View>
            </ScrollView>

            { estadoCargando()}

            {/* <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={{
                        width: 50,
                        height: 50,
                        position: "absolute",
                        top: 10,
                        left: 10,
                    }}>
                    <Svg name="volver"
                        style={{
                            width: 30,
                            height: 30,
                            fill: "#fff"
                        }} />
                </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: "90%",
        backgroundColor: '#02ACE9',
        borderRadius: 40,
        alignItems: "center"
    },
    text: {
        color: '#fff',
        textAlign: "center",
        width: "70%",

    },
    stretch: {
        height: 150,
        width: "100%",
        marginBottom: 20,
        backgroundColor: "#fff",
        borderRadius: 25,
    },
    contenedorInput: {
        marginTop: 20,
        width: "100%",
        alignItems: "center"
    },
    Input: {
        backgroundColor: "#EAEAE2",
        borderRadius: 10,
        color: "#000",
        borderColor: "#EAEAE2",
        borderWidth: 1,
        padding: 10,
        height: 40,
        elevation: 5,
        width: "100%"
    },
    error: {
        backgroundColor: "#EAEAE2",
        borderRadius: 10,
        color: "#000",
        borderColor: "red",
        borderWidth: 1,
        elevation: 5,
        padding: 10,
        width: "100%"
    },
    button: {
        backgroundColor: "#2C4C7E",
        width: "100%",
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        fontSize: 40,
        marginTop: 20
    },
});

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(SubirDocumentoPage);

