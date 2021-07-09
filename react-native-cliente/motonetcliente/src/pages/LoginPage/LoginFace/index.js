import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
    LoginManager,
    AccessToken, GraphRequest,
    GraphRequestManager
} from "react-native-fbsdk";
import { connect } from 'react-redux';
import Svg from '../../../Svg';
import AppParams from '../../../Json';


class LoginFace extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    consulta = (result) => {
        this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
            component: "usuario",
            type: "loginFacebook",
            estado: "cargando",
            data: result
        }, true);
        this.setState({ data: result });
    }
    _fbAuth = () => {
        var consultar = this.consulta;
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
                                    LoginManager.logOut();
                                    consultar(result);
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
        if (this.props.state.usuarioReducer.type === "loginFacebook") {
            if (this.props.state.usuarioReducer.estado === "exito") {
                this.props.state.usuarioReducer.estado = ""
                this.props.navigation.replace("CargaPage")
                return <View />
            }
            if (this.props.state.usuarioReducer.estado === "error") {
                this.props.navigation.navigate("RegistroUsuarioPage", {
                    data: this.state.data,
                    registro: "facebook"
                })
                return <View />
            }
        }

        return (
            <TouchableOpacity style={{
                width: 50,
            }} onPress={() => { this._fbAuth() }}>
                <Svg resource={require("../../../img/face.svg")} />
            </TouchableOpacity>
        );
    }
}

const initStates = (state) => {
    return { state };
};

export default connect(initStates)(LoginFace);
