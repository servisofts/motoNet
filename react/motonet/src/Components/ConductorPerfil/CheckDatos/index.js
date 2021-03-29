import React, { Component } from 'react'
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import * as  conductorActions from '../../../Actions/conductorActions'

import Typography from '@material-ui/core/Typography';

const CheckDatos = (props) => {

    //var key_usuario = props.state.cargarDatosPersonalesReducer.data;

    //var key_usuario = props.state.conductorReducer.data;
    var key_usuario = props.key_conductChek;
    //  var data = props.state.conductorReducer.data[key_usuario].data;

    var propiedadesMias = props.propiedadesMias;
    var data = propiedadesMias.data;
    var title = propiedadesMias.title;
    var datoString = "";
    if (data) {
        datoString = data.dato;
        if (title == "Domicilio actual") {
            if (data.dato.length > 2) {
                var obj = JSON.parse(data.dato);
                if (obj) {
                    datoString = obj.direccion;
                }
            }
        }
    }

    if (!data) {
    return <div style={{ padding: "10px", marginBottom: 15 }}>{title} no registrado</div>
    }

    const changeCheck = () => {
        // var key_dato = data.descripcion;
        var key_dato = propiedadesMias.keyDato;
        // var key_dato = title;
        var estado = 1;
        if (data.estado == 1) {
            estado = 0;
        }
        props.cambiarEstadoDatoConductor(key_usuario, key_dato, estado)
    }
    return (
        <Grid container direction="row">
            <Grid item xs={1.5} >
                <Checkbox
                    color="primary"
                    checked={data.estado == 1}
                    onChange={changeCheck} style={{ height: 20 }} />
            </Grid>
            <Grid item xs={9} style={{ fontWeight: 'bold' }}>
                {title}:
            </Grid>
            <Grid item xs={1}>

            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginBottom: 15 }}>
                {datoString}
            </Grid>
        </Grid>
    )
};

const initStates = (state) => {
    return { state }
};

const initActions = {
    ...conductorActions
};

export default connect(initStates, initActions)(CheckDatos);
