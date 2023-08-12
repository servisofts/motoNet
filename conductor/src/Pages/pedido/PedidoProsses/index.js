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
        this.run();
    }

    componentWillUnmount() {
        this.isRun = false;
    }

    run() {
        if (!this.isRun) return;
        SSocket.sendPromise({
            component: "pedido",
            type: "getActivos",
            estado: "cargando",
            key_usuario: Model.usuario.Action.getKey()
        }).then(e => {
            if (!this.isRun) return;
            this.state.data = e.data;
            this.setState({ ...this.state })
        }).catch(e => {
            if (!this.isRun) return;
            this.setState({ ...this.state })
        })
        new SThread(5000, "asda", true).start(() => {
            this.run();
        })
    }

    repaint() {
        this.componentDidMount()
        this.setState({ loading: true })
        SSocket.sendPromise({
            component: "pedido",
            type: "getActivos",
            estado: "cargando",
            key_usuario: Model.usuario.Action.getKey()
        }).then(e => {
            this.state.data = e.data;
            this.state.loading = false;
            this.setState({ ...this.state })
        }).catch(e => {
            this.state.loading = false;
            this.setState({ ...this.state })
        })
    }
    render() {
        if (!this.state.data) {
            this.state.data = Model.pedido.Action.getActivos();
        }
        this.data = this.state.data ?? {}
        // this.data = this?.state?.data ?? {}
        this.enviroments = Model.enviroment.Action.getAll();
        // if (!this.enviroments) return <SLoad />
        return <>
            <Root parent={this} />
            <SLoad type='window' hidden={!this.state.loading} />
        </>
    }
}