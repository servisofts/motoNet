import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg from '../../../Svg';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import { connect } from 'react-redux';
import AppParams from '../../../Json';

GoogleSignin.configure();

class LoginGmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo.user)
            this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "usuario",
                type: "loginGmail",
                estado: "cargando",
                data: userInfo.user
            }, true);
            this.setState({ data: userInfo.user });
            GoogleSignin.signOut();
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

    render() {
        if (this.props.state.usuarioReducer.type === "loginGmail") {
            if (this.props.state.usuarioReducer.estado === "exito") {
                this.props.state.usuarioReducer.estado = ""
                this.props.navigation.replace("CargaPage")
                return <View />
            }
            if (this.props.state.usuarioReducer.estado === "error") {
                this.props.navigation.navigate("RegistroUsuarioPage", {
                    data: this.state.data,
                    registro: "gmail"
                })
                return <View />
            }
        }

        return (
            <TouchableOpacity style={{
                width: 50,
            }} onPress={() => { this.signIn() }}>
                <Svg resource={require("../../../img/gmas.svg")} />
            </TouchableOpacity>
        );
    }
}
const initStates = (state) => {
    return { state };
};

export default connect(initStates)(LoginGmail);
