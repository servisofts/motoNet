import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import Container from '../../Components/Container';
import Model from '../../Model';
import BtnSend from './components/BtnSend';
import Header from './components/Header';

class registrando extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.params = SNavigation.getAllParams();
    }

    componentDidMount() {
        Model.usuario.Action.registro({
            data: this.params
        }).then((resp) => {
            var usuario = resp.data;
            Model.usuarioRol.Action.registro({
                data: {
                    key_rol: "b8920e90-1cbd-4fac-b740-62fac4d22bbd",
                    key_usuario: usuario.key,
                },
                key_usuario: usuario.key,
            }).then(e => {
                Model.usuario.Action.loginByKey({
                    usuario: usuario.Correo,
                    password: usuario.Password
                }).then(resp => {
                    SNavigation.replace("/");
                })
            }).catch((e) => {
                SPopup.alert("Error al registrar el rol")
            })

        }).catch(e => {
            SPopup.alert("Error al registrar el usuario")
        })
    }
    render() {
        var defaultData = {
            ...this.params
        };
        return (
            <SPage title={'Registro de usuario'} preventBack>
                <Container>
                    <Header title={"Regitrando en la bd"} />
                    <SLoad />
                    {/* <SText col={"xs-12"}>{JSON.stringify(this.params)}</SText> */}
                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(registrando);