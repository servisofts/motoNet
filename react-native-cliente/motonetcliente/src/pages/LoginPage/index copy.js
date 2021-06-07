import React, { Component } from 'react'
import { AsyncStorage, StyleSheet, Text, View, ActivityIndicator, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import LineHorizontal from '../../component/LineHorizontal'
import ButtonRegistro from '../../component/LoginComponent/ButtonRegistro'
import base64 from 'react-native-base64'
import {
    LoginManager,
    AccessToken, GraphRequest,
    GraphRequestManager
} from "react-native-fbsdk";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import Svg from '../../Svg'
import { connect } from 'react-redux';
import ImgFondoCruces from '../../component/ImgFondoCruces'
import ModalPage from '../ModalPage'
import STheme from '../../STheme'
import BottomContent from '../../component/BottomContent'
// import RecuperarPassPage from '../RecuperarPassPage3'
// import { SlideFromRightIOS } from 'react-navigation-stack/lib/typescript/src/vendor/TransitionConfigs/TransitionPresets'


GoogleSignin.configure();


export class LoginPage extends Component {

    static navigationOptions = {
        headerShown: false
    }

    constructor(props) {
        super(props);
        this.state = {
            usr: {
                value: "",
                error: false
            },
            pass: {
                value: "",
                error: false
            },
            data: false,
            modalVisible: false,
        };

    }


    handleChange = (event, id) => {
        var aux = "";
        // console.log(aux)
        if (id === "usr") {
            aux = event.replace(/\s*$/, "")
            this.state[id] = {
                value: aux,
                error: false,
            }
            this.setState({ ...this.state })
            return <View />
            // }
        }
        this.state[id] = {
            value: event,
            error: false,
        }
        this.setState({ ...this.state })
    };


    handleClick = (props) => {
        this.props.navigation.navigate("RegistroUsuarioPage", {
            registro: "registros"
        })
    };


    clearSession = () => {
        AsyncStorage.removeItem("motonet_usuarioLog")
        //props.state.usuarioReducer.usuarioLog = false
    };

    iniciarSession = () => {

        var datas = {}
        var exito = true;

        for (const key in this.state) {

            if (!this.state[key]) {
                continue;
            }
            if (this.state[key] == false) {
                continue;
            }

            if (!this.state[key].value || this.state[key].value.lenth <= 0) {
                this.state[key].error = true;
                exito = false;

            } else {
                this.state[key].error = false;
                var valor = this.state[key].value;
                if (valor) {
                    var aux = valor
                    valor = aux.toLowerCase();
                }
                this.state[key].value = valor;
                datas[key] = this.state[key].value
            }
        }
        this.setState({ ...this.state })

        if (exito) {
            this.props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "usuario",
                type: "login",
                data: datas,
                estado: "cargando"
            }, true);
            return <View />
        }
    }

    Correo = () => {
        var b64 = base64.encode('Some string to encode to base64');
        alert(b64)
        return <View />
    };

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo.user)
            this.props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "usuario",
                type: "loginGmail",
                estado: "cargando",
                data: userInfo.user
            }, true);
            this.state.data = userInfo.user;
            this.setState({ ...this.state });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log(error)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log(error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log(error)
            } else {
                console.log(error)
            }
        }
    };

    fbRequest = (result) => {
        this.props.state.socketClienteReducer.sessiones["motonet"].send({
            component: "usuario",
            type: "loginFacebook",
            estado: "cargando",
            data: result
        }, true);
        this.state.data = result;
        this.setState({ ...this.state });
        return <View />
    }

    _fbAuth = () => {
        var superProps = this.fbRequest;

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
                                    superProps(result);
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

    render() {

        if (this.props.state.usuarioReducer.estado === "exito"
            && (this.props.state.usuarioReducer.type === "login"
                || this.props.state.usuarioReducer.type === "loginFacebook"
                || this.props.state.usuarioReducer.type === "loginGmail"
            )) {
            this.props.state.usuarioReducer.estado = ""
            this.props.navigation.replace("CargaPage")
            return <View />
        }

        if (this.props.state.usuarioReducer.estado === "error" && (this.props.state.usuarioReducer.type === "login"
            || this.props.state.usuarioReducer.type === "loginFacebook"
            || this.props.state.usuarioReducer.type === "loginGmail"
        )) {
            switch (this.props.state.usuarioReducer.type) {
                case "loginFacebook":
                    var data = this.state.data;
                    this.props.navigation.navigate("RegistroUsuarioPage", {
                        data: data,
                        registro: "facebook"
                    })
                    break;
                case "loginGmail":
                    this.props.navigation.navigate("RegistroUsuarioPage", {
                        data: this.state.data,
                        registro: "gmail"
                    })
                    break;
                case "login":
                    // this.state.pass.error = true;
                    // popupNotificacion()
                    this.state.modalVisible = true;
                    this.setState({ ...this.state })
                    break;

            }
            this.setState({ ...this.state });
            this.props.state.usuarioReducer.estado = ""
        }

        return (
            <View style={{
                backgroundColor: STheme.color.background,
                flex: 1,
            }} >

                <View style={{
                    width: "100%",
                    flex: 1,
                }}>
                    <ScrollView>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 30,
                            marginBottom: 30,
                        }}>
                            <Svg name="logoCompletoRecurso"
                                style={{
                                    width: 200,
                                    height: 200,
                                }} />
                        </View>

                        <View style={{
                            // flex: 1,
                            alignItems: "center",
                        }}>

                            <View style={styles.contenedorInput}>
                                <Text style={{
                                    color: "#ffa9b3"
                                }}>Usuario</Text>
                                <TextInput style={{
                                }}
                                    onChangeText={text => this.handleChange(text, "usr")}
                                    style={(this.state.usr.error ? styles.error : styles.Input)}
                                    placeholder={"Ingresar usuario"}
                                    value={this.state.usr.value}
                                    placeholderTextColor="#fff"
                                    color="#fff"
                                    autoCapitalize='none'
                                />
                            </View>

                            <View style={styles.contenedorInput}>
                                <Text style={{
                                    color: "#ffa9b3"
                                }}>Contraseña</Text>
                                <TextInput style={{
                                }}
                                    onChangeText={text => this.handleChange(text, "pass")}
                                    style={(this.state.pass.error ? styles.error : styles.Input)}
                                    placeholder={"Ingresar contraseña"}
                                    value={this.state.pass.value}
                                    placeholderTextColor="#fff"
                                    color="#fff"
                                    autoCapitalize='none'
                                    secureTextEntry={this.state.pass.value ? true : false}
                                />
                            </View>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate("RecuperarPassPage");
                                }}>
                                    <Text style={{
                                        marginTop: 15,
                                        color: "#fff",
                                        fontSize: 14,
                                    }}>
                                        ¿Olvido su contraseña? Restablecer
                            </Text>

                                </TouchableOpacity>

                            <View style={{
                                marginTop: 10,
                                width: "80%",
                                // justifyContent: "center",
                                flexDirection: "row",
                                justifyContent: "space-evenly"
                            }}>

                                {/* {this.props.state.usuarioReducer.estado == "cargando" ? (
                                <View style={styles.cargando}>
                                    <ActivityIndicator color="#fff" size="small" />
                                </View >
                            ) : ( */}
                                <ButtonRegistro titulo="INGRESAR" estilo="sign" click={() => { this.iniciarSession() }} />
                                {/* ) */}
                                {/* } */}
                                <ButtonRegistro titulo="CREAR UNA CUENTA" estilo="create" click={() => { this.handleClick("RegistroUsuarioPage") }} />
                            </View>


                            {/* <RecuperarPassPage /> */}

                            <View style={{
                                flexDirection: "row",
                                width: "100%",
                                justifyContent: "space-evenly",
                                marginTop: 30,
                                paddingBottom: 30
                            }}>

                                <ButtonRegistro estilo="facebook" svg="LogoFacebook" click={this._fbAuth} />
                                <ButtonRegistro svg="LogoEmail" estilo="email" click={this.signIn} />

                            </View>
                            {/* <ButtonRegistro titulo="Cerrar Session" estilo="create" click={() => { this.clearSession() }} /> */}
                        </View>

                    </ScrollView>

                </View>

                {this.props.state.usuarioReducer.estado == "cargando" && this.props.state.usuarioReducer.type == "login" ? (
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
                ) : (
                    <View />
                )}

                < ModalPage
                    ventana="ModalError"
                    ModalVisible={this.state.modalVisible}
                    closeModal={() => {
                        this.props.state.usuarioReducer.estado = false
                        this.state.modalVisible = false;
                        this.setState({ ...this.state })
                    }}
                />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    contenedorInput: {
        marginTop: 20,
        width: "80%",
        // paddingStart: 40,
        // paddingEnd: 40,
    },
    Input: {
        borderRadius: 4,
        color: "#000",
        borderColor: "#ffffff",
        borderWidth: 1,
        padding: 10,
    },
    error: {
        backgroundColor: "#EAEAE2",
        borderRadius: 10,
        color: "#000",
        borderColor: "red",
        borderWidth: 1,
        padding: 10,
        elevation: 5,
    },
    cargando: {
        marginTop: 20,
        width: "40%",
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
        marginRight: 5
    },
});

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(LoginPage);
