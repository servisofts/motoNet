import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import ModalError from '../../component/ModalError';
import ModalImage from '../../component/ModalImage';
import ModalSuccess from '../../component/ModalSuccess';
import RecuperarPass from '../../component/RecuperarPass2'

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
          < ModalImage
            fotoUriAux={this.props.fotoUriAux}
            callbackAfterCloseModal={this.props.callbackAfterCloseModal}
            otherParamsToSend={this.props.otherParamsToSend} />
        )
      case "ModalSuccess":
        return (
          <ModalSuccess
            closeModal={this.props.closeModal}
            replacePage={this.props.replacePage}
          />
        )
      case "ModalError":
        return (
          <ModalError
            closeModal={this.props.closeModal}
          />
        )
    }
    return <View />
  }

  render() {
    // var otherParamsToSend;
    // var RecuperarPassModel = 


    return (
      // <View style={{ margin: 10, backgroundColor: '#fff0' }}>
      //   <TouchableOpacity onPress={this.btnRecuperarPass.bind(this)}>
      //     <Text style={{ fontSize: 14, backgroundColor: 'white', color: 'black' }}>
      //       Olvido su contraseña?
      //     </Text>
      //   </TouchableOpacity>
      //   {RecuperarPassModel}
      // </View>
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
