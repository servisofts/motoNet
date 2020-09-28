import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import ButtonRegistro from '../../component/LoginComponent/ButtonRegistro'
import MiCheckBox from '../../component/MiCheckBox';
import Svg from '../../Svg'
import { connect } from 'react-redux'


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
            contraseña: {
                value: "",
                error: false
            },
            politica: {
                value: false,
                error: false
            },
        };
    }

    componentDidMount() {

        var cabecera = "registro_cliente";
        if (!this.props.state.cabeceraDatoReducer.data[cabecera]) {
            /*  this.props.state.socketClienteReducer.sessiones["motonet"].send({
                 component: "cabeceraDato",
                 type: "getDatoCabecera",
                 estado: "cargando",
                 cabecera: cabecera,
             }, true); */
        }
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

    Registrar = (event) => {
        var objToSend = {};

        var exito = true;

        //validacion de campos nulo
        for (const key in this.state) {
            if (key === "telefono") {
                continue;
            }
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
        }//-----fin----

        this.setState({ ...this.state })

        //objToSend.fecha_on = moment(objToSend.fecha_on, "DD/MM/YYYY").format("YYYY-MM-DD");
        objToSend["telefono"] = this.state.telefono.value


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


    render() {
        return (
            <ScrollView style={{ flex: 1, }}>
                <View style={{
                    backgroundColor: "#FC363B",
                    flex: 1
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
                                style={(this.state.nombres.error ? styles.error : styles.Input)}
                                placeholder={"Nombres"}
                                value={this.state.nombres.value}
                                placeholderTextColor="#626262"
                                color="#000"
                                autoCapitalize='none'
                            />
                        </View>

                        <View style={styles.contenedorInput}>
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
                            <TextInput
                                onChangeText={text => this.handleCorreo(text, "correo")}
                                style={(this.state.correo.error ? styles.error : styles.Input)}
                                placeholder={"Correo"}
                                value={this.state.correo.value}
                                placeholderTextColor="#626262"
                                autoCapitalize='none'
                            />
                        </View>

                        <View style={styles.contenedorInput}>
                            <TextInput
                                onChangeText={text => this.handleChange(text, "telefono")}
                                style={(this.state.telefono.error ? styles.error : styles.Input)}
                                placeholder={"Telefono"}
                                value={this.state.telefono.value}
                                placeholderTextColor="#626262"
                                autoCapitalize='none'
                                maxLength={8}
                            />
                        </View>

                        <View style={styles.contenedorInput}>
                            <TextInput
                                onChangeText={text => this.handleChange(text, "contraseña")}
                                style={(this.state.contraseña.error ? styles.error : styles.Input)}
                                placeholder={"Contraseña"}
                                value={this.state.contraseña.value}
                                placeholderTextColor="#626262"
                                secureTextEntry
                                autoCapitalize='none'
                            />
                        </View>

                        <View style={{
                            width: '80%',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                        }}>
                            <View style={{ flex: 1, paddingTop: 20 }}>
                                <MiCheckBox
                                ischeck={this.state.politica.value} 
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
                            <ButtonRegistro click={this.Registrar} titulo="REGISTRAR" estilo="sign" />
                        </View>

                    </View>
                </View>
            </ScrollView>
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

