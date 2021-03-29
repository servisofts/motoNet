import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import NaviDrawer from '../../Components/NaviDrawer';
import UsuarioRegistro from '../../Components/UsuarioRegistro';


const UsuarioRegistroPage = (props) => {
    return (
        <NaviDrawer title={"Registro de usuario"} history={props.history}
            page={() => {
                return (
                    <UsuarioRegistro history={props.history}/>
                )
            }}
        />
    )
}

export default UsuarioRegistroPage;
