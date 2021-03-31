import React from 'react';
import { Platform, View, Text, Modal, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../Svg';
import ConfirmarViaje from '../ConfirmarViaje';
import AppParams from '../../Json/index.json'

const NaviDrawe = (props) => {

    const [isVisible, setVisible] = React.useState(false);


    props.state.naviDrawerReducer.openBar = () => {
        setVisible(true);
        return <View />
        //llamar al action abrirnavidraer  y el action manda al reducer navidrawerreducer y el cambia el estado isOpen por true o false
    }

    if (!isVisible) {
        return <View></View>
    }

    const handleClick = (item) => {
        switch (item) {
            case "PerfilPage":
                props.navigation.navigate(item)
                setVisible(false);
                return <View />
            case "HistorialViajesPage":
                props.navigation.navigate(item);
                setVisible(false);
                return <View />
            case "CerrarSesion":
                AsyncStorage.removeItem(AppParams.storage.usuarioLog);
                props.state.usuarioReducer.usuarioLog = false;
                props.state.usuarioReducer.estado = "";
                props.state.backgroundLocationReducer.close();
                props.state.usuarioReducer.usuarioCargado=false;
                props.dispatch(
                    {
                        component:"clearReducer",
                        type:"cerrar_sesion"
                    }
                );
                props.navigation.replace("CargaPage");
                return <View />
            case "AyudaPage":
                props.navigation.navigate(item);
                setVisible(false);
                return <View />
        }
    }

    var letra = "#fff";
    var colorContainer = "red";
    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            style={{
                border: 0,
            }}
        >
            <View style={{
                width: Dimensions.get("window").width, height: "100%",
                position: "absolute",
                top: 0,
            }} >
                <TouchableWithoutFeedback onPress={() => {
                    setVisible(false);
                }} style={{ flex: 1 }}>
                    <View style={styles.contenedors2}>
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.contenedors}>

                    <SafeAreaView style={{
                        padding: 0,
                        flex: 1,
                        width: "100%",
                        margin: 0,
                    }}>
                        <ScrollView style={{
                            flex: 1,
                            width: "100%",
                            height: "100%",
                        }}>
                            <View style={{
                                flex: 1,
                                paddingBottom:100,
                            }}>

                                <View style={{
                                    flex: 1,
                                    alignItems: "center",
                                    height: 200,
                                    justifyContent: "center"
                                }}>
                                    <Svg name="logoRecurso"
                                        style={{
                                            width: 130,
                                            height: 130,
                                        }} />
                                </View>

                                <View style={{
                                    flex: 1,
                                    marginStart: 20
                                }}>
                                    <TouchableOpacity style={styles.sty}
                                        onPress={() => { handleClick("PerfilPage") }}>
                                        <Text style={styles.texto} >Perfil</Text>
                                    </TouchableOpacity >

                                    <TouchableOpacity style={styles.sty} onPress={() => { handleClick("HistorialViajesPage") }} >
                                        <Text style={styles.texto}>Historial Viajes </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.sty} onPress={() => { handleClick("AyudaPage") }} >
                                        <Text style={styles.texto}>Ayuda</Text>
                                    </TouchableOpacity>
                                    {/*
                                    <TouchableOpacity style={styles.sty}>
                                        <Text style={{
                                            marginTop: 10,
                                            fontWeight: "bold",
                                            fontSize: 20,
                                            color: "#2c4b81",
                                        }} >Configuración</Text>
                                    </TouchableOpacity>*/}

                                    <TouchableOpacity style={styles.sty}
                                        onPress={() => { handleClick("CerrarSesion") }}>
                                        <Text style={{
                                            marginTop: 10,
                                            fontWeight: "bold",
                                            fontSize: 20,
                                            color: "#f99",
                                        }} >Cerrar Sesión</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    sty: {
        marginTop: 40,
        width: "100%",
        fontWeight: 'bold',
        fontSize: 18,
        color: "#f00",
    },
    texto: {
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 20,
        color: "#f00",
    },
    logo: {
        height: 150,

        width: "100%",
        fontWeight: 'bold',
        padding: 10,
        fontSize: 18,
        color: "#f00"
    },
    contenedors: {
        position: "absolute",
        flex: 1,
        width: 200,
        maxWidth: 200,
        height: "100%",
        minHeight: Dimensions.get("window").height,
        borderRightWidth: 1,
        borderRightColor: "#888",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
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


export default connect(initStates)(NaviDrawe);