import React from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import * as tipoTarifaViajeActions from '../../Actions/tipoTarifaViaje'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


const TipoTarifaViaje = (props) => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        textmask: '(1  )    -    ',
        numberformat: '1320',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    if (!props.state.socketReducer.socket) {
        return <div style={{ Color: "#000" }}>cargando</div>
    }

    if (!props.state.tipoTarifaViajeReducer.key_tarifa) {
        return <div style={{ Color: "#000" }}>No seleccionado</div>
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
    var key_tarifa_selec = props.state.tipoTarifaViajeReducer.key_tarifa
    var objTipoViaje = props.state.tipoViajeReducer.data[key_tarifa_selec];

    const getMonto = (desc) => {
        if (!objTipoViaje.tarifas) {
            return "No hay tarifas";
        }
        if (!objTipoViaje.tarifas[desc]) {
            return "No encontrada";
        }
        return objTipoViaje.tarifas[desc].monto
    }

    return (
        <div style={{ height: '850px' }}>
            <Grid container direction="column">
                <Grid style={{ flex: 1, justifyContent: "center", textAlign: "center", color: "#000" }}>

                    <h2>{objTipoViaje.descripcion}</h2>
                </Grid>

                <Grid>

                    {Object.keys(props.state.tipoTarifaViajeReducer.data).map((key) => {
                        var obj = props.state.tipoTarifaViajeReducer.data[key];
                        return (
                            <ul>
                                <li>
                                    Descripcion: {obj.descripcion}
                                </li>
                                <li>
                                    Monto: {getMonto(obj.descripcion)}
                                </li>
                                <div>
                                    <TextField
                                        label="Editar Monto"
                                        id={"montolabel_"+key}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />

                                    <Button variant="contained" color="secondary" onClick={() => {
                                        var montoLabel = document.getElementById("montolabel_"+key).value;
                                        montoLabel = parseFloat(montoLabel);
                                        console.log(montoLabel)
                                        var objSend = {
                                            component: "tipoTarifa",
                                            type: "editarMontoTipoViaje",
                                            estado: "cargando",
                                            key_usuario: props.state.usuarioReducer.usuarioLog.key,
                                            key_tipo_viaje: key_tarifa_selec,
                                            tarifa: obj, //traemos del var obj = props.state.tipoTarifaViajeReducer.data[key];
                                            data: {
                                                monto: montoLabel
                                            }
                                            //key viaje, tarifa y usuario
                                        }
                                        props.state.socketReducer.send(objSend);

                                    }}>
                                        Actualizar
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