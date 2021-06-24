import { Button, CircularProgress, Grid, InputLabel, MenuItem, TextField } from '@material-ui/core';
import React from 'react'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch',
        },
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        }
    },
    boxGlup: {
        border: "2px solid #fff",
        borderRadius: "15px",
        padding: "8px",
        marginBottom: "5px"
    },


}));
const DP_Parametro_popup = (props) => {
    const classes = useStyles();
    const [medida, setMedida] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const [name, setName] = React.useState("");
    const [valor, setValor] = React.useState("");


    const handleChange = (event) => {
        setMedida(event.target.value);
    };

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeValor = (event) => {
        setValor(event.target.value);
    };





    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    if (!props.isVisible) {
        return <div />
    }
    if (!props.keyParam) {
        return <div />
    }


    if (!props.state.parametrosViajeReducer.data) {
        if (!props.state.socketReducer.socket) {
            return <CircularProgress gress color="#fff" style={{ display: "block" }} />
        }
        if (props.state.parametrosViajeReducer.estado == "cargando") {
            return <CircularProgress color="#fff" style={{ display: "block" }} />
        }
        if (props.state.parametrosViajeReducer.estado == "error") {
            return <div>{props.state.parametrosViajeReducer.error}</div>
        }

    }
    if (props.keyParam) {
        var datosParametro = props.state.parametrosViajeReducer.data[props.keyParam];
        //setName({name: datosParametro.descripcion});
        //setName({ name: datosParametro.descripcion });

        //setName({ name: "rrrr" });
    }

    return (
        <Grid style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "#00000066",
            //zIndex: 999999,
            overflow: "auto"
        }}
            onClick={() => {
                props.onClose(false);
                setName('');
                setValor('');
                setMedida('');
                return <div />
            }}
            container justify="center" alignItems="center">
            <Grid
                style={{
                    border: "1px solid",
                    background: "#fff",
                    padding: 20,
                    borderRadius: 20,
                    // zIndex: 999,
                    overflow: "auto",
                    textAlign: "center"
                }}
                onClick={(evt) => {
                    evt.stopPropagation()
                    return false;
                }}>
                <Grid item xs={12}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="descripcionLabel" label="Descripción" value={datosParametro.descripcion} onChange={handleChangeName} disabled />
                        <TextField id="valorLabel" label="Valor" defaultValue={datosParametro.valor} onChange={handleChangeValor} />
                        <FormControl className={classes.formControl}>
                            <InputLabel id="medidaLabel">Medida</InputLabel>
                            <Select
                                style={{ position: "refixedltive", zIndex: 9999999999 }}
                                labelId="medidaLabel"
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={(medida == "") ? datosParametro.medida : medida}
                                onChange={handleChange}
                                disabled
                            >
                                <MenuItem value="" >
                                    <em>Ninguno</em>
                                </MenuItem>
                                <MenuItem value={"Metros"}>Metros</MenuItem>
                                <MenuItem value={"Segundos"}>Segundos</MenuItem>
                                <MenuItem value={"Cantidad"}>Cantidad</MenuItem>
                            </Select>

                        </FormControl>
                    </form>

                </Grid>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button variant="contained" color="secondary"  style={{ color: "#fff" }} onClick={() => {

                        var desc_up
                        var valor_up
                        var medida_up

                        /*if (name == "") {
                            desc_up = datosParametro.descripcion;
                        }*/
                        if (valor == "") {
                            valor_up = datosParametro.valor;
                        }
                        /*if (medida == "") {
                            medida_up = datosParametro.medida;
                        }*/

                        //props.state.parametroReducer.data[props.keyParam].descripcion = (desc_up ? datosParametro.descripcion : name);
                        props.state.parametrosViajeReducer.data[props.keyParam].valor = (valor_up ? datosParametro.valor : valor);
                        //props.state.parametroReducer.data[props.keyParam].medida = (medida_up ? datosParametro.medida : medida);

                        var objUpdate = props.state.parametrosViajeReducer.data[props.keyParam];
                        var objSend = {
                            component: "parametrosViaje",
                            type: "modificar",
                            estado: "cargando",
                            key_usuario: props.state.usuarioReducer.usuarioLog.key,
                            data: props.state.parametrosViajeReducer.data[props.keyParam]
                        }
                        props.state.socketReducer.send(objSend);

                        props.onClose(false);
                        setName('');
                        setValor('');
                        setMedida('');
                    }}>
                        Modificar
                    </Button>
                </Grid>

            </Grid>
        </Grid>

    )

}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(DP_Parametro_popup);