import React from 'react'
import { connect } from 'react-redux';
import NaviDrawer from '../../Components/NaviDrawer';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TipoTarifaViaje from '../../Components/TipoTarifaViaje'
import * as  tipoTarifaViajeActions from '../../Actions/tipoTarifaViaje';
import TableNewMe from '../../Components/TableNewMe';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
}));

const TipoViajePage = (props) => {

    const classes = useStyles();

    const getLista = () => {
        var list = [];
        var data = props.state.tipoViajeReducer.data;
        Object.keys(data).map((key) => {
            var obj = data[key];
            console.log(obj);
            list.push({
                key,
                descripcion: { dato: obj.descripcion },
            })
        })
        return list;
    }

    if (!props.state.socketReducer.socket) {
        return <div style={{ Color: "#000" }}>cargando</div>
    }

    if (props.state.tipoViajeReducer.estado == "cargando") {
        return <div>cargando</div>
    }
    if (!props.state.tipoViajeReducer.data) {
        //no existe data 
        //pedis al sever atraves de getAll
        var objSend = {
            component: "tipoViaje",
            type: "getAll",
            estado: "cargando",
            data: ""
        };
        props.state.socketReducer.send(objSend);
        return <div />
    }
    console.log('props.state.tipoViajeReducer.estado')
    console.log(props.state.tipoViajeReducer.data)



    return (
        <NaviDrawer title={"Tipos de Viajes"} history={props.history}

            page={() => {
                return (
                    <Grid container direction="row">
                        <Grid item xs={8}>
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField id="descripcionLabel" label="descripción" />

                                <Button variant="contained" color="secondary" onClick={() => {
                                    var descr = document.getElementById("descripcionLabel").value;
                                    console.log(descr)
                                    var objSend = {
                                        component: "tipoViaje",
                                        type: "registro",
                                        estado: "cargando",
                                        key_usuario: props.state.usuarioReducer.usuarioLog.key,
                                        data: {
                                            descripcion: descr
                                        }
                                    }
                                    props.state.socketReducer.send(objSend);
                                }}>
                                    Agregar a Lista
                                </Button>
                            </form>

                            <TableNewMe
                                title={"Tipo de Viajes"}
                                head={[
                                    { id: 'descripcion', label: 'Descripción' },
                                ]}
                                data={getLista()}
                                handleClick={
                                    (key) => {
                                        props.TipoTarifa(key);
                                       //console.log("entrooo",key)
                                        return;
                                    }
                                }
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <TipoTarifaViaje />
                        </Grid>
                    </Grid>

                )
            }}
        />
    )
}

const initStates = (state) => {
    return { state }
};

const initActions = {
    ...tipoTarifaViajeActions
};
export default connect(initStates, initActions)(TipoViajePage);
