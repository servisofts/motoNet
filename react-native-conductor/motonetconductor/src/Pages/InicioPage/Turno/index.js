import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import STheme from '../../../STheme';
import * as SSBackgroundLocation from '../../../SSBackgroundLocation';
import PerfilUsuario from '../PerfilUsuario';
export default class Turno extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var isRun = SSBackgroundLocation.getInstance().isRun();
        if (!isRun) {
            return (
                <View style={{
                    width: 400,
                    height: 400,
                    maxWidth: "90%",
                    maxHeight: "90%",
                    backgroundColor: STheme.color.background,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 8,
                }}>
                    <View style={{
                        alignItems: "center"
                    }}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 20,
                            marginBottom: 16,
                        }}>Bienvenido!</Text>
                        <PerfilUsuario navigation={this.props.navigation} />
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 12,
                            textAlign: "center",
                            maxWidth: 200,
                        }}>Presioná sobre el botón activarse para recibir viajes.</Text>
                    </View>
                    <TouchableOpacity style={{
                        width: 100,
                        height: 50,
                        borderRadius: 8,
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center"
                    }} onPress={() => {
                        SSBackgroundLocation.getInstance().start();
                    }}>
                        <Text>Activarse</Text>
                    </TouchableOpacity>

                </View>
            );
        }
        var location = SSBackgroundLocation.getInstance().location;
        var lastFecha = "Buscando tu ubicacion..."
        if (location.time) {
            lastFecha = new Date(location.time).toLocaleTimeString();
        }
        return (
            <View style={{
                bottom: 0,
                position: "absolute",
                width: "100%",
                height: 200,
                backgroundColor: STheme.color.background,
                borderRadius: 8,
                justifyContent: "space-around",
                alignItems: "center"
            }}>
                <PerfilUsuario navigation={this.props.navigation} />
                <Text style={{
                    color: "#fff",
                    textAlign: "center",
                    maxWidth: 200,
                }}>Ultima ubicacion enviada a las {lastFecha}</Text>
                <TouchableOpacity style={{
                    width: 100,
                    height: 50,
                    borderRadius: 8,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center"
                }} onPress={() => {
                    SSBackgroundLocation.getInstance().stop();
                }}>
                    <Text>Desactivarse</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
