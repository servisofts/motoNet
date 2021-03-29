
import React from 'react'
import { Checkbox, Grid } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from 'react-redux';
import CheckDatos from '../CheckDatos';
//import CarnetDeIdentidad from '../../CarnetDeIdentidad/CarnetDeIdentidad';
import * as  conductorActions from '../../../Actions/conductorActions'


const TablaData = (props) => {
    const [checkState, setCheckSate] = React.useState(false);
    // var key = props.state.cargarDatosPersonalesReducer.data;
    var key = props.key_conduct;
    var data = props.state.conductorReducer.data[key].data;

    const checkAll = () => {
        setCheckSate(!checkState);
        var estado = checkState;
        if (!estado) {
            props.cambiarEstadoDatoConductorAll(key, 1)
        } else {
            props.cambiarEstadoDatoConductorAll(key, 0)
        }
        return <div />
    }

    return (
        <div >
            <Grid>
                <FormControlLabel style={{ padding: "10px" }}
                    control={<Checkbox checked={checkState} onClick={checkAll} />}
                    label={"Select All"}
                />


                <CheckDatos key_conductChek={props.key_conduct} propiedadesMias={{
                    title: "Nombres",
                    keyDato: "Nombres",
                    data: data.Nombres
                }} />
                <CheckDatos key_conductChek={props.key_conduct} propiedadesMias={{
                    title: "Apellidos",
                    keyDato: "Apellidos",
                    data: data.Apellidos
                }} />
                <CheckDatos key_conductChek={props.key_conduct} propiedadesMias={{
                    title: "Correo Electronico",
                    keyDato: "Correo",
                    data: data.Correo
                }} />
                <CheckDatos key_conductChek={props.key_conduct} propiedadesMias={{
                    title: "Teléfono",
                    keyDato: "Telefono",
                    data: data.Telefono
                }} />
                <CheckDatos key_conductChek={props.key_conduct} propiedadesMias={{
                    title: "CI",
                    keyDato: "CI",
                    data: data.CI
                }} />


            </Grid>

        </div>
    )

};
const initStates = (state) => {
    return { state }
};


const initActions = {
    ...conductorActions
};

export default connect(initStates, initActions)(TablaData);