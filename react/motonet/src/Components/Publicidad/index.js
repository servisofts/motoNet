import React from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import TableNewMe2 from '../TableNewMe2';

import AppParams from "../../_nativeSocket/myProps.json"
import PopupElminar from './PopupElminar';
import HighlightOff from '@material-ui/icons/HighlightOff';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40th',
        }
    },
    anchoTextField: {
        width: '100%',
        marginTop: "10px"
    },
    paddForm: {
        paddingTop: "25px"
    },
    txtError: {
        color: "red",
        paddingTop: "5px",
        fontSize: "12px"
    },
    boxImg: {
        display: "inline-block",
        width: 380,
        padding: 25,
        border: "1px solid rgb(192, 192, 192)",
        borderRadius: "8px",
        marginRight: 5,
        marginBottom: 5,
        minHeight: 245,
        verticalAlign: "top"

    },
    iconEliminar: {
        position: "absolute",
        fontSize: "40px",
        color: "#f00",
        background: "#fff",
        borderRadius: 20,
        cursor: "pointer",
    }

}));



const Publicidad = (props) => {

    const { register, handleSubmit, errors } = useForm();
    const [keyEliminar, setKeyEliminar] = React.useState(false);
    const onSubmit = data => console.log(data);
    console.log(errors);

    const classes = useStyles();

    if (!props.state.usuarioReducer.usuarioLog) {
        props.history.push("/");
        return <div />
    }

    if (!props.state.publicidadReducer.data) {
        if (!props.state.socketReducer.socket) {
            return <div />
        }
        if (props.state.publicidadReducer.estado == "cargando") {
            return <CircularProgress color="#fff" style={{ display: "block" }} />
        }
        if (props.state.publicidadReducer.estado == "error") {
            return <div>{props.state.usuarioReducer.error}</div>
        }
        var objSend = {
            component: "publicidad",
            type: "getAll",
            estado: "cargando",
            data: ""
        };
        props.state.socketReducer.send(objSend);
        return <CircularProgress color="#fff" style={{ display: "block" }} />
    }

    const getSubirFoto = () => {
        return (<Grid>
            <Button color={"secondary"} variant={"outlined"} onClick={() => {
                props.state.imagePickerReducer.respose = (b64) => {
                    //respuesta con b64                                          
                    var objSubirFoto = {
                        component: "publicidad",
                        type: "subirFoto",
                        estado: "cargando",
                        key_usuario: props.state.usuarioReducer.usuarioLog.key,
                        data: b64,
                    }
                    props.state.socketReducer.send(objSubirFoto)
                };
                props.state.imagePickerReducer.tipo = "table";
                props.state.imagePickerReducer.imagePicker(props.state.imagePickerReducer);
            }}>Subir foto</Button>
            <br />
            <br />
        </Grid>)
    }


    const getLista = () => {

        var list = [];
        var data = props.state.publicidadReducer.data;

        return Object.keys(data).map((key) => {
            var obj = data[key];
            console.log(obj);
            list.push({
                key,
                Key: key,
                publicidad: (AppParams.images.urlImage + "publicidad.png" + "?type=publicidad&key=" + key),
                fecha_on: (new Date(obj.fecha_on).getTime()),
            })
            var url = "";
            var urlSmall = "";
            url = AppParams.images.urlImage + "publicidad.png" + "?type=publicidad&key=" + obj.key
            urlSmall = AppParams.images.urlImage + "publicidad_small.png" + "?type=publicidad&key=" + obj.key

            return (
                <div className={classes.boxImg}>
                    <HighlightOff className={classes.iconEliminar} onClick={() => {
                        var objSend = {
                            component: "publicidad",
                            type: "eliminar",
                            estado: "cargando",
                            key_usuario: props.state.usuarioReducer.usuarioLog.key,
                            key: key
                        }
                        var resp = window.confirm("¿Eliminar imagen?");
                        if( resp === true) {
                            props.state.socketReducer.send(objSend);
                            //alert ("")
                        }
                        { /*alert(JSON.stringify(objSend)) */ }

                    }} />
                    <img src={AppParams.images.urlImage + "publicidad.png" + "?type=publicidad&key=" + key} style={{
                        maxWidth: "100%",


                    }} />



                </div>
            )
        })

    }

    return (
        <div >

            <Grid container direction="row" >
                {getSubirFoto()}
                <Grid xs={12}>
                    {getLista()}
                </Grid>
            </Grid>
            <PopupElminar keyEliminar={keyEliminar} setKeyEliminar={setKeyEliminar} />
        </div>
    )

}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Publicidad);