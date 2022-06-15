import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux';
import BarraSuperiorMensajeria from './BarraSuperiorAyuda';
import SSCrollView from '../../component/SScrollView';
//import STextImput from '../../component/STextImput';
import STheme from '../../STheme';
//import SwitchTipo from './SwitchTipo';
//import BuscardorNuevoBlack from '../../component/BuscardorNuevoBlack';
//import Svg from '../../Svg';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs'
import AppParams from "../../Json"

class HistorialPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this._ref = {};
        this.state = {
            foto: false,
            
        };
    }

   


    pickPhoto = () => {
        var options = {
            title: 'Seleccionar una Foto',
            takePhotoButtonTitle: "Tomar Foto...",
            chooseFromLibraryButtonTitle: "Elegir de la Biblioteca...",
            allowEditing: true,
            isVertical: true,
            originalRotation: 0,
            mediaType: 'foto',
            // rotation: 0,
            cancelButtonTitle: "Cancelar",
            storageOptions: {
                skipBackup: true,
                path: 'image',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                return <View />
            } else if (response.error) {
                return <View />
            } else if (response.customButton) {
                return <View />
            } else {
                var originalRotation = (!response.originalRotation ? 0 : response.originalRotation)
                ImageResizer.createResizedImage("data:image/jpeg;base64," + response.data, 400, 400, 'PNG', 100, originalRotation).then((uri) => {
                    //console.log(uri)
                    RNFS.readFile(uri.path, 'base64').then((resp) => {
                        //console.log(resp)
                        this.setState({ foto: resp })
                    });

                }).catch(err => {
                    console.log(err);
                });
            }
        });
        return <View />
    }

    
     getlistaItems = () => {
        // console.log("aaaa" + JSON.stringify(props.state.viajesReducer.data.pedido))

        if(!this.props.state.historialViajeReducer.data){
            this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "historialViaje",
                type: "getAll",
                estado: "cargando",
                data: "",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key
            }, true);
        }
        let data = this.props.state.historialViajeReducer.data;

        if (Object.keys(data).length <= 0) {
            return <View />
        };

        var LIST = Object.keys(data).map((key) => {
            var obj = data[key];
            return (


                <View style={{
                    height: 40,
                    width: "100%",
                    marginBottom: 15,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>


                    <View style={{
                        // flex: 1,
                    }}>
                        <Text style={{
                            color: STheme.color.textb
                        }}>mm</Text>
                        <Text style={{
                            color: STheme.color.textb
                        }}>mmm Unidades</Text>
                    </View>
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderWidth: 1,
                            borderColor: "#999",
                            borderRadius: 4,
                            overflow: "hidden",
                        }}>
                        {this.props.state.imageReducer.getImage(AppParams.urlImages + "foto.png?type=pedido&key=" + obj.key, {
                        })}
                    </View>

                    {/* <TouchableOpacity style={{
                        width: 40,
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                    }} onPress={() => {
                        delete this.state.productos[key];
                        this.setState({ productos: this.state.productos })
                    }}>
                        <Svg name={"Eliminar"} style={{
                            width: 20,
                            height: 20,
                            fill: "#000"
                        }} />
                    </TouchableOpacity> */}

                </View>

            )
        })
        return (
            <View style={{
                flex: 1,
                margin: 10
            }}>
                <View style={{
                    marginBottom: 20
                }}>
                    <Text style={{
                        color: STheme.color.textb,
                        fontSize: 14,
                        fontWeight: "bold",
                    }}>Productos añadidos</Text>
                </View>

                <ScrollView style={{
                    flex: 1
                }}>
                    {LIST}
                </ScrollView>

            </View>
        )
    }

    

    render() {
        return (<View style={{
            width: "100%",
            flex: 1,
            backgroundColor: STheme.color.primary
        }}>
            <BarraSuperiorMensajeria
                title={"Ayuda"}
                goBack={() => { this.props.navigation.goBack() }}
                pedir={() => this.pedirViaje()} />
            <View style={{
                flex: 1,
            }}>
                <SSCrollView>
                    <View style={{
                        flex: 1,
                        width: "100%",
                        alignItems: "center",
                    }}>
                        <View style={{
                            width: "90%"
                        }}>
                            <Text style={{
                                marginTop: 8,
                                marginBottom: 8,
                                fontSize: 16,
                                fontWeight: "bold",
                                color: STheme.color.textb
                            }}>Nosotros te ayudamos:</Text>
                            {this.getlistaItems()}
                         
                        </View>

                    </View>
                </SSCrollView>
            </View>
        </View>)
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(HistorialPage);