
import React, { Component } from 'react';
import { connect } from 'react-redux';
import buscar_abstract from './buscar_abstract';

import { SForm, SHr, SIcon, SInput, SLoad, SNavigation, SPage, SPopup, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import InputLocation from '../../Components/InputLocation';
import TopBar from '../../Components/TopBar';
import Model from '../../Model';
import SolicitarServicio from './Components/SolicitarServicio';

class index extends buscar_abstract {
    constructor(props) {
        super("pedido", props);
    }

    getContent() {
        var usuario = Model.usuario.Action.getUsuarioLog()
        if (this.state.loading) return <SLoad />
        var inf = this.state.info[0] ?? {};
        var defobj = {
            nombre: ((usuario?.Nombres ?? "") + " " + (usuario?.Apellidos ?? "")),
            telefono: usuario?.telefono,
            ...inf
        }
        return <SView col={"xs-12"} center>
            <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"}>
                <SHr />
                <SText bold>Detalle del encargo</SText>
                <SForm
                    ref={ref => this._form = ref}
                    col={"xs-12"}
                    inputs={{
                        nombre: { label: "Nombre", placeholder: "Ingresar nombre", defaultValue: defobj.nombre, required: true },
                        telefono: {
                            label: "Telefono", placeholder: "Ingresar número", type: "phone", defaultValue: usuario?.Telefono, required: true
                        },
                        nota: { label: "Nota", type: "textArea", style: { paddingTop: 4 } },

                    }}
                    onSubmit={(data) => {

                        // var p1 = this._p1.getValue();
                        // if (!p1.latitude || !p1.longitude) {
                        //     SPopup.alert("Deve seleccionar la ubicacion")
                        //     return;
                        // }
                    }}
                />
                <SHr />
                <SView col={"xs-12"} >

                    <SText bold>¿Qué necesitas que te llevemos?</SText>
                    <SHr />
                    <SInput type='textArea' customStyle={"motonet"} placeholder={"Nombre o detalle del producto"} style={{
                        paddingTop: 4,
                    }} />
                </SView>
            </SView>
        </SView>
    }
    setDestino(key, location) {
        this.state.destinos[key] = location;
        this.setState({ ...this.state })
    }
    render() {
        return (
            <SPage title={'index'} hidden disableScroll center>
                <TopBar title={"Pedidos"} leftContent={<SolicitarServicio onPress={() => {
                    this._form.submit();
                    Model.viaje.Action.saveViaje(this.state);
                    SNavigation.navigate("/buscar/confirmar")
                }} />}>
                    <SHr />
                    <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} height={50}>
                        <InputLocation
                            icon={"Marker"}
                            placeholder={"¿Dónde llevaremos el encargo?"}
                            value={this.state.destinos[0]}
                            onChange={(evt) => { this.setDestino(0, evt) }} />

                    </SView>
                </TopBar>
                <SView col={"xs-12"} flex >
                    <SScrollView2 disableHorizontal>
                        {this.getContent()}
                    </SScrollView2>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);