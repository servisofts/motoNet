import React from 'react';
import { SView, SImage, SNavigation, STheme, SIcon, SText, SScrollView2, SThread, SLoad, SScroll } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import SBLocation from 'servisofts-background-location';
// import CerrarSession from '../../Pages/Usuario/Page/Perfil/CerrarSession';
import { version as APPversion } from "../../../package.json";
import NavBar from '.';


export default class body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            load: false
        };
    }


    componentDidMount() {
        // new SThread(10, "load-bar-data", true).start(() => {
        //     this.setState({ load: true })
        // })
    }

    item({ url, label, icon, onPress }) {
        console.log(icon + " 999")
        return <SView col={"xs-11"} height={60} border={'transparent'} row onPress={() => {
            if (onPress) {
                onPress();
            }
            if (url) {
                SNavigation.navigate(url);
            }
            NavBar.close();
        }}  >
            <SView col={"xs-10"} height style={{ justifyContent: 'flex-start', }} row center>
                <SIcon fill="#666666" name={icon} width={28} height={27} />
                <SText font={"Roboto"} style={{ paddingLeft: 5, color: "#666666", fontSize: 18 }} >{label}</SText>
            </SView>
            <SView col={"xs-2"} height style={{ justifyContent: 'flex-end', }} row center>
                <SIcon fill={STheme.color.secondary} name={"Icon1"} width={20} height={20} />
            </SView>
        </SView>

    }

    render() {
        // if (!this.state.width) return null;
        var usuario = this.props?.state?.usuarioReducer?.usuarioLog;
        if (!usuario) {
            // SNavigation.reset('/');
            return <SView />
        }
        // if (!this.state.load) return <SLoad />
        return <>
            <SView col={"xs-12"} backgroundColor={STheme.color.primary} width="100%" height={105} center
                style={{ borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }} row>
                <SView col={"xs-3"} center style={{ textAlign: "right" }} height>
                    <SView style={{
                        width: 50,
                        height: 50, borderRadius: 30, overflow: "hidden", borderWidth: 1, borderColor: "#fff"
                    }}>
                        <SImage src={SSocket.api.root + "usuario/" + usuario?.key} style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover",
                            position: "absolute"
                        }} />
                        <SImage src={SSocket.api.root + "usuario/" + usuario?.key + "?date=" + new Date().getTime()} style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover"
                        }} />
                    </SView>
                </SView>
                <SView col={"xs-9"} onPress={() => {
                    SNavigation.navigate('/profile');
                    NavBar.close();
                }}>
                    <SText font={"Roboto-Bold"}
                        style={{
                            color: "#fff",
                            fontSize: 20,
                        }}>{usuario?.Nombres}</SText>
                    <SView height={22} onPress={() => {
                        SNavigation.navigate('/profile')
                        NavBar.close();
                    }} style={{
                        paddingLeft: 6,
                        alignItems: 'center',
                    }} row>
                        <SText fontSize={12} color={"#eee"} font='LondonTwo' style={{
                            // textDecorationLine: 'underline',
                        }}>Ver perfil </SText>
                        <SIcon name="Ver" width={9} color="#fff" />
                    </SView>
                </SView>
            </SView>

            {/* <SScrollView2 disableHorizontal contentContainerStyle={{ width: "100%" }}> */}
            <SScroll>
                <SView height={20} border={'transparent'} />
                <SView col={"xs-12"} center  >
                    {this.item({ url: "/", label: "Inicio", icon: 'mInicio' })}
                    {this.item({ url: "/zona", label: "Zonas", icon: 'mZona' })}
                    {this.item({ url: "/ganancia", label: "Ganancias", icon: 'mGanancias' })}
                    {this.item({ label: "Notificaciones", url: "/notificaciones", icon: 'mNotification' })}
                    {/* {this.item({ url: "/soporte", label: "Soporte", icon: 'mRanking' })} */}
                    {this.item({ url: "/documento", label: "Documento Usuario", icon: 'DocUsr' })}
                    {this.item({ url: "/documento/moto", label: "Documento Moto", icon: 'DocDriver' })}
                    {this.item({ url: "/soporte", label: "Soporte", icon: 'mSoporte' })}
                    {this.item({ url: "/driver_cuenta", label: "Cuentas bancarias", icon: 'Icuenta' })}
                    {/* {this.item({ url: "/test", label: "Test", icon: 'Ajustes' })} */}
                    {this.item({
                        label: "Cerrar sesión", onPress: () => {
                            SBLocation.stop();
                            new SThread(100, "sadsad", true).start(() => {
                                Model.usuario.Action.unlogin();
                                Model.usuario.Action.CLEAR();
                                Model._events.CLEAR();
                                NavBar.close();
                                Validator.validate();
                                // SNavigation.reset("/");
                            })


                        },
                        icon: 'mSession',
                    })}
                    <SView col={"xs-9.5 md-5.8 xl-3.8"} center style={{ bottom: 0, }}>
                        <SIcon name={"Logo"} height={70} />
                    </SView>
                    <SView row >
                        {/* <SText style={{ paddingLeft: 5, paddingTop: 2, color: "#666666", fontSize: 18 }} font={"LondonMM"}>Version 1.4.0</SText> */}
                        <SText style={{ paddingLeft: 5, paddingTop: 2, color: "#666666", fontSize: 18 }} font={"LondonMM"}>Version {APPversion}</SText>

                    </SView>

                    <SView height={20} border={'transparent'} />

                </SView>
            </SScroll>
            {/* </SScrollView2> */}
        </>
    }
}
