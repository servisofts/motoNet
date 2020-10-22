
import React from 'react'
import { connect } from 'react-redux';
import NaviDrawer from '../../Components/NaviDrawer';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import TableDetail from '../../Components/Table';

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
}));

const ParametrosPages = (props) => {

    const classes = useStyles();

    const [medida, setMedida] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleChange = (event) => {
        setMedida(event.target.value);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const getLista = () => {
        var list = [];
        var data = props.state.parametrosViajeReducer.data;
        Object.keys(data).map((key) => {
            var obj = data[key];
            console.log(obj);
            list.push({
                key,
                descripcion: { dato: obj.descripcion },
                valor: { dato: obj.valor },
                medida: { dato: obj.medida },
            })
        })
        return list;
    }

    if (!props.state.socketReducer.socket) {
        return <div style={{ Color: "#000" }}>cargando</div>
    }

    if (props.state.parametrosViajeReducer.estado == "cargando") {
        return <div>cargando</div>
    }
    if (!props.state.parametrosViajeReducer.data) {
        //no existe data 
        //pedis al sever atraves de getAll
        var objSend = {
            component: "parametrosViaje",
            type: "getAll",
            estado: "cargando",
            data: ""
        };
        props.state.socketReducer.send(objSend);
        return <div />
    }
    console.log('props.state.parametrosViajeReducer.estado')
    console.log(props.state.parametrosViajeReducer.data)

    return (
        <NaviDrawer title={"Lista Parametros Viajes"} history={props.history}

            page={() => {
                return (
                    <Grid container direction="row">
                        <Grid item xs={8}>
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField id="descripcionLabel" label="descripción" />
                                <TextField id="valorLabel" label="Valor" />
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="medidaLabel">Medida</InputLabel>
                                    <Select
                                        labelId="medidaLabel"
                                        id="demo-controlled-open-select"
                                        open={open}
                                        onClose={handleClose}
                                        onOpen={handleOpen}
                                        value={medida}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>Ninguno</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Metros</MenuItem>
                                        <MenuItem value={20}>Segundos</MenuItem>
                                        <MenuItem value={30}>Cantidad</MenuItem>
                                    </Select>
                                </FormControl>
                            </form>

                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="secondary" onClick={() => {
                                var descr = document.getElementById("descripcionLabel").value;
                                var valor = document.getElementById("valorLabel").value;
                                var medida = document.getElementById("medidaLabel").value;
                                console.log(descr)
                                console.log(valor)
                                console.log(medida)

                                var objSend = {
                                    component: "parametrosViaje",
                                    type: "registro",
                                    estado: "cargando",
                                    key_usuario: props.state.usuarioReducer.usuarioLog.key,
                                    data: {
                                        descripcion: descr,
                                        valor: valor,
                                        medida: medida
                                    }
                                }
                                props.state.socketReducer.send(objSend);
                            }}>
                                Agregar a Lista
                                </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TableDetail
                                title={"Tipo de Parametro"}
                                head={[
                                    { id: 'descripcion', label: 'DESCRIPCION' },
                                    { id: 'valor', label: 'VALOR' },
                                    { id: 'medida', label: 'MEDIDA' },
                                ]}
                                data={getLista()}
                                onAdd={(evt) => {
                                    props.history.push("/Usuario/Registro")
                                }}

                            />
                        </Grid>

                    </Grid >

                )
            }}
        />
    )
}

const initStates = (state) => {
    return { state }
};


export default connect(initStates)(ParametrosPages);
