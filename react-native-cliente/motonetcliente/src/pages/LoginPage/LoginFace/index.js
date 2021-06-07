import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
    LoginManager,
    AccessToken, GraphRequest,
    GraphRequestManager
} from "react-native-fbsdk";
import Svg from '../../../Svg';

export default class LoginFace extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
        return (
            <TouchableOpacity style={{
                width: 50,
            }} onPress={()=>{this._fbAuth()}}>
                <Svg resource={require("../../../img/face.svg")} />
            </TouchableOpacity>
        );
    }
}
