import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import BarraSuperior from '../../Component/BarraSuperior';
import AppParams from '../../Json';
import { SDate, SOrdenador } from '../../SComponent'
class HistorialViajesPage extends Component {
  static navigationOptions = {
    headerShown: false,
    title: "Emergencias"
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    this.props.state.historialViajeReducer.data = null;
    this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
      component: "historialViaje",
      type: "getAllConductor",
      estado: "cargando",
      key_usuario: this.props.state.usuarioReducer.usuarioLog.key
    });
  }

  render() {
    var reducer = this.props.state.historialViajeReducer;
    var data = reducer.data;
    if (!data) {
      if (!reducer.estado == "cargando") {
        return <View />
      }
      this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
        component: "historialViaje",
        type: "getAllConductor",
        estado: "cargando",
        key_usuario: this.props.state.usuarioReducer.usuarioLog.key
      });
      return <View />
    }
    // const getListaMovimientos = (emergencia) => {
    //   return Object.keys(emergencia.movimientos).map((key) => {
    //     var obj = emergencia.movimientos[key];
    //     if (this.props.state.usuarioReducer.usuarioLog.key != obj.key_referencia) {
    //       return <View />
    //     }
    //     var tipo = "";
    //     switch (obj.tipo) {
    //       case "notifico_conductor":
    //         tipo = "Emergencia entrante.";
    //         break;
    //       case "acepto_conductor":
    //         tipo = "Emergencia aceptada.";
    //         break;
    //       case "cancelo_busqueda_conductor":
    //         tipo = "Cancelaste emegencia.";
    //         break;
    //       case "termino_viaje_conductor":
    //         tipo = "Terminaste la emergencia.";
    //         break;
    //     }
    //     return (
    //       <Text>{tipo}</Text>
    //     )
    //   })
    // }

    const getListaEmergencia = () => {
      return new SOrdenador([
        { key: "fecha_on", order: "desc", peso: 1, }
      ]).ordernarObject(data).map((key) => {
        var obj = data[key];
        var direccion = obj.direccion_inicio.direccion;
        if (obj.direccion_fin) {
          direccion = obj.direccion_fin.direccion;
        }
          return (<View style={{
            minHeight: 200,
            padding: 4,
            width: "95%",
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: "#fff",
            borderBottomWidth: 2,
            borderBottomColor: "#ccc"
          }}>
            {/* <Text style={{}}>{`Cliente: ${obj.key_usuario}`}</Text> */}
            {/* <Text style={{}}>{`Conductor: ${obj.key_conductor}`}</Text> */}
            <View style={{
              flex: 1,
              width: "100%",
              backgroundColor: "#ddd",
            }}>

            </View>
            <View style={{
              height: 80,
              paddingStart: 16,
              paddingEnd: 16,
              justifyContent: "center",
            }}>
              <View style={{
                width: "100%",
                justifyContent: "center",
              }}>
                <Text style={{ fontSize: 10, color: "#999" }}>Direccion</Text>
                <Text style={{}}>{`${direccion}`}</Text>
              </View>
              <View style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <View style={{
                  flex: 1,
                  justifyContent: "center",
                }}>
                  <Text style={{ fontSize: 10, color: "#999" }}>Fecha</Text>
                  <Text style={{}}>{`${new SDate(obj.fecha_on).toString("dd MON, yyyy")}`}</Text>
                </View>
                <View style={{
                  flex: 1,
                  justifyContent: "center",
                }}>
                  <Text style={{ fontSize: 10, color: "#999" }}>Costo</Text>
                  <Text style={{}}>{`Bs. ${obj.costo}`}</Text>
                </View>

              </View>

            </View>

            {/* <Text style={{}}>{`${JSON.stringify(obj.movimientos["inicio_viaje"])}`}</Text> */}

          </View>)
        })
    }
    return (
      <View style={{
        flex: 1,
        width: "100%",
      }}>
        <BarraSuperior title={"Historial de viajes"} goBack={() => {
          this.props.navigation.goBack();
        }} />
        <View style={{
          flex: 1,
          width: "100%",
        }}>
          <ScrollView
            style={{
              width: "100%",
              height: "100%",
            }}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {getListaEmergencia()}
            <View style={{
              height: 200,
              width: "100%",
            }}></View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const initStates = (state) => {
  return { state }
};

export default connect(initStates)(HistorialViajesPage);
