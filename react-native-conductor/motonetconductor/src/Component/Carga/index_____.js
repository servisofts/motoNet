import React, { Component } from 'react';
import { View, AsyncStorage, Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../Json/index.json'
import STheme from '../../STheme';

const delay = ms => new Promise(res => setTimeout(res, ms));
class Carga extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.Value(0),
        };
    }
    componentDidMount() {
        this.animar();
    }
    animar() {
        Animated.timing(this.state.anim, {
            duration: 3000,
            toValue: 1,
        }).start(() => {
            this.redirect();
        });
    }
    redirect() {
        if (this.props.state.usuarioReducer.usuarioLog) {
            if (this.props.state.ViajeReducer.data) {
                
                this.props.navigation.replace("EsperandoConfirmacionPage");
            } else {
                console.log("holaaa")
                this.props.navigation.replace("InicioPage");
                //return;
            }
        }
        this.props.navigation.replace("LoginPage");
    }
    validate = async () => {
        this.validateUser();
    }
    validateUser = () => {
        if (this.props.state.usuarioReducer.usuarioCargado) {
            return;
        }
        AsyncStorage.getItem(AppParams.storage.urlLog).then((value) => {
            this.props.state.usuarioReducer.usuarioCargado = true;
            try {
                this.props.state.usuarioReducer.usuarioLog = JSON.parse(value)
                this.props.state.socketClienteReducer.sessiones["motonet"].send({
                    component: "viaje",
                    type: "getViajeByKeyUsuario",
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    estado: "cargando"
                }, true);
            } catch (error) {
                console.log(error)
                this.props.state.usuarioReducer.usuarioLog = false;
            }
        });
    }


    render() {
        this.validate();
        return (
            <View style={{
                width: "90%",
                position: "absolute",
                bottom: "10%",
                height: 10,
            }}>
                <Animated.View style={{
                    position: "absolute",
                    width: this.state.anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0%", "100%"]
                    }),
                    height: "100%",
                    borderRadius: 100,
                    backgroundColor: STheme.color.primary,
                }} >

                </Animated.View>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Carga);