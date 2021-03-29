import React, { Component } from 'react';
import { connect } from 'react-redux';
import NaviDrawer from '../../Components/NaviDrawer';
import { Button, Grid } from '@material-ui/core';
//import Logo from '../../img/logoCompletoRecurso.svg'
import Publicidad from '../../Components/Publicidad';

const PublicidadPage = (props) => {
   
    return (
        <NaviDrawer title={"Publicidad"} history={props.history}
            page={() => {
                return (
                    <Grid
                        container
                        justify="center"
                        direction="row"
                    >
                       
                        <Grid xs={12} style={{ height: 100, marginTop: 10, }}>
                            <Publicidad/>
                        </Grid>
                    </Grid>
                )
            }} />
    )
}

const initStates = (state) => {
    return { state }
};


export default connect(initStates)(PublicidadPage);