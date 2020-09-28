import React from 'react';

import { connect } from 'react-redux';
import {
    View, TouchableOpacity,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    NativeModules
} from 'react-native';
import Svg from '../../Svg';
import base64 from 'react-native-base64'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import Theme from '../../Styles/Theme.json'

const Login = (props) => {

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

    if (props.state.usuarioReducer.estado === "exito") {
        props.navigation.estado = ""
        props.navigation.replace("CargaPage");
        return <View />
    }
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
/*                                     props.loginFacebook(props.state.socketClienteReducer.sessiones["motonet"], result);
 */                                    data = result;
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



    return (
        <ScrollView
            style={{
                flex: 1,
                width: '100%',
                backgroundColor: Theme.colors.fondo,

            }}>

            <View style={{
                flex: 1,
                width: "100%",
                alignItems: 'center',
                flexDirection: 'column',
            }}>
                <View
                    style={{
                        marginTop: 20,
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}>
                    <Svg name="LogoMoto"
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
                            marginTop: 30,
                            justifyContent: 'center',
                        }}>
                        <TextInput
                            style={styles.touch2}
                            placeholder={"Usuario"}
                            onChangeText={text => hanlechage(text, "usr")}
                            value={obj.usr.value}
                            autoCapitalize='none'
                            autoFocus={true}
                        />
                    </View>
                    <View
                        style={{
                            width: '80%',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginTop: 20,
                            justifyContent: 'center',
                        }}>
                        <TextInput
                            style={styles.touch2}
                            placeholder={"Password"}
                            onChangeText={text => hanlechage(text, "pass")}
                            value={obj.pass.value}
                            autoCapitalize='none'
                            secureTextEntry
                            autoCapitalize='none'
                            secureTextEntry
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
                            onPress={() => {
                                var datas = {}
                                for (const key in obj) {

                                    if (!obj[key].value || obj[key].value.lenth <= 0) {
                                        obj[key].error = true;
                                        exito = false;
                                    } else {
                                        obj[key].error = false;
                                        datas[key] = obj[key].value
                                    }
                                }
                                props.state.socketClienteReducer.sessiones["motonet"].send({
                                    component: "usuario",
                                    type: "login",
                                    data: datas,
                                    estado: "cargando"
                                }, true);
                                return <View />

                            }}

                            style={styles.touch4}>
                            <Text
                                style={{
                                    color: '#fff',

                                }}
                            >
                                Sign in
                        </Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("RegistroUsuarioPage")}
                            style={styles.touch4}>
                            <Text
                                style={{
                                    color: '#fff',
                                }}
                            >
                                Crear una cuenta
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            width: '100%',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}>


                        <TouchableOpacity
                            onPress={Correo}
                            style={styles.google}>
                            <Svg name="google"
                                style={{
                                    width: 30,
                                    height: 30,
                                    fill: "#000",
                                    flex: 1,
                                }
                                } />
                            <Text
                                style={{
                                    textAlign: "center",
                                    flex: 0.8,
                                    width: '100%',
                                }}>
                                Sing in with Google
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={_fbAuth}
                            style={styles.facebook}>
                            <Svg name="facebook"
                                style={{
                                    width: 35,
                                    height: 35,

                                }} />
                            <Text
                                style={{
                                    textAlign: "center",
                                    flex: 0.8,
                                    color: "#fff",
                                    width: '100%',
                                }}>
                                Sing in with Facebook
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                NativeModules.Device.getDeviceName((err, name) => console.log(err, name));
                            }}
                            style={
                                styles.touch
                            }>
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: "#fff"
                                }}>
                                Recuperar la contrasena
                                </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View >

        </ScrollView>
    )

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
        backgroundColor: "red",
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

});
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Login);
