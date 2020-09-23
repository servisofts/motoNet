import React from 'react';
import { Text } from 'react-native';
import LogoCompleto from '../img/logo.svg';
import Bien from '../img/bien.svg';

const Svg = (props) => {

    switch (props.name) {
        case "Logo":
            return <LogoCompleto style={props.style} />
        case "Bien":
            return <Bien style={props.style} />
        default: return <Text>Not Found</Text>
    }
}

export default Svg;