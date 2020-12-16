import React from 'react';
import { Text } from 'react-native';
import LogoCompleto from '../img/logo.svg';
import Bien from '../img/bien.svg';
import EliminarIcono from '../img/cerrar.svg';
import MarkerMoto from '../img/MarkerMoto.svg';

const Svg = (props) => {

    switch (props.name) {
        case "MarkerMoto":
            return <MarkerMoto style={props.style} />
        case "Logo":
            return <LogoCompleto style={props.style} />
        case "Bien":
            return <Bien style={props.style} />
        case "eliminar":
            return <EliminarIcono style={props.style} />
        default: return <Text>Not Found</Text>
    }
}

export default Svg;