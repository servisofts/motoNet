import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, TextInput, ScrollView, StyleSheet, NativeModules } from 'react-native';
import Svg from '../../Svg';
import base64 from 'react-native-base64'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import AppParams from '../../Json';
import Styles from '../../Styles';
import STheme from "../../STheme";
import Boton1 from "../../Component/Boton1";
import BottomContent from "../../Component/BottomContent";
import SSCrollView from "../../Component/SScrollView";
import ModalPage from "../ModalPage";

const LoginPage = (props) => {

    this.state = {
        modalVisible: false,

    };

   
    const [obj, setObj] = React.useState({
        usr: {
            value: "",
            error: false
        },
        pass: {
            value: "",
            error: false
        },
    });

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         modalVisible: false,
    //         mensaje: "",
    //         modal: "",

    //     };
    // }


    if (props.state.usuarioReducer.estado === "exito") {
        props.navigation.estado = ""
        props.navigation.replace("CargaPage");
        return <View />
    }

    var mensaje;
    var modalVisible = false;
    var modal

    if (props.state.usuarioReducer.error == "error_datos") {
        props.state.usuarioReducer.estadoEmail = false;
        mensaje = "Error de datos..."
        //modalVisible = true;
        modal = "ModalError";
        this.state.modalVisible = true;
    }

    //alert(modalVisible)

    if (props.state.usuarioReducer.estado === "error") {
        switch (props.state.usuarioReducer.error) {
            case "not_found":
                props.navigation.navigate("RegistroUsuarioPage", {
                    data,
                    registro: "facebook"
                })
                break;
        }
        props.state.usuarioReducer.estado = ""
        obj.pass.error = true;
        setObj({ ...obj })
        return <View />
    }
    const _responseInfoCallback = (error, result) => {
        if (error) {
            alert('Error fetching data: ' + error.toString());
        } else {
            setState({ userName: result.name, userEmail: result.email, userPic: result.picture.data.url });
            console.log("UserName", this.state.userName);
            console.log("Email", this.state.userEmail);
            console.log("UserPic", this.state.userPic);
            //  SharedPreferences.setItem("UserName", this.state.userName);
            //       SharedPreferences.setItem("Email", this.state.userEmail);
            //       SharedPreferences.setItem("UserPic", this.state.userPic);
            console.log("Picture" + this.state.userPic + "Name" + this.state.userName + "Email" + this.state.userEmail);
        }
    }

    const encode = () => {
        var b64 = base64.encode('Some string to encode to base64');
    /*         b64 = base64.decode('3weqweqwddsadasdasdasdasdwqe');
     */        alert(b64)
        return <View />

    };
    const Correo = () => {
        var b64 = base64.encode('Some string to encode to base64');
    /*         b64 = base64.decode('3weqweqwddsadasdasdasdasdwqe');
     */        alert(b64)
        return <View />

    };

    const hanlechage = (text, id) => {
        var aux = "";
        if (id === "usr") {
            aux = text.replace(/\s*$/, "")
            obj[id] = {
                value: aux,
                error: false,
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

    const _fbAuth = () => {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
                if (result.isCancelled) {
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            let accessToken = data.accessToken
                            const responseInfoCallback = (error, result) => {
                                if (error) {
                                    console.log(error)
                                } else {
                                    console.log(result)
                                    //props.loginFacebook(props.state.socketClienteReducer.sessiones["motonet"], result);
                                    data = result;
                                    setFace(data);
                                    LoginManager.logOut();
                                }
                            }
                            const infoRequest = new GraphRequest(
                                '/me',
                                {
                                    accessToken: accessToken,
                                    parameters: {
                                        fields: {
                                            string: 'email,name,first_name,middle_name,last_name'
                                        }
                                    }
                                },
                                responseInfoCallback
                            );
                            // Start the graph request.
                            new GraphRequestManager().addRequest(infoRequest).start()
                        }
                    )
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
        LoginManager.logOut();
    }

    // render() {

    return (
        <View style={{
            flex: 1,
            backgroundColor: Styles.colors.primary
        }}>
            <SSCrollView>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 30,
                    marginBottom: 30,
                }}>
                    <Svg name="logoCompleto"
                        style={{
                            fill: STheme.color.primary,
                            width: 200,
                            height: 200,
                        }} />
                </View>
                <View style={{
                    // flex: 1,
                    alignItems: "center",
                }}>
                    <View style={{ width: "90%" }}>
                        <Text style={{
                            color: "#FFA9B3",
                            height: 25,
                            textAlign: "left"
                        }}>Usuario</Text>
                    </View>
                    <View
                        style={{
                            width: '90%',
                            alignItems: 'center',
                            flexDirection: 'row',
                            //marginTop: 30,
                            justifyContent: 'center',
                        }}>

                        <TextInput
                            style={!obj.usr.error ? styles.touch2 : styles.touch2Error}
                            placeholder={"Ingresar usuario"}
                            onChangeText={text => hanlechage(text, "usr")}
                            value={obj.usr.value}
                            autoCapitalize='none'
                            autoFocus={true}
                            placeholderTextColor="#FFF"
                        />
                    </View>
                    <View style={{ width: "90%" }}>
                        <Text style={{
                            color: "#FFA9B3",
                            height: 25,
                            textAlign: "left",
                            marginTop: 10
                        }}>Contraseña</Text>
                    </View>
                    <View
                        style={{
                            width: '90%',
                            alignItems: 'center',
                            flexDirection: 'row',
                            //marginTop: 20,
                            justifyContent: 'center',
                        }}>

                        <TextInput
                            style={!obj.pass.error ? styles.touch2 : styles.touch2Error}
                            placeholder={"Ingresar contraseña"}
                            onChangeText={text => hanlechage(text, "pass")}
                            value={obj.pass.value}
                            autoCapitalize='none'
                            secureTextEntry
                            autoCapitalize='none'
                            placeholderTextColor="#FFF"
                            secureTextEntry
                        />
                    </View>
                    <View>
                        <Boton1
                            type={"3"}
                            label={
                                <Text>
                                    {"¿Olvidó su contraseña?"}{" "}
                                    <Text
                                        style={{
                                            color: STheme.color.text,
                                            fontWeight: "bold",
                                            textDecorationLine: "underline",
                                        }}
                                    >
                                        Restablecer
                                    </Text>
                                </Text>
                            }
                            onPress={() => {
                                props.navigation.navigate("RecuperarPassPage");
                            }}
                        />
                    </View>
                    <BottomContent height={170}>
                        <View
                            style={{
                                width: "100%",
                                flex: 1,
                                justifyContent: "space-around",
                            }}
                        >
                            <View
                                style={{
                                    // marginTop: 10,
                                    //flex: 1,
                                    width: '100%',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}>
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
                                                var valor = obj[key].value;
                                                if (valor) {
                                                    var aux = valor
                                                    valor = aux.toLowerCase();
                                                }
                                                obj[key].value = valor;
                                                datas[key] = obj[key].value
                                            }
                                        }
                                        setObj({ ...obj })
                                        if (exito) {
                                            props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                                                component: "usuario",
                                                type: "login",
                                                data: datas,
                                                estado: "cargando"
                                            }, true);
                                        }
                                    }}

                                    style={styles.touch4}>
                                    <Text
                                        style={{
                                            color: '#fff',
                                        }}>
                                        Iniciar sesión
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            <View>
                                <Boton1
                                    type={"2"}
                                    label={
                                        <Text>
                                            ¿Aún no tienes una cuenta?{" "}
                                            <Text
                                                style={{
                                                    color: STheme.color.background,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Regístrate
                                            </Text>
                                        </Text>
                                    }
                                    onPress={() => {
                                        props.navigation.navigate("RegistroUsuarioPage", {
                                            registro: " ",
                                        });
                                    }}
                                />

                            </View>
                        </View>
                    </BottomContent>


                </View>
            </SSCrollView>
            {/* <ModalPage
                ventana="ModalError"
                //mensaje="La contraseñas escritas no coinciden. Inténtelo de nuevo. "
                mensaje="Error de datos..."
                ModalVisible={this.state.modalVisible}
                closeModal={() => {
                    this.state.modalVisible = false;
                    //ModalVisible = false;
                    //this.setState({ ...this.state });
                }}
            /> */}
        </View >
    )
    //  }
}

const styles = StyleSheet.create({
    facebook: {
        flex: 1,
        marginTop: 10,
        width: "70%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#3D5893",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 10,
    },
    google: {
        flex: 1,
        backgroundColor: "#fff",
        width: "70%",
        height: 50,
        marginTop: 10,
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

    icloud: {
        flex: 1,
        marginTop: 10,
        width: "70%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#000",
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

    touch: {
        // flex: 1,
        width: "80%",
        // height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        // flexDirection: 'row',
        borderRadius: 25,
        marginTop: 10
    },
    touch2: {
        flex: 1,
        backgroundColor: "#F7001D",
        color: "#ffffff",
        borderWidth: 2,
        //placeholderTextColor:"#FFF",
        width: "100%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        borderRadius: 5,
        borderColor: "#fff",

    },
    touch2Error: {
        flex: 1,
        backgroundColor: "#F7001D",
        width: "100%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: "#BA112A",
        borderWidth: 2,
        paddingLeft: 15,
        borderRadius: 5,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: -2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
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
        backgroundColor: Styles.colors.button,
        width: "80%",
        height: 40,
        // borderColor: "#fff",
        margin: 2,
        //borderWidth: 2,
        //borderColor: "#fff",
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
        // elevation: 5,
    },
});

const initStates = (state) => {
    return { state }
};

LoginPage.navigationOptions = (nav) => {
    return {
        headerShown: false
    }
}
export default connect(initStates)(LoginPage);