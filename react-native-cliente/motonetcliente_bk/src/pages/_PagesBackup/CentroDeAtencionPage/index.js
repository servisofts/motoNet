import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Linking } from 'react-native'
import ButtonServicioComponent from '../../component/ButtonServicioComponent'
import ImgFondoCruces from '../../component/ImgFondoCruces'
import LineHorizontal from '../../component/LineHorizontal'
import ToolTitle from '../../component/ToolTitle'
import Svg from '../../Svg'

export class CentroDeAtencionPage extends Component {


    render() {
        var phoneNumber = 33366969;
        return (
            <View style={{
                flex: 1,
            }}>
                <ImgFondoCruces />

                <ToolTitle name="CONTACTANOS" />

                <View style={{
                    flexDirection: "row",
                    width: "100%",
                    // alignItems:"center",
                    justifyContent: "center"
                }}>
                    <View style={{
                        width: "80%",
                        backgroundColor: "#2C4C7E",
                        paddingTop: 20,
                        paddingBottom: 20,
                        marginTop: 50,
                        borderRadius: 20,
                        // marginLeft: 40
                    }}>

                        <View style={{
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Svg name="Phone"
                                style={{
                                    width: 30,
                                    height: 30,
                                    //backgroundColor: "#000"
                                }} />

                            <Text style={{
                                color: "#fff",
                                fontSize: 25,
                                fontWeight: "bold",
                                fontStyle: "italic",
                                paddingLeft: 10
                                // /backgroundColor:"#ccc"
                            }}>
                                {phoneNumber}
                            </Text>
                        </View>


                        <View style={{
                            width: "100%",
                            alignItems: "center",
                            marginTop: 20
                        }}>
                            <TouchableOpacity onPress={() => {
                                Linking.openURL(`tel:${phoneNumber}`)
                            }}
                                style={{
                                    backgroundColor: "#fff",
                                    width: 100,
                                    height: 100,
                                    borderRadius: 100,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                <Text style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    color: "#2C4C7E"
                                }}>
                                    LLAMAR
                            </Text>
                            </TouchableOpacity>

                        </View>

                        <Text style={{
                            color: "#fff",
                            fontSize: 20,
                            fontWeight: "bold",
                            fontStyle: "italic",
                            textAlign: "center",
                            marginTop: 20,
                            marginBottom: 10
                            // /backgroundColor:"#ccc"
                        }}>
                            UBICACION
                        </Text>

                        <Text style={{
                            color: "#fff",
                            fontSize: 12,
                            fontWeight: "bold",
                            fontStyle: "italic",
                            marginLeft: 15,
                            marginRight: 15,
                            marginBottom: 10
                            // /backgroundColor:"#ccc"
                        }}>
                            CNJ1: Av.Cañoto esq. rafaél Peña{"\n"}
                                CNJ2: Calle Ballivián
                                </Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default CentroDeAtencionPage
