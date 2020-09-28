import React from 'react'
import NaviDrawer from '../../Components/NaviDrawer';
import { CircularProgress, Grid, Button, Snackbar } from '@material-ui/core';


const MapaPage = (props) => {
    return (
        <NaviDrawer title={"Mapa"} history={props.history}

        page={() => {
            
             return (
                  <Grid container direction="row">
                      <div>hola mapa</div>
                  </Grid>
             )
        }}
   />
    )
}

export default MapaPage;
