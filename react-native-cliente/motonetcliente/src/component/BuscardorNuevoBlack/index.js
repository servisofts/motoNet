import React, { Component, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Animated } from 'react-native';
import Svg from '../../Svg';

class BuscardorNuevoBlack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.label,
        };
    }
    setError = (bool) => {
        this.setState({ error: bool })
    }
    getValue = () => {
        this.setState({ error: false})
        return this.state.direccion
    }
    render() {
        return (
            <View style={{
                flexDirection: 'column',
                width: "100%",
                alignItems: 'center',
            }}>
                <TouchableOpacity style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: "100%",
                    borderColor: this.state.error ? "#f00" : "#666",
                    borderWidth: 1,
                    borderRadius: 5,
                    height: 50,
                }} onPress={() => {
                    this.props.navigation.navigate("BuscarDireccionPage", {
                        select: (data) => {
                            this.setState({ value: data.direccion, direccion: data, })
                        },
                        direccion: this.state.direccion,
                    })
                }}>
                    <View style={{
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Svg name={"MarkerW"}
                            style={{
                                width: 20,
                                height: 20,
                                fill: "#333"
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
                        color: "#000",
                    }}
                        numberOfLines={1}
                        onChangeText={(texto) => hanlechage(texto)}
                    >
                        {this.state.value}
                    </Text>
                </TouchableOpacity>
            </View >
        );
    }
}

// const initStates = (state) => {
//     return { state }
// };

// export default connect(initStates)(BuscardorNuevo);
export default BuscardorNuevoBlack;