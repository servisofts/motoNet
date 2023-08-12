import React, { Component } from 'react';
import { SPage, SText, SThread, SView } from 'servisofts-component';
import Model from '../../../Model';
import SBLocation from 'servisofts-background-location';
import { connect } from 'react-redux';
import InfoBar from './InfoBar';
import SinPedidos from './SinPedidos';
import PedidoItem from './PedidoItem';
class StateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
        this.handleThread();
        new SThread(5 * 1000, "hilo_pedido", true).start(() => {
            this.hilo();
        })
    }
    handleThread() {
        Model.pedido.Action.getActivos(true);
    }

    procesarData() {
        this.pedidos = Model.pedido.Action.getActivos() ?? {};
        this.pedidos_arr = Object.values(this.pedidos);
        this.cantidad = this.pedidos_arr.length
        this.confirmando_conductor = this.pedidos_arr.filter(a => a.state == "confirmando_conductor");
    }
    render() {
        this.procesarData();
        if (!this.cantidad) {
            return <SinPedidos />
        }
        return (
            <SView col={"xs-12"} height>
                <InfoBar parent={this} />
                <PedidoItem />
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(StateItem);