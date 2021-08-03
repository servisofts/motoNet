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
    getTarifas() {
        if (this.props.match.params.key) {
            var reducer = this.props.state.tipoViajeReducer;
            var data = reducer.data;
            if (!data) {
                if (!this.props.state.socketReducer.socket) {
                    return false;
                }
                if (reducer.estado == "cargando") {
                    return false;
                }
                var objSend = {
                    component: "tipoViaje",
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
    //     var datosUpdate=this.getTarifas();
    // }

    render() {
        var tarifas = this.getTarifas();
        if(!tarifas){
            return <SActivityIndicator/>
        }
        return (
            <Page
                history={this.props.history}
                title={"Tarifas Registro"}
                onBack={"/Tarifas"}
            >
                <SView props={{
                    variant: "center",
                    col: "xs-12",
                }}>
                        <View style={{color:"#fff"}}>{tarifas.descripcion}</View>
                        <SForm
                            props={{
                                variant: "center",
                                col: "xs-12 md-6",
                            }}
                            inputProps={{
                                customStyle: "primary",
                            }}
                            inputs={{
                                monto1: { label: "Monto por kilometro", type: "default",  defaultValue:tarifas.tarifas["Monto por kilometro"].monto },
                               
                                monto2: { label: "Monto por tiempo", type: "default", defaultValue: tarifas.tarifas["Monto por tiempo"].monto  },

                            }}
                            onSubmit={(data) => {
                                var objSend = {
                                    component: "editarMontoTipoViaje",
                                    type: (this.props.match.params.key?"modificar":"registro"),
                                    estado: "cargando",
                                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                    data: {
                                        ...tarifas,
                                        ...data
                                    }
                                };
                                alert(JSON.stringify(data))
                                // this.props.state.socketReducer.send(objSend);
                                // this.props.history.goBack();
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
