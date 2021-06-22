import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../Json';
import STheme from '../../STheme';
import Svg from '../../Svg';

class BarraSuperiorInicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.Value(0),
        };

    }

    startAnimation() {
        Animated.timing(this.state.anim, {
            toValue: 100,
            duration: !this.props.duration ? 450 : this.props.duration,
        }).start();
    }
    componentDidMount() {

        this.startAnimation();
    }

    getTitle() {
        var cabecera = "registro_cliente";
        var datos = this.props.state.usuarioReducer.usuarioDatos;
        if (!datos) {
            if (this.props.state.usuarioReducer.estado == "cargando") {
                return <ActivityIndicator />
            }
            this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "usuario",
                type: "getById",
                key: this.props.state.usuarioReducer.usuarioLog.key,
                cabecera: cabecera,
                estado: "cargando"
            }, true);
            return <ActivityIndicator />
        }

        var nombre = datos["Nombres"];
        if (nombre) {
            nombre = nombre.dato;
        }
        return (<Text style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
            // fontFamily:"myFont"
        }}>{"Hola " + nombre}</Text>)
    }
    render() {

        this.usuario = this.props.state.usuarioReducer.usuarioLog;
        if (!this.usuario) {
            return <View />
        }
        return (
            <Animated.View style={{
                width: "100%",
                height: 100,
                flexDirection: "row",
                // backgroundColor: "#fff",
                transform: [
                    {
                        translateY: this.state.anim.interpolate({
                            inputRange: [0, 100],
                            outputRange: [-55, 0]
                        })
                    }
                ]
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    // height: "100%",
                    backgroundColor: STheme.color.background,
                    borderBottomEndRadius: 16,
                    borderBottomStartRadius: 16,
                }}>
                    <TouchableOpacity style={{
                        width: 45,
                        height: "80%",
                        justifyContent: "center",
                        alignItems: "center",
                    }} activeOpacity={0.9} onPress={() => {
                        this.props.state.naviDrawerReducer.openBar();
                    }}>
                        <Svg name={"Menu"}
                            style={{
                                width: 20,
                                height: 20,
                                fill: "#fff"
                            }} />

                    </TouchableOpacity>
                    <View style={{
                        flex: 1,

                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <View style={{
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            {this.getTitle()}
                            <View style={{
                                marginStart: 8,
                                width: 25,
                                height: 25,
                                borderRadius: 100,
                                backgroundColor: STheme.color.primary + "44",
                                // borderWidth: 1,
                            }}>

                            </View>
                        </View>
                        <Text style={{
                            color: "#fff",
                            fontSize: 12,
                            // fontFamily:"myFont"
                        }}>{"¿ Como podemos ayudarte hoy ?"}</Text>
                    </View>
                    <View style={{
                        width: 45,
                        height: "80%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}></View>

                </View>

            </Animated.View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(BarraSuperiorInicio);