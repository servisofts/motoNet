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
            title: "sf",
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
                backgroundColor: "#fff"
            }}>
                {/* <ImgFondoCruces /> */}
                <ScrollView>
                    <View style={{
                        minHeight: Dimensions.get("window").height,
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            height: Dimensions.get('window').height * 0.25,
                            // backgroundColor: "#ccc"
                        }}>
                            <View style={{
                                width: "70%",
                                height: "65%",
                                borderColor: "#f00",
                                borderWidth: 2,
                                borderRadius: 30,
                                position: "absolute",
                                bottom: 10
                                // justifyContent:"center",
                                // alignItems: "center"
                            }}>
                                <Text style={{
                                    textAlign: "center"
                                }}>
                                    Buen dia! {"\n"} edson {"\n"} en que podemos ayudarte?
                                </Text>
                            </View>

                        </View>

                        <View style={{
                            // backgroundColor: "#ccc"
                        }}>
                            <FlatList
                                data={[
                                    {
                                        page: "InicioPage",
                                        nombreServicio: "TRANSPORTE",
                                        nameSvg: "Consulta"
                                    },
                                    {
                                        page: "InicioPage",
                                        nombreServicio: "PEDIDO",
                                        nameSvg: "Autorizacion"
                                    },
                                    {
                                        page: "InicioPage",
                                        nombreServicio: "MENSAJERIA",
                                        nameSvg: "laboratorio"
                                    },
                                ]}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{
                                            // flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            // backgroundColor:"#ccc"
                                        }}>
                                            <ButtonServicioComponent navigation={this.props.navigation} page={item.page} nombreServicio={item.nombreServicio} nameSvg={item.nameSvg} />
                                        </View>
                                    )
                                }}
                                keyExtractor={(item) => item.id}
                                numColumns={1}
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