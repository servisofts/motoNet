import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../Json/index.json'
const DisconectBarra = (props) => {
  if (props.state.socketClienteReducer.sessiones[AppParams.socket.name]) {
    if (props.state.socketClienteReducer.sessiones[AppParams.socket.name].isOpen) {
      return <View />
    }
  }
  return <View />
  return (
    <SafeAreaView style={{ backgroundColor: "#cb3234", fllex: 1 }}>
      <View style={{ width: "100%", height: 20, backgroundColor: "#cb3234", flexDirection: 'row', justifyContent: 'center', }}>
        <Text style={{ textAlign: "center", color: "#fff", fontWeight: 'bold', }}>Conexion perdida reconectando</Text>
        <View style={{ paddingLeft: 20, backgroundColor: "fff", }}>
          <ActivityIndicator size="small" color="rgb(69, 33, 97)" />
        </View>
      </View>
    </SafeAreaView>

  );

}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(DisconectBarra);

