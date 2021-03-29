import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import NaviDrawer from '../../Components/NaviDrawer';
import ConductorPerfil from '../../Components/ConductorPerfil';


const ConductorPerfilPage = (props) => {
    console.log()
    return (
        <NaviDrawer title={"Perfil de Conductor"} history={props.history}
            page={() => {
                return (
                    <ConductorPerfil history={props.history} key_conductor={props.match.params.key} />
                )
            }}
        />
    )
}

export default ConductorPerfilPage;
