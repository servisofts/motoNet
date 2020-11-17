import React from 'react';
import { Text } from 'react-native';
import LogoCompleto from '../img/logo.svg';
import Bien from '../img/bien.svg';
import EliminarIcono from '../img/cerrar.svg';
import MarkerMoto from '../img/MarkerMoto.svg';
import Ubicacion from '../img/ubicacion.svg';
import Menu from '../img/menu.svg';
import Volver from '../img/volver.svg';
import Gps from '../img/gps.svg';
import Close from '../img/close.svg';
import Marcador from '../img/marcador.svg';
import Star from '../img/star.svg';
import Staron from '../img/star-on.svg';
import LogoFacebook from '../img/facebook.svg';
import LogoEmail from '../img/google.svg';

const Svg = (props) => {

    switch (props.name) {
        case "ubicacion":
            return <Ubicacion style={props.style} />
        case "MarkerMoto":
            return <MarkerMoto style={props.style} />
        case "Logo":
            return <LogoCompleto style={props.style} />
        case "Bien":
            return <Bien style={props.style} />
        case "eliminar":
            return <EliminarIcono style={props.style} />
        case "menu":
            return <Menu style={props.style} />
        case "Volver":
            return <Volver style={props.style} />
        case "Gps":
            return <Gps style={props.style} />
        case "Close":
            return <Close style={props.style} />
        case "Marcador":
            return <Marcador style={props.style} />
        case "Star":
            return <Star style={props.style} />
        case "Staron":
            return <Staron style={props.style} />
        case "LogoFacebook":
            return <LogoFacebook style={props.style} />
        case "LogoEmail":
            return <LogoEmail style={props.style} />

        default: return <Text>Not Found</Text>
    }
}

export default Svg;