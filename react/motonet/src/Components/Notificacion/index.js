import React from 'react';
//import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));

const Notificacion = (props) => {

    const classes = useStyles();

    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
        setValue(event.target.value);
    };


    if (!props.state.socketReducer.socket) {
        return <div style={{ Color: "#000" }}>cargando</div>
    }

    if (props.state.notificacionReducer.estado == "cargando") {
        return <div>cargando</div>
    }
    if (!props.state.notificacionReducer.data) {
        //no existe data 
        //pedis al sever atraves de getAll
        var objSend = {
            component: "notificacion",
            type: "enviarNotificacion",
            estado: "cargando",
            data: ""
        };
        props.state.socketReducer.send(objSend);
        return <div />
    }

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container direction="column">
                    <Grid item xs={4}>
                        <TextField id="tituloLabel" label="Titulo" />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="mensajeLabel"
                            label="Mensajes..."
                            multiline
                            rows={5}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="secondary" onClick={() => {
                            var titulo = document.getElementById("tituloLabel").value;
                            var mensaje = document.getElementById("mensajeLabel").value;
                            console.log(titulo)
                            console.log(mensaje)

                            var objSend = {
                                component: "notificacion",
                                type: "enviarNotificacion",
                                estado: "cargando",
                                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                                data: {
                                    titulo: titulo,
                                    mensaje: mensaje,
                                }
                            }
                            props.state.socketReducer.send(objSend);
                        }}>
                            Enviar Notificaciones
                                </Button>
                    </Grid>
                </Grid>


            </form>
        </div>
    );
}

const initStates = (state) => {
    return { state }
};


export default connect(initStates)(Notificacion);