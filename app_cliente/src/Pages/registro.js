import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SIcon, SInput, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import BottomBox from '../Components/BottomBox';
import Buttom from '../Components/Buttom';
import Model from '../Model';

class registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
                <SPage>
                    <SView col={"xs-12"} flex backgroundColor={STheme.color.primary}>
                        <SView col={"xs-12"} center>
                            <SHr height={10} />
                            <SView width={200} height={100} center>
                                <SIcon name={"logoCompleto"} fill={STheme.color.secondary} />
                            </SView>
                            <SHr height={20} />
                            <SForm
                                col={"xs-11 sm-10 md-8 lg-6 xl-4"}
                                ref={ref => this.form = ref}
                                inputProps={{
                                    customStyle: "motonet"
                                }}
                                inputs={{
                                    CI: {
                                        label: "CI",
                                        placeholder: "Ingrese su ci",
                                        required: true,
                                        onKeyPress: (evt) => {
                                            if (evt.key === 'Enter') {
                                                this.form.focus('Nombres');
                                            }
                                        },
                                    },
                                    Nombres: {
                                        label: "Nombres",
                                        placeholder: "Ingrese su nombre",
                                        required: true,
                                        onKeyPress: (evt) => {
                                            if (evt.key === 'Enter') {
                                                this.form.focus('Apellidos');
                                            }
                                        },
                                    },
                                    Apellidos: {
                                        label: "Apellidos",
                                        placeholder: "Ingrese su apellido",
                                        required: true,
                                        onKeyPress: (evt) => {
                                            if (evt.key === 'Enter') {
                                                this.form.focus('Correo');
                                            }
                                        },
                                    },
                                    Correo: {
                                        label: "Correo",
                                        placeholder: "Ingresar correo",
                                        type: 'email',
                                        required: true,
                                        // autoFocus: true,
                                        keyboardType: 'email-address',
                                        onKeyPress: (evt) => {
                                            if (evt.key === 'Enter') {
                                                this.form.focus('Telefono');
                                            }
                                        },
                                    },
                                    Telefono: {
                                        label: "Telefono",
                                        placeholder: "Ingresar telefono",
                                        type: 'phone',
                                        required: true,
                                        // autoFocus: true,
                                        onKeyPress: (evt) => {
                                            if (evt.key === 'Enter') {
                                                this.form.focus('Password');
                                            }
                                        },
                                    },
                                    Password: {
                                        label: "Contraseña",
                                        placeholder: "Ingresar contraseña",
                                        type: "password",
                                        required: true,
                                        onKeyPress: (evt) => {
                                            if (evt.key === 'Enter') {
                                                this.form.focus('rep_password');
                                            }
                                        },
                                    },
                                    rep_password: {
                                        label: "Rep. Contraseña",
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
                                    Model.usuario.Action.registro({ data: data }).then((resp) => {
                                        Model.usuario.Action.login({ usuario: data["Correo"], password: data["Password"] });
                                        SNavigation.reset("/");
                                    }).catch((e) => {
                                        console.warn(e);
                                    })
                                }}
                            />

                        </SView>
                        <SHr height={200} />
                    </SView>
                </SPage>
                <BottomBox>
                    <SView col={"xs-12"} center>
                        <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} center>
                            <SHr height={30} />
                            <Buttom onPress={() => { this.form.submit() }}>Registrarse</Buttom>
                            <SHr height={40} />
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
export default connect(initStates)(registro);