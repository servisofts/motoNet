import React, { Component, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Animated } from 'react-native';
import Svg from '../../Svg';

class BuscardorNuevo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.label,
        };
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
                    width: "90%",
                    borderColor: "#fff",
                    borderWidth: 2,
                    borderRadius: 5,
                    height: 40,
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
export default BuscardorNuevo;