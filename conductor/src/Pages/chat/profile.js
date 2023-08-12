import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SNavigation } from 'servisofts-component';
import { Chat } from 'servisofts-rn-chat';
import Model from '../../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.pk = SNavigation.getParam("pk");
    }

    render() {
        
        return <Chat key_chat={this.pk} key_usuario={Model.usuario.Action.getKey()} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);