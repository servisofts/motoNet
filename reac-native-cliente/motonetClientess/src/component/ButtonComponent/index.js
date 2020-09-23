import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Svg from '../../Svg';

const ButtonComponent = (props) => {

    return (
        <View style={{
            flex: 1,          
            alignItems: "center",
            justifyContent: "center"
        }}>
            <TouchableOpacity
                style={{
                    width: 200,
                    height: 200,                    
                    justifyContent: "center",
                    alignItems: "center"
                }}
                onPress={props.onPress}
            >
                <Svg name={props.name}
                    style={{
                        position: "absolute",
                        width: 200,
                        height: 200,
                    }} />
                {props.relleno()}
            </TouchableOpacity>

        </View>
    )
};

export default ButtonComponent;
