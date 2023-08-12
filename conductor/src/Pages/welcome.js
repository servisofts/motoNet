import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SIcon, SInput, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage title={'welcome'} hidden>
                <SView center col={"xs-12"}>
                    <SView center col={"xs-12 sm-10 md-8 xl-6"}>
                        <SHr height={40} />
                        <SHr height={50} />
                        <SView width={300} height={200} center>
                            <SIcon name={"logoCompleto"} fill={STheme.color.primary} />
                        </SView>
                        <SHr height={50} />
                        <SView col={"xs-11"} height={50} center border={STheme.color.primary} style={{
                            borderRadius: 8,
                        }} onPress={() => { SNavigation.navigate("/login") }}>
                            <SText fontSize={16} color={STheme.color.primary} bold >Iniciar sesión</SText>
                        </SView>
                        <SHr height={50} />
                        <SView col={"xs-11"} height={50} center border={STheme.color.primary} style={{
                            borderRadius: 8,
                            backgroundColor: STheme.color.primary,
                        }} onPress={() => { SNavigation.navigate("/registro") }}>
                            <SText color='#fff' bold fontSize={16}>Quiero ser repartidor</SText>
                        </SView>
                    </SView>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);