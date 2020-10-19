import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import * as tipoTarifaViajeActions from '../../Actions/tipoTarifaViaje'

const TipoTarifaViaje = (props) => {

    var key_tarifas = props.state.tipoTarifaViajeReducer.data;

    if (!props.state.socketReducer.socket) {
        return <div style={{ Color: "#000" }}>cargando</div>
    }

    if (props.state.tipoTarifaViajeReducer.estado == "cargando") {
        return <div>cargando</div>
    }
    if (!props.state.tipoTarifaViajeReducer.data) {
        //no existe data 
        //pedis al sever atraves de getAll
        var objSend = {
            component: "tipoTarifa",
            type: "getAll",
            estado: "cargando",
            data: ""
        };
        props.state.socketReducer.send(objSend);
        return <div />
    }

    return (
        <div style={{ height: '850px' }}>
            <Grid container direction="column">
                <Grid style={{ flex: 1, justifyContent: "center", textAlign: "center", color: "#000" }}>
                    <h2>Tipos de Tarifas</h2>
                </Grid>

                <Grid>

                    {Object.keys(props.state.tipoTarifaViajeReducer.data).map((key) => {
                        var obj = props.state.tipoTarifaViajeReducer.data[key];
                        return (
                            <ul>
                                <li>
                                    Descripcion: {JSON.stringify(obj.descripcion)}
                                </li>
                                <div>
                                    <TextField id="montoLabel" label="Monto" />
                                    <Button variant="contained" color="secondary" onClick={() => {
                                        var descr = document.getElementById("montoLabel").value;
                                        console.log(descr)
                                        var objSend = {
                                            component: "tipoTarifa",
                                            type: "seleccionarTipoViaje",
                                            estado: "cargando",
                                            key_usuario: props.state.usuarioReducer.usuarioLog.key,
                                            data: {
                                                descripcion: descr
                                            }
                                        }
                                        props.state.socketReducer.send(objSend);
                                    }}>
                                        Enviar
                                </Button>
                                </div>

                            </ul>
                        )
                    })}

                </Grid>

            </Grid>
        </div>
    )
}
const initStates = (state) => {
    return { state }
};

const initActions = {
    ...tipoTarifaViajeActions
};

export default connect(initStates)(TipoTarifaViaje);