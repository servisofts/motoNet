import React from 'react';
import { Platform, Text, View } from 'react-native';

import Volver, { ReactComponent as Volverw } from '../img/volver.svg';

import Email, { ReactComponent as Emailw } from '../img/email.svg';
import Pass, { ReactComponent as Passw } from '../img/pass.svg';
import LogoGlup, { ReactComponent as LogoGlupw } from '../img/logoGlup.svg';

import Persona, { ReactComponent as Personaw } from '../img/persona.svg';
import Google, { ReactComponent as Googlew } from '../img/google.svg';
import Facebook, { ReactComponent as Facebookw } from '../img/facebook.svg';
import Icloud, { ReactComponent as Icloudw } from '../img/icloud.svg';
import Arreglo, { ReactComponent as Arreglow } from '../img/arreglo.svg';
import MotoNetBW, { ReactComponent as MotoNetBWw } from '../img/MotoNetBR.svg';
import MotoNetBR, { ReactComponent as MotoNetBRw } from '../img/MotoNetBW.svg';
import MarkerMoto, { ReactComponent as MarkerMotow } from '../img/MarkerMoto.svg';
import Arriba from '../img/flecha-arriba.svg';

//clinica
import BisaSegurosRecurso from '../img/bisaSegurosRecurso.svg';
import BtnAzul from '../img/btnAzul.svg';
import BtnRojo from '../img/btnRojo.svg';
import AlianzaSegurosRecurso from '../img/alianzaSegurosRecurso.svg';
//import BtnSOS from '../img/btnSOS.svg';
import CentroAtencion from '../img/iconRecursoCentroAtencion.svg';
import Farmacia from '../img/iconRecursoFarmacia.svg';
import Imagenologia from '../img/iconRecursoImagenologia.svg';
import Laboratorio from '../img/iconRecursoLaboratorio.svg';
import LogoCompleto from '../img/logoCompletoRecurso.svg';
import LogoRecurso from '../img/logoRecurso.svg';
import NacionalSegurosRecurso from '../img/NacionalSegurosRecurso.svg';
import LogoFacebook from '../img/facebook.svg';
import LogoEmail from '../img/google.svg';
import Warning from '../img/warning.svg';
import Menu from '../img/menu.svg';
import Ambulancia from '../img/ambulance.svg';
import Sinubicacion from '../img/sinubicacion.svg';

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
        case "LogoMoto":
            return isWeb ?
                <MotoNetBWw style={props.style} />
                :
                <MotoNetBW style={props.style} />
        case "LogoMotoRed":
            return isWeb ?
                <MotoNetBRw style={props.style} />
                :
                <MotoNetBR style={props.style} />
        case "MarkerMoto":
            return isWeb ?
                <MarkerMotow style={props.style} />
                :
                <MarkerMoto style={props.style} />
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
        case "Arriba":
            return (
                <Arriba style={props.style} />)

        //clinica

        case "btnRojo":
            return <BtnRojo style={props.style} />
        case "btnAzul":
            return <BtnAzul style={props.style} />
        case "logoCompletoRecurso":
            return <LogoCompleto style={props.style} />
        case "logoRecurso":
            return <LogoRecurso style={props.style} />
        case "alianza":
            return <AlianzaSegurosRecurso style={props.style} />
        case "bisa":
            return <BisaSegurosRecurso style={props.style} />
        case "nacional":
            return <NacionalSegurosRecurso style={props.style} />
        case "farmacia":
            return <Farmacia style={props.style} />
        case "laboratorio":
            return <Laboratorio style={props.style} />
        case "imagenologia":
            return <Imagenologia style={props.style} />
        case "centroAtencion":
            return <CentroAtencion style={props.style} />
        case "LogoFacebook":
            return <LogoFacebook style={props.style} />
        case "LogoEmail":
            return <LogoEmail style={props.style} />
        case "Warning":
            return <Warning style={props.style} />
        case "Menu":
            return <Menu style={props.style} />
        case "Ambulancia":
            return <Ambulancia style={props.style} />
        case "Sinubicacion":
            return <Sinubicacion style={props.style} />
        default:
            return <Text>SVG</Text>
    }
}



export default Svg;
