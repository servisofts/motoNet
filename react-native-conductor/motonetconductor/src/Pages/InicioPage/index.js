import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Keyboard } from 'react-native';
import NaviDrawer from '../../Component/NaviDrawer';
import Turno from './Turno';
import Mapa from './Mapa';
import Svg from '../../Svg';
import STheme from '../../STheme';

class InicioPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        Keyboard.dismiss();
    }
    render() {
        if (this.props.state.ViajeReducer.estado === "exito" && this.props.state.ViajeReducer.type == "viajeEntrante") {
            this.props.navigation.replace("ConfirmarPage");
            return <View />
        }
        return (
            <View style={{
                width: "100%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Mapa />
                <Turno navigation={this.props.navigation} />
                <NaviDrawer navigation={this.props.navigation} />
                <TouchableOpacity
                    onPress={() => {
                        this.props.state.naviDrawerReducer.openBar()
                    }}
                    style={{
                        width: 55,
                        height: 55,
                        borderColor: "#fff",
                        borderWidth: 2,
                        borderRadius: 100,
                        backgroundColor: STheme.color.background,
                        position: "absolute",
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: 10,
                        left: 10,
                    }}>
                    <Svg name="LogoMoto"
                        style={{
                            width: "60%",
                            height: "60%",
                            fill: "#fff"
                        }} />
                </TouchableOpacity>
            </View>
        );
    }
};
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(InicioPage);
