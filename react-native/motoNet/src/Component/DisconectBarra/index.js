import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import Logo from '../../img/logo-pasanaku.png';
import Img from '../../elementsM/Img';
import { connect } from 'react-redux';

const DisconectBarra = (props) => {
  if (props.state.socketReducer.estado === "conectado"   ) {
    return <View />
  }
  if ((props.state.socketReducer.reintent || 0) < 1   ) {
    return <View />
  }

  return (
    <SafeAreaView style={{backgroundColor: "#cb3234" , fllex:1}}>
    <View style={{ width: "100%", height: 20, backgroundColor: "#cb3234", flexDirection: 'row', justifyContent: 'center', }}>


  <Text style={{ textAlign: "center", color: "#fff", fontWeight: 'bold', }}>Conexion perdida reconectando</Text>
      <View style={{ paddingLeft: 20,backgroundColor: "fff", }}>
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

