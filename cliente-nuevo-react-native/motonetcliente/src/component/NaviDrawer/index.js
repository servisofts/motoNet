import React, { useRef } from 'react';
import { Platform, Image, View, Text, Modal, StyleSheet, Animated, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../Svg';
/* import urlFoto from '../../Json/index.json'; */
import ButtonNavi from './ButtonNavi';

const NaviDrawer = (props) => {
    const [isVisible, setVisible] = React.useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;


    if (!props.state.naviDrawerReducer.openBar) {
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
    var url = "";
    // if (props.state.usuarioReducer.usuarioDatos["Foto perfil"]) {
        //error no existe foto    
        // return <View />
        //url = urlFoto.urlImages + props.state.usuarioReducer.usuarioDatos["Foto perfil"].dato + `?type=getPerfil&key_usuario=${props.state.usuarioReducer.usuarioDatos["Foto perfil"].key_usuario}&date=${Date.now()}`;
    // }

    var nombreUsuario = "";
    // if (props.state.usuarioReducer.usuarioDatos["Nombres"]) {
    //     nombreUsuario = props.state.usuarioReducer.usuarioDatos["Nombres"].dato + " " + props.state.usuarioReducer.usuarioDatos["Apellidos"].dato;
    // }


    const handleClick = (item) => {
        console.log("asad")
        switch (item) {
            case "PerfilPage":
                props.state.navigationReducer.navigate(item)
                setVisible(false);
                return <View />
            case "AyudaPage":
                props.state.navigationReducer.navigate(item)
                setVisible(false);
                return <View />
            case "Cerrar":
                setVisible(false);
                AsyncStorage.removeItem("glup_usuario")
                props.state.usuarioReducer.usuarioLog = false
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
            }}
        >
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

                                    <View style={{
                                    }}>
                                        <Image style={{
                                            width: 130,
                                            height: 130,
                                            borderRadius: 100,
                                            borderWidth: 5,
                                            borderColor: "#fff",
                                        }} source={{
                                            uri: url
                                        }} />
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
                                            color: "#00b3de"
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

                                            <View style={{
                                                flexDirection: "row"
                                            }}>
                                                <Svg name="START"
                                                    style={{
                                                        width: 25,
                                                        height: 25,
                                                    }} />
                                                <Svg name="START"
                                                    style={{
                                                        width: 25,
                                                        height: 25,
                                                    }} />
                                                <Svg name="START"
                                                    style={{
                                                        width: 25,
                                                        height: 25,
                                                    }} />
                                                <Svg name="START"
                                                    style={{
                                                        width: 25,
                                                        height: 25,
                                                    }} />
                                                <Svg name="START"
                                                    style={{
                                                        width: 25,
                                                        height: 25,
                                                    }} />
                                            </View>
                                        </Text>
                                    </View>
                                </View>

                                <View style={{
                                    height: "100%",
                                    width: "80%",
                                }}>

                                    <View style={{
                                        height: 1,
                                        backgroundColor: '#ccc'
                                    }} />

                                    <ButtonNavi svg="NOTIFICACIONES" Nombre="NOTIFICACINES" onPress={handleClick} />

                                    <View style={{
                                        height: 1,
                                        backgroundColor: '#ccc'
                                    }} />

                                    <View style={{
                                        height: 50,
                                    }} />

                                    <View style={{
                                        height: 1,
                                        backgroundColor: '#ccc'
                                    }} />

                                    <ButtonNavi svg="TUSGLUP" Nombre="TUS GLUP" onPress={handleClick} pagina="" />

                                    <View style={{
                                        height: 1,
                                        backgroundColor: '#ccc'
                                    }} />

                                    <ButtonNavi svg="MICUENTA" Nombre="MI CUENTA" onPress={handleClick} pagina="PerfilPage" />

                                    <View style={{
                                        height: 1,
                                        backgroundColor: '#ccc'
                                    }} />

                                    <ButtonNavi svg="PAGO" Nombre="PAGO" onPress={handleClick} pagina="" />

                                    <View style={{
                                        height: 1,
                                        backgroundColor: '#ccc'
                                    }} />

                                    <ButtonNavi svg="COMPARTIR" Nombre="COMPARTIR CON AMIGOS" onPress={handleClick} pagina="" />

                                    <View style={{
                                        height: 1,
                                        backgroundColor: '#ccc'
                                    }} />

                                    <ButtonNavi svg="AYUDA" Nombre="AYUDA" onPress={handleClick} pagina="" />

                                    <View style={{
                                        height: 1,
                                        backgroundColor: '#ccc'
                                    }} />

                                    <ButtonNavi svg="MICUENTA" Nombre="SALIR" onPress={handleClick} pagina="Cerrar" />

                                    <View style={{
                                        height: 1,
                                        backgroundColor: '#ccc'
                                    }} />

                                </View>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
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
        minHeight: Dimensions.get("window").height,
        borderRightWidth: 1,
        borderRightColor: "#888",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fffffff1"
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