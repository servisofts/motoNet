import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SList, SLoad, SPage, SPopup, SText, SThread, SView } from 'servisofts-component';
import Model from '../../Model';
import NavBar from '../../Components/NavBar';
import TopBar from '../../Components/TopBar';
import BarraTiempo from '../../Components/BarraTiempo';
import Container from '../../Components/Container';
class root extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.isRun = false;
    }

    componentDidMount() {
        this.isRun = true;
        this.hilo();
    }
    componentWillUnmount() {
        this.isRun = false;
    }
    hilo() {
        if (!this.isRun) return;
        console.log("Run thread")
        this.handleThread();
        new SThread(5 * 1000, "hilo_pedido", true).start(() => {
            this.hilo();
        })
    }
    handleThread() {
        Model.pedido.Action.getActivos(true);
    }

    render_pedidos() {
        if (!this.activos) return null;
        return <SList
            data={this.activos}
            render={a => {
                return <SView key={a.key} col={"xs-12"} card padding={4}>
                    <SView row>
                        <SText bold fontSize={10}>{a?.fecha}</SText>
                        <SView width={8} />
                        <SText bold fontSize={10}>{a?.horario?.hora_inicio} - {a?.horario?.hora_fin}</SText>
                    </SView>
                    <SHr />
                    <SView row col={"xs-12"}>
                        <SText fontSize={18}>{a?.restaurante?.nombre}</SText>
                        <SView flex />
                        <SText>#: {a.cantidad}</SText>
                    </SView>

                    <SHr h={4} />
                    <SText fontSize={10}>{a?.direccion?.direccion}</SText>
                    <SHr h={4} />
                    <BarraTiempo pk={a.key} sdate={new SDate(a?.fecha_edit)} millis={this.enviroments["tiempo_de_espera_confirmando_conductor"]?.value * 1000}
                        onEnd={() => {
                            // SPopup.alert("SE ACABO")
                            // this.handleThread();
                        }}
                    />
                    <SHr h={4} />
                    <SView row>
                        <SText fontSize={10}>{a?.key}</SText>
                        <SView flex />
                        <SText bold fontSize={12} >{a?.state}</SText>
                    </SView>
                    <SView col={"xs-12"} row>
                        <SView card padding={8} onPress={() => {
                            Model.pedido.Action.action("confirmar_conductor", a.key, {}).then(e => {
                                console.log(e);
                            }).catch(e => {
                                console.error(e);
                            })
                        }}><SText>CONFIRMAR</SText></SView>
                    </SView>
                </SView >
            }}
        />
    }
    render() {
        let cantidad_pedidos = 0;
        this.enviroments = Model.enviroment.Action.getAll();
        if (!this.enviroments) return <SLoad />
        let act = Model.pedido.Action.getActivos();
        if (act) {
            this.activos = Object.values(act).filter((a) => a.key_conductor == Model.usuario.Action.getKey())
            cantidad_pedidos = Object.keys(this.activos).length
        }

        return (<SView col={"xs-12"} height >
            <SPage onRefresh={() => {
                this.handleThread();
            }}>
                <SHr />
                <Container>
                    {/* <SText>CANTIDAD DE PEDIDOS : {cantidad_pedidos}</SText> */}
                    {this.render_pedidos()}
                </Container>
            </SPage>
        </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(root);