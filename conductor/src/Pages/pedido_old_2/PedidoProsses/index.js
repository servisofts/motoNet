import React, { Component } from 'react'
import { SLoad, SText, SThread, SView } from 'servisofts-component';
import Model from '../../../Model';
import Root from './root'

import SSocket from 'servisofts-socket';

export default class PedidoProsses extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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
        new SThread(10 * 1000, "hilo_pedido", true).start(() => {
            this.hilo();
        })
    }
    handleThread() {
        // SSocket.sendPromise({
        //     component: "pedido",
        //     type: "getActivos",
        //     estado: "cargando",
        //     key_usuario: Model.usuario.Action.getKey()
        // }).then(resp => {
        //     this.setState({ data: resp.data })
        // }).catch(e => {

        // })
        Model.pedido.Action.getActivos(true);
    }
    render() {
        this.data = Model.pedido.Action.getActivos() ?? {};
        // this.data = this?.state?.data ?? {}
        this.enviroments = Model.enviroment.Action.getAll();
        // if (!this.enviroments) return <SLoad />
        return <Root parent={this} />
    }
}