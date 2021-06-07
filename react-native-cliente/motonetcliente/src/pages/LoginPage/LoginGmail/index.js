import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg from '../../../Svg';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
GoogleSignin.configure();

export default class LoginGmail extends Component {
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
            // this.props.state.socketClienteReducer.sessiones["motonet"].send({
            //     component: "usuario",
            //     type: "loginGmail",
            //     estado: "cargando",
            //     data: userInfo.user
            // }, true);
            // this.state.data = userInfo.user;
            // this.setState({ ...this.state });
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
        return (
            <TouchableOpacity style={{
                width: 50,
            }} onPress={() => { this.signIn() }}>
                <Svg resource={require("../../../img/gmas.svg")} />
            </TouchableOpacity>
        );
    }
}
