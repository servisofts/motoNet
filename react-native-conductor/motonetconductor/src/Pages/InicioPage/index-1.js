import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Animated,Keyboard } from 'react-native';
import Inicio from '../../Component/Inicio';
import NaviDrawer from '../../Component/NaviDrawer';
import * as SSBackgroundLocation from '../../SSBackgroundLocation'

class InicioPage extends Component {
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
        //desactivar teclado
        Keyboard.dismiss();
    }
    render() {
        var estados = false
        if(!this.props.state.usuarioReducer.usuarioLog){
            console.log("ssssss");
            return <View/>
        }
        
        Object.keys(this.props.state.usuarioReducer.usuarioLog).map((key) => {
            var obj = this.props.state.usuarioReducer.usuarioLog[key]
            if (key === "Foto perfil") {
                return <View />
            }
            if (key === "Password") {
                return <View />
            }
            if (obj.estado === 0) {
                estados = true
                return <View />
            }
        })
        if (estados) {
            this.props.state.usuarioReducer.estado = ""
            SSBackgroundLocation.getInstance().stop();

            this.props.navigation.replace("EsperandoConfirmacionPage");
            return <View />
        }
        return (
            <View style={{
                flex: 1,
            }}>
                
                <Inicio navigation={this.props.navigation} />
                <NaviDrawer navigation={this.props.navigation} />
            </View>
        );
    }
};
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(InicioPage);
