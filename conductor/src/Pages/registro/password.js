import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SIcon, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import Container from '../../Components/Container';
import Header from './components/Header';
import CryptoJS from 'crypto-js';
import BtnSend from './components/BtnSend';

class password extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.params = SNavigation.getAllParams();
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
    onSubmit(values) {
        if ((values["Password"].length <= 8) && (values["RepPassword"].length <= 8) ) {
            SPopup.open({ content: this.alertErrorPasswordLength() });
            return null;
        }
        if (values["Password"] != values["RepPassword"]) {
            SPopup.open({ content: this.alertErrorPassword() });
            return null;
        }

        var password = CryptoJS.MD5(values["Password"]).toString();
        // delete values["RepPassword"];
        SNavigation.navigate("/registro/telefono", {
            ...this.params,
            Password: password,
        })
    }

    render() {
        return (
            <SPage title={'Registro de usuario'}>
                <Container>
                    <Header title={"Completa las contraseñas de acceso.\nRecuerda debe contener más de 8 caracteres"} />
                    <SForm
                        col={"xs-12"}
                        ref={(form) => { this.form = form; }}
                        inputProps={{ separation: 16 }}
                        inputs={{
                            Password: { placeholder: "Password", isRequired: true, type: "password"  },
                            RepPassword: { placeholder: "Repetir password", type: "password", isRequired: true },
                        }}
                        onSubmit={this.onSubmit.bind(this)}
                    />
                    <SHr height={20} />
                    <BtnSend onPress={() => this.form.submit()}>{"CONTINUAR"}</BtnSend>
                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(password);