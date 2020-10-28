import React from 'react'
import { connect } from 'react-redux';
import NaviDrawer from '../../Components/NaviDrawer';
import { Grid } from '@material-ui/core';
import TableDetail from '../../Components/Table';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TableNewMe from '../../Components/TableNewMe'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
}));

const ListaAsociacionMotoPage = (props) => {

    const classes = useStyles();

    const getLista = () => {
        var list = [];
        var data = props.state.asociacionMotoReducer.data;
        Object.keys(data).map((key) => {
            var obj = data[key];
            console.log(obj);
            list.push({
                //las variables son las mismas que se llama de las tablas
                key,
                UsuarioResponsable: { dato: obj.key_encargado },
                Descripcion: { dato: obj.descripcion },
                Direccion: { dato: obj.direccion }
            })
        })

        return list;
    }



    return (
        <NaviDrawer title={"Lista Asociacion"} history={props.history}
            page={() => {
                if (!props.state.socketReducer.socket) {
                    return <div style={{ color: "#000" }}>cargando</div>
                }

                if (props.state.asociacionMotoReducer.estado == "cargando") {
                    return <div>cargando</div>
                }
                if (props.state.asociacionMotoReducer.estado == "error") {
                    return <div>{props.state.asociacionMotoReducer.error}</div>
                }
                if (!props.state.asociacionMotoReducer.data) {
                    var objSend = {
                        component: "asociacionMoto",
                        type: "getAll",
                        estado: "cargando",
                        data: ""
                    };
                    props.state.socketReducer.send(objSend);
                    return <div />
                }
                return (
                    <Grid container direction="row">
                        <Grid item xs={12} spacing={2}>
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField id="responsableLabel" label="Responsable" />
                                <TextField id="descripcionLabel" label="Descripción" />
                                <TextField id="direccionLabel" label="Direccion" />

                                <Button variant="contained" color="secondary" onClick={() => {
                                    var resp = document.getElementById("responsableLabel").value;
                                    var descr = document.getElementById("descripcionLabel").value;
                                    var dir = document.getElementById("direccionLabel").value;
                                    console.log(descr)
                                    var objSend = {
                                        component: "asociacionMoto",
                                        type: "registro",
                                        estado: "cargando",
                                        key_usuario: props.state.usuarioReducer.usuarioLog.key,
                                        data: {
                                            direccion: dir,
                                            descripcion: descr,
                                            key_encargado: resp
                                        }
                                    }
                                    console.log(dir, descr, resp);
                                    props.state.socketReducer.send(objSend);
                                }}>
                                    Agregar a Lista
                                </Button>
                            </form>
                        </Grid>
                        <Grid item xs={12}  >

                            <TableNewMe
                                title={"Lista de Asociaciones"}
                                head={[
                                    { id: 'UsuarioResponsable', label: 'Responsable' },
                                    { id: 'Descripcion', label: 'Descripcion' },
                                    { id: 'Direccion', label: 'Direccion' },
                                ]}
                                data={getLista()}
                                onAdd={(evt) => {
                                    props.history.push("/Usuario/Registro")
                                }}
                                // handleClick={
                                //     (key) => {
                                //         props.changeSelectDato(key);
                                //         return;
                                //     }
                                // }
                            />
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

export default connect(initStates)(ListaAsociacionMotoPage);
