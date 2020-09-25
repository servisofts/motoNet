import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, TextInput, Image, BackHandler } from 'react-native';
//import * as popupActions from '../../Actions/popupActions'
import Svg from '../../Svg';
import ImagePicker from 'react-native-image-picker';
import FieldsPerfil from '../../component/FieldsPerfil';

class PerfilPage extends Component {

    static navigationOptions = {
        headerShown: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            fotoPerfilUri: false
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        if (this.state.popup) {
            this.props.cerrarPopup();
            this.state.popup = false
            this.setState(this.state);
            return <View />
        }
        this.props.navigation.goBack();
        return <View />
    }

    abrirPopup = (titulo) => {
        this.props.abrirPopup(() => {
            return (
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: "#00c3f3",
                    }}>
                    <Text style={{
                        fontSize: 18,
                    }}>Actualizar Dato</Text>
                    <Text style={{
                        width: "90%",
                        margin: 5,
                        fontSize: 18,
                        textAlign: "left"
                    }}>
                        {titulo}
                    </Text>
                    <TextInput style={{
                        width: "95%",
                        height: 50,
                        borderRadius: 10,
                    }} />
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 50,
                            borderWidth: 3,
                            marginTop: 20,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text>Guardar</Text>
                    </TouchableOpacity>
                </View>
            )
        });
        return <View />
    }

    /* right = () => {
        const rightButtons = [
            <TouchableOpacity
                onPress={() => {
                    this.state.popup = true
                    this.setState(this.stater);
//                     this.abrirPopup()
                 }}
                style={{
                    paddingLeft: 10, backgroundColor: "#00c3f3", width: '100%', height: "100%",
                    borderRadius: 10,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <Text style={{ color: "#fff", fontSize: 10 }}>Editar</Text>
                <Svg name="Editar"
                    style={{
                        width: 20,
                        height: 20,
                        fill: "#fff"
                    }} />
            </TouchableOpacity>
        ];
        return rightButtons;
    } */


    pickPhoto = () => {
        ImagePicker.showImagePicker((response) => {
            const source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.state.fotoPerfilUri = source
            this.setState(this.state);
        });
        return <View />
    }

    render() {
        if (!this.props.state.usuarioReducer.usuarioDatos) {
            return <Text>No existe usuarioDato</Text>
        }
        var objeto = this.props.state.usuarioReducer.usuarioDatos;
        var datos = JSON.parse(objeto.data);

        return (

            <View style={{
                flex: 1,
                backgroundColor: "#fff"
            }}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TouchableOpacity
                        onPress={this.pickPhoto}
                        style={{
                            width: 150,
                            height: 150,
                            borderWidth: 2,
                            borderRadius: 100,
                        }}>
                        {!this.state.fotoPerfilUri ? (
                            <View />
                        ) : (
                                <Image source={this.state.fotoPerfilUri}
                                    style={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: 100,
                                    }} />
                            )
                        }
                    </TouchableOpacity>
                </View>

                <View style={{
                    flex: 2,
                    marginStart: 40,
                    marginEnd: 40
                }}>
                    <FieldsPerfil datos={datos} />
                </View>
            </View>
        );
    }
};
/* const initActions = ({
    ...popupActions
}); */

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(PerfilPage);
