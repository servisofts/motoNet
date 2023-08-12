import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SLoad } from 'servisofts-component';
import { SButtom, SDate, SForm, SNavigation, SPage, SPopup, SText, STheme, SView, SIcon } from 'servisofts-component';

import PButtom from '../../Components/PButtom';

import Model from '../../Model';

class recuperar_codigo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
            }}
            inputs={{
                Codigo: { placeholder: "Ingrese el código recibido", type: "text", isRequired: true },
            }}
            onSubmit={(values) => {
                Model.usuario.Action.verificarCodigoPass({ codigo: values.Codigo }).then(resp => {
                    var usr_rec = resp.data;
                    SNavigation.navigate("/login/recuperar_pass", usr_rec);
                }).catch(e => {
                    SPopup.alert("Error de datos")
                    console.error(e);
                })
            }}
        />
    }

    render() {
        return (
            <SPage title={"Código de Recuperación"}>
                <SView center>
                    <SView col={"xs-11 md-6 xl-4"} center>
                        <SView height={40} />
                        <SText fontSize={24} color={STheme.color.primary} bold center>¡Mensaje Enviado!</SText>
                        <SView height={10} />
                        <SText fontSize={16} color="#000" center>Revise su bandeja de entrada e introduzca el código recibido. </SText>
                        <SView height={40} />
                        <SView backgroundColor={STheme.color.primary} width={150} height={150} style={{
                            borderRadius: 35,

                        }} center >
                            <SView height={5} ></SView>
                            <SIcon name={"Message"} width={110} height={110} />
                        </SView>
                        <SView height={26} />
                        {this.getForm()}
                        <SView height={16} />
                        <SView col={"xs-11"} row center>
                            <PButtom primary
                                onPress={() => {
                                    this.form.submit();
                                }}>VALIDAR</PButtom>
                        </SView>
                        <SView height={36} />
                    </SView>
                    {/* <RolDeUsuario data={this.usr} /> */}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(recuperar_codigo);