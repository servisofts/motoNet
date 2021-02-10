import React, { Component } from 'react'
import { Linking, Text, View } from 'react-native'
import ButtonServicioComponent from '../../component/ButtonServicioComponent'
import ImgFondoCruces from '../../component/ImgFondoCruces'
import { WebView } from 'react-native-webview';
import ToolTitle from '../../component/ToolTitle';

class LaboratorioWedPage extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
            }}>

                <ToolTitle name="LABORATORIO" />

                <Text style={{ color: 'blue' }}
                    onPress={() => Linking.openURL('https://laboratorio.clinicaninojesus.com')}>
                    Google</Text>
                {/* 
                <WebView
                    source={{
                        uri: 'https://laboratorio.clinicaninojesus.com'
                    }}
                /> */}
            </View>
        )
    }
}

export default LaboratorioWedPage
