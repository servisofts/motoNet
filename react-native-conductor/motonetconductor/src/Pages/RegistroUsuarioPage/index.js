import React, { Component } from "react";
import { View ,TouchableOpacity, TextInput} from "react-native";
import { connect } from "react-redux";
import BarraSuperior from "../../Component/BarraSuperior";
import Boton1 from "../../Component/Boton1";
import BottomContent from "../../Component/BottomContent";
import SSCrollView from "../../Component/SScrollView";
import STextImput from "../../Component/STextImput";
import AppParams from "../../Json";
import ModalPage from "../ModalPage";

class RegistroUsuarioPage extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this._ref = {};
    this.state = {
      modalVisible: false,
      mensaje: "",
      datos: {
        nombres: {
          label: "Nombres",
          ph: "Ingresar nombres",
          type: "text",
          key_db: "Nombres",
        },
        apellidos: {
          label: "Apellidos",
          ph: "Ingresar apellidos",
          type: "text",
          key_db: "Apellidos",
        },
        telefono: {
          label: "Telefono",
          ph: "Ingresar telefono",
          type: "text",
          key_db: "Telefono",
        },
        ci: {
          label: "Carnet de identidad",
          ph: "Ingresar ci",
          type: "text",
          key_db: "CI",
        },
        correo: {
          label: "Correo",
          ph: "Ingresar correo",
          type: "email",
          key_db: "Correo",
        },
        pass: {
          label: "Contraseña",
          ph: "Ingresar contraseña",
          type: "password",
          key_db: "Password",
        },
        rep_pass: {
          label: "Confirmar contraseña",
          ph: "Ingresar contraseña",
          type: "password",
        },
        asociacion: {
          label: "Asociación",
          ph: "Ingresar la Asociación",
          type: "text",
          key_db: "key_encargado",
          page:"AsociacionPage"
        },
      },
    };
  }

  getInputs() {
    return Object.keys(this.state.datos).map((key) => {
      var obj = this.state.datos[key];
      var value = "";
      if (this.state.dataRegistro) {
        switch (this.tipo_registro) {
          case "facebook":
            if (key == "pass" || key == "rep_pass") {
              return <View />
            }
            if (key == "nombres") {
              value = this.state.dataRegistro.first_name + " " + (!this.state.dataRegistro.middle_name ? "" : this.state.dataRegistro.middle_name);
            }
            if (key == "apellidos") {
              value = this.state.dataRegistro.last_name;

            }
            break;
          case "gmail":
            if (key == "pass" || key == "rep_pass") {
              return <View />
            }
            if (key == "nombres") {
              value = this.state.dataRegistro.givenName;
            }
            if (key == "apellidos") {
              value = this.state.dataRegistro.familyName;
            }
            if (key == "correo") {
              value = this.state.dataRegistro.email;
            }
            break;
        }
      }
     
      return (
        <View
          style={{
            marginBottom: 16,
          }}
        >
         
          
          <STextImput
            label={obj.label}
            placeholder={obj.ph}
            defaultValue={value}
            type={obj.type}
            ref={(ref) => (this._ref[key] = ref)}
            navigation={this.props.navigation}
            //onpres={(obj.key_db==="key_encargado") ? alert("aa"): alert("bb")}
            onPress={ obj.key_db ? obj.key_db : ""}
            page={ obj.page ? obj.page : ""}

            
          />
          
        </View>
      );
    });
  }
  getKeyDato = (keyDescripcion) => {
    var key = "undefined";
    //var cabecera = "registro_cliente";
    var cabecera = "registro_conductor";
    // console.log(this.props.state.cabecreraDatoReducer.data[cabecera])
    for (
      let i = 0;
      i < this.props.state.cabeceraDatoReducer.data[cabecera].length;
      i++
    ) {
      const obj = this.props.state.cabeceraDatoReducer.data[cabecera][i];
      if (obj.dato.descripcion == keyDescripcion) {
        return obj;
      }
    }
    return {
      key,
    };
  };
  getDatoCabecera = () => {
    if (this.props.state.cabeceraDatoReducer.estado == "cargando") {
      return <View />;
    }
    if (!this.props.state.cabeceraDatoReducer.data["registro_conductor"]) {
      var objSend = {
        component: "cabeceraDato",
        type: "getDatoCabecera",
        estado: "cargando",
        cabecera: "registro_conductor",
      };
      this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send(
        objSend,
        true
      );
      return <View />;
    }
    return <View />;
  };
  render() {
    //Dentro de render verifico si registro usuario con usuarioLog
    this.tipo_registro = this.props.navigation.getParam("registro");
    if (this.tipo_registro == "facebook" || this.tipo_registro == "gmail") {
      var data = this.props.navigation.getParam("data");
      if (!this.state.dataRegistro) {
        this.setState({ dataRegistro: data });
        return <View />
      }
    }

    if (this.props.state.usuarioReducer.usuarioLog) {
      this.props.navigation.replace("CargaPage");
    }

    if (this.props.state.usuarioReducer.error) {
      if (this.props.state.usuarioReducer.error == "existe_Correo") {
        console.log(this.props.state.usuarioReducer.error);
        //alert(this.props.state.usuarioReducer.error);
        this.props.state.usuarioReducer.error = false;
        this.state.mensaje = "Ya existe el correo electrónico."
        this.state.modalVisible = true;
      }
      if (this.props.state.usuarioReducer.error == "existe_Telefono") {
        console.log(this.props.state.usuarioReducer.error);
        //alert(this.props.state.usuarioReducer.error);
        this.state.modalVisible = true;
        this.props.state.usuarioReducer.error = false;
        this.state.mensaje = "Ya existe el teléfono."
      }
    }
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          backgroundColor:"#F7001D"
        }}
      >
        <BarraSuperior
          title={"Crear usuario"}
          goBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <View
          style={{
            flex: 1,
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
              {this.getDatoCabecera()}
              <View
                style={{
                  width: "90%",
                  flex: 1,
                }}
              >
                
                {this.getInputs()}

              </View>
              <BottomContent>
                <Boton1
                  type={"1"}
                  label={"Registrarse"}
                  cargando={
                    this.props.state.usuarioReducer.estado == "cargando"
                  }
                  onPress={() => {
                    var isValid = true;
                    var arr = [];
                    var validarPass = "";
                    Object.keys(this.state.datos).map((key) => {
                      var data = this.state.datos[key];
                      if (!this._ref[key]) {
                        return;
                      }
                      var value = this._ref[key].verify();
                      if (!value) isValid = false;
                      //alert("dato:" + value + " ** " + JSON.stringify(data));
                      if (data.type == "password") {
                        if (validarPass == "") {
                          validarPass = value;
                        } else {
                          if (validarPass != value) {
                            // alert("La contraseña no coinciden")
                            validarPass = "";
                            isValid = false;
                            this.state.modalVisible = true;
                            this.state.mensaje = "La contraseñas escritas no coinciden. Inténtelo de nuevo."
                            this.setState({ ...this.state });
                          }
                        }
                      }
                      if (data["key_db"]) {
                        var cabeceraDato = this.getKeyDato(data["key_db"]);
                        //alert(JSON.stringify(cabeceraDato) + " " + value)
                        arr.push({
                          dato: cabeceraDato,
                          data: value,
                        });
                      }
                    });
                    if (this.state.dataRegistro) {
                      switch (this.tipo_registro) {
                        case "facebook":
                          var cabeceraDato = this.getKeyDato("Facebook key");
                          arr.push({
                            dato: cabeceraDato,
                            data: this.state.dataRegistro.id,
                          });
                          break;
                        case "gmail":
                          var cabeceraDato = this.getKeyDato("Gmail Key");
                          arr.push({
                            dato: cabeceraDato,
                            data: this.state.dataRegistro.id,
                          });
                          break;
                      }
                    }
                    if (isValid) {
                      var objSend = {
                        component: "usuario",
                        type: "registro",
                        estado: "cargando",
                        cabecera: "registro_conductor",
                        data: arr,
                      };
                      this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send(objSend, true);
                      //alert("Registrar")
                    }
                  }
                  }
                />
              </BottomContent>
            </View>
          </SSCrollView>
        </View>
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
export default connect(initStates)(RegistroUsuarioPage);
