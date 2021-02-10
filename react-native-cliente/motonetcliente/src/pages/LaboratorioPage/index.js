import React, { Component } from 'react'
import { Text, View, ScrollView, Linking, Dimensions } from 'react-native'
import ButtonServicioComponent from '../../component/ButtonServicioComponent'
import ImgFondoCruces from '../../component/ImgFondoCruces'
import ToolTitle from '../../component/ToolTitle';
import ButtonSelectComponent from '../../component/ButtonSelectComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';

class LaboratorioPage extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
            }}>

                <ImgFondoCruces />

                <ToolTitle name="LABORATORIO" />

                <ScrollView>

                    <View style={{
                        marginBottom: 60
                    }}>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <ButtonSelectComponent navigation={this.props.navigation} name="Mis cotizaciones de laboratorio" page="ListaLaboratorioPage" />
                            <ButtonSelectComponent navigation={this.props.navigation} name="Nueva cotizacion de laboratorio" page="SubirLaboratorioPage" />
                        </View>

                        <View style={{
                            flexDirection: "row"
                        }}>
                            {/* <ButtonSelectComponent navigation={this.props.navigation} name="Resultados de laboratorio" page="LaboratorioWedPage" /> */}
                            <View style={{
                                flex: 0.5,
                                marginBottom: 0,
                                marginBottom: 10,
                                // backgroundColor: "#ccc",
                            }}>
                                <View style={{
                                    margin: 5,
                                    borderColor: "#bfbfbf",
                                    borderWidth: 1.5,
                                    // elevation:2,
                                    borderRadius: 8,
                                    height: Dimensions.get("window").height * 0.3,
                                    // backgroundColor: "#ccc",
                                }}>
                                    <TouchableOpacity
                                        style={{
                                            // backgroundColor: "#000",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                            height: "100%",
                                            padding: 10,
                                        }}
                                        onPress={() => {
                                            // props.navigation.navigate(props.page);
                                            Linking.openURL('https://laboratorio.clinicaninojesus.com')
                                        }}>
                                        <Text style={{
                                            color: "#2C4C7E",
                                            textAlign: "center",
                                            fontSize: Dimensions.get("window").width * 0.05
                                        }}>
                                            Resultados de laboratorio</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default LaboratorioPage
