import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    ScrollView
} from 'react-native';
class SocketClientePage extends Component {
    static navigationOptions = {
        headerShown: true,
    }
    constructor(props) {
        super(props);
    }

    getbutton() {
        var btnProp= {
            title:"Desconectar",
            style:{
                touchable:{
                    width: 100,
                    height: 100,
                    borderWidth: 3,
                    borderRadius: 100,
                    borderColor: "#fff",
                    justifyContent:"center",
                    backgroundColor:"#0f0"
                },
                title:{
                    color:"#fff",
                    textAlign:"center"
                }
            },
            callback:()=>{
                console.log("Desconectar.");
                this.props.state.socketClienteReducer.close();
            }
        };

        if (!this.props.state.socketClienteReducer.isOpen) {
            btnProp.title= "Conectar.";
            btnProp.style.touchable.backgroundColor="#f00";
            btnProp.callback = ()=>{
                this.props.state.socketClienteReducer.open("");
                console.log("Conectar.");
            }
        }
        return (
            <TouchableOpacity
            onPress={btnProp.callback}
                style={btnProp.style.touchable}>
                    <Text style={btnProp.style.title}>{btnProp.title}</Text>
            </TouchableOpacity>
        )
    }
    render() {



        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: "#000",
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
                {this.getbutton()}
                <ScrollView style={{ flex: 1, marginTop: 20,transform: [{ scaleY: -1 }]  }}>
                    {
                        this.props.state.socketClienteReducer.history.reverse().map((obj, key) => {
                            return (
                                <View style={{ margin: 8, flexDirection: "row",
                                        alignItems:"center",
                                        transform: [{ scaleY: -1 }]  }}>
                                    <Text style={{ color: "#000" ,backgroundColor:"#fff", borderRadius:50, height:35, width:35,
                                            textAlign:"center",
                                            textAlignVertical:"center",
                                            fontWeight:"bold",                                            
                                            }}>
                                        {this.props.state.socketClienteReducer.history.length-key}-
                                    </Text>
                                    <Text style={{ fontSize: 16, color: "#fff" }}>
                                        {JSON.stringify(obj)}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>


            </View>


        );
    }
};
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(SocketClientePage);
