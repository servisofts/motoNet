import { Button, CircularProgress, Grid } from '@material-ui/core';
import React from 'react'
import { connect } from 'react-redux'
import TablaData from '../ConductorPerfil/TablaData';
import AppParam from "../../_nativeSocket/myProps.json"

var cabecera = "registro_doctor";
const ConductorPerfil = (props) => {
    const [objValoresCheck, setObjValoresCheck] = React.useState({});
    const [objErroresCheck, setObjErroresCheck] = React.useState({});
    const [checked, setChecked] = React.useState(true);

    if (!props.key_conductor) {
        return <div>No se encontro el key del conductor</div>;
    }
    if (!props.state.conductorReducer.data) {
        props.history.push("/ConductorListaPage");
        return <div>No hay usuarios cargados. </div>;
    }
    if (!props.state.conductorReducer.data[props.key_conductor]) {
        return <div>No se encontro el doctor {props.key_conductor}</div>;
    }
    var conductor = props.state.conductorReducer.data[props.key_conductor];

    const getFotoPerfil = () => {
        var url = "";
        if (conductor.data["Foto perfil"]) {
            url = AppParam.images.urlImage + conductor.data["Foto perfil"].dato + "?type=getPerfil&key_usuario=" + conductor.key;
        }
        return (
            <div style={{
                display: "flex"
            }}>
                <div style={{
                    width: 150,
                    height: 150,
                    borderRadius: 100,
                    marginBottom: 40,
                    border: "3px solid #CCC ",
                    overflow:"hidden"
                }}>
                    <img src={url} style={{
                        width: "100%",
                        height: "auto"
                    }} />

                </div>

            </div>

        )
    }
    const getDetalle = () => {
        return [
            "Nombres",
            "Apellidos",
            "Correo",
            "Telefono",
            "CI"
        ].map((key) => {
            var obj = conductor.data[key];

            return (
                <Grid container xs={12} style={{
                    marginTop: 8,
                    height: 45,
                    borderBottom: "2px solid #aaa",
                    marginBottom: 20
                }}>
                    <Grid xs={6} style={{
                        fontSize: 18,
                    }}>{key}</Grid>
                    <Grid xs={6} style={{
                        fontSize: 18,
                        fontWeight: "bold",
                    }}>{obj.dato} </Grid>
                </Grid>
            )
        })

    }

    const getAltaConductor = () => {
        var conductorEstadoObj = props.state.conductorReducer.data[props.key_conductor].usuario;
        console.log(conductorEstadoObj.estado);
        var estado = "";
        if (conductorEstadoObj.estado == 0) {
            estado = "Esperando verificacion."
            return (

                <div style={{ textAlign: "center" }} ><br />
                    <Button variant="contained" className="secondary txtBlanco" onClick={() => {
                        var usuario = props.state.usuarioReducer.usuarioLog.key;
                        var keyConductor = props.key_conductor;
                        var objSend = {
                            component: "usuario",
                            type: "aceptarConductor",
                            estado: "cargando",
                            key_usuario: usuario,
                            key_conductor: keyConductor

                        }
                        // props.state.socketReducer.send(objSend)

                    }}>
                        Aceptar Conductor
                </Button>

                </div>


            )
        }
        return (
            <Grid >
                <div style={{ textAlign: "center" }} >
                    <Button variant="contained" className="secondary txtBlanco" onClick={() => {
                        var usuario = props.state.usuarioReducer.usuarioLog.key;
                        var keyConductor = props.key_conductor;
                        var objSend = {
                            component: "usuario",
                            type: "cancelarConductor",
                            estado: "cargando",
                            key_usuario: usuario,
                            key_conductor: keyConductor

                        }
                        // props.state.socketReducer.send(objSend)

                    }}>
                        Cancelar Conductor
                </Button>
                </div>
            </Grid>

        )
    }


    const getButton = () => {
        if (props.state.conductorReducer.estadoConfirmando == "cargando") {
            return <div>Confirmando...</div>
        }
        var usuarioLog = props.state.usuarioReducer.usuarioLog;
        var datos = props.state.conductorReducer.data[props.key_conductor].data;
        return (
            <Button
                variant="contained" size="large" onClick={() => {
                    var objSend = {
                        component: "usuario",
                        type: "confirmarDatos",
                        estado: "cargando",
                        cabecera: "registro_conductor",//Todavia mno se sabe
                        key_usuario: usuarioLog.key,
                        key_usuario_modificado: props.key_conductor,
                        data: datos
                    };

                    props.state.socketReducer.send(objSend);
                }}>
                Confirmar datos
            </Button>
        )
    }

    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            xs={12}
        >
            <Grid
                container
                justify="center"
                alignItems="center"
                xs={12}
                md={12}
            >
                <Grid xs={12}
                    container
                    justify="center"
                    alignItems="center">
                    {getFotoPerfil()}

                </Grid>
                <Grid
                    container
                    xs={8}
                    justify="center"
                    alignItems="center">
                    <TablaData key_conduct={props.key_conductor} />
                    {/*getDetalle()*/}

                </Grid>

                <Grid
                    container
                    xs={8}
                    justify="center"
                    alignItems="center">
                    {getButton()}

                </Grid>





            </Grid>
        </Grid>
    )

}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(ConductorPerfil);