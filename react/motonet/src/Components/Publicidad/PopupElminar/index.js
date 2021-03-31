import React from 'react'
import { connect } from 'react-redux';

import AppParams from '../../../_nativeSocket/myProps.json'



const PopupElminar = (props) => {
    // var objSubirFoto = {
    //     component: "especialidad",
    //     type: "eliminar",
    //     estado: "cargando",
    //     key_especialidad: key,
    // }
    // props.state.socketReducer.send(objSubirFoto)
    if(!props.keyEliminar){
        return <div/>
    }
    return (
        <div style={{
            width:"80%",
            left:"10%",
            height:"80vh",
            position:"fixed",
            top:"10vh",
            background:"#000"
        }}>
            
        </div>
    )

}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(PopupElminar);