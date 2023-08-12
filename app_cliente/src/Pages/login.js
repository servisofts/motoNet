import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SIcon, SInput, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import BottomBox from '../Components/BottomBox';
import Buttom from '../Components/Buttom';
import Model from '../Model';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
                <SPage title={'Login'} >
                    <SView col={"xs-12"} flex backgroundColor={STheme.color.primary}>
                        <SView col={"xs-12"} center>
                            <SHr height={50} />
                            <SView width={300} height={200} center>
                                <SIcon name={"logoCompleto"} fill={STheme.color.secondary} />
                            </SView>
                            <SHr height={50} />
                            <SForm
                                col={"xs-11 sm-10 md-8 lg-6 xl-4"}
                                ref={ref => this.form = ref}
                                inputProps={{
                                    customStyle: "motonet"
                                }}
                                inputs={{
                                    usuario: {
                                        label: "Usuario",
                                        placeholder: "Ingresar usuario",
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
                                        label: "Contraseña",
                                        placeholder: "Ingresar contraseña",
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
                        <SHr height={230} />
                    </SView>
                </SPage>
                <BottomBox>
                    <SView col={"xs-12"} center>
                        <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} center>
                            <SHr height={30} />
                            <Buttom onPress={() => { this.form.submit() }}>Iniciar sesión</Buttom>
                            <SHr height={40} />
                            <SView row onPress={() => {
                                SNavigation.navigate("/registro")
                            }}>
                                <SText center>¿Aún no tienes una cuenta? </SText><SText color={STheme.color.primary} bold >Regístrate</SText>
                            </SView>
                            <SHr height={50} />
                        </SView>
                    </SView>
                </BottomBox>
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Login);