import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Svg from '../../Svg';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs'
import AppParams from "../../Json"


var cabecera = "registro_cliente";
const SubirFotoPerfil = (props) => {
    const [foto, setFoto] = React.useState(false)
    const Repuesta = (text) => {
        // props.setComponent(text)
        return <View />
    };


    const pickPhoto = () => {
        var options = {
            title: 'Seleccionar una Foto',
            takePhotoButtonTitle: "Tomar Foto...",
            chooseFromLibraryButtonTitle: "Elegir de la Biblioteca...",
            allowEditing: true,
            mediaType: 'foto',
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
                ImageResizer.createResizedImage("data:image/jpeg;base64," + response.data, 400, 400, 'PNG', 100).then((uri) => {
                    //console.log(uri)
                    RNFS.readFile(uri.path, 'base64').then((resp) => {
                        //console.log(resp)
                        setFoto(resp)
                    });

                }).catch(err => {
                    console.log(err);
                });
            }
        });
        return <View />
    }

    const EnviarPhoto = () => {
        if (foto) {
            //ENVISAMOS LA FOTO                                        
            var User = props.state.usuarioReducer.usuarioLog;
            if (!User) {
                return "no hay usr";
            }


            const getKeyDato = (keyDescripcion) => {
                var key = "undefined"
                for (let i = 0; i < props.state.cabeceraDatoReducer.data[cabecera].length; i++) {
                    const obj = props.state.cabeceraDatoReducer.data[cabecera][i];
                    if (obj.dato.descripcion == keyDescripcion) {
                        return obj;
                    }
                }
                return {
                    key
                }
            }
            var datas = []
            datas.push({
                dato: getKeyDato("Foto perfil"),
                data: foto
            })
            var objSend = {
                component: "usuario",
                type: "insertarDato",
                estado: "cargando",
                data: datas,
                key_usuario: User.key,
                dato: "Foto perfil"
            }
            props.state.socketClienteReducer.sessiones[AppParams.socket.name].send(objSend, true)
            props.handleClik(false)
        }
        return <View />
    }

    if (!props.state.cabeceraDatoReducer.data[cabecera]) {
        if (props.state.cabeceraDatoReducer.estado == "cargando") {
            return <View />
        }
        props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
            component: "cabeceraDato",
            type: "getDatoCabecera",
            estado: "cargando",
            cabecera: cabecera
        });
        return <View />
    }

    return (

        <View style={styles.Model}>
            <View style={styles.container} >
                {foto ? (
                    <TouchableOpacity
                        onPress={pickPhoto}
                        style={{
                            flex: 1,
                            flexDirection: "column-reverse",
                            marginTop: 15
                        }}>
                        <Image source={{ uri: 'data:image/jpeg;base64,' + foto }}
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 100,
                            }} />
                    </TouchableOpacity>
                ) : (
                        <View style={{
                            flex: 1,
                            flexDirection: "column-reverse"
                        }}>
                            <Text style={{
                                fontSize: 10,
                                color: '#fff',
                                height: 50,
                                marginStart: 50,
                                marginEnd: 50,
                                fontWeight: "bold",
                                textAlign: "center"
                            }}>SUBIR UNA FOTO DE PERFIL</Text>
                        </View>
                    )
                }
                {!foto ? (
                    <View style={{
                        flex: 1,
                        justifyContent: "center"
                    }}>
                        <TouchableOpacity
                            onPress={pickPhoto}
                            style={{
                                width: 150,
                                height: 40,
                                borderRadius: 40,
                                backgroundColor: "#a4a4a4",
                                justifyContent: "center"
                            }}>
                            <Text style={{
                                color: "#fff",
                                textAlign: "center"
                            }}>
                                SUBIR ARCHIVO</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                        <View style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>

                            <TouchableOpacity
                                onPress={pickPhoto}
                                style={{
                                    width: 150,
                                    height: 40,
                                    borderRadius: 40,
                                    backgroundColor: "#a4a4a4",
                                    justifyContent: "center"
                                }}>
                                <Text style={{
                                    color: "#fff",
                                    textAlign: "center"
                                }}>
                                    SUBIR ARCHIVO</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={EnviarPhoto}
                                style={{
                                    width: 150,
                                    height: 40,
                                    borderRadius: 40,
                                    backgroundColor: "#a4a4a4",
                                    justifyContent: "center"
                                }}>
                                <Text style={{
                                    color: "#fff",
                                    textAlign: "center"
                                }}>
                                    ENVIAR</Text>
                            </TouchableOpacity>
                        </View>
                    )}
            </View>

            <TouchableOpacity
                onPress={() => {
                    props.handleClik(false)
                    return <View />
                }}
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Svg name="Close"
                    style={{
                        width: 15,
                        height: 15,
                        margin: 1,
                        fill: "#fff"
                    }} />
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Model: {
        flex: 1,
        width: 300,
        height: 220,
        position: "absolute",
        top: "30%",
        borderRadius: 20,
        backgroundColor: "#2C4C7E"
    },
});

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(SubirFotoPerfil);

