import React from 'react';
import { Platform, Text, View } from 'react-native';

//motonet
//import LogoCompleto from '../img/logoCompleto.svg';
import LogoCompleto from '../img/motonet.svg';
import Volver from '../img/volver.svg';

import BisaSegurosRecurso from '../img/bisaSegurosRecurso.svg';
import BtnAzul from '../img/btnAzul.svg';
import BtnRojo from '../img/btnRojo.svg';
import AlianzaSegurosRecurso from '../img/alianzaSegurosRecurso.svg';
//import BtnSOS from '../img/btnSOS.svg';

import CentroAtencion from '../img/iconRecursoCentroAtencion.svg';
import Farmacia from '../img/iconRecursoFarmacia.svg';
import Imagenologia from '../img/iconRecursoImagenologia.svg';
import Laboratorio from '../img/iconRecursoLaboratorio.svg';
import LogoRecurso from '../img/logoRecurso.svg';
import NacionalSegurosRecurso from '../img/NacionalSegurosRecurso.svg';
import LogoFacebook from '../img/facebook.svg';
import LogoEmail from '../img/google.svg';
import Warning from '../img/warning.svg';
import Menu from '../img/menu.svg';
import Ambulancia from '../img/ambulance.svg';
import Sinubicacion from '../img/sinubicacion.svg';
import LogoMoto from '../img/motonet.svg';
const Svg = (propsa) => {
    var props = { ...propsa }
    if (!props.style) {
        props.style = {
            width: "100%",
            height: "100%",
            fill: "#fff"
        }
    }
    if (props.resource) {
        return (Platform.OS == "web" ? <img style={props.style} src={props.resource.default} /> : <props.resource.default style={props.style} />);
    }
    const isWeb = Platform.OS === 'web';

    switch (props.name) {

        case "logoCompleto":
            return <LogoCompleto style={props.style} />
        case "LogoMoto":
            return <LogoMoto style={props.style} />
        case "Volver":
            return <Volver style={props.style} />

        case "persona":
            return <Persona style={props.style} />
        case "arreglo":
            return <Arreglo style={props.style} />
        case "LogoMoto":
            return <MotoNetBW style={props.style} />
        case "LogoMotoRed":
            return <MotoNetBR style={props.style} />
        case "MarkerMoto":
            return <MarkerMoto style={props.style} />
        case "correo":
            return <Email style={props.style} />
        case "pass":
            return <Pass style={props.style} />
        case "google":
            return <Google style={props.style} />
        case "facebook":
            return <Facebook style={props.style} />
        case "icloud":
            return <Icloud style={props.style} />
        case "volver":
            return <Volver style={props.style} />
        case "Arriba":
            return <Arriba style={props.style} />
        case "btnRojo":
            return <BtnRojo style={props.style} />
        case "btnAzul":
            return <BtnAzul style={props.style} />
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
