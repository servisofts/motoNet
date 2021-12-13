import React from 'react';
import { View, Image } from 'react-native';

const ImgFondoCruces = (props) => {
    return (
        <Image
            style={{ width: "100%", height: "100%", position: 'absolute' ,backgroundColor:"#fff" }}
            source={require("../../img/fondoCruces.png")}
        />
    )
};


export default ImgFondoCruces;
