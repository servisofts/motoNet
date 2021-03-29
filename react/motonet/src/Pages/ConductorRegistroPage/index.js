import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import NaviDrawer from '../../Components/NaviDrawer';
import ConductorRegistro from '../../Components/ConductorRegistro';


const ConductorRegistroPage = (props) => {
    var key_usuario = props.match.params.key
    return (
        <NaviDrawer title={"Registro de Conductor"} history={props.history}
            page={() => {
                return (
                    <ConductorRegistro history={props.history} key_usuario={key_usuario}/>
                )
            }}
        />
    )
}

export default ConductorRegistroPage;
