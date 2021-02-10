import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import Svg from '../../Svg';

const ButtonSelectComponent = (props) => {
    return (
        <View style={{
            flex: 0.5,
            marginBottom: 0,
            marginBottom: 10,
            // backgroundColor: "#ccc",
        }}>
            <View style={{
                margin: 5,
                borderColor: "#bfbfbf",
                borderWidth: 1.5,
                // elevation:2,
                borderRadius: 8,
                height: Dimensions.get("window").height * 0.3,
                // backgroundColor: "#ccc",
            }}>
                <TouchableOpacity
                    style={{
                        // backgroundColor: "#000",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        padding: 10,
                    }}
                    onPress={() => {
                        props.navigation.navigate(props.page);
                    }}>
                    <Text style={{
                        color: "#2C4C7E",
                        textAlign: "center",
                        fontSize: Dimensions.get("window").width * 0.05
                    }}>
                        {props.name}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default ButtonSelectComponent;
