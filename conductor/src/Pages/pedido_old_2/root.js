import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SList, SLoad, SPage, SPopup, SText, SThread, SView } from 'servisofts-component';
import StateItem from './Components/StateItem';
import PedidoProsses from './PedidoProsses';
class root extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        
        return <PedidoProsses />
        // return <StateItem />
    }
}
// export default root;
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(root);