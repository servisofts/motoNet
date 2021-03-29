import React from 'react';
import { Text } from 'react-native';
import BisaSegurosRecurso from '../img/bisaSegurosRecurso.svg';
import BtnAzul from '../img/btnAzul.svg';
import BtnRojo from '../img/btnRojo.svg';
import AlianzaSegurosRecurso from '../img/alianzaSegurosRecurso.svg';
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
import Phone from '../img/phone.svg';
import Ambulancia from '../img/ambulance.svg';
import Consulta from '../img/clinicaesteto.svg';
import Autorizacion from '../img/clinicaautorizacion.svg';
import Close from '../img/close.svg';
import OrdenSeguro from '../img/ordenseguro.svg';
import BtnSos from '../img/btnsos.svg';
import Clicker from '../img/clicker.svg';
import MiCuenta from '../img/clinica_micuenta.svg';
import Salir from '../img/clinica_salir.svg';
import Ayuda from '../img/clinica_ayuda.svg';
import Milocation from '../img/milocation.svg';
import Eliminar from '../img/eliminar.svg';
import Success from '../img/success.svg';
import Sinubicacion from '../img/sinubicacion.svg';
import Error from '../img/error.svg';
import Gps from '../img/gps.svg';
import Cerrar from '../img/cerrar.svg';

const Svg = (props) => {

    switch (props.name) {
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
        case "Phone":
            return <Phone style={props.style} />
        case "Ambulancia":
            return <Ambulancia style={props.style} />
        case "Consulta":
            return <Consulta style={props.style} />
        case "Autorizacion":
            return <Autorizacion style={props.style} />
        case "Close":
            return <Close style={props.style} />
        case "OrdenSeguro":
            return <OrdenSeguro style={props.style} />
        case "BtnSos":
            return <BtnSos style={props.style} />
        case "Clicker":
            return <Clicker style={props.style} />
        case "MiCuenta":
            return <MiCuenta style={props.style} />
        case "Salir":
            return <Salir style={props.style} />
        case "Ayuda":
            return <Ayuda style={props.style} />
        case "Milocation":
            return <Milocation style={props.style} />
        case "Eliminar":
            return <Eliminar style={props.style} />
        case "Success":
            return <Success style={props.style} />
        case "Sinubicacion":
            return <Sinubicacion style={props.style} />
        case "Error":
            return <Error style={props.style} />
        case "Gps":
            return <Gps style={props.style} />
        case "Cerrar":
            return <Cerrar style={props.style} />
        default: return <Text>Not Found</Text>
    }
}



export default Svg;