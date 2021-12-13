import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
//import ImgFondoCruces from '../../component/ImgFondoCruces';
import Svg from "../../Svg";
import BarraSuperior from "../../component/BarraSuperior";
import ModalPage from "../ModalPage";

class CodigoRecibidoPage extends Component {
  //para que no muestre el encabezado por defecto
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      mensaje: "",
      modal:"",
      codigo: {
        value: "",
        error: false,
      },
    };
  }

  handleChange = (event, id) => {
    this.state[id] = {
      value: event,
      error: false,
    };
    this.setState({ ...this.state });
  };

  render() {
    if (
      this.props.state.usuarioReducer.estadoEmail == "exito" &&
      this.props.state.usuarioReducer.type == "verificarCodigoPass"
    ) {
      //alert("Codigo confirmado...");
      this.props.state.usuarioReducer.estadoEmail = false;
      this.props.navigation.navigate("NuevoPassPage");
      this.state.codigo.value = "";
      //alerta//
      this.state.mensaje = "Código confirmado..."
      this.state.modalVisible = true;
      this.state.modal = "ModalSuccess";
      this.setState({ ...this.state });
    }

    if (
      this.props.state.usuarioReducer.estadoEmail == "error" &&
      this.props.state.usuarioReducer.type == "verificarCodigoPass"
    ) {
      //alert("Codigo incorrecto...");
      this.props.state.usuarioReducer.estadoEmail = false;
      // this.props.navigation.navigate("NuevoPassPage")
      this.state.codigo.value = "";
      //alerta//
      this.state.mensaje = "Código incorrecto..."
      this.state.modalVisible = true;
      this.state.modal = "ModalError";
      this.setState({ ...this.state });
    }

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <BarraSuperior
          title={"Verificación"}
          goBack={() => {
            this.props.navigation.goBack();
          }}
        />

        <ScrollView>
          <View
            style={{
              marginTop: 20,
              width: "100%",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Svg
              name="logoCompletoRecurso"
              style={{
                width: 100,
                height: 100,
                fill: "#fff",
              }}
            />
             <View
                        style={{
                            marginTop: 20,
                            width: '100%',
                            alignItems: 'center',
                            // flexDirection: 'column',
                        }}>
                        <Text style={styles.textoTitulo}>Verificar código</Text>
                    </View>
            <View
              style={{
                width: "90%",
                marginTop: 30,
                alignItems: "center",
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  width: "100%",
                  //marginTop: 30,
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <TextInput
                  style={
                    !this.state.codigo.error
                      ? styles.touch2
                      : styles.touch2Error
                  }
                  placeholder={"Ingrese el código recibido"}
                  onChangeText={(text) => this.handleChange(text, "codigo")}
                  value={this.state.codigo.value}
                  autoCapitalize="none"
                  // autoFocus={true}
                />

                <View
                  style={{
                    marginTop: 20,
                   // marginBottom: 20,
                    //width: "80%",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    // backgroundColor:"#ccc"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      // var datas = {}
                      var exito = true;

                      if (this.state.codigo.value.length <= 0) {
                        this.state.codigo.error = true;
                        exito = false;
                      }
                      // setObj({ ...obj })
                      this.setState({ ...this.state });
                      if (exito) {
                        // alert("dsd")
                        this.props.state.socketClienteReducer.sessiones[
                          "motonet"
                        ].send(
                          {
                            component: "usuario",
                            type: "verificarCodigoPass",
                            data: this.state.codigo.value,
                            estado: "cargando",
                          },
                          true
                        );
                      }
                    }}
                    style={styles.touch4}
                  >
                    <Text
                      style={{
                        color: "#fff",
                      }}
                    >
                      Validar
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
          </View>
        </ScrollView>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touch2: {
    backgroundColor: "#F7F7F7",
    width: "100%",
    height: 50,
    paddingLeft: 15,
    borderRadius: 10,
     shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: -2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 2,
    color:"#707070"
  },
  touch2Error: {
    backgroundColor: "#F7F7F7",
    width: "100%",
    height: 50,
    paddingLeft: 15,
    borderRadius: 10,
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: -2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 2,
    borderColor: "red",
    borderWidth: 1,
    color:"#707070"
  },
  textoTitulo: {
    color: "#fff",
    fontSize: 27,
    fontWeight:'bold'
},

  touch4: {
    backgroundColor: "#F7001D",
    width: "100%",
    height: 40,
    margin: 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 5,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: -2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 2,
  },
  texto: {
    color: "#000",
    fontSize: 15,
  },
});

const initStates = (state) => {
  return { state };
};

export default connect(initStates)(CodigoRecibidoPage);
