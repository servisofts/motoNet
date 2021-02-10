import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import Svg from '../../Svg';
import Styles from '../../Styles'
const ButtonComponent = (props) => {

    return (
        <View style={{
            width: "100%",
            height: "100%",
            // backgroundColor: "#ccc"
            alignItems: "center",
        }}>
            <TouchableOpacity   onPress={props.onPress}>
                <View
                    style={{
                        // padding: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        'height': Dimensions.get('window').width * 0.6,
                        width: Dimensions.get('window').width * 0.6,
                    }}
                  
                >
                    <Svg name={props.name}
                        style={{
                            width: "99%",
                            height: "99%",

                        }} />
                    {props.relleno()}
            </View >
            </TouchableOpacity>

        </View>
    )
};

export default ButtonComponent;
