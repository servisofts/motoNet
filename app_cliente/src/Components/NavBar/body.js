import React from 'react';
import { SView, SImage, SNavigation, STheme, SIcon, SText, SScrollView2, SThread, SLoad, SScroll, SHr } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
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
    renderUserData() {
        var usuario = Model.usuario.Action.getUsuarioLog();
        if (!usuario) return <SView col={"xs-12"} center height onPress={() => {
            SNavigation.navigate("/login")
            NavBar.close();
        }}>
            <SText color={STheme.color.secondary} fontSize={18} center>{"Inicia sesión en DHM."}</SText>
            {/* <SText color={STheme.color.l} fontSize={12} center>{"Algunas funciones se encuentran desactivadas hasta que inicies session con un usuario."}</SText> */}
        </SView>;
        return <SView row col={"xs-12"}>
            <SView col={"xs-3"} center style={{ textAlign: "right" }} height>
                <SView style={{
                    width: 50,
                    height: 50, borderRadius: 30, overflow: "hidden", borderWidth: 1, borderColor: "#fff"
                }}>
                    <SView style={{
                        position: "absolute"
                    }}>
                        <SIcon name='InputUser' />
                    </SView>
                    <SView style={{
                        position: "absolute"
                    }}>
                        <SImage src={SSocket.api.root + "usuario/" + usuario?.key} style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover"
                        }} />
                    </SView>
                    <SImage src={SSocket.api.root + "usuario/" + usuario?.key + "?date=" + new Date().getTime()} style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover"
                    }} />
                </SView>
            </SView>
            <SView col={"xs-9"} onPress={() => {
                SNavigation.navigate('perfil');
                NavBar.close();
            }}>
                <SText
                    style={{ color: "#fff", fontSize: 20, }}>{usuario?.Nombres}</SText>
                {/* style={{ color: "#fff", fontSize: 20, }}>Editar</SText> */}
                <SView height={22} onPress={() => {
                    SNavigation.navigate('/profile')
                    NavBar.close();
                }} style={{
                    // paddingLeft: 6,
                    alignItems: 'center',
                }} row>
                    <SText fontSize={12} color={"#eee"} font='LondonTwo' style={{
                    }}>Ver perfil </SText>
                    <SIcon name="Ver" width={9} color="#fff" />
                </SView>
            </SView>
        </SView>
    }

    renderIcon({ label, path, icon, onPress, requireUser, noWithUser }) {
        if (requireUser) {
            if (!Model.usuario.Action.getKey()) {
                return null;
            }
        }
        if (noWithUser) {
            if (Model.usuario.Action.getKey()) {
                return null;
            }
        }
        return <SView col={"xs-11"} height={60} border={'transparent'} row onPress={() => {
            if (onPress) {
                onPress()
                return;
            }
            SNavigation.navigate(path); NavBar.close();
        }}  >
            <SView col={"xs-10"} height style={{ justifyContent: 'flex-start', }} row center>
                <SIcon fill="#666666" name={icon} width={20} height={20} />
                <SText style={{ paddingLeft: 5, color: "#666666", fontSize: 16 }} >{label}</SText>
            </SView>
            <SView col={"xs-2"} height style={{ justifyContent: 'flex-end', }} row center>
                <SIcon fill={STheme.color.secondary} name={"Icon1"} width={7} height={14} />
                <SView width={5}/>
            </SView>
        </SView>
    }

    render() {
        // if (!this.state.width) return null;
        // var usuario = this.props?.state?.usuarioReducer?.usuarioLog;
        // if (!usuario) {
            // SNavigation.reset('/');
            // return <SView />
        // }
        // if (!this.state.load) return <SLoad />
        return <>
            <SView col={"xs-12"} backgroundColor={STheme.color.primary} width="100%" height={105} center style={{ borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }} >
                {this.renderUserData()}
            </SView>
            <SHr height={20} />
            <SScrollView2 disableHorizontal contentContainerStyle={{ width: "100%" }} >
                <SView col={"xs-12"} center  >
                    {this.renderIcon({ label: "Inicio", icon: "Ihome", path: "/root" })}
                    {this.renderIcon({ label: "Transporte", icon: "Itransporte", path: "/buscar/transporte", requireUser: true })}
                    {this.renderIcon({ label: "Delivery", icon: "Idelivery", path: "/buscar/pedido", requireUser: true })}
                    {this.renderIcon({ label: "Mensajería", icon: "Imensajeria", path: "/buscar/mensajeria", requireUser: true })}
                    {this.renderIcon({ label: "Ayuda", icon: "Iayuda", path: "/ayuda" })}

                    {this.renderIcon({ label: "Configuración", icon: "Iconf", path: "/root", requireUser: true })}

                    {this.renderIcon({
                        label: "Salir", icon: "Isalir", requireUser: true,
                        onPress: () => {
                            // Model._events.CLEAR();
                            Model.usuario.Action.unlogin();
                            SNavigation.reset("/");
                            NavBar.close();
                        }
                    })}
                    {this.renderIcon({ label: "Login", icon: "Mexit", path: "/login", noWithUser: true })}


                    <SHr height={20} />

                    <SView col={"xs-9.5 md-5.8 xl-3.8"} center style={{ bottom: 0, }}>
                        <SIcon name={"Logo"} height={70} fill={STheme.color.text} />
                    </SView>
                    <SView row >
                        <SText style={{ paddingLeft: 5, paddingTop: 2, color: "#666666", fontSize: 18 }} font={"LondonMM"}>Version {APPversion}</SText>
                    </SView>
                </SView>
                <SHr height={50} />
            </SScrollView2>
            <SView height={20} col={"xs-12"} backgroundColor={STheme.color.primary} />
        </>
    }
}
