import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import ButtonComponent from '../../component/ButtonComponent';
import ButtonServicioComponent from '../../component/ButtonServicioComponent';
import ImgFondoCruces from '../../component/ImgFondoCruces';
import Svg from '../../Svg'
import NaviDrawer from '../../component/NaviDrawer';
import ImgComponent from '../../component/ImgComponent';
import CarouselPage from '../CarouselPage';


class ServicioPage extends Component {

    static navigationOptions = ({ navigation }) => (
        navigation.state.prop ? ({ ...navigation.state.prop }) : {}
    );

    constructor(props) {
        super(props);
        props.state.navigationReducer.setParams(props.navigation, {
            title: "Inicio",
            headerShown: false,
            headerTitleStyle: {
                color: '#fff',
            },
        })
    }



    render() {
        return (

            <View style={{
                flex: 1,
            }}>

                <ImgFondoCruces />

                <ScrollView>
                    <View style={{
                        minHeight: Dimensions.get("window").height,
                    }}>
                        <View style={{
                            flexDirection: "row",
                            // justifyContent: "space-evenly",
                            // height: 200,
                            marginTop: Dimensions.get('window').width * 0.08,
                            // alignItems:"center"
                            // backgroundColor:"#ccc"
                        }}>
                            {/* <ButtonServicioComponent navigation={this.props.navigation} page="ConsultaPage" nombreServicio={"CONSULTA DE \n ESPECIALISTA"} nameSvg="farmacia" /> */}

                            <ButtonComponent name={"BtnSos"} onPress={() => {
                                this.props.navigation.navigate("ConfirmarUbicacionPage");
                                // alert("sd")
                            }} relleno={() => {
                                return (
                                    <Text style={estilos.sos}>
                                        SOS
                                    </Text>
                                )
                            }} />
                        </View>

                        <View style={{
                            // backgroundColor: "#ccc"
                        }}>
                            <FlatList
                                data={[
                                    {
                                        page: "ConsultaPage",
                                        nombreServicio: "CONSULTA DE \n ESPECIALISTA",
                                        nameSvg: "Consulta"
                                    },
                                    {
                                        page: "AutorizacionesPage",
                                        nombreServicio: "AUTORIZACIONES \n DE SEGURO",
                                        nameSvg: "Autorizacion"
                                    },
                                    {
                                        page: "LaboratorioPage",
                                        nombreServicio: "LABORATORIO",
                                        nameSvg: "laboratorio"
                                    },
                                    {
                                        page: "AnalisisPage",
                                        nombreServicio: "IMAGENOLOGIA",
                                        nameSvg: "imagenologia"
                                    },
                                    {
                                        page: "FarmaciaPage",
                                        nombreServicio: "FARMACIA",
                                        nameSvg: "farmacia"
                                    },
                                    {
                                        page: "CentroDeAtencionPage",
                                        nombreServicio: "CONTÁCTENOS",
                                        nameSvg: "centroAtencion"
                                    }
                                ]}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{
                                            flex: 0.5,
                                            justifyContent: "center",
                                            alignItems: "center",

                                        }}>
                                            <ButtonServicioComponent navigation={this.props.navigation} page={item.page} nombreServicio={item.nombreServicio} nameSvg={item.nameSvg} />
                                        </View>
                                    )
                                }}
                                keyExtractor={(item) => item.id}
                                numColumns={3}
                                style={{
                                    width: "100%"
                                }}
                            />

                        </View>

                        <View style={{
                            width: "100%",
                            flex: 1,
                            justifyContent: "flex-end",
                            // backgroundColor: "#777"
                        }}>
                            {/* <ImgComponent name="logo2" /> */}
                            <CarouselPage />
                        </View>

                    </View>
                </ScrollView>


                <TouchableOpacity
                    onPress={() => {
                        this.props.state.naviDrawerReducer.openBar();
                        //alert("sdfdsf");
                    }}
                    style={{
                        width: 60,
                        height: 60,
                        position: "absolute",
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: 0,
                        left: 0,
                        //backgroundColor: "#ccc"
                    }} >
                    <Svg name="Menu"
                        style={{
                            width: 20,
                            height: 20,
                            fill: "#000",
                        }} />
                </TouchableOpacity>
                <NaviDrawer navigation={this.props.navigation} />
            </View>
        );
    }
}

const estilos = StyleSheet.create({
    sos: {
        color: "#fff",
        fontSize: Dimensions.get("window").width * 0.12,
        fontWeight: "bold",
        position: "absolute",
        // backgroundColor:"#000"    
    },
});


const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ServicioPage);