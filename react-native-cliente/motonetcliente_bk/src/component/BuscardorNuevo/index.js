import React, { Component, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Animated, AsyncStorage } from 'react-native';
import Svg from '../../Svg';

class BuscardorNuevo extends Component {
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
        this.setState({ error: false })
        return this.state.direccion
    }
    insertarHistorial = (dir) => {
        AsyncStorage.getItem("historialDirecciones").then((res) => {
            var arr = {};
            try {
                arr = JSON.parse(res);
            } catch (error) {
                arr = {}
            }
            if (!arr) arr = {};

            arr[dir.latitude + dir.longitude] = {
                ...dir,
                fecha: new Date().getTime(),
            };
            AsyncStorage.setItem("historialDirecciones", JSON.stringify(arr));
        });
    }
    hanlechage = (data) => {
        this.insertarHistorial(data)
        if (this.props.onChange) this.props.onChange(data);
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
                    borderColor: this.props.color != "negro" ? "#fff" : "#000",
                    borderWidth: 2,
                    borderRadius: 5,
                    height: 40,
                }} onPress={() => {
                    this.props.navigation.navigate("BuscarDireccionPage", {
                        select: (data) => {
                            // console.log(data);
                            this.setState({ value: data.direccion, direccion: data, })
                            this.hanlechage(data)
                        },
                        direccion: this.state.direccion,
                    })

                }}>
                    <View style={{
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Svg name={this.props.icon}
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
                    // onChangeText={(texto) => this.hanlechage(texto)}
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