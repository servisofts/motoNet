import React from 'react'
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TableNewMe from '../../../Components/TableNewMe'
import DP_AsociacionMoto_popup from "./DP_AsociacionMoto_popup"

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40ch',
        },
    },
}));

const DP_AsociacionMoto = (props) => {

    const [visible, setVisible] = React.useState(false);

    const classes = useStyles();

    const getLista = () => {
        var list = [];
        var data = props.state.asociacionMotoReducer.data;
        Object.keys(data).map((key) => {
            var obj = data[key];
            console.log(obj);
            list.push({
                //las variables son las mismas que se llama de las tablas
                /*key,
                UsuarioResponsable: { dato: obj.key_encargado },
                Descripcion: { dato: obj.descripcion },
                Direccion: { dato: obj.direccion }*/
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

            /*component: "conductorAsociacionMoto",
            type: "getAllByKeyConductor",
            estado: "cargando",
            key_conductor: props.conductor.key,
            data: ""*/
        };
        props.state.socketReducer.send(objSend);
        return <div />
    }

    //alert(JSON.stringify(props.conductor)+" -AAAA")

    return (
     <>
            
                    <Grid container direction="row">
                      
                        <Grid item xs={12}  >

                            <TableNewMe
                                title={"Asociaciones"}
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
                                onAdd={(evt) => {
                                    setVisible(true)
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
                    <DP_AsociacionMoto_popup conductor={props.conductor} isVisible={visible} onClose={setVisible} history={props.history} />
      </>
     
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(DP_AsociacionMoto);
