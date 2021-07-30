import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import STheme from '../../../STheme';
import Svg from '../../../Svg';
import BuscardorNuevo from '../../../component/BuscardorNuevo';

class BarraSuperiorPedidos extends Component {
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

    getTitle(text) {
        var text = text
        if (this.props.title) {
            text = this.props.title;
        }
        return (<Text style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
            // fontFamily:"myFont"
        }}>{text}</Text>)
    }
    render() {
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
                            outputRange: [-100, 0]
                        })
                    }
                ]
            }}>

                <View style={{
                    flex: 1
                }}>
                    <View style={{
                        // flex: 1,
                        height: 45,
                        flexDirection: "row",
                        backgroundColor: STheme.color.background,
                        // borderBottomEndRadius: 16,
                        // borderBottomStartRadius: 16,
                    }}>
                        <TouchableOpacity style={{
                            width: 45,
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft:8
                        }}
                            activeOpacity={0.9}
                            onPress={this.props.goBack}>
                            {!this.props.goBack ? <View /> : <Svg resource={require('../../../img/arrow.svg')}
                                style={{
                                    width: "50%",
                                    height: "50%",
                                    fill: "#fff"
                                }} />}

                        </TouchableOpacity>
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            // alignItems: "center"
                           
                        }}>
                            {this.getTitle("Barra")}
                        </View>
                        <TouchableOpacity style={{
                            width: 150,
                             marginRight:8,
                            // backgroundColor:"#000",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                        }} onPress={() => {
                            var dir = this.direccion.getValue();
                            this.props.pedir(dir);
                        }}>
                            <Text style={{
                                color: "#fff",
                                marginRight: 4,
                                fontWeight: "bold"
                            }}>Solicitar servicio</Text>
                            <Svg resource={require("../../../img/addicon.svg")} style={{
                                width: 20,
                                height: 20,
                            }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        justifyContent: "center",
                        flex: 1,
                        backgroundColor: STheme.color.background
                    }}>
                        <BuscardorNuevo
                            icon={"MarkerW"}
                            ref={(ref) => { this.direccion = ref }}
                            navigation={this.props.navigation} label={"¿Dónde llevaremos el encargo?"} />
                    </View>

                </View>

            </Animated.View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(BarraSuperiorPedidos);