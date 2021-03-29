import React from 'react'
import IS_texto from './IS_texto';
import IS_telefono from './IS_telefono';
import IS_email from './IS_email';
import IS_password from './IS_password';
const SS_input = (props) => {

    if (!props.data) {
        return <div>No existe data</div>
    }

    // console.log(props.doctor)
    
    var data = props.data;
    if (!data.tipo_dato_cabecera) {
        return <div>No existe tipo_dato_cabecera</div>
    }
    if (!data.dato) {
        return <div>No existe dato</div>
    }
    if (!data.tipo_dato) {
        return <div>No existe tipo_dato</div>
    }

    switch (data.tipo_dato.descripcion) {
        case "texto":
            return <IS_texto propiedadesPadre={props} />
        case "telefono":
            return <IS_telefono propiedadesPadre={props} />
        case "email":
            return <IS_email propiedadesPadre={props} />
        case "password":
            return <IS_password propiedadesPadre={props} />
        case "documento":
            return <div />
        default:
            return <div>No existe tipo {data.tipo_dato.descripcion}</div>
    }
}
export default SS_input;