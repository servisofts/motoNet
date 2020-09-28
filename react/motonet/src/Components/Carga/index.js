import React from 'react'
import { connect } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import Logo from '../../img/MotoNetBR.svg'


const delay = ms => new Promise(res => setTimeout(res, ms));

const Carga = (props) => {


    const depuesDeLaCarga = async () => {
        await delay(3000);
        console.log("Waited");
        //aqui se conecta con el socket en index principal

        if (!props.state.usuarioReducer.usuarioLog) {
            props.propsPadre.history.push("/Login");

        } else {
            props.propsPadre.history.push("/Inicio");
        }
    };
    depuesDeLaCarga() 

    return (
        <div className="page colorPrincipal">
            <div className="center">
                <div style={{ display: "block", textAlign: "center" }}>
                    <div style={{ display: "block" }}>
                        <img src={Logo} width={300} alt={"logo"} />
                    </div>

                    <Grid container justify="center">
                        <Grid xs={2}>
                            <CircularProgress color="#fff" style={{ display: "block" }} />

                        </Grid>
                    </Grid>
                    <div style={{ display: "block" }}>
                        Cargando...
                    </div>

                </div>

            </div>
        </div>
    )

}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Carga);
