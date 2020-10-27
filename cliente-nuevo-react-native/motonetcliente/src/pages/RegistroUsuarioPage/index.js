import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native'
import ButtonRegistro from '../../component/LoginComponent/ButtonRegistro'
import MiCheckBox from '../../component/MiCheckBox';
import Estado from '../../component/Estado';
import IntlPhoneInput from 'react-native-intl-phone-input';
import Svg from '../../Svg'
import { connect } from 'react-redux'

class RegistroUsuarioPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            obj: {
                nombres: {
                    value: "",
                    error: false
                },
                apellidos: {
                    value: "",
                    error: false
                },
                correo: {
                    value: "",
                    error: false
                },
                telefono: {
                    value: "",
                    error: false
                },
                contraseña: {
                    value: "",
                    error: false
                },
                politica: {
                    value: false,
                    error: false
                },
            },
            codigo: "591"
        };
    }
    handleChange = (event, id) => {
        this.state.obj[id] = {
            value: event,
            error: false,
        }
        this.setState({ ...this.state })
        return <View />
    };

    handleCorreo = (event, id) => {
        if (id === "correo") {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(event) === false) {
                this.state.obj[id] = {
                    value: event,
                    error: true,
                }
            }
            else {
                this.state.obj[id] = {
                    value: event,
                    error: false,
                }
            }
            this.setState({ ...this.state })
            return <View />
        }
        this.state.obj[id] = {
            value: event,
            error: false,
        }
        this.setState({ ...this.state })
        return <View />
    };
    Registrar = (event) => {
        var objToSend = {};
        var exito = true;
        //validacion de campos nulo
        for (const key in this.state.obj) {
            if (key === "telefono") {
                continue;
            }
            if (!this.state.obj[key].value || this.state.obj[key].value.lenth <= 0) {
                this.state.obj[key].error = true;
                exito = false;
            } else {
                this.state.obj[key].error = false;
                objToSend[key] = this.state.obj[key].value
            }
        }
        if (this.state.obj.telefono.value.length < 8) {
            this.state.obj.telefono.error = true;
            exito = false;
        }//-----fin----
        this.setState({ ...this.state })
        //objToSend.fecha_on = moment(objToSend.fecha_on, "DD/MM/YYYY").format("YYYY-MM-DD");
        objToSend["telefono"] = this.state.codigo + this.state.obj.telefono.value
        const getKeyDato = (keyDescripcion) => {
            var cabecera = "registro_cliente";
            var key = "undefined"
            for (let i = 0; i < this.props.state.cabeceraDatoReducer.data[cabecera].length; i++) {
                const obj = this.props.state.cabeceraDatoReducer.data[cabecera][i];
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
                case "contraseña":
                    jsonFinal.push({
                        dato: getKeyDato("Password"),
                        data: objToSend[key]
                    })
                    break;
            }
        })

        if (exito) {
            /*  switch (respuesta.registro) {
                 case "facebook":
                     jsonFinal.push({
                         dato: getKeyDato("Facebook key"),
                         data: respuesta.data.id
                     })
                     props.registro(props.state.socketClienteReducer.sessiones["glup"], jsonFinal);
                     break;
                 case "registro": */
            var jsonSend = {
                component: "usuario",
                type: "registro",
                cabecera: "registro_cliente",
                data: jsonFinal,
                estado: "cargando",
            };
            this.props.state.socketClienteReducer.sessiones["motonet"].send(jsonSend, true);
            /*  } */
            return <View />
        }
    }

    onChangeText = ({ dialCode, unmaskedPhoneNumber, phoneNumber, isVerified }) => {
        this.state.obj.telefono.value = unmaskedPhoneNumber
        this.state.codigo = dialCode
        this.setState(this.state)
        return <View />
    };
    render() {
        if (this.props.state.cabeceraDatoReducer.estado === "cargando") {
            return <Estado estado={"Cargando"} />
        }
        if (this.props.state.usuarioReducer.estado === "exito") {
            this.props.state.usuarioReducer.estado = ""
            this.props.navigation.goBack();
        }

        if (!this.props.state.cabeceraDatoReducer.data["registro_cliente"]) {
            this.props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "cabeceraDato",
                type: "getDatoCabecera",
                estado: "cargando",
                cabecera: "registro_cliente",
            }, true);
        }

        return (
            <View style={{
                backgroundColor: "#FC363B",
                flex: 1,
            }}>
                <ScrollView
                    style={{
                        flex: 1,
                    }}>

                    <View style={{
                        flex: 0.4,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Svg name="Logo"
                            style={{
                                width: 200,
                                height: 200,
                            }} />
                    </View>

                    <View style={{
                        flex: 1,
                        alignItems: "center"
                    }}>
                        <View style={styles.contenedorInput}>
                            <TextInput style={{
                            }}
                                onChangeText={text => this.handleChange(text, "nombres")}
                                style={(this.state.obj.nombres.error ? styles.error : styles.Input)}
                                placeholder={"Nombres"}
                                value={this.state.obj.nombres.value}
                                placeholderTextColor="#626262"
                                color="#000"
                                autoCapitalize='none'
                            />
                        </View>

                        <View style={styles.contenedorInput}>
                            <TextInput
                                onChangeText={text => this.handleChange(text, "apellidos")}
                                style={(this.state.obj.apellidos.error ? styles.error : styles.Input)}
                                placeholder={"Apellidos"}
                                value={this.state.obj.apellidos.value}
                                placeholderTextColor="#626262"
                                autoCapitalize='none'
                            />
                        </View>

                        <View style={styles.contenedorInput}>
                            <TextInput
                                onChangeText={text => this.handleCorreo(text, "correo")}
                                style={(this.state.obj.correo.error ? styles.error : styles.Input)}
                                placeholder={"Correo"}
                                value={this.state.obj.correo.value}
                                placeholderTextColor="#626262"
                                autoCapitalize='none'
                            />
                        </View>

                        <View style={styles.contenedorInput}>
                            <IntlPhoneInput
                                onChangeText={this.onChangeText}
                                defaultCountry="BO"
                                lang="TR" />
                        </View>

                        <View style={styles.contenedorInput}>
                            <TextInput
                                onChangeText={text => this.handleChange(text, "contraseña")}
                                style={(this.state.obj.contraseña.error ? styles.error : styles.Input)}
                                placeholder={"Contraseña"}
                                value={this.state.obj.contraseña.value}
                                placeholderTextColor="#626262"
                                secureTextEntry
                                autoCapitalize='none'
                            />
                        </View>

                        <View
                            style={{
                                width: '80%',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                            }}>
                            <View style={{ flex: 1, paddingTop: 20 }}>
                                <MiCheckBox
                                    ischeck={this.state.obj.politica.value}
                                    onChange={text => this.handleChange(text, "politica")}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate("PoliticaPage");
                                    return <View />
                                }}
                                style={{
                                    width: '90%',
                                    marginTop: 10,
                                    justifyContent: 'flex-start',
                                }} >

                                <Text style={{
                                    paddingLeft: 10,
                                    color: "#fff"
                                }}>Mostrar la politica de privacidad</Text>
                                <Text style={{
                                    marginStart: 10,
                                    fontSize: 10,
                                    maxWidth: "90%",
                                    width: 290,
                                    color: "#fff"
                                }}>Por favor, confirma que estas de acuerdo con nuestra
                                    politica de
                                    privacidad
                    </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginTop: 20,
                            width: "100%",
                            alignItems: "center"
                        }}>
                            {this.props.state.usuarioReducer.estado === "cargando" ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                    <ButtonRegistro click={this.Registrar} titulo="REGISTRAR" estilo="sign" />
                                )}
                        </View>

                    </View>
                </ScrollView>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    contenedorInput: {
        marginTop: 20,
        width: "100%",
        paddingStart: 40,
        paddingEnd: 40,
    },
    Input: {
        backgroundColor: "#fff",
        borderRadius: 10,
        color: "#000",
        borderColor: "#fff",
        borderWidth: 1,
        padding: 15
    },
    error: {
        backgroundColor: "#fff",
        borderRadius: 10,
        color: "#000",
        borderColor: "#000",
        borderWidth: 1,
        padding: 15
    },
});

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RegistroUsuarioPage);

