import React from 'react';
import { Platform, View, Text, Modal, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../Svg';


const NaviDrawe = (props) => {

    const [isVisible, setVisible] = React.useState(false);


    
    if (!props.state.naviDrawerReducer.openBar) {
        props.state.naviDrawerReducer.openBar = () => {
            setVisible(true);
            return <View />
            //llamar al action abrirnavidraer  y el action manda al reducer navidrawerreducer y el cambia el estado isOpen por true o false
        }
    }
    if (!isVisible) {
        return <View></View>
    }
    const handleClick = (pros)=>{

    }
    var letra = "#fff";
    var colorContainer = "red";
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            style={{ border: 0 ,
            }}
        >
            <View style={{ width: Dimensions.get("window").width, height: "100%", position: "absolute", top: 0 ,}} >
                <TouchableWithoutFeedback onPress={() => {
                    setVisible(false);
                }} style={{ flex: 1 }}>
                    <View style={styles.contenedors2}>
                    </View>
                </TouchableWithoutFeedback>
                <View style={[styles.contenedors, { backgroundColor: colorContainer, }]}>
                    <SafeAreaView style={{ padding: 0, flex: 1, width: "100%", margin: 0, }}>
                        <ScrollView style={{ flex: 1, width: "100%", height: "100%" }}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                paddingBottom: 50,
                            }}>
                                <View style={{
                                    width: "80%",
                                     paddingTop: 20,
                                    paddingBottom: 50,
                                    alignItems: "center",
                                }}>
                                    <Svg name="Logo"
                                        style={{
                                            width: 130,
                                            height: 130,
                                        }} />
                                    <TouchableOpacity style={styles.sty} onPress={() => { handleClick("Inicio") }}>
                                        <Text style={{ fontSize: 20, color: letra }} >Perfil</Text>
                                    </TouchableOpacity >
                                    <TouchableOpacity style={styles.sty} onPress={() => { handleClick("ListaCertificado") }} >
                                        <Text style={{ fontSize: 20, color: letra }}>Ayuda </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.sty} onPress={() => { handleClick("ListaAplicacion") }} >
                                        <Text style={{ fontSize: 20, color: letra }}>Aplicaciones</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.sty} onPress={() => { handleClick("ListaSiniestro") }} >
                                        <Text style={{ fontSize: 20, color: letra }}>Prueba</Text>
                                    </TouchableOpacity>
                        


                                    <TouchableOpacity style={styles.sty}>
                                        <Text style={{
                                            marginTop: 10,
                                            fontWeight: "bold",
                                            fontSize: 20,
                                            color: "#fff",
                                        }} >Salir</Text>
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
        color: "#6e367e",
        alignItems: "center"
    },
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
        width: 500,
        maxWidth: 150,
        height: "100%",
        minHeight: Dimensions.get("window").height,

        borderRightWidth: 1,
        borderRightColor: "#888",
        justifyContent: "center",

        alignItems: "center",
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