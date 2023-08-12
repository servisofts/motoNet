import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SDate, SForm, SIcon, SLoad, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import CryptoJS from 'crypto-js';
import PButtom from '../../Components/PButtom';

import Model from '../../Model';


class recuperar_pass extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.user_to_rec = SNavigation.getAllParams();
    }

    getForm() {

        return <SForm
            ref={(ref) => { this.form = ref; }}
            row
            style={{
                justifyContent: "space-between",
            }}
            inputProps={{
                col: "xs-12",
                separation: 16
            }}
            inputs={{
                Password: { placeholder: "Introduce tu nueva contraseña", isRequired: true, type: "password" },
                RepPassword: { placeholder: "Confirma tu nueva contraseña", type: "password", isRequired: true },
            }}
            onSubmit={(values) => {
                if ((values["Password"].length <= 8) && (values["RepPassword"].length <= 8) ) {
                    SPopup.open({ content: this.alertErrorPasswordLength() });
                    return null;
                }
                if (values["Password"] != values["RepPassword"]) {
                    SPopup.open({ content: this.alertErrorPassword() });
                    return null;
                }
                values["Password"] = CryptoJS.MD5(values["Password"]).toString();
                delete values["RepPassword"]
                
                Model.usuario.Action.cambiarPassByCodigo({ password: values.Password, usuario_recuperado: this.user_to_rec }).then(resp => {
                    console.log(resp);
                    SNavigation.reset("/login")
                    // var usr_rec = resp.data;
                    // SNavigation.navigate("/login/recuperar_pass", usr_rec);
                }).catch(e => {
                    console.error(e);
                })
                // Usuario.Actions.cambiarPassByCodigo(values, this.props);
            }}
        />
    }

    alertErrorPassword() {
        return <SView col={"xs-11 md-8 xl-6"} row center style={{ height: 250, borderRadius: 8, }} backgroundColor={STheme.color.background} >
            <SView col={"xs-11"} height={40} />
            <SView col={"xs-11"}  >
                <SIcon name={"InputPassword"} height={100} />
            </SView>
            <SView col={"xs-11"} height={15} />
            <SView col={"xs-12"} center  >
                <SText center color={STheme.color.darkGray} style={{ fontSize: 18, fontWeight: "bold" }}>Las contraseñas no coinciden</SText>
            </SView>
            <SView col={"xs-11"} height={30} />
        </SView>
    }

    alertErrorPasswordLength() {
        return <SView col={"xs-11 md-8 xl-6"} row center style={{ height: 250, borderRadius: 8, }} backgroundColor={STheme.color.background} >
            <SView col={"xs-11"} height={40} />
            <SView col={"xs-11"}  >
                <SIcon name={"InputPassword"} height={100} />
            </SView>
            <SView col={"xs-11"} height={15} />
            <SView col={"xs-12"} center  >
                <SText center color={STheme.color.darkGray} style={{ fontSize: 18, fontWeight: "bold" }}>Las contraseñas deben contener más de 8 caracteres.</SText>
            </SView>
            <SView col={"xs-11"} height={30} />
        </SView>
    }

    render() {
        return (
            <SPage title={"Registrar nueva contraseña"}>
                <SView center>
                    <SView col={"xs-11 md-6 xl-4"} center>
                        <SView height={40} />
                        <SText fontSize={24} color={STheme.color.primary} bold center>¡Restablece tu contraseña!</SText>
                        <SView height={30} />

                        {this.getForm()}
                        <SView height={30} />
                        <SView col={"xs-11"} row center>
                            <PButtom primary
                                onPress={() => {
                                    this.form.submit();
                                }} >RESTABLECER CONTRASEÑA</PButtom>
                        </SView>
                        <SView height={36} />
                    </SView>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(recuperar_pass);