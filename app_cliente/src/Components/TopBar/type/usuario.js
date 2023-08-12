import React, { Component } from 'react';
import { SIcon, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../Model';
import NavBar from '../../NavBar';

class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var usuario = Model.usuario.Action.getUsuarioLog();
        if(!usuario) return null;
        return (
            <SView col={"xs-12"} height={100} row center>
                <SView center flex>
                    <SView row center col={"xs-12"}>
                        <SText bold color={STheme.color.secondary} fontSize={14}>{`Hola ${usuario["Nombres"]}`}</SText>
                        <SView width={4} />
                        <SView width={20} height={20} style={{
                            borderRadius: 100,
                            backgroundColor: STheme.color.secondary + "88"
                        }}>

                        </SView>
                    </SView>
                    <SText color={STheme.color.secondary} fontSize={12}>{"¿ Cómo podemos ayudarte hoy ?"}</SText>
                </SView>
                <SView style={{
                    position: "absolute",
                    left: 8,
                    width: 40,
                    height: 40
                }} center onPress={() => {
                    // SNavigation.navigate("/profile");
                    NavBar.open(); 
                }}>
                    <SIcon name={"Menu2"} width={30} height={30} />
                </SView>
            </SView>
        );
    }
}

export default index;