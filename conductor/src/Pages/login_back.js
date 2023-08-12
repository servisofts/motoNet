import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SIcon, SInput, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import BottomBox from '../Components/BottomBox';
import Buttom from '../Components/Buttom';
import Model from '../Model';
import CryptoJS from 'crypto-js';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage >
                <SView col={"xs-12"} backgroundColor={STheme.color.secondary} center>
                    <SView col={"xs-12"} center>
                        <SHr height={50} />
                        <SView width={300} height={200} center>
                            <SIcon name={"logoCompleto"} fill={STheme.color.primary} />
                        </SView>
                        <SHr height={20} />
                        <SView width={300} height={50} center>
                            <SText center fontSize={18} color={STheme.color.gray}>Iniciar sesión</SText>
                        </SView>
                        <SHr height={20} />
                        <SForm
                            col={"xs-11 sm-10 md-8 lg-6 xl-4"}
                            ref={ref => this.form = ref}
                            inputProps={{
                                separation: 16,
                            }}
                            inputs={{
                                usuario: {
                                    // label: "Usuario",
                                    placeholder: "Correo",
                                    type: 'email',
                                    required: true,
                                    // autoFocus: true,
                                    keyboardType: 'email-address',
                                    onKeyPress: (evt) => {
                                        if (evt.key === 'Enter') {
                                            this.form.focus('password');
                                        }
                                    },
                                },
                                password: {
                                    // label: "Contraseña",
                                    placeholder: "Contraseña",
                                    type: "password",
                                    required: true,
                                    onKeyPress: (evt) => {
                                        if (evt.key === 'Enter') {
                                            this.form.submit();
                                        }
                                    },
                                }
                            }}

                            onSubmitProps={{
                                type: "outline"
                            }}
                            onSubmit={(data) => {
                                data["password"] = CryptoJS.MD5(data["password"]).toString();
                                Model.usuario.Action.login(data).then((resp) => {
                                    SNavigation.replace("/");
                                }).catch(e => {
                                    SPopup.alert("usuario no encontrado")
                                })
                            }}
                        />
                        <SView row>
                            <SText color={"#fff"}>¿Olvidó su contraseña? </SText>
                            <SText color={STheme.color.secondary} bold>Restablecer</SText>
                        </SView>
                    </SView>
                    <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center>
                        <SHr height={30} />
                        <Buttom onPress={() => { this.form.submit() }}>Iniciar sesión</Buttom>
                        <SHr height={30} />
                    </SView>
                </SView>

            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Login);