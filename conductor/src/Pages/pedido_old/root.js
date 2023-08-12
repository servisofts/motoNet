import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SLoad, SNavigation, SPage, SText, SThread, SView } from 'servisofts-component';
import Model from '../../Model';
import PedidoState from './Components/PedidoState';
import SBLocation from 'servisofts-background-location';

class root extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.isRun = false;
    }

    componentDidMount() {
        this.isRun = true;
        if (!SBLocation.isStarted()) {
            SBLocation.start();
        }
        this.hilo();
    }
    componentWillUnmount() {
        this.isRun = false;
    }
    hilo() {
        if (!this.isRun) return;
        if (this.key_pedido) {
            // this.state.data = Model.pedido.Action.getDetalle(this.key_pedido);
            Model.pedido.Action.getDetalle(this.key_pedido, true);
            this.setState({ ...this.state })
        }
        new SThread(10 * 1000, "hilo_pedido", true).start(() => {
            this.hilo();
        })
    }

    //  this.data = Model.pedido.Action.getDetalle(this.key_pedido, true);
    render() {
        this.activo = Model.pedido.Action.getActivo();
        // console.log(this.activo);

        if (this.activo) {
            if (this.activo.key) {
                this.key_pedido = this.activo?.key;
                if (this.key_pedido) {
                    let data = Model.pedido.Action.getDetalle(this.key_pedido, false);
                    // console.log("RENDER DATA", data.state, data?.key_conductor);
                    if (data?.state) {
                        if (data?.state != this.state?.data?.state) {
                            this.state.data = data;
                            // console.log("CAMBIO EL ESTADOOOOOO")
                        }
                        if (data?.key_conductor != this.state?.data?.key_conductor) {
                            this.state.data = data;
                            // console.log("CAMBIO LA KEYYYY")
                        }
                    }

                }
            } else {
                // Model.pedido.Action.CLEAR();
                SNavigation.reset("/");
                return <SLoad />
            }
        }
        if (!this.state.data) return <SLoad />
        return (<SView col={"xs-12"} height >
            <PedidoState data={this.state.data} />
        </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(root);