import React, { Component } from 'react'
import { connect } from 'react-redux';
import NaviDrawer from '../../../Components/NaviDrawer';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TableNewMe from '../../../Components/TableNewMe'
import Page from '../../../Components/Page';
import { SButtom, SForm, SInput, SText, SView } from '../../../SComponent';

class RegistroPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <Page
                history={this.props.history}
                title={"Asociaciones Registro"}
                onBack={"/Asociaciones"}
            >
                <SView props={{
                    variant: "center",
                    col: "xs-12",
                }}>
                    <SForm
                        props={{
                            variant: "center",
                            col: "xs-12 md-6",
                        }}
                        inputProps={{
                            customStyle: "primary",
                        }}
                        inputs={{
                            key_encargado: { label: "Responsable", type: "default", isRequired: true },
                            descripcion: { label: "Descripción", type: "default", isRequired: true },
                            direccion: { label: "Dirección", type: "default", isRequired: true },
                        }}
                        onSubmit={(data) => {
                            var objSend = {
                                component: "asociacionMoto",
                                type: "registro",
                                estado: "cargando",
                                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                data: data
                            };
                            this.props.state.socketReducer.send(objSend);
                            this.props.history.goBack();
                        }}
                    />
                </SView>

            </Page>
        )

    }
}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(RegistroPage);
