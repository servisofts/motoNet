import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../Json';
import STheme from '../../STheme';
import Svg from '../../Svg';

class BarraSuperiorChat extends Component {
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
        var datos = this.props.state.usuarioReducer.data[this.props.state.ViajeReducer.data.key_usuario];
        if (!datos) {
            if (this.props.state.usuarioReducer.estado == "cargando") {
                return <ActivityIndicator />
            }
            this.props.state.socketClienteReducer.sessiones[AppParams.socket.name].send({
                component: "usuario",
                type: "getById",
                key: this.props.state.ViajeReducer.data.key_usuario,
                cabecera: cabecera,
                estado: "cargando"
            }, true);
            return <ActivityIndicator />
        }
        var nombre = datos["Nombres"];
        // var nombre = datos["Apellidos"];
        if (nombre) {
            nombre = nombre.dato;
        }
        return (<Text style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
            // fontFamily:"myFont"
        }}>{nombre} {datos["Apellidos"].dato}</Text>)
    }


    render() {

        this.usuario = this.props.state.usuarioReducer.usuarioLog;
        if (!this.usuario) {
            return <View />
        }
        return (
            <View style={{
                backgroundColor: "#f2f2f2"
            }}>
                <Animated.View style={{
                    width: "100%",
                    height: 50,
                    flexDirection: "row",
                    // backgroundColor: "#000",
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
                        // borderBottomEndRadius: 16,
                        // borderBottomStartRadius: 16,
                    }}>
                        <TouchableOpacity style={{
                            width: 45,
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }} activeOpacity={0.9}
                            onPress={() => {
                                // this.props.state.naviDrawerReducer.openBar();
                                this.props.navigation.goBack()
                            }}>
                            <Svg name={"Arrow"}
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
                                    overflow: "hidden",
                                    // borderWidth: 1,
                                }}>
                                    {this.props.state.imageReducer.getImage(AppParams.urlImages + "perfil.png?type=getPerfil&key_usuario=" + this.props.state.ViajeReducer.data.key_usuario, {
                                    })}
                                </View>
                            </View>
                            {/* <Text style={{
                            color: "#fff",
                            fontSize: 12,
                            // fontFamily:"myFont"
                        }}>{"En linea"}</Text> */}
                        </View>
                        <View style={{
                            width: 45,
                            height: "80%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}></View>

                    </View>

                </Animated.View>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(BarraSuperiorChat);