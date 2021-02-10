import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import ButtonServicioComponent from '../../component/ButtonServicioComponent'
import ImgFondoCruces from '../../component/ImgFondoCruces'
import { WebView } from 'react-native-webview';
import ToolTitle from '../../component/ToolTitle';
import urlFoto from '../../Json/index.json';
import { ScrollView } from 'react-native-gesture-handler'
import ButtonSelectComponent from '../../component/ButtonSelectComponent'

export class FarmaciaPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            fotoPerfilUri: "",
        }
    }


    render() {
        return (
            <View style={{
                flex: 1,
            }}>

                <ImgFondoCruces />

                <ToolTitle name="FARMACIA" />

                <ScrollView>

                    <View style={{
                        marginBottom: 60
                    }}>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <ButtonSelectComponent navigation={this.props.navigation} name="Mis cotizaciones de farmacia" page="ListaFarmaciaPage" />
                            <ButtonSelectComponent navigation={this.props.navigation} name="Nueva cotizacion de farmacia" page="SubirRecetaPage" />
                        </View>

                        {/* <View style={{
                            flexDirection: "row"
                        }}>
                            <ButtonSelectComponent />
                        </View> */}
                    </View>
                </ScrollView>
            </View>

        )
    }
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(FarmaciaPage);
