import React, { Component } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
//import ImageViewer from "react-native-image-zoom-viewer";
import ModalEditarPerfil from "../../Component/ModalEditarPerfil";
import ModalError from "../../Component/ModalError";
import ModalImage from "../../Component/ModalImage";
import ModalSuccess from "../../Component/ModalSuccess";
//import RecuperarPass from '../../component/RecuperarPass2'

class ModalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // rateModalVisible: false,
      // RecuperarPassModalVisible: false,
      // otherParamsToSend: 1,
    };
  }

  otherModal = () => {
    switch (this.props.ventana) {
      case "ModalImage":
        // this.btnRecuperarPass.bind(this)
        // alert("assa")
        return (
          <ModalImage
            fotoUriAux={this.props.fotoUriAux}
            callbackAfterCloseModal={this.props.callbackAfterCloseModal}
            otherParamsToSend={this.props.otherParamsToSend}
          />
        );
      case "ModalSuccess":
        return (
          <ModalSuccess
            closeModal={this.props.closeModal}
            replacePage={this.props.replacePage}
            mensaje={this.props.mensaje} 
          />
        );
      case "ModalError":
        return <ModalError closeModal={this.props.closeModal} mensaje={this.props.mensaje} />;

      case "ModalEditarPerfil":
        return <ModalEditarPerfil closeModal={this.props.closeModal} />;
    }
    return <View />;
  };

  render() {
    return (
      <Modal
        animationType="fade"
        hasBackdrop={false}
        transparent={true}
        visible={this.props.ModalVisible}
        onRequestClose={() => {
          this.props.closeModal();
          // this.setState({ RecuperarPassModalVisible: false });
          // alert("sdd")
          // console.log("modalll")
        }}
      >
        {/* <RecuperarPass
          callbackAfterRecuperarPass={this.props.callbackAfterRecuperarPass.bind(this)}
          otherParamsToSend={this.props.otherParamsToSend} />  */}
        {this.otherModal()}
      </Modal>
    );
  }
}

export default ModalPage;
