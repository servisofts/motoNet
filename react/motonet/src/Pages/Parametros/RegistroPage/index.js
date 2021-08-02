import React, { Component } from 'react'
import { connect } from 'react-redux';
import NaviDrawer from '../../../Components/NaviDrawer';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TableNewMe from '../../../Components/TableNewMe'
import Page from '../../../Components/Page';
import { SButtom, SForm, SInput, SText, SView,SActivityIndicator } from '../../../SComponent';
import { View } from 'react-native';

class RegistroPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getAsociacion() {
        if (this.props.match.params.key) {
            var reducer = this.props.state.asociacionMotoReducer;
            var data = reducer.data;
            if (!data) {
                if (!this.props.state.socketReducer.socket) {
                    return false;
                }
                if (reducer.estado == "cargando") {
                    return false;
                }
                var objSend = {
                    component: "asociacionMoto",
                    type: "getAll",
                    estado: "cargando",
                    data: ""
                };
                this.props.state.socketReducer.send(objSend);
                return false;
            }
            return data[this.props.match.params.key];
        }
        return {}
    }

    // getData(){
    //     var datosUpdate=this.getAsociacion();
    // }

    render() {
        var asociacion = this.getAsociacion();
        if(!asociacion){
            return <SActivityIndicator/>
        }
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
                                key_encargado: { label: "Responsable", type: "default", isRequired: true, defaultValue:asociacion.key_encargado  },
                                descripcion: { label: "Descripción", type: "default", isRequired: true, defaultValue:asociacion.descripcion },
                                direccion: { label: "Dirección", type: "default", isRequired: true, defaultValue: asociacion.direccion  },

                            }}
                            onSubmit={(data) => {
                                var objSend = {
                                    component: "asociacionMoto",
                                    type: (this.props.match.params.key?"editar":"registro"),
                                    estado: "cargando",
                                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                    data: {
                                        ...asociacion,
                                        ...data
                                    }
                                };
                                alert(JSON.stringify(data))
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
