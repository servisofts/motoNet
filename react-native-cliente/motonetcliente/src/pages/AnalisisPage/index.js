import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import ImgFondoCruces from '../../component/ImgFondoCruces'
import ToolTitle from '../../component/ToolTitle';
import urlFoto from '../../Json/index.json';
import { ScrollView } from 'react-native-gesture-handler'
import ButtonSelectComponent from '../../component/ButtonSelectComponent';

export class AnalisisPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fotoPerfilUri: "",
        }
    }

    componentDidMount() {
        // if (!this.props.state.usuarioReducer.data[obj.key_doctor]) {
        //     if (this.props.state.usuarioReducer.estado == "cargando") {
        //         return <Text>Cargando</Text>
        //     }
        //     this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
        //         component: "usuario",
        //         type: "getById",
        //         key: obj.key_doctor,
        //         cabecera: "registro_doctor",
        //         estado: "cargando"
        //     }, true);
        //     return <View />
        // }
        // if(){

        // }
        // this.props.state.socketClienteReducer.sessiones["clinica_nj"].send({
        //     component: "analisis",
        //     type: "getAllByUsuario",
        //     key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        //     estado: "cargando"
        // }, true);
    }
    render() {
        return (
            <View style={{
                flex: 1,
            }}>

                <ImgFondoCruces />

                <ToolTitle name="IMAGENOLOGIA" />

                <ScrollView>

                    <View style={{
                        marginBottom: 60
                    }}>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <ButtonSelectComponent navigation={this.props.navigation} name="Mis cotizaciones de imagenologia" page="ListaAnalisisPage" />
                            <ButtonSelectComponent navigation={this.props.navigation} name="Nueva cotizacion de imagenologia" page="SubirAnalisisPage" />
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

export default connect(initStates)(AnalisisPage);
