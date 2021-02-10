import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, TextInput, ScrollView, StyleSheet, NativeModules } from 'react-native';
import Svg from '../../Svg';
import base64 from 'react-native-base64'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import Theme from '../../Styles/Theme.json'
import ImgFondoCruces from '../../Component/ImgFondoCruces'

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


    return (
        <>
            <ImgFondoCruces />
            <ScrollView
                style={{
                    flex: 1,
                    width: '100%',

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
                                marginTop: 30,
                                justifyContent: 'center',
                            }}>
                            <TextInput
                                style={!obj.usr.error ? styles.touch2 : styles.touch2Error}
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
                                style={!obj.pass.error ? styles.touch2 : styles.touch2Error}
                                placeholder={"Contraseña"}
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
                                        props.state.socketClienteReducer.sessiones["clinica_nj"].send({
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

                                    }}
                                >
                                    Ingresar
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
                                onPress={() => props.navigation.navigate("RecuperarPassPage")}
                                style={
                                    styles.touch
                                }>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: "#000"
                                    }}>
                                    Recuperar la contraseña
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View >

            </ScrollView>
        </>
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

});
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Login);
