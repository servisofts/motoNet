import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import RecuperarPass from "../../Component/RecuperarPass";
import ModalPage from "../ModalPage";

class RecuperarPassPage extends Component {
    static navigationOptions = {
        headerShown: false,
    };
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            mensaje: "",
            modal: "",

        };
    }

    render() {
        if (
            this.props.state.usuarioReducer.estadoEmail == "exito" &&
            this.props.state.usuarioReducer.type == "recuperarPass"
        ) {
            //alert("Le hemos enviado un código a su correo electrónico");
            this.props.state.usuarioReducer.estadoEmail = false;
            //alerta//
            this.state.mensaje = "Código enviado..."
            this.state.modalVisible = true;
            this.state.modal = "ModalSuccess";
            // this.props.navigation.navigate("CodigoRecibidoPage")
            // this.state..value = ""
            // this.setState({ ...this.state })
        } 
        if( this.props.state.usuarioReducer.estadoEmail == "error" ){
            this.props.state.usuarioReducer.estadoEmail = false;
            this.state.mensaje = "Error de datos..."
            this.state.modalVisible = true;
            this.state.modal = "ModalError";
        }
        if( this.props.state.usuarioReducer.error== "error_datos" ){
            this.props.state.usuarioReducer.error = false;
            this.state.mensaje = "Error de datos..."
            this.state.modalVisible = true;
            this.state.modal = "ModalError";
        }
        return (
            <>
                <RecuperarPass navigation={this.props.navigation} />
                <ModalPage
                    ventana={this.state.modal}
                    //mensaje="La contraseñas escritas no coinciden. Inténtelo de nuevo. "
                    mensaje={this.state.mensaje}
                    ModalVisible={this.state.modalVisible}
                    closeModal={() => {
                        this.state.modalVisible = false;
                        this.setState({ ...this.state });
                    }}
                />
            </>
        );
    }
}

const initStates = (state) => {
    return { state };
};

export default connect(initStates)(RecuperarPassPage);
