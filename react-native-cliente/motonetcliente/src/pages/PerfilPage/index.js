import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  BackHandler,
  Dimensions,
  AsyncStorage,
} from "react-native";
// import * as popupActions from '../../action/popupActions'
import Svg from "../../Svg";
import ImagePicker from "react-native-image-picker";
import FieldsPerfil from "../../component/FieldsPerfil";
import ImageResizer from "react-native-image-resizer";
import RNFS from "react-native-fs";
import urlFoto from "../../Json/index.json";
import ImgFondoCruces from "../../component/ImgFondoCruces";
import { ScrollView } from "react-native-gesture-handler";
import SubirFotoPerfil from "../../component/SubirFotoPerfil";
import BarraSuperior from "../../component/BarraSuperior";
//import PerfilConductorPage from '../PerfilConductorPage';
import Boton1 from "../../component/Boton1";
// const { width, height } = Dimensions.get("window");
import AppParams from '../../Json';

class PerfilPage extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      // popup: false,
      fotoPerfilUri: "",
      isVentana: false,
    };
  }

  componentWillMount() {
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    if (!this.props.state.usuarioReducer.usuarioDatos["Foto perfil"]) {
      return <View />;
    }
    // var url = urlFoto.urlImages + this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato + `?type=getPerfil&key_usuario=${this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario}&date=${Date.now()}`;
    var url =
      urlFoto.urlImages +
      this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato +
      `?type=getPerfil&key_usuario=${this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario}`;
    this.state.fotoPerfilUri = url;
  }

  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentDidUpdate() {
    if (!this.props.state.usuarioReducer.usuarioDatos["Foto perfil"]) {
      return <View />;
    }
    var url =
      urlFoto.urlImages +
      this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato +
      `?type=getPerfil&key_usuario=${
        this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario
      }&date=${Date.now()}`;
    this.state.fotoPerfilUri = url;
  }

  handleClik = (props) => {
    this.state.isVentana = props;
    this.setState({ ...this.state });
  };

  SetComponent = () => {
    if (!this.state.isVentana) {
      return <View />;
    }
    return <SubirFotoPerfil handleClik={this.handleClik} />;
  };

  render() {
    if (
      this.props.state.usuarioReducer.type == "insertarDato" &&
      this.props.state.usuarioReducer.estado == "exito"
    ) {
      if (!this.props.state.usuarioReducer.usuarioDatos["Foto perfil"]) {
        return <View />;
      }
      // var url = urlFoto.urlImages + this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato + `?type=getPerfil&key_usuario=${this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario}&date=${Date.now()}`;
      var url =
        urlFoto.urlImages +
        this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato +
        `?type=getPerfil&key_usuario=${this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario}`;
      this.state.fotoPerfilUri = url;
      this.props.state.usuarioReducer.estado = "";
    }
    // var url = urlFoto.urlImages + this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato + `?type=getPerfil&key_usuario=${this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario}&date=${Date.now()}`;
    // this.state.fotoPerfilUri = url;

    var cabecera = "registro_cliente";
    var datos = this.props.state.usuarioReducer.usuarioDatos;
    if (!datos) {
      if (this.props.state.usuarioReducer.estado == "cargando") {
        return <ActivityIndicator />;
      }
      this.props.state.socketClienteReducer.sessiones[
        AppParams.socket.name
      ].send(
        {
          component: "usuario",
          type: "getById",
          key: this.props.state.usuarioReducer.usuarioLog.key,
          cabecera: cabecera,
          estado: "cargando",
        },
        true
      );
      return <ActivityIndicator />;
    }

    var nombre = datos["Nombres"];
    if (nombre) {
      nombre = nombre.dato;
    }
    var apellidos = datos["Apellidos"];
    if (apellidos) {
      apellidos = apellidos.dato;
    }
    return (
      <View
        style={{
          backgroundColor: "#fff",
          width: "100%",
          flex: 1,
          alignItems: "center",
        }}
      >
        <BarraSuperior
          title={"Perfil"}
          goBack={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView
          style={{
            width: "100%",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: 250,
                width: "100%",
                // backgroundColor: "#ccc",
                justifyContent: "center",
                alignItems: "center",
                // borderBottomWidth:2,
                // borderColor:"#999"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.handleClik(true);
                }}
                style={{}}
              >
                {!this.state.fotoPerfilUri ? (
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      borderWidth: 1,
                      borderColor: "#999",
                      borderRadius: 100,
                    }}
                  ></View>
                ) : (
                  //<Image source={this.state.fotoPerfilUri}
                  <Image
                    source={{ uri: this.state.fotoPerfilUri }}
                    style={{
                      width: 120,
                      height: 120,
                      borderWidth: 1,
                      borderColor: "#999",
                      borderRadius: 100,
                    }}
                  />
                )}
              </TouchableOpacity>
              <Text
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {nombre} {apellidos}
              </Text>
              <View
                style={{
                  width: "90%",
                  maxWidth: 500,
                  height: 80,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    width: "45%",
                    height: 50,
                  }}
                >
                  <Boton1 type={"1"} label={"Cambiar foto"} />
                </View>
                <View
                  style={{
                    width: "45%",
                    height: 50,
                  }}
                >
                  <Boton1 type={"4"} label={"Quitar foto"} />
                </View>
              </View>
            </View>
            <View
              style={{
                width: "90%",
                maxWidth: 600,
                marginBottom:10
              }}
            >
              <FieldsPerfil datos={datos} />
              <Boton1
                type={"1"}
                label={"Cerrar Sesión"}
                cargando={false}
                onPress={() => {
                  AsyncStorage.removeItem(AppParams.storage.urlLog);
                  this.props.state.usuarioReducer.usuarioLog = false;
                  this.props.state.usuarioReducer.usuarioDatos = false;
                  this.props.state.usuarioReducer.cargaLoaded = true;
                  this.props.navigation.replace("CargaPage");
                  return <View />;
                }}
              />
            </View>
          </View>
        </ScrollView>
        {/* <PerfilConductorPage /> */}
        {this.SetComponent()}
      </View>
    );
  }
}

const initStates = (state) => {
  return { state };
};

export default connect(initStates)(PerfilPage);
