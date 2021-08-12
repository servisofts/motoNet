import React, { Component } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import STheme from '../../../STheme';
import Svg from '../../../Svg';
import { SPopupOpen } from '../../../SPopup';

export default class TipoDeViaje extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.Value(0),
            tipos: {
                moto: {
                    label: "Moto",
                    icon: "Moto",
                },
                torito: {
                    label: "Torito",
                    icon: "Torito",
                }
            },
            tipoSelect: "moto",
        };
        this.open()
    }
    validarVacio(){
        if (!(this.props.dir1 && this.props.dir2)){
            return false
        }
        return true
    }
    open() {
        new Animated.timing(this.state.anim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }
    ListaTiposDeViajes = () => {
        return Object.keys(this.state.tipos).map((key) => {
            var obj = this.state.tipos[key];
            return <TouchableOpacity style={{
                height: 70,
                borderRadius: 20,
                width: "40%",
                borderColor: "red",
                borderWidth: (this.state.tipoSelect == key ? 1 : 0),
                alignItems: "center",
                justifyContent: "center",
                marginLeft:12,
                marginRight:12
            }} onPress={() => {
                this.setState({ tipoSelect: key });
            }}>
                <View style={{
                    // width: 90,
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "#ccc",
                    flexDirection: "row"
                }}>
                    <Svg name={obj.icon}
                        style={{
                            width: 50,
                            height: 50,
                            // fill: "#000"
                        }} />
                    <Text style={{
                        color: "#000",
                        fontSize: 15,
                        fontWeight: "bold"
                    }}>
                        {obj.label}
                    </Text>
                </View>
            </TouchableOpacity>
        });
    }

    render() {
        return (
            <Animated.View style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: 140,
                backgroundColor: "#fff",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                justifyContent: "space-around",
                alignItems: "center",
                transform: [{
                    translateY: this.state.anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [200, 0]
                    })
                }]
            }}>
                <View style={{
                    width: "100%",
                    padding: 8,
                    flexDirection: "row",
                    alignItems: "space-between",
                    justifyContent: "space-between",
                    
                }}>
                    {this.ListaTiposDeViajes()}
                </View>

                <TouchableOpacity
                    onPress={() => {
                        if(!this.validarVacio()){
                            //alert("error")
                            SPopupOpen({
                                key: "noConductor",
                                content: (
                                    <View alignItems="center" >
                                        <Svg name={"Warning2"}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            fill: "#f00",
                                        }} />
                                        <Text style={{paddingTop:10, fontSize:15}}>Ingrese las ubicaciones requeridas.</Text>
                                    </View>
                                )
                            })

                        }
                        
                        this.props.pedir(this.state.tipoSelect);
                    }}
                    style={{
                        width: "90%",
                        height: 40,
                        // position: "absolute",
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: "#f00",
                        borderRadius: 5
                    }}>
                    <Text style={{
                        fontSize: 18,
                        color: STheme.color.text
                    }}>
                        Pedir ahora
                    </Text>
                </TouchableOpacity>
            </Animated.View >
        );
    }
}