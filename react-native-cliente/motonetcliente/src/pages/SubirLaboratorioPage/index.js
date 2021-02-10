import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs'
import Svg from '../../Svg';
import ImgFondoCruces from '../../component/ImgFondoCruces';
import AppParams from '../../Json';
import ModalPage from '../ModalPage';
import UploadFile from '../../UploadFIle';


const SubirLaboratorioPage = (props) => {

    const [foto, setFoto] = React.useState(false);
    const [fotoUri, setFotoUri] = React.useState(false);
    const [estadoFoto, setEstadoFoto] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(true);

    const resize = (image) => {
        ImageResizer.createResizedImage("data:image/jpeg;base64," + image, 1024, 1024, 'PNG', 100).then((uri) => {
            console.log(uri)
            RNFS.readFile(uri.path, 'base64').then((resp) => {
                setFoto(resp);
                setFotoUri(uri);
                setEstadoFoto(false);
                return <View />
            });
        }).catch(err => {
            console.log(err);
        });
        return <View />
    }

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
                setEstadoFoto(true);
                setFoto(false);
                resize(response.data);
                return <View />
            }
        });
    }

    const SubirSeguro = () => {

        var exito = true
        var User = props.state.usuarioReducer.usuarioLog;
        if (!User) {
            return "no hay usr";
        }

        if (!foto) {
            alert("Necesita subir una foto de su laboratorio");
            exito = false;
        }

        if (exito) {
            UploadFile({
                data: fotoUri,
                type: "image/png",
                name: 'laboratorio.png',
                obj: {
                    component: "laboratorio",
                    type: "registro",
                    key_usuario: props.state.usuarioReducer.usuarioLog.key,
                    estado: "cargando"
                }
            });
            // props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
            //     component: "laboratorio",
            //     type: "registro",
            //     key_usuario: props.state.usuarioReducer.usuarioLog.key,
            //     data: foto,
            //     estado: "cargando"
            // }, true);
            // props.navigation.replace("ListaLaboratorioPage");
        }
        return <View />
    }

    const replacePage = () => {
        props.state.laboratorioReducer.estado = false
        setFoto(false)
        setModalVisible(false)
        props.navigation.replace("ListaLaboratorioPage");
        return <View />
    }

    const estadoCargando = () => {
        if (props.state.laboratorioReducer.estado == "cargando" && props.state.laboratorioReducer.type == "registro") {
            return (
                <View style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#00000050",
                    justifyContent: "center",
                    alignItems: "center",
                    position: 'absolute',
                }}>
                    <ActivityIndicator color="#2C4C7E" size="large" />
                </View>
            )
        }
        if (props.state.laboratorioReducer.estado == "exito" && props.state.laboratorioReducer.type == "registro") {
            return (
                <ModalPage
                    ventana="ModalSuccess"
                    ModalVisible={modalVisible}
                    replacePage={() => replacePage()}
                    closeModal={() => {
                        props.state.laboratorioReducer.estado = false
                        setFoto(false)
                        setModalVisible(false)
                    }}
                />
            )
        }
    }

    return (
        <View style={{
            height: "100%"
        }}>
            <ImgFondoCruces />

            <ScrollView>

                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    // backgroundColor:"#ccc"
                }}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: "70%",
                        marginTop: 50
                    }}>
                        {/* <Svg style={{
                            width: 150,
                            height: 150,
                        }} name="logoCompletoRecurso" /> */}
                        <Text style={{
                            textAlign: "center"
                        }}>
                            Inserte una fotografía clara de su orden de laboratorio.
                        </Text>
                        <View style={{
                            height: 1,
                            width: "90%",
                            backgroundColor: '#ccc'
                        }} />

                    </View>

                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        marginTop: 30,
                        //backgroundColor: "#ff",
                        width: "70%",
                    }} >

                        {(!estadoFoto) ? (
                            <Image
                                style={styles.stretch}
                                //source={{ uri: 'data:image/jpeg;base64,' + this.props.state.subirDocReducer.data.foto1 }}
                                source={{ uri: 'data:image/jpeg;base64,' + foto }}
                            />
                        ) : (
                                <View style={styles.stretch}>
                                    <ActivityIndicator color={"#ccc"} size={"large"} />
                                </View>
                            )
                        }

                        {/* <Image
                            style={styles.stretch}
                            //source={{ uri: 'data:image/jpeg;base64,' + this.props.state.subirDocReducer.data.foto1 }}
                            source={{ uri: 'data:image/jpeg;base64,' + foto }}
                        /> */}

                        {/* {this.props.state.usuarioReducer.estado == "cargando" ? (
                            <View style={styles.button}>
                                <ActivityIndicator color="#fff" size="small" />
                            </View >
                        ) : (
                                <ButtonRegistro titulo="REGISTRAR" estilo="sign" click={this.Registrar} />
                            )
                        } */}

                        <TouchableOpacity
                            onPress={pickPhoto}
                            style={{
                                backgroundColor: "#a4a4a4",
                                width: "100%",
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 25,
                                borderWidth: 2,
                                borderColor: "#fff",
                                fontSize: 40
                            }}>
                            <Text style={{
                                textAlign: 'center',
                                color: "#fff",
                                fontSize: 15,
                                fontWeight: "bold"
                            }}>
                                INSERTAR ARCHIVO</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                SubirSeguro();
                            }}
                            style={styles.button}>
                            <Text style={{
                                textAlign: 'center',
                                color: "#fff",
                                fontSize: 15,
                                fontWeight: "bold",
                            }}>
                                CONFIRMAR </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            { estadoCargando()}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: "90%",
        backgroundColor: '#02ACE9',
        borderRadius: 40,
        alignItems: "center"
    },
    text: {
        color: '#fff',
        textAlign: "center",
        width: "70%",

    },
    stretch: {
        height: 150,
        width: "100%",
        marginBottom: 20,
        backgroundColor: "#DAE8FB",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    contenedorInput: {
        marginTop: 20,
        width: "100%",
        alignItems: "center"
    },
    Input: {
        backgroundColor: "#DAE8FB",
        borderRadius: 30,
        color: "#000",
        borderColor: "#2C4C7E",
        borderWidth: 1,
        padding: 10,
        width: "100%"
    },
    error: {
        backgroundColor: "#DAE8FB",
        borderRadius: 30,
        color: "#000",
        borderColor: "red",
        borderWidth: 1,
        padding: 10,
        width: "100%"
    },
    button: {
        backgroundColor: "#2C4C7E",
        width: "100%",
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        fontSize: 40,
        marginTop: 20
    },
});

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(SubirLaboratorioPage);

