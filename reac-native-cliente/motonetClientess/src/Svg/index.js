import React from 'react';
import { Text } from 'react-native';
import LogoCompleto from '../img/logoCompletoRecurso.svg';

const Svg = (props) => {

    switch (props.name) {
        case "logoCompletoRecurso":
            return <LogoCompleto style={props.style} />
        default: return <Text>Not Found</Text>
    }
}

export default Svg;