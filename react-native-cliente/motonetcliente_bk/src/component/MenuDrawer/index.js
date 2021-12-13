import React, { useRef } from 'react';
import { Platform, Image, View, Text, Modal, StyleSheet, Animated, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../Svg';
import urlFoto from '../../Json/index.json';
import ButtonNavi from './ButtonNavi';

const NaviDrawer = (props) => {

    const [isVisible, setVisible] = React.useState(false);
    const [isInstance, setIsInstance] = React.useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    if (!isInstance) {
        props.dispatch({
            component: "naviDrawer",
            type: "addOpen",
            openBar: () => {
                setVisible(true);
                Animated.timing(fadeAnim, {
                    toValue: 500,
                    duration: 100
                }).start();
                //llamar al action abrirnavidraer  y el action manda al reducer navidrawerreducer y el cambia el estado isOpen por true o false
            }
        })
        setIsInstance(true);
        return <View />
    }
    // if (!props.state.usuarioReducer.usuarioDatos) {
    //     return <View />
    // }
    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds

    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 5 seconds

    };
    if (!isVisible) {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000
        }).start();
        // setVisible(true)
        // return <View></View>
    }

    if (!props.state.usuarioReducer.usuarioDatos) {
        return <View />
    }

    var nombreUsuario = "";
    if (props.state.usuarioReducer.usuarioDatos["Nombres"]) {
        nombreUsuario = props.state.usuarioReducer.usuarioDatos["Nombres"].dato + " " + props.state.usuarioReducer.usuarioDatos["Apellidos"].dato;
    }

    const getFotoPerfil = () => {
        if (!props.state.usuarioReducer.usuarioDatos["Foto perfil"]) {
            //error no existe foto    
            return <View />
        }
        var url = urlFoto.urlImages + props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato + `?type=getPerfil&key_usuario=${props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario}&date=${Date.now()}`;
        return (<Image source={{ uri: url }}
            style={{
                width: 100,
                height: 100,
                borderRadius: 200,
                borderWidth: 0,
            }} />
        )
    }


    const handleClick = (item) => {
        switch (item) {
            case "PerfilPage":
                props.state.navigationReducer.navigate(item)
                setVisible(false);
                return <View />
            case "AyudaPage":
                props.state.navigationReducer.navigate(item)
                setVisible(false);
                return <View />
            case "ListaConsultaPage":
                props.state.navigationReducer.navigate(item)
                setVisible(false);
                return <View />
            case "Cerrar":
                setVisible(false);
                AsyncStorage.removeItem("clinica_usuarioLog")
                props.state.usuarioReducer.usuarioLog = false
                props.state.usuarioReducer.usuarioDatos = false;
                props.state.usuarioReducer.cargaLoaded = true
                props.state.navigationReducer.replace("CargaPage")
                return <View />
        }
    }

    return (

        <Modal
            transparent={true}
            visible={isVisible}

            style={{
                position: "absolute",
                border: 0,
            }}>




            <View style={{
                width: Dimensions.get("window").width, height: "100%", position: "absolute", top: 0,
            }} >
                <TouchableWithoutFeedback onPress={() => {
                    setVisible(false);
                }} style={{
                    flex: 1
                }}>
                    <View style={styles.contenedors2}>
                    </View>

                </TouchableWithoutFeedback>


                <View style={styles.contenedors}>

                    <ScrollView style={{
                        height: "100%",
                        width: "100%"
                    }}>

                        <SafeAreaView style={{
                            flex: 1,
                            width: "100%",
                        }}>
                            <ScrollView style={{
                                flex: 1,
                                width: "100%",
                                height: "100%"
                            }}>
                                <View style={{
                                    alignItems: "center"
                                }} >
                                    <View style={{
                                        height: 280,
                                        width: "100%",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>

                                        <View
                                            style={{
                                                width: 100,
                                                height: 100,
                                                borderWidth: 1,
                                                borderRadius: 100,
                                                margin: 10,
                                                padding: 0,
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}>
                                            {getFotoPerfil()}
                                        </View>

                                        <View style={{
                                            marginTop: 20,
                                            width: "80%",
                                            alignItems: "center",
                                        }}>
                                            <Text style={{
                                                fontSize: 18,
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                color: "#2C4C7E"
                                            }}>
                                                {nombreUsuario}
                                            </Text>
                                        </View>
                                        <View style={{
                                            marginTop: 10,
                                            alignItems: "center",
                                        }}>
                                            <Text style={{
                                                fontSize: 20,
                                                fontWeight: "normal",
                                                textAlign: "center"
                                            }}>
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{
                                        height: "100%",
                                        width: "85%",
                                    }}>

                                        <View style={{
                                            height: 1,
                                            backgroundColor: '#ccc'
                                        }} />

                                        {/* <ButtonNavi svg="logoRecurso" Nombre="NOTIFICACINES" onPress={handleClick} />

                                        <View style={{
                                            height: 1,
                                            backgroundColor: '#ccc'
                                        }} /> */}

                                        <ButtonNavi svg="Consulta" Nombre="MIS CONSULTAS" onPress={handleClick} pagina="ListaConsultaPage" />

                                        <View style={{
                                            height: 1,
                                            backgroundColor: '#ccc',
                                        }} />

                                        <ButtonNavi svg="MiCuenta" Nombre="MI CUENTA" onPress={handleClick} pagina="PerfilPage" />

                                        <View style={{
                                            height: 1,
                                            backgroundColor: '#ccc'
                                        }} />


                                        <ButtonNavi svg="Ayuda" Nombre="AYUDA" onPress={handleClick} pagina="" />

                                        <View style={{
                                            height: 1,
                                            backgroundColor: '#ccc'
                                        }} />

                                        <ButtonNavi svg="Salir" Nombre="SALIR" onPress={handleClick} pagina="Cerrar" color="#944" />

                                        <View style={{
                                            height: 1,
                                            backgroundColor: '#ccc'
                                        }} />

                                    </View>
                                </View>
                            </ScrollView>
                        </SafeAreaView>
                    </ScrollView>
                </View>
            </View>
        </Modal >
    );
}

const styles = StyleSheet.create({
    logo: {
        height: 150,
        width: "100%",
        fontWeight: 'bold',
        padding: 10,
        fontSize: 18,
        color: "#6e367e"
    },
    contenedors: {
        position: "absolute",
        flex: 1,
        width: "60%",
        height: "100%",
        // minHeight: Dimensions.get("window").height,
        borderRightWidth: 1,
        borderRightColor: "#888",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    menus: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    contenedors2: {
        position: "absolute",
        width: "100%",
        right: 0,
        top: 0,
        height: "100%",
        minHeight: Dimensions.get("window").height,
        paddingTop: 50,
    },
});

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(NaviDrawer);