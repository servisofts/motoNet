import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, TextInput, ScrollView, StyleSheet, NativeModules, ActivityIndicator } from 'react-native';
import Svg from '../../Svg';
import base64 from 'react-native-base64'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

GoogleSignin.configure();

const signIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        // this.setState({ userInfo });
        console.log(userInfo);
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
        } else {
            // some other error happened
        }
    }
};

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
        props.navigation.replace("InicioPage");
        return <View />
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


    const iniciarSession = () => {
        var datos = {}
        var exito = true
        for (const key in obj) {

            if (!obj[key].value || obj[key].value.lenth <= 0) {
                obj[key].error = true;
                exito = false;
            } else {
                obj[key].error = false;
                datos[key] = obj[key].value
            }
        }
        if (!exito) {
            setObj({ ...obj })
            return <View />
        }
        if (exito) {
            props.state.socketClienteReducer.sessiones["motonet"].send({
                component: "usuario",
                type: "login",
                data: datos,
                estado: "cargando"
            }, true);
            return <View />
        }
    }


    return (

        <View
            style={{
                flex: 1,
                backgroundColor: "red",
                width: '100%',
            }}>

            <ScrollView>

                <View style={{
                    width: "100%",
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>

                    <View style={{
                        alignItems: 'center',
                        //justifyContent:"center",                        
                        width: "100%",
                        flexDirection: "column-reverse",
                        height: 250
                    }}>
                        <Svg name="Logo"
                            style={{
                                width: 200,
                                height: 200,
                                fill: "#fff"

                            }} />
                    </View>

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
                            placeholderTextColor="#fff"
                            onChangeText={text => hanlechage(text, "usr")}
                            value={obj.usr.value}
                            autoCapitalize='none'
                            autoFocus={true}
                            color="#fff"
                        />
                    </View>

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
                            placeholder={"Contraseña"}
                            placeholderTextColor="#fff"
                            onChangeText={text => hanlechage(text, "pass")}
                            value={obj.pass.value}
                            autoCapitalize='none'
                            secureTextEntry
                            autoCapitalize='none'
                            secureTextEntry
                            color="#fff"
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 30,
                            flex: 1,
                            width: '100%',
                            alignItems: 'center',
                        }}>

                        {props.state.usuarioReducer.estado == "cargando" ? (
                            <View style={styles.touch4}>
                                <ActivityIndicator color="red" size="large" />
                            </View >
                        ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        iniciarSession()
                                    }}
                                    style={styles.touch4}>
                                    <Text
                                        style={{
                                            color: 'red',
                                            fontSize: 15
                                        }}>INGRESAR
                                    </Text>
                                </TouchableOpacity>
                            )
                        }

                        <TouchableOpacity
                            onPress={() => props.navigation.navigate("RegistroUsuarioPage")}
                            style={styles.touch4}>
                            <Text
                                style={{
                                    color: 'red',
                                    fontSize: 15
                                }}>CREAR UNA CUENTA
                                    </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-evenly",
                        marginTop: 30,
                        paddingBottom: 30
                    }}>

                        <TouchableOpacity
                            onPress={signIn}
                            style={styles.google}>
                            <Svg name="LogoEmail"
                                style={{
                                    width: 30,
                                    height: 30,
                                    fill: "#000",
                                    flex: 1,
                                }
                                } />
                            {/* <Text
                                    style={{
                                        textAlign: "center",
                                        flex: 0.8,
                                        width: '100%',
                                    }}>
                                   Ingresar con Google
                            </Text> */}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={_fbAuth}
                            style={styles.facebook}>
                            <Svg name="LogoFacebook"
                                style={{
                                    width: 35,
                                    height: 35,
                                }} />
                            {/* <Text
                                    style={{
                                        textAlign: "center",
                                        flex: 0.8,
                                        color: "#fff",
                                        width: '100%',
                                    }}>
                                    Sing in with Facebook
                            </Text> */}
                        </TouchableOpacity>
                        {/* <TouchableOpacity
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
                            </TouchableOpacity> */}
                    </View>
                </View >
            </ScrollView>
        </View >
    )

}
const styles = StyleSheet.create({
    facebook: {

        marginTop: 10,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        //flexDirection: 'row',
        backgroundColor: "#3D5893",
        borderRadius: 100,
    },
    google: {

        backgroundColor: "#fff",
        width: 70,
        height: 70,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        //flexDirection: 'row',
        borderRadius: 100,
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
        //backgroundColor: "#fff",
        width: "80%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        borderRadius: 10,
        borderBottomWidth: 2,
        borderColor: "#fff",
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
        backgroundColor: "#fff",
        width: "80%",
        height: 50,
        //borderColor: "#fff",
        //margin: 2,
        //borderWidth: 3,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 5,
    },

});
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Login);
