import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SHr, SIcon, SInput, SNavigation, SPage, SPopup, SText, STheme, SView, SImage, SLoad, SThread } from 'servisofts-component';
import PButtom from '../Components/PButtom';
import TopBar from '../Components/TopBar';
import Model from '../Model';
import Validator from '../Validator';
import { SBLocation } from 'servisofts-background-location';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.isRun = true;
    }

    componentDidMount() {
        SBLocation.stop();
        this.isRun = true;
        this.hilo();
    }
    componentWillUnmount() {
        this.isRun = false;
    }
    hilo() {
        if (!this.isRun) return;
        this.setState({ ...this.state })
        // new SThread(20000, "hilo_del_usuario", true).start(() => {
        //     if (!this.isRun) return;
        //     Model.usuario.Action.syncUserLog()
        //     Validator.validate();

        //     this.hilo();

        //     // Model.pedido.Action.getDetalle(this.pk, true);
        // })
    }

    renderUsuarioDatos() {
        var datos = Model.dato.Action.getAllByKeyRol("b8920e90-1cbd-4fac-b740-62fac4d22bbd");
        var key_usuario = Model.usuario.Action.getKey();
        var usuario_dato = Model.usuario_dato.Action.getAllBy({ key_usuario_perfil: key_usuario })
        if (!datos || !usuario_dato) return <SLoad />;
        // console.log(datos, usuario_dato);
        let valid = true;
        let datos_pendientes = [];
        Object.values(datos).map(a => {
            let usr_dato = Object.values(usuario_dato).find(o => o.key_dato == a.key)
            if (!usr_dato?.descripcion) {
                valid = false;
                datos_pendientes.push(a.descripcion);
            }
        })
        if (!valid) return <SText center>Documentos pendientes de cargar: {datos_pendientes.toString().replace(/,/g, ", ")}.</SText>
        return <SText col={"xs-11"} center>Sus documentos se cargaron con éxito, espere la aprobación.</SText>

    }

    render() {

        if (this.state.loading) {
            console.log(this.state.loading)
        }
        if (!!Model.usuario.Action.getUsuarioLog()?.enable && (Model.usuario.Action.getUsuarioLog()?.enable != "false" && Model.usuario.Action.getUsuarioLog()?.enable != false)) {
            SNavigation.goBack();
            return <SLoad />
        }

        return (
            <SPage hidden preventBack onRefresh={(resolv) => {
                Model.usuario.Action.syncUserLog()
                Validator.validate();
                this.setState({ loading: !this.state.loading })
            }}
                header={<><TopBar type={"usuario"} /><SView backgroundColor={"#96BE00"} height={20} col={"xs-12"} ></SView></>}
                center
            // footer={<><PButtom >Modificar datos</PButtom><SHr/></>}
            >
                <SHr h={30} />
                <SView center col={"xs-12"}>

                    <SHr height={16} />
                    <SView width={260}>
                        <SText center bold fontSize={16} >{"Completa tu información, y espera la verificacion de tu usuario."}</SText>
                        <SHr h={16} />
                    </SView>
                    <SImage src={require("../Assets/img/registro.png")} style={{
                        height: 340
                    }} />
                    <SView width={280} card
                        center
                        style={{
                            borderRadius: 15,
                            borderWidth: 2,
                            borderColor: STheme.color.primary,
                            padding: 12
                        }}>
                        {this.renderUsuarioDatos()}

                    </SView>
                    <SHr height={35} />
                    <SView width={280}>
                        <PButtom onPress={() => {
                            SNavigation.navigate("/chat");
                        }}>Contactate con soporte</PButtom>
                    </SView>
                    <SHr height={35} />
                    <SView width={280}>
                        <PButtom onPress={() => {
                            // SNavigation.navigate("/profile/edit", { pk: Model.usuario.Action.getKey() })
                            SNavigation.navigate("/documento")
                        }}>Modificar datos</PButtom>
                    </SView>
                </SView>
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);