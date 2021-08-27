import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import STheme from '../../../STheme';
import Svg from '../../../Svg';
import BuscardorNuevo from '../../../component/BuscardorNuevo';

class BarraSuperior extends Component {
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


    getTextFieldDireccion = (svg, direccion) => {

        if (!direccion) {
            return <View />
        }

        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                width: "90%",
                borderColor: this.props.color != "negro" ? "#fff" : "#000",
                borderWidth: 2,
                borderRadius: 5,
                height: 40,


            }}>
                <View style={{
                    width: 40,
                    justifyContent: "center",
                    alignItems: "center",

                }}>
                    <Svg name={svg}
                        style={{
                            width: 20,
                            height: 20,
                            fill: "#fff"
                        }} />
                </View>

                <Text style={{
                    flex: 1,
                    fontSize: 10,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: "center",
                    textAlignVertical: "center",
                    height: "100%",
                    fontSize: 13,
                    color: "#fff",
                }}
                    numberOfLines={1}>
                    {direccion.direccion}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <Animated.View style={{
                width: "100%",
                height: (this.props.tipo_viaje === "pedido" ? 95 : 150),
                flexDirection: "row",
                // backgroundColor: "#fff",
                transform: [
                    {
                        translateY: this.state.anim.interpolate({
                            inputRange: [0, 100],
                            outputRange: [-200, 0]
                        })
                    }
                ]
            }}>

                <View style={{
                    flex: 1,
                    backgroundColor: STheme.color.background,

                }}>
                    <View style={{
                        // flex: 1,
                        height: 40,
                        flexDirection: "row",
                        // borderBottomEndRadius: 16,
                        // borderBottomStartRadius: 16,
                    }}>
                        <TouchableOpacity style={{
                            width: 45,
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: 8
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
                            {this.getTitle(this.props.title)}
                        </View>
                    </View>

                    <View style={{
                        height: (this.props.tipo_viaje === "pedido" ? 65 : 110),
                        justifyContent: "space-evenly",
                        alignItems: "center"
                    }}>
                      
                                    {this.getTextFieldDireccion("MarkerW", this.props.direccion1)}
                                    {this.getTextFieldDireccion("Pointer", this.props.direccion2)}
                         
                    </View>
                </View>

            </Animated.View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(BarraSuperior);