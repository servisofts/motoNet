import { Button, Grid } from '@material-ui/core'
import React from 'react'
const AS_default = (props) => {

    if (!props.propiedadesPadre) {
        return <div>No existe propiedadesPadre</div>
    }
    return (
        <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            style={{
                position: "fixed",
                top: 0,
                right: 0,
                zIndex: 999999,
                width: "100%",
                height: "100%",
                background: "#00000044"
            }}
        >
            <Grid
                container
                direction="row"
                justify="center"
                xs={10}
                md={8}
                style={{
                    background: "#fff",
                    borderRadius: 40,
                    minHeight: "50%",
                    maxHeight: "80%",
                    overflow: "auto"
                }}>
                <Grid
                    container
                    xs={10}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{
                        fontSize: 32,
                    }}
                >
                    {props.propiedadesPadre.titulo}
                </Grid>
                <Grid
                    container
                    xs={10}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{
                        fontSize: 20,
                    }}
                >
                    {props.propiedadesPadre.mensaje}
                </Grid>
                <Grid
                    container
                    xs={10}
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    style={{
                        fontSize: 20,
                    }}
                >
                    <Grid xs={4}
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Button variant="contained" style={{ width: "100%" }} onClick={props.propiedadesPadre.onClose}> CERRAR </Button>
                    </Grid>
                    <Grid xs={4}
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Button variant="contained" style={{ width: "100%" }} onClick={props.propiedadesPadre.onConfirm}> VER </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}
export default AS_default;