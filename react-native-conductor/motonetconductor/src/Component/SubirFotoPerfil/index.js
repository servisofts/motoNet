import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Svg from '../../Svg';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'
import AppParams from "../../Json"
import Boton1 from '../Boton1';

var cabecera = "registro_conductor";
const SubirFotoPerfil = (props) => {
    const [foto, setFoto] = React.useState(false)
    const Repuesta = (text) => {
        // props.setComponent(text)
        return <View />
    };

    useEffect(() => {
        pickPhoto()
    }, [])

    const pickPhoto = () => {
        var options = {
            title: 'Seleccionar una Foto',
            takePhotoButtonTitle: "Tomar Foto...",
            chooseFromLibraryButtonTitle: "Elegir de la Biblioteca...",
            allowEditing: true,
            mediaType: 'foto',
            rotation:0,
            cancelButtonTitle: "Cancelar",
            storageOptions: {
                skipBackup: true,
                path: 'image',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                props.handleClik(false)
                return <View />
            } else if (response.error) {
                return <View />
            } else if (response.customButton) {
                return <View />
            } else {
                setFoto(response.data)

                // ImageResizer.createResizedImage("data:image/jpeg;base64," + response.data, 400, 400, 'PNG', 100).then((uri) => {
                //     //console.log(uri)
                //     RNFS.readFile(uri.path, 'base64').then((resp) => {
                //         //console.log(resp)
                //     });

                // }).catch(err => {
                //     console.log(err);
                // });
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
                var key = "undefined";
                var cabecera = "registro_conductor";
                // console.log(this.props.state.cabecreraDatoReducer.data[cabecera])
                for (
                    let i = 0;
                    i < props.state.cabeceraDatoReducer.data[cabecera].length;
                    i++
                ) {
                    const obj = props.state.cabeceraDatoReducer.data[cabecera][i];
                    if (obj.dato.descripcion == keyDescripcion) {
                        return obj;
                    }
                }
                return {
                    key,
                };
            };
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
                key_datos: ["Foto perfil"]
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

    const getDatoCabecera = () => {

        if (props.state.cabeceraDatoReducer.estado == "cargando") {
            return <View />;
        }
        if (!props.state.cabeceraDatoReducer.data["registro_conductor"]) {
            var objSend = {
                component: "cabeceraDato",
                type: "getDatoCabecera",
                estado: "cargando",
                cabecera: "registro_conductor",
            };
            props.state.socketClienteReducer.sessiones[AppParams.socket.name].send(
                objSend,
                true
            );
            return <View />;
        }
        // console.log("juan" + JSON.stringify(props.state.cabeceraDatoReducer.data["registro_conductor"]))
        return <View />;

    };

    if (!foto) {
        return <View />
    }

    return (

        <View style={styles.Model}>

            <View style={styles.container} >
                {getDatoCabecera()}
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
                                width: 100,
                                height: 100,
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
                                SUBIR ARCHIVOs</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{
                        flexDirection: "row",
                        flex: 1,
                        width: "100%",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        // backgroundColor: "#ccc"
                    }}>

                        <View style={{
                            width: 100
                        }}>
                            <Boton1
                                label="Subir foto"
                                type="1"
                                onPress={pickPhoto}
                                cargando={false}
                            />
                        </View >

                        <View style={{
                            width: 100
                        }}>
                            <Boton1
                                label="Enviar"
                                type="4"
                                onPress={EnviarPhoto}
                                cargando={false}
                            />
                        </View>

                    </View>
                )}

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
                    <Svg name="Cerrar"
                        style={{
                            width: 20,
                            height: 20,
                            // margin: 1,
                            // fill: "#fff"
                        }} />
                </TouchableOpacity>
            </View>

        </View >
    )
}

const styles = StyleSheet.create({

    container: {
        width: 300,
        maxWidth: 400,
        height: 220,
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: "#fff",
        borderRadius: 20
    },

    Model: {
        flex: 1,
        width: "100%",
        height: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000080"
    },

});

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(SubirFotoPerfil);

