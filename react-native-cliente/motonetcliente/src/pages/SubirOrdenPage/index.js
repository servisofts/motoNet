import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs'
import Svg from '../../Svg';
import ImgFondoCruces from '../../component/ImgFondoCruces';
import PopupSeleccionarAsegurado from './PopupSeleccionarAsegurado';
import ModalPage from '../ModalPage';
import UploadFile from '../../UploadFIle';


const SubirOrdenPage = (props) => {


    const [foto, setFoto] = React.useState(false);
    const [fotoUri, setFotoUri] = React.useState(false);
    const [asegurado, setAsegurado] = React.useState(false);
    const [isPopupAsegurado, setisPopupAsegurado] = React.useState(false);
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

    const SubirOrden = () => {

        var exito = true
        var User = props.state.usuarioReducer.usuarioLog;
        if (!User) {
            return "no hay usr";
        }
        if (!asegurado) {
            alert("Necesita seleccionar el asegurado.");
            exito = false;
        }
        if (!foto) {
            alert("Necesita subir una foto de su analisis clinicos");
            exito = false;
        }

        if (exito) {
            UploadFile({
                data: fotoUri,
                type: "image/png",
                name: 'ordenSeguro.png',
                obj: {
                    component: "ordenSeguro",
                    type: "registro",
                    key_usuario: props.state.usuarioReducer.usuarioLog.key,
                    key_seguro: asegurado.key,
                    estado: "cargando"
                }
            });
            // props.state.socketClienteReducer.sessiones["clinica_nj"].send({
            //     component: "ordenSeguro",
            //     type: "registro",
            //     key_usuario: props.state.usuarioReducer.usuarioLog.key,
            //     key_seguro: asegurado.key,
            //     data: foto,
            //     estado: "cargando"
            // }, true);
            // props.navigation.goBack(null);
            // props.navigation.pop()
        }
        return <View />
    }

    const replacePage = () => {
        props.state.ordenReducer.estado = false
        setModalVisible(false)
        props.navigation.goBack(null)
        return <View />
    }

    const estadoCargando = () => {
        if (props.state.ordenReducer.estado == "cargando" && props.state.ordenReducer.type == "registro") {
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
        if (props.state.ordenReducer.estado == "exito" && props.state.ordenReducer.type == "registro") {
            return (
                <ModalPage
                    ventana="ModalSuccess"
                    ModalVisible={modalVisible}
                    replacePage={() => replacePage()}
                    closeModal={() => {
                        props.state.ordenReducer.estado = false
                        setModalVisible(false)
                    }}
                />
            )
        }
    }

    // var obj = props.navigation.state.params.obj;
    const getAsegurado = () => {
        if (!asegurado) {
            return (
                <View />
            )
        }
        return <>
            <Text style={{
                color: "#2C4C7E",
                fontSize: 20,
                fontWeight: "bold",
            }}>
                {/* var doctor = this.props.navigation.state.params.Doctor; */}
                            Nombre: {asegurado.nombre}
            </Text>
            <Text style={{
                color: "#2C4C7E",
                fontSize: 20,
                fontWeight: "bold",
            }}>
                {/* var doctor = this.props.navigation.state.params.Doctor; */}
                            Codigo seguro: {asegurado.codigo}
            </Text>
        </>
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
                    {/* <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: "70%",
                        marginTop: 50
                    }}>
                        <Svg style={{
                            width: 150,
                            height: 150,
                        }} name="logoCompletoRecurso" />
                    </View> */}

                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        marginTop: 30,
                        //backgroundColor: "#ff",
                        width: "70%",
                    }} >
                        <Text style={{
                            color: "#2C4C7E",
                            marginTop: 10,
                            fontSize: 16,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 20,
                        }}>
                            {/* var doctor = this.props.navigation.state.params.Doctor; */}
                            Para registrar una nueva autorizacion {"\n"}  seleccione un asegurado y luego {"\n"}  inserte una foto de la receta.
                        </Text>
                        {getAsegurado()}
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                setisPopupAsegurado(true);
                            }} >
                            <Text style={{
                                textAlign: 'center',
                                color: "#fff",
                                fontSize: 15,
                                fontWeight: "bold",
                            }}>SELECCIONAR ASEGURADO</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        marginTop: 10,
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
                                SubirOrden();
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

            {/* <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={{
                        width: 50,
                        height: 50,
                        position: "absolute",
                        top: 10,
                        left: 10,
                    }}>
                    <Svg name="volver"
                        style={{
                            width: 30,
                            height: 30,
                            fill: "#fff"
                        }} />
                </TouchableOpacity> */}
            <PopupSeleccionarAsegurado visible={isPopupAsegurado}
                onClose={() => {
                    setisPopupAsegurado(false);
                }}
                callback={(obj) => {
                    setAsegurado(obj);
                    setisPopupAsegurado(false);
                }} />
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
        marginTop: 20,
        marginBottom: 20
    },
});

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(SubirOrdenPage);

