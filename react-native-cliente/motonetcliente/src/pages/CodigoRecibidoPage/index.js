import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import ImgFondoCruces from '../../component/ImgFondoCruces';
import Svg from '../../Svg';

class CodigoRecibidoPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            codigo: {
                value: "",
                error: false
            }
        }
    }

    handleChange = (event, id) => {
        this.state[id] = {
            value: event,
            error: false,
        }
        this.setState({ ...this.state })
    };


    render() {
        if (this.props.state.usuarioReducer.estadoEmail == "exito" && this.props.state.usuarioReducer.type == "verificarCodigoPass") {
            alert("Codigo confirmado...")
            this.props.state.usuarioReducer.estadoEmail = false
            this.props.navigation.navigate("NuevoPassPage")
            this.state.codigo.value = ""
            this.setState({ ...this.state })
        }

        if (this.props.state.usuarioReducer.estadoEmail == "error" && this.props.state.usuarioReducer.type == "verificarCodigoPass") {
            alert("Codigo incorrecto...")
            this.props.state.usuarioReducer.estadoEmail = false
            // this.props.navigation.navigate("NuevoPassPage")
            this.state.codigo.value = ""
            this.setState({ ...this.state })
        }

        return (
            <View style={{
                flex: 1
            }}>
                <ImgFondoCruces />

                <ScrollView>

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
                                style={!this.state.codigo.error ? styles.touch2 : styles.touch2Error}
                                placeholder={"Ingrese codigo recibido"}
                                onChangeText={text => this.handleChange(text, "codigo")}
                                value={this.state.codigo.value}
                                autoCapitalize='none'
                            // autoFocus={true}
                            />
                        </View>

                        <View
                            style={{
                                marginTop: 30,
                                marginBottom: 20,
                                width: '80%',
                                alignItems: 'center',
                                justifyContent: "center",
                                flexDirection: 'row',
                                // backgroundColor:"#ccc"
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    // var datas = {}
                                    var exito = true;

                                    if (this.state.codigo.value.length <= 0) {
                                        this.state.codigo.error = true;
                                        exito = false
                                    }
                                    // setObj({ ...obj })
                                    this.setState({ ...this.state })
                                    if (exito) {
                                        // alert("dsd")
                                        this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
                                            component: "usuario",
                                            type: "verificarCodigoPass",
                                            data: this.state.codigo.value,
                                            estado: "cargando"
                                        }, true);
                                    }
                                }}
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
                </ScrollView >
            </View>
        )
    }
}

const styles = StyleSheet.create({
    touch2: {
        backgroundColor: "#EAEAE2",
        width: "100%",
        height: 50,
        paddingLeft: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    touch2Error: {
        backgroundColor: "#EAEAE2",
        width: "100%",
        height: 50,
        paddingLeft: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        borderColor: "red",
        borderWidth: 1
    },

    touch4: {
        backgroundColor: "#2C4C7E",
        width: "80%",
        height: 40,
        margin: 2,
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
        elevation: 2,
    },
    texto: {
        color: "#000",
        fontSize: 15,
    }
});

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(CodigoRecibidoPage);
