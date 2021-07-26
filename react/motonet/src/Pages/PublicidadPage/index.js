import React, { Component } from 'react';
import { connect } from 'react-redux';
import NaviDrawer from '../../Components/NaviDrawer';
import { Button, Grid } from '@material-ui/core';
//import Logo from '../../img/logoCompletoRecurso.svg'
import Publicidad from '../../Components/Publicidad';
import Page from '../../Components/Page';
import { SIcon } from '../../SComponent';

const PublicidadPage = (props) => {

    return (<Page
        history={props.history}
        title={"Publicidad"}
        onBack={"/Inicio"}
        icon={<SIcon name={"publicidad"}/>}
    >
        <Grid
            container
            justify="center"
            direction="row"
        >
            <Grid xs={12} style={{ height: 100, marginTop: 10, }}>
                <Publicidad />
            </Grid>
        </Grid>
    </Page>)
}

const initStates = (state) => {
    return { state }
};


export default connect(initStates)(PublicidadPage);