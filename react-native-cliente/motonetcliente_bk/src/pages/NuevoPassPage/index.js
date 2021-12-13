import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import Svg from "../../Svg";
// import Theme from '../../Styles/Theme.json'
import AppParam from "../../Json/index.json";
//import ImgFondoCruces from '../../component/ImgFondoCruces';
import BarraSuperior from "../../component/BarraSuperior";
import STextInput from '../../component/STextImput';
import ModalPage from "../ModalPage";
//import { SPopupOpen } from '../../SPopup'; 

class NuevoPassPage extends Component {
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
      pass: {
        value: "",
        error: false,
      },
      confirmarPass: {
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
    return <View />;
  };

  Registrar = () => {
    var exito = true;
    var campos1 = false;
    var campos2 = false;

    if (this.state.pass.value.length <= 0) {
      this.state.pass.error = true;
      exito = false;
      campos1 = true;
    }

    if (this.state.confirmarPass.value.length <= 0) {
      this.state.confirmarPass.error = true;
      exito = false;
      campos2 = true;
    }

    // if (campos1 == false && campos2 == false) {
    //     this.state.confirmarPass.error = true;
    //     alert("La contraseña no coinciden")
    //     exito = false;
    // }

      if (this.state.pass.value != this.state.confirmarPass.value) {
         this.state.confirmarPass.error = true;
         //alert("La contraseña no coinciden")
         this.state.modalVisible = true;
         this.state.mensaje = "La contraseñas escritas no coinciden. Inténtelo de nuevo."
         this.state.modal = "ModalError"
        exito = false;
     }

    this.setState({ ...this.state });

    if (exito) {
      this.props.state.socketClienteReducer.sessiones["motonet"].send(
        {
          component: "usuario",
          type: "cambiarPassByCodigo",
          data: this.state.pass.value,
          estado: "cargando",
          usuario_recuperado: this.props.state.usuarioReducer.usuarioRecuperado,
        },
        true
      );
      
      //alert("sì registra")
    //alert(JSON.stringify(this.props.state.usuarioReducer.usuarioRecuperado))
      return <View />;
    }
  };

  render() {
    if (
      this.props.state.usuarioReducer.estadoEmail == "exito" &&
      this.props.state.usuarioReducer.type == "cambiarPassByCodigo"
    ) {
      //alert("Contraseña modificada exitosamente");
      //alerta//
      this.state.mensaje = "Contraseña modificada exitosamente"
      this.state.modalVisible = true;
      this.state.modal = "ModalSuccess";

      this.props.state.usuarioReducer.estadoEmail = false;
      this.props.navigation.replace("LoginPage");
    }

    if (
      this.props.state.usuarioReducer.estadoEmail == "error" &&
      this.props.state.usuarioReducer.type == "cambiarPassByCodigo"
    ) {

      alert("Algo salío mal");
    //   SPopupOpen({
    //     key: "noConductor",
    //     content: (
    //         <View alignItems="center" >
    //             <Svg name={"Warning2"}
    //             style={{
    //                 width: 100,
    //                 height: 100,
    //                 fill: "#f00",
    //             }} />
    //             <Text style={{paddingTop:10, fontSize:15}}>Algo salío mal.</Text>
    //         </View>
    //     )
    // })
      this.props.state.usuarioReducer.estadoEmail = false;
    }

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <BarraSuperior
          title={"Modificar contraseña"}
          goBack={() => {
            this.props.navigation.goBack();
          }}
        />

        <ScrollView>
          <View
            style={{
              width: "100%",
              // height: 700,
              alignItems: "center",
            }}
          >
            <View
              style={
                {
                  // marginBottom: 50
                }
              }
            >
              <Svg
                name="logoCompletoRecurso"
                style={{
                  marginTop: 35,
                  width: 150,
                  height: 150,
                  fill: "#fff",
                }}
              />
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
              <View style={styles.view}>
                <TextInput
                  style={this.state.pass.error ? styles.error : styles.input}
                  placeholder="Ingrese nueva contraseña"
                  onChangeText={(text) => this.handleChange(text, "pass")}
                  value={this.state.pass.value}
                  autoCapitalize="none"
                  type="password"
                />
                
                <TextInput
                  style={
                    this.state.confirmarPass.error ? styles.error : styles.input
                  }
                  placeholder="Confirme su nueva contraseña"
                  onChangeText={(text) =>
                    this.handleChange(text, "confirmarPass")
                  }
                  value={this.state.confirmarPass.value}
                  secureTextEntry
                  autoCapitalize="none"
                />
             

              {this.props.state.usuarioReducer.estadoEmail === "cargando" &&
              this.props.state.usuarioReducer.type == "cambiarPassByCodigo" ? (
                <View style={styles.touch3}>
                  <ActivityIndicator size="small" color="#fff" />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.touch3}
                  onPress={this.Registrar}
                >
                  <Text
                    style={{
                      color: "#fff",
                      //fontSize: 18,
                    }}
                  >
                    Guardar Contraseña
                  </Text>
                </TouchableOpacity>
              )}
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
  input: {
    backgroundColor: "#F7F7F7",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 5,
    shadowColor: "#000",
    paddingLeft: 15,
    marginBottom:10,
    color: "#707070" 
    // shadowOffset: {
    //   width: 0,
    //   height: -2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },

  error: {
    backgroundColor: "#F7F7F7",
    width: "100%",
    height: 50,
    alignItems: "center",
    paddingLeft: 15,
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#f00",
    marginBottom:10,
     shadowColor: "#000",
    // paddingLeft: 15,
    // shadowOffset: {
    //   width: 0,
    //   height: -2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    //color:"#000"
  },
  touch3: {
    marginTop: 15,
    backgroundColor: "#F7001D",
    width: "100%",
    height: 40,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 5,
    //padding:10
     shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: -2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  view: {
    //margin: 5,
    width: "100%",
    alignItems:"center",
    padding:10
  },
  texto: {
    width: "100%",
    textAlign: "left",
    color: "#000",
    fontSize: 17,
    margin: 5,
  },
});

const initStates = (state) => {
  return { state };
};
export default connect(initStates)(NuevoPassPage);
