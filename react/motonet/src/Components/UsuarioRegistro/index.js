import { Button, CircularProgress, Grid } from '@material-ui/core';
import React from 'react'
import { connect } from 'react-redux';
import SS_alert from '../Servisofts/SS_alert';
import SS_input from '../Servisofts/SS_input';


var cabecera = "registro_administrador";
const UsuarioRegistro = (props) => {
    const [objValores, setObjValores] = React.useState({});
    const [objErrores, setObjErrores] = React.useState({});

    const [Accion, setAccion] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (!props.state.cabeceraDatosReducer.data[cabecera]) {
        if (!props.state.socketReducer.socket) {
            return (
                <div>No hay conexión con el socket</div>
            )
        }
        if (props.state.cabeceraDatosReducer.estado == "cargando") {
            return <div>Cargando</div>
        }
        var objSend = {
            component: "cabeceraDato",
            type: "getDatoCabecera",
            estado: "cargando",
            cabecera: cabecera
        }
        props.state.socketReducer.send(objSend)
        return (
            <div>No hay cabecera</div>
        )
    }
    var datosCabecera = props.state.cabeceraDatosReducer.data[cabecera];

    if (!Accion) {
        if (props.key_usuario) {
            var user = "";
            if (props.state.usuarioReducer.data[props.key_usuario]) {
                user = props.state.usuarioReducer.data[props.key_usuario];
            }
            var objChange = {};
            datosCabecera.map((obj, key) => {
                objChange[key] = (!user.data[obj.dato.descripcion] ? "" : user.data[obj.dato.descripcion].dato);
            })
            setObjValores({ ...objChange });
            setAccion("Editar")
            return <div />
        } else if (!props.key_usuario) {
            setAccion("Crear")
        }
    }

    if (props.state.usuarioReducer.estado == "exito" && props.state.usuarioReducer.type == "insertarDato") {
        handleClickOpen()
        props.state.usuarioReducer.estado = false
    }

    const getLista = () => {

        return datosCabecera.map((obj, key) => {
            return (
                <Grid xs={12}>
                    <SS_input
                        data={obj}
                        style={{
                            width: "100%"
                        }}
                        value={objValores[key]}
                        error={objErrores[key]}
                        onChange={(elm) => {
                            var texto = elm.currentTarget.value;
                            objValores[key] = texto;
                            setObjValores({ ...objValores });
                            return <div></div>
                        }} />
                </Grid>

            )
        })
    }
    const getButtonCrear = () => {
        if (props.state.usuarioReducer.type == "registro"
            && props.state.usuarioReducer.estado == "exito") {
            return (
                <SS_alert
                    titulo={"Nuevo usuario registrado"}
                    mensaje={"Nuevo usuario registrado con éxito. Presione ver para ir a el perfil."}
                    onClose={() => {
                        props.dispatch({
                            component: "usuario",
                            type: "registro",
                            estado: ""
                        })
                    }}
                    onConfirm={() => {
                        props.dispatch({
                            component: "usuario",
                            type: "registro",
                            estado: ""
                        })
                        props.history.push("/ListaUsuario");
                    }}
                />
            )
        }
        if (props.state.usuarioReducer.estado == "cargando") {
            return <CircularProgress color="#fff" style={{ display: "block" }} />
        }
        if (props.state.usuarioReducer.estado == "error") {
            alert(props.state.usuarioReducer.error)
            props.dispatch({
                component: "usuario",
                type: "registro",
                estado: ""
            })
        }

        if (Accion == "Crear") {
            return (
                <Button className="secondary txtBlanco" variant="contained" onClick={() => {
                    var error = false;
                    var arrDatos = [];
                    datosCabecera.map((obj, key) => {
                        if (!objValores[key]) {
                            if (obj.dato.requerido) {
                                objErrores[key] = true;
                                error = true;
                            }
                        } else {
                            objErrores[key] = false;
                            arrDatos.push({
                                dato: obj,
                                data: objValores[key]
                            })
                        }
                    });
                    setObjErrores({ ...objErrores })

                    if (!error) {
                        console.log(objSend);
                        var objSend = {
                            component: "usuario",
                            type: "registro",
                            estado: "cargando",
                            cabecera: cabecera,
                            data: arrDatos
                        }
                        props.state.socketReducer.send(objSend)
                    }
                }}>
                    crear
                </Button>
            )
        } else if (Accion == "Editar") {
            return (
                <Button variant="contained" className="secondary txtBlanco" onClick={() => {
                    var error = false;
                    var arrDatos = [];
                    datosCabecera.map((obj, key) => {
                        if (!objValores[key]) {
                            if (obj.dato.requerido) {
                                if (obj.dato.descripcion == "Correo") {
                                    objErrores[key] = false;
                                    arrDatos.push({
                                        dato: obj,
                                        data: ""
                                    })
                                } else {
                                    objErrores[key] = true;
                                    error = true;
                                }
                            }
                        } else {
                            objErrores[key] = false;
                            arrDatos.push({
                                dato: obj,
                                data: objValores[key]
                            })
                        }
                    });
                    setObjErrores({ ...objErrores })

                    if (!error) {
                        // console.log(objSend);
                        var objSend = {
                            component: "usuario",
                            type: "insertarDato",
                            estado: "cargando",
                            cabecera: cabecera,
                            data: arrDatos,
                            key_usuario: props.key_usuario
                        }
                        props.state.socketReducer.send(objSend)
                    }
                }}>
                    EDITAR
                </Button>
            )
        }
    }
    return (
        <Grid
            container
            justify="center"
            xs={12}
        >
            <Grid
                container
                justify="center"
                xs={12}
                md={8}
            >

                {getLista()}
                <Grid xs={12}
                    container
                    justify="center"
                    style={{ marginTop: 20 }}
                >
                    {getButtonCrear()}
                </Grid>
            </Grid>
        </Grid>
    )

}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(UsuarioRegistro);