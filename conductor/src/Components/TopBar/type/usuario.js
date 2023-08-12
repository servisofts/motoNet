import React, { Component } from 'react';
import { SIcon, SImage, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Model from '../../../Model';
import NavBar from '../../NavBar';
import SSocket from "servisofts-socket";
class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var usuario = Model.usuario.Action.getUsuarioLog();
        if (!usuario) return null;
        return (
            <SView col={"xs-12"} height={60} row center >
                <SView width={40} />
                <SView center flex>
                    {/* <SView row center col={"xs-12"}>
                        <SText bold color={STheme.color.secondary} fontSize={14}>{`${usuario["Nombres"]}`}</SText>
                        <SView width={4} />
                        <SView width={20} height={20} style={{
                            borderRadius: 100,
                            backgroundColor: STheme.color.secondary + "88"
                        }}>

                        </SView>
                    </SView> */}
                    <SView row center col={"xs-10 sm-9 md-7 lg-6 xl-5"} height={40}
                        style={{
                            borderWidth: 1,
                            borderColor: STheme.color.white,
                            borderRadius: 8,
                            overFlow: "hidden"
                        }}>
                        <SView row center col={"xs-3"} height
                            style={{
                                // borderWidth: 1,
                                // borderColor: STheme.color.white,
                                // borderRadius: 8
                                backgroundColor: STheme.color.white,
                                overFlow: "hidden",
                                borderBottomLeftRadius: 6,
                                borderTopLeftRadius: 6
                            }}
                        >
                            <SIcon name={"Conductor"} height={40} fill={STheme.color.primary} />
                        </SView>
                        <SView row center col={"xs-9"}>
                            <SText bold color={STheme.color.secondary} fontSize={14}>{`${usuario["Nombres"]}`}</SText>
                            {/* <SView width={4} />
                            <SView width={25} height={25} style={{
                                borderRadius: 8,
                                backgroundColor: STheme.color.secondary + "88",
                                overflow: "hidden"
                            }}>
                                <SImage src={Model.usuario._get_image_download_path(SSocket.api, usuario.key)} style={{
                                    resizeMode: "cover"
                                }} />
                            </SView> */}
                        </SView>
                    </SView>
                    {/* <SText color={STheme.color.secondary} fontSize={12}>{"¿ Cómo podemos ayudarte hoy ?"}</SText> */}
                </SView>
                <SView style={{
                    position: "absolute",
                    left: 8,
                    width: 40,
                    height: 40,
                    top: 18
                }} center onPress={() => {
                    NavBar.open();
                }}>
                    <SIcon name={"Menu2"} width={30} height={30} />
                </SView>
            </SView>
        );
    }
}

export default index;