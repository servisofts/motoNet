import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image, BackHandler, Dimensions } from 'react-native';
import * as popupActions from '../../action/popupActions'
import Svg from '../../Svg';
import ImagePicker from 'react-native-image-picker';
import FieldsPerfil from '../../component/FieldsPerfil';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs'
import urlFoto from '../../Json/index.json';
import PerfilConductorPage from '../PerfilConductorPage';

const { width, height } = Dimensions.get("screen");


class PerfilPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            fotoPerfilUri: false
        }     
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        if (!this.props.state.usuarioReducer.usuarioDatos["Foto perfil"]) {
            //error no existe foto    
            return <View />
        }
        var url = urlFoto.urlImages + this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato + `?type=getPerfil&key_usuario=${this.props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario}&date=${Date.now()}`;
        this.state.fotoPerfilUri = url;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        if (this.state.popup) {
            this.props.cerrarPopup();
            this.state.popup = false
            this.setState(this.state);
            return <View />
        }
        this.props.navigation.goBack();
        return <View />
    }

    abrirPopup = (titulo) => {
        this.props.abrirPopup(() => {
            return (
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: "#00c3f3",
                    }}>
                    <Text style={{
                        fontSize: 18,
                    }}>Actualizar Dato</Text>
                    <Text style={{
                        width: "90%",
                        margin: 5,
                        fontSize: 18,
                        textAlign: "left"
                    }}>
                        {titulo}
                    </Text>
                    <TextInput style={{
                        width: "95%",
                        height: 50,
                        borderRadius: 10,
                    }} />
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 50,
                            borderWidth: 3,
                            marginTop: 20,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text>Guardar</Text>
                    </TouchableOpacity>
                </View>
            )
        });
        return <View />
    }

    right = () => {
        const rightButtons = [
            <TouchableOpacity
                onPress={() => {
                    this.state.popup = true
                    this.setState(this.stater);
/*                     this.abrirPopup()
 */                }}
                style={{
                    paddingLeft: 10, backgroundColor: "#00c3f3", width: '100%', height: "100%",
                    borderRadius: 10,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <Text style={{ color: "#fff", fontSize: 10 }}>Editar</Text>
                <Svg name="Editar"
                    style={{
                        width: 20,
                        height: 20,
                        fill: "#fff"
                    }} />
            </TouchableOpacity>
        ];
        return rightButtons;
    }
    /*   pickPhoto = () => {
          ImagePicker.showImagePicker((response) => {
              const source = { uri: 'data:image/jpeg;base64,' + response.data };
              this.state.fotoPerfilUri = source
              this.setState(this.state);
          });
          return <View />
      } */
    pickPhoto = () => {
        ImagePicker.showImagePicker((response) => {
            if (response.didCancel) {
                return <View />
            } else if (response.error) {
                return <View />
            } else if (response.customButton) {
                return <View />
            } else {
                ImageResizer.createResizedImage("data:image/jpeg;base64," + response.data, 400, 400, 'PNG', 100).then((uri) => {
                    //console.log(uri)
                    RNFS.readFile(uri.path, 'base64').then((resp) => {
                        console.log(resp)
                        //setFoto(resp)
                        //this.state.fotoPerfilUri = resp;
                        //this.setState(...this.state);
                    });

                }).catch(err => {
                    console.log(err);
                });
            }
        });
        return <View />
    }

    render() {
        if (!this.props.state.usuarioReducer.usuarioDatos) {
            return <Text>No existe usuarioDato</Text>
        }
        var datos = this.props.state.usuarioReducer.usuarioDatos;
        //var datos = JSON.parse(objeto.data);

        return (
            <View style={{
                backgroundColor: "#fff",
                width,
                height,
            }}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{
                    }}>
                        <TouchableOpacity
                            onPress={this.pickPhoto}
                            style={{
                                width: 150,
                                height: 150,
                                borderWidth: 1,
                                borderRadius: 100,
                            }}>
                            {!this.state.fotoPerfilUri ? (
                                <View />
                            ) : (
                                    //<Image source={this.state.fotoPerfilUri}
                                    <Image source={{ uri: this.state.fotoPerfilUri }}
                                        style={{
                                            width: 150,
                                            height: 150,
                                            borderRadius: 100,
                                        }} />
                                )
                            }
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={{
                                position: "absolute",
                                width: 50,
                                height: 50,
                                bottom: 0,
                                right: 0,
                                borderColor: "#000",
                                borderWidth: 1,
                                borderRadius: 100,
                                backgroundColor: "#fff",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <Svg name="Editar"
                                style={{
                                    width: 30,
                                    height: 30,
                                    fill: "#000"
                                }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flex: 2,
                    marginStart: 40,
                    marginEnd: 40
                }}>
                    <FieldsPerfil datos={datos} />
                </View>

                {/* <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={{
                        position: "absolute",
                        top: 20,
                        left: 10,
                    }}>
                    <Svg name="Volver"
                        style={{
                            width: 30,
                            height: 30,
                            fill: "#000"
                        }} />
                </TouchableOpacity> */}

                {/* <PerfilConductorPage /> */}

            </View>
        );
    }
};

const initActions = ({
    ...popupActions
});

const initStates = (state) => {
    return { state }
};

export default connect(initStates, initActions)(PerfilPage);
