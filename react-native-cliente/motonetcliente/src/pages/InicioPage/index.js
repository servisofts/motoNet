import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import ButtonComponent from '../../component/ButtonComponent';
import ImgComponent from '../../component/ImgComponent';
import { connect } from 'react-redux'
import ImgFondoCruces from '../../component/ImgFondoCruces';

class InicioPage extends Component {
  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super();
    this.state = {
    };
  }

  render() {

    return (
      <View style={{
        flex: 1,
        backgroundColor: "#fff"
      }}>

        <ImgFondoCruces />

        <ButtonComponent name={"btnRojo"} onPress={() => {
          this.props.navigation.navigate("ConfirmarPage");
        }} relleno={() => {
          return (
            <Text style={estilos.sos}>
              SOS
            </Text>)
        }} />

        <ButtonComponent name={"btnAzul"} onPress={() => {
          this.props.navigation.navigate("ServicioPage");
        }} relleno={() => {
          return (
            <Text style={estilos.servicios}>
              SERVICIOS
            </Text>)
        }} />

        <TouchableOpacity style={{
          width: 200,
          height: 30,
          backgroundColor: "#ccc",
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center"
        }}
          onPress={() => {
            AsyncStorage.removeItem("clinica_usuarioLog")
            this.props.state.usuarioReducer.usuarioLog = false;
            this.props.state.usuarioReducer.login = "";
            this.props.navigation.replace("cargaPage");
          }}>

          <Text>
            salir
          </Text>

        </TouchableOpacity>

        <ImgComponent />
      </View>
    );
  }
}

const estilos = StyleSheet.create({
  sos: {
    color: "#fff",
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center"
  },
  servicios: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center"
  }
});

const initStates = (state) => {
  return { state }
};

export default connect(initStates)(InicioPage);

