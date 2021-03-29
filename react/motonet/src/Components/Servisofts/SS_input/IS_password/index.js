import { TextField } from '@material-ui/core';
import React from 'react'
const IS_password = (props) => {

    if (!props.propiedadesPadre) {
        return <div>No existe propiedadesPadre</div>
    }
    var data = props.propiedadesPadre.data;
    var style = props.propiedadesPadre.style;
    if (props.propiedadesPadre.error) {
        return <TextField error label={data.dato.descripcion} style={style} onChange={props.propiedadesPadre.onChange} value={props.propiedadesPadre.value} />
    }
    return (
        <div>
            <TextField label={data.dato.descripcion} style={style} onChange={props.propiedadesPadre.onChange} value={props.propiedadesPadre.value} />
        </div>
    )

}
export default IS_password;