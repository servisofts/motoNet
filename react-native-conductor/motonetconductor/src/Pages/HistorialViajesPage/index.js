import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../Json';
class HistorialViajesPage extends Component {
  static navigationOptions = {
    title: "Emergencias"
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    if (!this.props.state.ViajeReducer.historial) {
      if (!this.props.state.ViajeReducer.estado == "cargando") {
        return <View />
      }

      this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
        component: "emergencia",
        type: "getAllConductor",
        estado: "cargando",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key
      });
      return <View />
    }
    const getListaMovimientos = (emergencia) => {
      return Object.keys(emergencia.movimientos).map((key) => {
        var obj = emergencia.movimientos[key];
        if (this.props.state.usuarioReducer.usuarioLog.key != obj.key_referencia) {
          return <View />
        }
        var tipo = "";
        switch (obj.tipo) {
          case "notifico_conductor":
            tipo = "Emergencia entrante.";
            break;
          case "acepto_conductor":
            tipo = "Emergencia aceptada.";
            break;
          case "cancelo_busqueda_conductor":
            tipo = "Cancelaste emegencia.";
            break;
          case "termino_viaje_conductor":
            tipo = "Terminaste la emergencia.";
            break;
        }
        return (
          <Text>{tipo}</Text>
        )
      })
    }

    const getListaEmergencia = () => {
      return this.props.state.ViajeReducer.historial.map((obj, key) => {
        return (<View style={{
          minHeight: 100,
          padding: 4,
          width: "95%",
          margin: 4,
          borderRadius: 10,
          backgroundColor: "#fff"
        }}>
          <Text style={{ fontSize: 15, width: "100%", backgroundColor: "#2c4b81", borderRadius: 10, color: "#fff", textAlign: "center" }}>Emergencia:</Text>
          <View style={{
            flexDirection: "row",
            alignContent: "space-between"
          }}>
            <Text style={{ flex: 1, }}>Fecha: {new Date(obj.fecha_on).toLocaleDateString()} {new Date(obj.fecha_on).toLocaleTimeString()}</Text>
            <Text style={{ flex: 1, textAlign: "center" }}> {obj.estado == 1 ? "En Curso" : "Concluida"}</Text>
          </View>
          <Text style={{ fontSize: 14, backgroundColor: "#2c4b81", borderRadius: 10, color: "#fff", width: 100, textAlign: "center", marginTop: 4, }}>movimientos:</Text>
          <View style={{
            paddingLeft: 8,
          }}>
            {getListaMovimientos(obj)}
          </View>
        </View>)
      })
    }
    return (
      <View>
        <ScrollView
          style={{
            width: "100%",
            height: "100%",
            backgroundColor:""
          }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {getListaEmergencia()}
        </ScrollView>
      </View>
    );
  }
}
const initStates = (state) => {
  return { state }
};

export default connect(initStates)(HistorialViajesPage);
