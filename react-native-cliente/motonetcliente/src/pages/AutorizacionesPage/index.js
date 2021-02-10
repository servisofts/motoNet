import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import Svg from '../../Svg'
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs'
import SubirDocumentoPage from '../SubirDocumentoPage';
import ImgFondoCruces from '../../component/ImgFondoCruces';
import ToolTitle from '../../component/ToolTitle';
import EsperarFoto from '../../component/EsperarFoto';
import urlFoto from '../../Json/index.json';
import ButtonSelectComponent from '../../component/ButtonSelectComponent';

class AutorizacionesPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            fotoPerfilUri: "",
        }
    }

    componentDidMount() {

    }



    render() {
        return (

            <View style={{
                flex: 1,
                backgroundColor: "#fff"
            }}>

                <ImgFondoCruces />

                <ToolTitle name="AUTORIZACIONES DE SEGUROS" />

                <ScrollView>

                    <View style={{
                        marginBottom: 60
                    }}>
                        <View style={{
                            flexDirection: "row"
                        }}>

                            <ButtonSelectComponent navigation={this.props.navigation} name="Mis autorizaciones" page="AutorizacionesListaPage" />
                            <ButtonSelectComponent navigation={this.props.navigation} name="Mis asegurados" page="ListaSeguroPage" />
                        </View>
                    </View>
                </ScrollView>

            </View>


        )
    }
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(AutorizacionesPage);
