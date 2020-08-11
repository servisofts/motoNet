import React from 'react';
import { Platform, Text } from 'react-native';

import Volver, { ReactComponent as Volverw } from '../img/volver.svg';

import Email, { ReactComponent as Emailw } from '../img/email.svg';
import Pass, { ReactComponent as Passw } from '../img/pass.svg';
import LogoGlup, { ReactComponent as LogoGlupw } from '../img/logoGlup.svg';

import Persona, { ReactComponent as Personaw } from '../img/persona.svg';
import Google, { ReactComponent as Googlew } from '../img/google.svg';
import Facebook, { ReactComponent as Facebookw } from '../img/facebook.svg';
import Icloud, { ReactComponent as Icloudw } from '../img/icloud.svg';
import Arreglo, { ReactComponent as Arreglow } from '../img/arreglo.svg';

const Svg = (props) => {
    const isWeb = Platform.OS === 'web';


    switch (props.name) {
        case "persona":
            return isWeb ?
                <Personaw style={props.style} />
                :
                <Persona style={props.style} />
        case "arreglo":
            return isWeb ?
                <Arreglow style={props.style} />
                :
                <Arreglo style={props.style} />
        case "LogoGlup":
            return isWeb ?
                <LogoGlupw style={props.style} />
                :
                <LogoGlup style={props.style} />
        case "correo":
            return isWeb ?
                <Emailw style={props.style} />
                :
                <Email style={props.style} />
        case "pass":
            return isWeb ?
                <Passw style={props.style} />
                :
                <Pass style={props.style} />
        case "google":
            return isWeb ?
                <Googlew style={props.style} />
                :
                <Google style={props.style} />
        case "facebook":
            return isWeb ?
                <Facebookw style={props.style} />
                :
                <Facebook style={props.style} />
        case "icloud":
            return isWeb ?
                <Icloudw style={props.style} />
                :
                <Icloud style={props.style} />
        case "volver":
            return isWeb ?
                <Volverw style={props.style} />
                :
                <Volver style={props.style} />

        default:
            return <Text>SVG</Text>
    }
}



export default Svg;
