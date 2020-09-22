import React from 'react';
import { Text } from 'react-native';
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
//import Logo from '../img/logoRecurso.svg';
import NacionalSegurosRecurso from '../img/NacionalSegurosRecurso.svg';

const Svg = (props) => {

    switch (props.name) {
        case "btnRojo":
            return <BtnRojo style={props.style} />
        case "btnAzul":
            return <BtnAzul style={props.style} />
        case "logoCompletoRecurso":
            return <LogoCompleto style={props.style} />
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
        default: return <Text>Not Found</Text>
    }
}



export default Svg;