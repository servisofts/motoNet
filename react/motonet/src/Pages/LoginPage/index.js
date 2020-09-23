import React, { Component } from 'react'
import { connect } from 'react-redux';
import Login from '../../Components/Login'

class LoginPage extends Component {
    render() {
        return (
            <Login propsPadre={this.props} />
        )
    }
}

const initStates = (state) => {
    return { state }
};


export default connect(initStates)(LoginPage);
