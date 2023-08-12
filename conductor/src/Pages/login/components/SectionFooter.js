
import React, { Component } from 'react';
import { SHr, SIcon, SNavigation, SText, STheme, SView } from 'servisofts-component';
import PButtom from '../../../Components/PButtom';

export default class SectionFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"} center>

                <PButtom fontSize={20} onPress={this.props.onPress}>Login</PButtom>
                <SHr height={20} />
                <SText fontSize={14} color={STheme.color.lightBlack} style={{ textDecorationLine: 'underline' }} font={"LondonMM"} onPress={() => { SNavigation.navigate('/login/recuperar'); }}>¿Olvidaste tu correo o contraseña?</SText>
            </SView>
        );
    }
}
