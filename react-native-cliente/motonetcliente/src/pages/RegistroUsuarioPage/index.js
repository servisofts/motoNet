import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, ScrollView } from 'react-native'
import ButtonRegistro from '../../component/LoginComponent/ButtonRegistro'
import Svg from '../../Svg'
import { connect } from 'react-redux';
import * as usuarioActions from '../../action/usuarioActions'
import Estado from '../../component/Estado';
import ImgFondoCruces from '../../component/ImgFondoCruces';

class RegistroUsuarioPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);

        this.state = {
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
            ci: {
                value: "",
                error: false
            },
            pass: {
                value: "",
                error: false
            },
            passConfirmar: {
                value: "",
                error: false
            },
            cargado: false
        };
    }

    componentDidMount() {
    }

    handleChange = (event, id) => {
        this.state[id] = {
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
                this.state[id] = {
                    value: event,
                    error: true,
                }
            }
            else {
                this.state[id] = {
                    value: event,
                    error: false,
                }
            }
            this.setState({ ...this.state })
            return <View />
        }
        this.state[id] = {
            value: event,
            error: false,
        }
        this.setState({ ...this.state })
        return <View />
    };


    Registrar = () => {

        var objToSend = {};
        var exito = true;

        for (const key in this.state) {
            console.log(key)
            if (key === "telefono") {
                continue;
            }
            if (key === "cargado") {
                continue;
            }
            console.log(this.state[key])
            console.log(this.state[key].value)
            if (!this.state[key].value || this.state[key].value.lenth <= 0) {
                this.state[key].error = true;
                exito = false;
            } else {
                this.state[key].error = false;
                objToSend[key] = this.state[key].value
            }
        }

        if (this.state.telefono.value.length < 8) {
            this.state.telefono.error = true;
            exito = false;
        } else {
            this.state.telefono.error = false;
        }

        if (this.state.pass.value != this.state.passConfirmar.value) {
            this.state.passConfirmar.error = true;
            alert("La contraseña no coinciden")
            exito = false;
        }

        this.setState({ ...this.state });

        objToSend["telefono"] = this.state.telefono.value

        const getKeyDato = (keyDescripcion) => {
            var key = "undefined"
            var cabecera = "registro_cliente";
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
                case "ci":
                    jsonFinal.push({
                        dato: getKeyDato("CI"),
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

        console.log(exito)
        if (exito) {
            switch (this.props.navigation.state.params.registro) {
                case "facebook":
                    var id = this.props.navigation.state.params.data.id;
                    jsonFinal.push({
                        dato: getKeyDato("Facebook key"),
                        data: id
                    })
                    this.props.registro(this.props.state.socketClienteReducer.sessiones["motonet"], jsonFinal);
                    break;
                case "gmail":
                    var id = this.props.navigation.state.params.data.id;
                    jsonFinal.push({
                        dato: getKeyDato("Gmail Key"),
                        data: id
                    })
                    this.props.registro(this.props.state.socketClienteReducer.sessiones["motonet"], jsonFinal);
                    break;
                default:
                    //console.log("entroo")
                    this.props.registro(this.props.state.socketClienteReducer.sessiones["motonet"], jsonFinal);
            }
            return <View />
        }
    }

    render() {

        /*  if (this.props.state.cabeceraDatoReducer.estado === "cargando") {
             return <Estado estado={"Cargando"} />
         } */

        if (this.props.state.usuarioReducer.estado === "exito") {
            this.props.state.usuarioReducer.estado = ""
            this.props.navigation.replace("CargaPage");
            return <View />
        }

        if (!this.state.cargado) {
            switch (this.props.navigation.state.params.registro) {
                case "facebook":
                    this.state.nombres.value = this.props.navigation.state.params.data.first_name + " " + (!this.props.navigation.state.params.data.middle_name ? "" : this.props.navigation.state.params.data.middle_name);
                    this.state.apellidos.value = this.props.navigation.state.params.data.last_name;
                    this.state.cargado = true;
                    break;
                case "gmail":
                    this.state.nombres.value = this.props.navigation.state.params.data.givenName;
                    this.state.apellidos.value = this.props.navigation.state.params.data.familyName;
                    this.state.correo.value = this.props.navigation.state.params.data.email;
                    this.state.cargado = true;
                    break;
                default:
                    this.state.cargado = true;
            }
            this.setState({ ...this.state });
            return <View />
        }
        if (this.props.state.usuarioReducer.estado === "error") {
            this.props.state.usuarioReducer.estado = ""
            var mensaje = "";
            if (this.props.state.usuarioReducer.errorRegistro == "existe_Telefono") {
                this.state.telefono.error = true;
                mensaje = "Ya existe un registro con el numero de Teléfono"
            }
            if (this.props.state.usuarioReducer.errorRegistro == "existe_Correo") {
                this.state.correo.error = true;
                mensaje = "Ya existe un registro con el Correo electrónico"
            }
            if (this.props.state.usuarioReducer.errorRegistro == "existe_CI") {
                this.state.ci.error = true;
                mensaje = "Ya existe un registro con el CI"
            }
            alert(mensaje);

            this.setState({ ...this.state });
            return <View />
        }

        return (

            <View style={{
                backgroundColor: "#f00",
                flex: 1
            }}>

                <ScrollView>
                    <View style={{
                        // flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // backgroundColor: "#ccc",
                        height: 160,
                    }}>
                        <Svg name="logoCompletoRecurso"
                            style={{
                                width: 100,
                                height: 100,
                            }} />
                    </View>

                    <View style={{
                        alignItems: "center",
                        // backgroundColor:"#ccc",
                        paddingBottom: 20
                    }}>
                        <View style={styles.contenedorInput}>
                            <Text style={styles.texto}>Nombres:</Text>
                            <TextInput
                                onChangeText={text => this.handleChange(text, "nombres")}
                                style={(this.state.nombres.error ? styles.error : styles.Input)}
                                placeholder={"Nombres"}
                                value={this.state.nombres.value}
                                placeholderTextColor="#626262"
                                color="#000"
                                autoCapitalize='none'
                            />
                        </View>

                        <View style={styles.contenedorInput}>
                            <Text style={styles.texto}>Apellidos:</Text>
                            <TextInput
                                onChangeText={text => this.handleChange(text, "apellidos")}
                                style={(this.state.apellidos.error ? styles.error : styles.Input)}
                                placeholder={"Apellidos"}
                                value={this.state.apellidos.value}
                                placeholderTextColor="#626262"
                                autoCapitalize='none'
                            />
                        </View>
                        <View style={styles.contenedorInput}>
                            <Text style={styles.texto}>CI.:</Text>
                            <TextInput
                                onChangeText={text => this.handleChange(text, "ci")}
                                style={(this.state.ci.error ? styles.error : styles.Input)}
                                placeholder={"Ingrese su célula de indentidad"}
                                value={this.state.ci.value}
                                placeholderTextColor="#626262"
                                autoCapitalize='none'
                                keyboardType='numeric'
                                maxLength={8}
                            />
                        </View>

                        <View style={styles.contenedorInput}>
                            <Text style={styles.texto}>Correo:</Text>
                            <TextInput
                                onChangeText={text => this.handleCorreo(text, "correo")}
                                style={(this.state.correo.error ? styles.error : styles.Input)}
                                placeholder={"Correo electrónico"}
                                value={this.state.correo.value}
                                placeholderTextColor="#626262"
                                autoCapitalize='none'
                            />
                        </View>

                        <View style={styles.contenedorInput}>
                            <Text style={styles.texto}>Teléfono:</Text>
                            <TextInput
                                onChangeText={text => this.handleChange(text, "telefono")}
                                style={(this.state.telefono.error ? styles.error : styles.Input)}
                                placeholder={"Teléfono"}
                                value={this.state.telefono.value}
                                placeholderTextColor="#626262"
                                autoCapitalize='none'
                                keyboardType='numeric'
                                maxLength={8}
                            />
                        </View>

                        <View style={styles.contenedorInput}>
                            <Text style={styles.texto}>Contraseña:</Text>
                            <TextInput
                                placeholder="Contraseña"
                                style={(this.state.pass.error ? styles.error : styles.Input)}
                                onChangeText={text => this.handleChange(text, "pass")}
                                value={this.state.pass.value}
                                autoCapitalize='none'
                                placeholderTextColor="#626262"
                                secureTextEntry
                            />
                        </View>

                        <View style={styles.contenedorInput}>
                            <Text style={styles.texto}>Confirmar contraseña:</Text>
                            <TextInput
                                placeholder="Confirmar Contraseña"
                                style={(this.state.passConfirmar.error ? styles.error : styles.Input)}
                                onChangeText={text => this.handleChange(text, "passConfirmar")}
                                value={this.state.passConfirmar.value}
                                autoCapitalize='none'
                                placeholderTextColor="#626262"
                                secureTextEntry
                            />
                        </View>

                        {this.props.state.usuarioReducer.estado == "cargando" ? (
                            <View style={styles.cargando}>
                                <ActivityIndicator color="#fff" size="small" />
                            </View >
                        ) : (
                            <ButtonRegistro titulo="REGISTRAR" estilo="CreateRegister" click={this.Registrar} />
                        )
                        }

                    </View>
                </ScrollView>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    contenedorInput: {
        marginTop: 10,
        width: "100%",
        alignItems: "center"
    },
    Input: {
        backgroundColor: "#fff",
        borderRadius: 10,
        color: "#000",
        borderColor: "#EAEAE2",
        borderWidth: 1,
        padding: 10,
        width: "80%",
        elevation: 5,
    },
    error: {
        backgroundColor: "#EAEAE2",
        borderRadius: 10,
        color: "#000",
        borderColor: "red",
        borderWidth: 1,
        padding: 10,
        width: "80%"
    },
    cargando: {
        marginTop: 20,
        width: "80%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#2c4b81",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },
    texto: {
        width: '80%',
        // textAlign: "left",
        color: "#fff",
        fontSize: 15,
        margin: 5,
    }
});


const initActions = ({
    ...usuarioActions,
});
const initStates = (state) => {
    return { state }
};
export default connect(initStates, initActions)(RegistroUsuarioPage);