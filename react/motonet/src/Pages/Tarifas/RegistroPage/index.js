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
    getParametros() {
        if (this.props.match.params.key) {
            var reducer = this.props.state.parametrosViajeReducer;
            var data = reducer.data;
            if (!data) {
                if (!this.props.state.socketReducer.socket) {
                    return false;
                }
                if (reducer.estado == "cargando") {
                    return false;
                }
                var objSend = {
                    component: "parametrosViaje",
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
    //     var datosUpdate=this.getParametros();
    // }

    render() {
        var parametros = this.getParametros();
        if(!parametros){
            return <SActivityIndicator/>
        }
        return (
            <Page
                history={this.props.history}
                title={"Parámetros Registro"}
                onBack={"/Parametros"}
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
                                descripcion: { label: "Descripción", type: "default", editable: false, defaultValue:parametros.descripcion },
                                valor: { label: "Valor", type: "number", isRequired: true, defaultValue:parametros.valor  },
                                medida: { label: "Medida", type: "default",editable: false, defaultValue: parametros.medida  },

                            }}
                            onSubmit={(data) => {
                                var objSend = {
                                    component: "parametrosViaje",
                                    type: (this.props.match.params.key?"modificar":"registro"),
                                    estado: "cargando",
                                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                    data: {
                                        ...parametros,
                                        ...data
                                    }
                                };
                                //alert(JSON.stringify(data))
                                this.props.state.socketReducer.send(objSend);
                                this.props.history.goBack();
                            }}
                            onSubmitName={(this.props.match.params.key ? "EDITAR" : "REGISTRAR")}
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
