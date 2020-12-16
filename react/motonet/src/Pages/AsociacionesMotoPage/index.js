import React from 'react';
import NaviDrawer from '../../Components/NaviDrawer';
import { withStyles, } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';

const CssTextField = withStyles({
    root: {
        background: "#ffffff33",
        '& .MuiInputBase-root': {
            color: 'rgb(231, 51, 73);',
        },
        '& label': {
            color: 'rgb(231, 51, 73);',
        },
        '& label.Mui-focused': {
            color: 'rgb(231, 51, 73);',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#000',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgb(231, 51, 73);',
            },
            '&:hover fieldset': {
                borderColor: 'rgb(231, 51, 73);',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#000',
            },
        },
    },
})(TextField);

const AsociacionesMotoPage = (props) => {
    const [data, setData] = React.useState({


        correo: {
            error: false,
            value: ""
        },
        telefono: {
            error: false,
            value: ""
        },
        fecha_on: {
            error: false,
            value: ""
        },
        sexo: {
            error: false,
            value: ""
        },
        domicilio: {
            error: false,
            value: ""
        },
        documento: {
            error: false,
            value: ""
        }
    });

    const onChange = (evt, nombre) => {

        data[nombre].value = evt.currentTarget.value;
        setData({ ...data });
        return <div />;
    }

    return (



        <NaviDrawer title={"Asociacion de Motos"} history={props.history}

            page={() => {
                return (
                    <div className="page" style={{ color: "#000" }}>
                        <div className="center">
                            <div style={{ display: "block", textAlign: "center", width: "100%" }}>
                                <div style={{ display: "block" }}>
                                    Registrar Asociacion.
                                </div>
                                <div style={{ display: "block", marginTop: 10 }}>
                                    <form noValidate autoComplete="off">
                                        <CssTextField variant="outlined" label="Nombres" error={data.correo.error} style={{ margin: 8, width: "100%" }} type="email" value={data.correo.value} onChange={(evt) => onChange(evt, "correo")} />
                                        <CssTextField variant="outlined" label="Apellidos" error={data.telefono.error} style={{ margin: 8, width: "100%" }} type="text" value={data.telefono.value} onChange={(evt) => onChange(evt, "telefono")} />
                                        <CssTextField variant="outlined" label="Fecha nacimiento" error={data.fecha_on.error} style={{ margin: 8, width: "100%" }} type="text" value={data.fecha_on.value} onChange={(evt) => onChange(evt, "fecha_on")} />
                                        <CssTextField variant="outlined" label="Sexo" error={data.sexo.error} style={{ margin: 8, width: "100%" }} type="text" value={data.sexo.value} onChange={(evt) => onChange(evt, "sexo")} />
                                        <CssTextField variant="outlined" label="Domicilio" error={data.domicilio.error} style={{ margin: 8, width: "100%" }} type="text" value={data.domicilio.value} onChange={(evt) => onChange(evt, "domicilio")} />
                                        <CssTextField variant="outlined" label="Documento" error={data.documento.error} style={{ margin: 8, width: "100%" }} type="text" value={data.documento.value} onChange={(evt) => onChange(evt, "documento")} />
                                    </form>
                                </div>
                                <div style={{
                                    display: "flex",
                                    marginTop: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: "#000"
                                }}>
                                    <Grid container>

                                        <Grid xs={12}>
                                            <Button variant="contained" size="large" style={{ backgroundColor: '#ff3333', color:'#fff' }} onClick={() => {

                                                var dataSend = {};
                                                var exito = true;
                                                Object.keys(data).map((key) => {
                                                    dataSend[key] = data[key].value;
                                                    if (!data[key].value) {
                                                        data[key].error = true;
                                                        exito = false;
                                                    } else {
                                                        data[key].error = false;
                                                    }
                                                })
                                                setData({ ...data });
                                                if (!exito) {
                                                    return <div />
                                                }
                                                var objSend = {
                                                    component: "asociacionMoto",
                                                    type: "registro",
                                                    estado: "cargando",
                                                    data: dataSend
                                                };
                                                props.state.socketReducer.send(objSend);
                                            }}>Registrar</Button>

                                        </Grid>
                                    </Grid>

                                </div>

                            </div>

                        </div>
                    </div>
                )
            }}
        />
    );
}

export default AsociacionesMotoPage;;
