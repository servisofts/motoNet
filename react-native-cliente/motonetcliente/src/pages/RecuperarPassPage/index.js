import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native';
import RecuperarPass from '../../component/RecuperarPass';

class RecuperarPassPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.state.usuarioReducer.estadoEmail == "exito" && this.props.state.usuarioReducer.type == "recuperarPass") {
            alert("Le hemos enviado un código a su correo electrónico")
            this.props.state.usuarioReducer.estadoEmail = false
            // this.props.navigation.navigate("CodigoRecibidoPage")
            // this.state..value = ""
            // this.setState({ ...this.state })
        }

        return (
            <>
                <RecuperarPass navigation={this.props.navigation} />
            </>
        )
    }
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(RecuperarPassPage);
