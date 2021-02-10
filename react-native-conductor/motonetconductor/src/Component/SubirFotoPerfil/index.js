import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Svg from '../../Svg';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs'
import AppParams from '../../Json/index.json'
import urlFoto from '../../Json/index.json';

const SubirFotoPerfil = (props) => {
    const [foto, setFoto] = React.useState(false)
    const [fotoPerfil, setFotoPerfil] = React.useState(false)
    const Repuesta = (text) => {
        props.setComponent(text)
        return <View />
    };


    if(props.datos){
        if(!fotoPerfil){
            if (!props.datos["Foto perfil"]) {
                return <View />
            }
            var url = urlFoto.urlImages + props.datos["Foto perfil"].dato + `?type=getPerfil&key_usuario=${props.datos["Foto perfil"].key_usuario}&date=${Date.now()}`;
            setFotoPerfil(url);
        }
    }
    
    const pickPhoto = () => {
        ImagePicker.showImagePicker((response) => {
            if (response.didCancel) {
                return <View />
            } else if (response.error) {
                return <View />
            } else if (response.customButton) {
                return <View />
            } else {
                ImageResizer.createResizedImage("data:image/jpeg;base64," + response.data, 400, 400, 'PNG', 100).then((uri) => {
                    console.log(uri)
                    RNFS.readFile(uri.path, 'base64').then((resp) => {
                        console.log(resp)
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
            var cabecera = "registro_conductor";

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
        }
        return <View />
    }

    if (props.state.usuarioReducer.estado == "exito" && props.state.usuarioReducer.type == "insertarDato") {
        props.state.usuarioReducer.type = "";
        setFoto(false);
        return <View/>
    }

    var cabecera = "registro_conductor";
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
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <TouchableOpacity
                onPress={pickPhoto}
                style={{
                    flexDirection: "column-reverse",
                    alignContent: 'center',
                    backgroundColor: '#fff',
                    borderWidth: 2,
                    borderColor: '#2c4b81',
                    borderRadius: 100,
                    width: 150,
                    height: 150
                }}>
                <Image source={{ uri: (!foto?(fotoPerfil ):('data:image/jpeg;base64,' + foto ))}}
                    style={{
                        width: 144,
                        height: 144,
                        margin: 1,
                        borderRadius: 100,
                    }} />
            </TouchableOpacity>
            {foto ? (
                <View style={{
                    flexDirection: "row",
                }}>
                    <TouchableOpacity
                        onPress={pickPhoto}
                        style={{
                            width: 150,
                            height: 40,
                            borderRadius: 40,
                            backgroundColor: "#2c4b81",
                            justifyContent: "center",
                        }}>
                        <Text style={{
                            color: "#fff",
                            textAlign: "center"
                        }}>
                            SUBIR ARCHIVO</Text>
                    </TouchableOpacity>

                    <Text style={{ color: '#fff' }}>
                        - {/** quien que separa los dos botones subir y enviar */}
                    </Text>
                        
                    {!foto?<View/>:<TouchableOpacity
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
                    </TouchableOpacity>}

                </View>
            ) : (
                    <View />
                )
            }

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 30,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#fff",
    },
    container2: {
        flex: 1,
        width: "80%",
        height: 90,
        flexDirection: 'column',
        alignItems: 'center',
    },
    container3: {
        flex: 0.5,
        width: "90%",
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Model: {
        flex: 1,
        width: 300,
        height: 220,
        top: 10,
        backgroundColor: '#ffc',
        shadowColor: "#fff",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 90
    },
    check: {
        width: 20,
        height: 20,
        borderRadius: 100,
        borderWidth: 2,
        backgroundColor: "#fff",
        borderColor: "#fff",
        margin: 5,
    },
    buttOn2: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 100,
        borderColor: "#fff",
        backgroundColor: "#fff",
        borderColor: "#fff",
    }
});

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(SubirFotoPerfil);

