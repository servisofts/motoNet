import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Boton1 from "../../component/Boton1";
import BottomContent from "../../component/BottomContent";
import SSCrollView from "../../component/SScrollView";
import STextImput from "../../component/STextImput";
import STheme from "../../STheme";
import Svg from "../../Svg";
import LoginFace from "./LoginFace";
import LoginGmail from "./LoginGmail";
import ModalPage from "../ModalPage";

class LoginPage extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this._ref = {};
    this.state = {
      modalVisible: false,
      mensaje: "",
    };
  }

  render() {
    if (this.props.state.usuarioReducer.usuarioLog) {
      this.props.navigation.replace("ServicioPage");
      return <View />;
    }
    if (this.props.state.usuarioReducer.type == "login") {
      if (this.props.state.usuarioReducer.estado == "error") {
        this.props.state.usuarioReducer.estado = "";
        if (this.props.state.usuarioReducer.error == "error_datos") {
          if (this._ref["pass"]) {
            //alert("Error en los datos.");
            this.state.mensaje = "Error en los datos."
            this.state.modalVisible = true;
            this._ref["pass"].clear();
          }
        }
      }
    }

    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SSCrollView>
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 250,
                width: "100%",
                padding: 20,
              }}
            >
              <Svg
                name={"logoCompletoRecurso"}
                style={{
                  fill: STheme.color.primary,
                }}
              />
            </View>
            <View
              style={{
                width: "90%",
              }}
            >
              <STextImput
                label={"Usuario"}
                placeholder={"Ingresar usuario"}
                type={"text"}
                ref={(ref) => (this._ref["usuario"] = ref)}
              />
              <View style={{ height: 20 }}></View>
              <STextImput
                label={"Contraseña"}
                placeholder={"Ingresar contraseña"}
                type={"password"}
                ref={(ref) => (this._ref["pass"] = ref)}
              />
              <Boton1
                type={"3"}
                label={
                  <Text>
                    {"¿Olvidó su contraseña?"}{" "}
                    <Text
                      style={{
                        color: STheme.color.text,
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                      }}
                    >
                      Restablecer
                    </Text>
                  </Text>
                }
                onPress={() => {
                  this.props.navigation.navigate("RecuperarPassPage");
                }}
              />
            </View>
          </View>
          <BottomContent height={200}>
            <View
              style={{
                width: "100%",
                flex: 1,
                justifyContent: "space-around",
              }}
            >
              <Boton1
                type={"1"}
                label={"Iniciar sesión"}
                cargando={this.props.state.usuarioReducer.estado == "cargando"}
                onPress={() => {
                  var usr = this._ref["usuario"].verify();
                  var pass = this._ref["pass"].verify();
                  if (usr && pass) {
                    this.props.state.socketClienteReducer.sessiones[
                      "motonet"
                    ].send(
                      {
                        component: "usuario",
                        type: "login",
                        data: {
                          usr: usr,
                          pass: pass,
                        },
                        estado: "cargando",
                      },
                      true
                    );
                    return <View />;
                  }
                }}
              />
              <Boton1
                type={"2"}
                label={
                  <Text>
                    ¿Aún no tienes una cuenta?{" "}
                    <Text
                      style={{
                        color: STheme.color.background,
                        fontWeight: "bold",
                      }}
                    >
                      Regístrate
                    </Text>
                  </Text>
                }
                onPress={() => {
                  this.props.navigation.navigate("RegistroUsuarioPage", {
                    registro: " ",
                  });
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  height: 40,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LoginFace navigation={this.props.navigation} />
                <LoginGmail navigation={this.props.navigation} />
              </View>
            </View>
          </BottomContent>
        </SSCrollView>
        <ModalPage
          ventana="ModalError"
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
const initStates = (state) => {
  return { state };
};

export default connect(initStates)(LoginPage);
