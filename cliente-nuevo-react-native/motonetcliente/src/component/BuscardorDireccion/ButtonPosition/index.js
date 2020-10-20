import React from 'react';
import { View } from 'react-native';
import Svg from '../../../Svg';


const ButtonPosition = (props) => {

    return (
        <View
            style={{
                bottom: 200,
                right: 10,
                position: "absolute",
            }}>
            <Svg name="MarkerMoto"
                style={{
                    width: 50,
                    height: 50,
                    fill: "#000"

                }} />
        </View>
    )
}

export default ButtonPosition;
