import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Svg from '../../Svg';

class NaviDrawer2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 500,
            isOpen: false,
            anim: new Animated.Value(0),
        };
    }

    onTouchParent() {
        console.log("touch parent")
        this.close();
    }
    onTouchChildren() {
        console.log("touch children")
    }
    open() {
        Animated.timing(this.state.anim, {
            toValue: 1,
            duration: this.state.time,
        }).start(() => {
            this.setState({ isOpen: true, })
        })
    }

    close() {
        Animated.timing(this.state.anim, {
            toValue: 0,
            duration: this.state.time,
        }).start(() => {
            this.setState({ isOpen: false, })
        })
    }
    itemMenu = ({ title, icon, url }) => {
        return <TouchableOpacity style={{
            width: "100%",
            height: 70,
            borderColor: "#ddd",
            borderBottomWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
        }} onPress={() => {
            if (this.props.navigation) {
                if (url) this.props.navigation.navigate(url);
                this.close()
            }
        }}>
            <View style={{
                width: 50,
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Svg resource={icon} style={{
                    width: 24,
                    height: 24,
                }} />
            </View>
            <View style={{
                flex: 1,
                justifyContent: "center",
            }}>
                <Text style={{
                    color: "#000",
                    fontSize: 14,
                    fontWeight: "bold"
                }}>{title}</Text>
            </View>

        </TouchableOpacity>
    }
    render() {
        this.props.state.naviDrawerReducer.openBar = () => {
            this.setState({ isOpen: true, })
        };
        if (!this.state.isOpen) {
            return <View />
        }
        return (
            <TouchableWithoutFeedback onPress={() => { this.onTouchParent() }}>
                <Animated.View style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: this.state.anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["#00000000", "#000000bb"]
                    })
                }} onLayout={() => {
                    this.open()
                }}>
                    <TouchableWithoutFeedback onPress={() => { this.onTouchChildren() }}>
                        <Animated.View style={{
                            width: "80%",
                            height: "100%",
                            maxWidth: 600,
                            backgroundColor: "#fff",
                            transform: [{
                                translateX: this.state.anim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-500, 0]
                                })
                            }]
                        }}>
                            <View style={{
                                height: 120,
                                borderBottomEndRadius: 16,
                                borderBottomStartRadius: 16,
                                overflow: "hidden"
                            }}>
                                <Image
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        position: 'absolute',
                                        backgroundColor: "#fff",
                                        resizeMode: "stretch"
                                    }}
                                    source={require("../../img/titlebar.png")}
                                />
                                <View style={{
                                    width: "100%",
                                    flex: 1,
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <View style={{
                                        width: 100,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <View style={{
                                            width: 70,
                                            height: 70,
                                            borderRadius: 100,
                                            backgroundColor: "#fff"
                                        }}>

                                        </View>
                                    </View>
                                    <TouchableOpacity style={{
                                        flex: 1,
                                    }} onPress={() => {
                                        if (this.props.navigation) {
                                            this.props.navigation.navigate("PerfilPage");
                                        }
                                    }}>
                                        <Text style={{
                                            color: "#fff",
                                            fontSize: 16,
                                        }}>Maria Jose Zuñiga</Text>
                                        <Text style={{
                                            color: "#fff",
                                            fontSize: 14,
                                            fontWeight: "bold"
                                        }}>Ver perfil</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{
                                flex: 1,
                                width: "100%",
                                // backgroundColor: "#000"
                            }}>
                                <View style={{
                                    height: 32,
                                }}></View>
                                {this.itemMenu({ title: "Inicio", url: "", icon: require("../../img/menu/inicio.svg") })}
                                {this.itemMenu({ title: "Transporte", url: "InicioPage", icon: require("../../img/menu/transporte.svg") })}
                                {this.itemMenu({ title: "Delivery", url: "PedidosRegistroPage", icon: require("../../img/menu/delivery.svg") })}
                                {this.itemMenu({ title: "Mensajería", url: "MensajeriaRegistroPage", icon: require("../../img/menu/mensajeria.svg") })}
                                {this.itemMenu({ title: "Ayuda", url: "", icon: require("../../img/menu/ayuda.svg") })}
                                {this.itemMenu({ title: "Configuración", url: "", icon: require("../../img/menu/configuracion.svg") })}
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(NaviDrawer2);