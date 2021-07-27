import React, { Component } from 'react'
import { connect } from 'react-redux';
import NaviDrawer from '../../../Components/NaviDrawer';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TableNewMe from '../../../Components/TableNewMe'
import Page from '../../../Components/Page';
import { SButtom, SInput, SText, SView } from '../../../SComponent';

class RegistroPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this._ref = {}
    }
    render() {
        return (
            <Page
                history={this.props.history}
                title={"Asociaciones Registro"}
                onBack={"/Asociaciones"}
            >
                <SView props={{
                    col: "xs-12",
                    variant: "default"
                }}>
                    <SView props={{
                        // variant: "col-square",
                        col: "md-6"
                    }} style={{
                        borderRadius: 8,
                        overflow: 'hidden',
                    }}>
                        Responsable
                    </SView>

                    <SInput
                        ref={(ref) => { this._ref["responsable"] = ref }}
                        props={{
                            col: "xs-12 md-6",
                            customStyle: "primary",
                        }}
                        style={{
                            textAlign: "center",
                            width: "100%"
                        }}
                        placeholder={"Responsable..."}></SInput>


                    <SView props={{
                        // variant: "col-square",
                        col: "xs-6"
                    }} style={{
                        borderRadius: 8,
                        overflow: 'hidden',
                    }}>
                        Descripción
                    </SView>
                    <SInput
                        ref={(ref) => { this._ref["descripcion"] = ref }}
                        props={{
                            col: "xs-12 md-6",
                            customStyle: "primary",
                        }}
                        style={{
                            textAlign: "center",
                            width: "100%"
                        }}
                        placeholder={"Descripción..."}></SInput>

                    <SView props={{
                        // variant: "col-square",
                        col: "xs-6"
                    }} style={{
                        borderRadius: 8,
                        overflow: 'hidden',
                    }}>
                        Dirección
                    </SView>
                    <SInput
                        ref={(ref) => { this._ref["direccion"] = ref }}
                        props={{
                            col: "xs-12 md-6",
                            customStyle: "primary",
                        }}
                        style={{
                            textAlign: "center",
                            width: "100%"
                        }}
                        placeholder={"Dirección..."}></SInput>
                    <SButtom
                        style={{color:"#ffffff", marginTop:"10px"}}
                        props={{
                            type: "danger",
                            col: "xs-12 md-6",
                            customStyle: "primary",
                        }} onPress={() => {
                            var ref_responsable: SInput = this._ref["responsable"];
                            var ref_descripcion: SInput = this._ref["descripcion"];
                            var ref_direccion: SInput = this._ref["direccion"];
                            //console.log(ref_responsable.getValue())
                            //console.log(ref_descripcion.getValue())
                            //console.log(ref_direccion.getValue())
                            //console.log(this.props.state.usuarioReducer.usuarioLog.key)

                            var dataSend = {};
                            dataSend["key_encargado"] = ref_responsable.getValue();
                            dataSend["descripcion"] = ref_descripcion.getValue();
                            dataSend["direccion"] = ref_direccion.getValue();
                            console.log(dataSend)

                            var objSend = {
                                component: "asociacionMoto",
                                type: "registro",
                                estado: "cargando",
                                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                data: dataSend
                            };
                            this.props.state.socketReducer.send(objSend);
                        }}>
                        REGISTRAR
                    </SButtom>

                </SView>

            </Page>
        )

    }
}
const initStates = (state) => {
    return { state }
};

export default connect(initStates)(RegistroPage);
