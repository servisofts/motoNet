import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import RecuperarPass from '../../component/RecuperarPass2'

class RecuperarPassPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rateModalVisible: false,
      RecuperarPassModalVisible: false,
      otherParamsToSend: 1,
    };
  }

  btnRecuperarPass() {
    this.setState({ RecuperarPassModalVisible: true });
  };

  callbackAfterRecuperarPass(success, otherValue) {
    this.setState({ RecuperarPassModalVisible: false });
    console.log("success >> " + success + " otherValue >> " + otherValue);
  }

  render() {
    var otherParamsToSend;
    var RecuperarPassModel = <Modal
      animationType="fade"
      hasBackdrop={false}
      transparent={true}      
      visible={this.state.RecuperarPassModalVisible}
      onRequestClose={() => {
        this.setState({ RecuperarPassModalVisible: false });
      }}>
      <RecuperarPass
        callbackAfterRecuperarPass={this.callbackAfterRecuperarPass.bind(this)}
        otherParamsToSend={this.state.otherParamsToSend} />

    </Modal>


    return (
      <View style={{ margin: 10, backgroundColor: '#fff0' }}>
        <TouchableOpacity onPress={this.btnRecuperarPass.bind(this)}>
          <Text style={{ fontSize: 14, backgroundColor: 'white', color: 'black' }}>
            Olvido su contraseña?
          </Text>
        </TouchableOpacity>
        {RecuperarPassModel}
      </View>

    );
  }
}

export default RecuperarPassPage;
