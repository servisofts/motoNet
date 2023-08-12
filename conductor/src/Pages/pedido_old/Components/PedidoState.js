import React, { Component } from 'react'
import { SText, SView } from 'servisofts-component';
import states from './states';
export default class PedidoState extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var data = this.props.data;
        if (!data) return <SText>No hay data</SText>
        const StateComponent = states[data.state];
        // const StateComponent = states["entregado"];
        if (StateComponent) {
            return <StateComponent data={data} />
        }
        return <SText>State not found: {data.state}</SText>

    }
}