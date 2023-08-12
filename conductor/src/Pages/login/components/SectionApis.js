
import React, { Component } from 'react';
import { SHr, SIcon, SNavigation, SText, STheme, SView } from 'servisofts-component';
import LoginApi from '../../../LoginApi';
import usuario from '../../../Services/Usuario/Components/usuario';

export default class SectionApis extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onLoginHanldler(user, type, NombreDato) {
        usuario.Actions.loginByKey(user).then(resp => {
            this.props.dispatch({
                component: "usuario",
                type: "login",
                estado: "exito",
                data: resp.data,
            })
        }).catch(e => {
            if (e?.error == "error_usuario") {

                SNavigation.navigate("/registro", {
                    type: type,
                    Nombres: user.name,
                    Apellidos: user.last_name,
                    Correo: user.email,
                    [NombreDato]: user.id,
                });
                return;
            }
            console.error(e);
        })
    }


    separador() {
        return <SView col={"xs-12"} height={40} row center  >
            <SView col={"xs-3"} height center>
                <SHr color={STheme.color.lightGray} height={1.5} ></SHr>
            </SView>
            <SView col={"xs-6"} height center>
                <SText fontSize={14} color={STheme.color.darkGray} font={"LondonMM"}> o Iniciar sesión con  </SText>
            </SView>
            <SView col={"xs-3"} height center>
                <SHr color={STheme.color.lightGray} height={1.5} ></SHr>
            </SView>
        </SView>

    }

    btnApi(icon) {
        return <SView flex center height={60} >
            <SView height={50} colSquare center style={{
                backgroundColor: 'white', borderRadius: 8, borderColor: STheme.color.lightGray, borderWidth: 2, padding: 8
            }}>
                <SIcon name={icon} />
            </SView>
        </SView>
    }
    render() {
        return (
            <SView col={"xs-12"} center>

                {this.separador()}
                <SHr height={25} />
                <SView col={"xs-12"} row>
                    <SView col={"xs-1"} />
                    <LoginApi type={"google"} onLogin={this.onLoginHanldler.bind(this)} >
                        {this.btnApi("IconGoogle")}
                    </LoginApi>
                    <LoginApi type={"facebook"} onLogin={this.onLoginHanldler.bind(this)} >
                        {this.btnApi("IconFaceb")}
                    </LoginApi>
                    <LoginApi type={"apple"} onLogin={this.onLoginHanldler.bind(this)} >
                        {this.btnApi("Apple")}
                    </LoginApi>
                    <SView col={"xs-1"} />
                </SView>
            </SView>
        );
    }
}
