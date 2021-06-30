import React from 'react'
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TableNewMe from '../../../../Components/TableNewMe'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
}));

const DP_AsociacionMoto_popup = (props) => {
 

    const classes = useStyles();

    if (!props.isVisible) {
        return <div />
    }

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
    if (!props.state.socketReducer.socket) {
        return <div style={{ color: "#000" }}>cargandoo</div>
    }

    if (props.state.asociacionMotoReducer.estado == "cargando") {
        return <div>cargando1</div>
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

        <Grid style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "#00000066",
            zIndex: 999999,
            overflow: "auto"
        }}
            onClick={() => {
                props.onClose(false)
                return <div />
            }}
            container justify="center" alignItems="center">

            <Grid justify="center" alignItems="center" xs={10}
                style={{
                    border: "1px solid",
                    background: "#fff",
                    padding: 20,
                    borderRadius: 20,
                    overflow: "auto"
                }}
                onClick={(evt) => {
                    evt.stopPropagation()
                    return false;
                }}
            >
                <Grid style={{ paddingTop: 7 }}>
                    <TableNewMe
                         title={"Elige la Asociación"}
                         head={[
                             { id: 'UsuarioResponsable', label: 'Responsable' },
                             { id: 'Descripcion', label: 'Descripcion' },
                             { id: 'Direccion', label: 'Direccion' },
                         ]}
                         order={{
                             key: "UsuarioResponsable",
                             dir: "desc"
                        }}
                         data={getLista()}
                        
                        handleClick={
                            (key) => {
                                /*var objSend = {
                                    component: "conductorAsociacionMoto",
                                    type: "registro",
                                    estado: "cargando",
                                    key_conductor: props.conductor.key,
                                    key_asociacion: key,
                                    key_usuario: "sadhasgd"
                                }
                                props.state.socketReducer.send(objSend)
                                return;*/
                                alert(props.conductor.key + " / "+ key)
                            }
                        }

                    />
                </Grid>
            </Grid>
        </Grid>

      
     
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(DP_AsociacionMoto_popup);
