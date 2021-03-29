import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import * as SSSocketNative from '..';
var _SocketName = "motonet";
class SessionSocketPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);

    }
    render() {

        const getBtnConect = () => {
            var backColor = "";
            var text = "";
            if (SSSocketNative.getSession(_SocketName).isActivo()) {
                backColor = "#9f9"
                text = "Close";
            } else {
                backColor = "#f99"
                text = "Open";
            };
            return (
                <TouchableOpacity style={{
                    width: 100,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: backColor,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                    onPress={() => {
                        if (SSSocketNative.getSession(_SocketName).isActivo()) {
                            SSSocketNative.getSession(_SocketName).onClose();

                        } else {
                            SSSocketNative.open(_SocketName);
                        };

                    }}
                >
                    <Text style={{
                        color: "#666",
                        fontSize: 12,
                    }}>{text}</Text>
                </TouchableOpacity>
            )
        }
        const getBtnPing = () => {
            return (
                <TouchableOpacity style={{
                    marginTop:10,
                    width: 100,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                    onPress={() => {
                        SSSocketNative.getSession(_SocketName).ping();
                    }}
                >
                    <Text style={{
                        color: "#000",
                        fontSize: 12,
                    }}>PING</Text>
                </TouchableOpacity>
            )
        }
        const getDetalleConexion = () => {
            if(!this.props.state.socketClienteReducer.sessiones[_SocketName]){
                return <View/>;
            }
            return (
                <View style={{
                    width: "90%",
                }}>
                    <Text style={{
                        color: "#FFF",
                        fontSize: 20,
                        flex: 1,
                    }}>SOCKET:</Text>
                    <View style={{
                        width: "100%",
                        // justifyContent:"center",
                        alignItems: "center",
                        height: 100,
                        flexDirection: "row"
                    }}>
                        <Text style={{
                            color: "#FFF",
                            fontSize: 20,
                            flex: 1,
                        }}>Nombre:</Text>
                        <Text style={{
                            color: "#FFF",
                            fontSize: 20,
                            flex: 1,
                        }}>{_SocketName}</Text>
                    </View>
                    <View style={{
                        width: "100%",
                        // justifyContent:"center",
                        alignItems: "center",
                        height: 100,
                        flexDirection: "row"
                    }}>
                        <Text style={{
                            color: "#FFF",
                            fontSize: 20,
                            flex: 1,
                        }}>ESTADO REDUCER:</Text>
                        <Text style={{
                            color: "#FFF",
                            fontSize: 20,
                            flex: 1,
                        }}>{this.props.state.socketClienteReducer.sessiones[_SocketName].estado}</Text>
                    </View>
                    <View style={{
                        width: "100%",
                        // justifyContent:"center",
                        alignItems: "center",
                        flexDirection: "row"
                    }}>
                        <Text style={{
                            color: "#FFF",
                            fontSize: 20,
                            flex: 1,
                        }}>ESTADO SOCKET:</Text>
                        <Text style={{
                            color: "#FFF",
                            fontSize: 20,
                            flex: 1,
                        }}>{(SSSocketNative.getSession(_SocketName).isActivo()?"Conectado.":"Desconectado.")}</Text>
                    </View>
                   
                </View>
            )
        }
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: "#000000",
            }}>
                <Text style={{
                    color: "#fff",
                    fontSize: 24,
                    margin: 10,
                    borderBottomWidth: 1,
                    borderColor: "#fff"
                }}>SSSocketNative</Text>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "100%"
                    // alignItems:""
                }}>
                    {getBtnConect()}
                </View>
                {getDetalleConexion()}
                {getBtnPing()}
            </View>
        );
    }
};
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(SessionSocketPage);
