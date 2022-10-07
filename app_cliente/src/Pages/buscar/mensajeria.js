
import React, { Component } from 'react';
import buscar_abstract from './buscar_abstract';

import { connect } from 'react-redux';
import { SForm, SHr, SIcon, SInput, SLoad, SNavigation, SPage, SSCrollView, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import InputLocation from '../../Components/InputLocation';
import TopBar from '../../Components/TopBar';
import Model from '../../Model';
import SolicitarServicio from './Components/SolicitarServicio';
import SwitchTipo from './Components/SwitchTipo';

class index extends buscar_abstract {
    constructor(props) {
        super("mensajeria-sobre", props);
    }


    form = {};
    getForm({ key, title }) {
        // placeholder: "¿Dónde recogemos el encargo?",
        // placeholder:"¿Dónde dejamos el encargo?"
        return <SView col={"xs-12"}>
            <SHr />
            <SHr />
            <SText bold>{title}</SText>
            <SHr />
            <InputLocation secondary value={this.state.destinos[key]} />
            <SForm
                ref={ref => this.form[key] = ref}
                col={"xs-12"}
                inputs={{
                    nombre: { label: "Nombre", placeholder: "Ingresar nombre", required: true, defaultValue: this.state.info[key]?.nombre },
                    telefono: {
                        label: "Telefono", placeholder: "Ingresar número", type: "phone", required: true, defaultValue: this.state.info[key]?.telefono
                    },
                    nota: { label: "Nota", type: "textArea", style: { paddingTop: 4 }, defaultValue: this.state.info[key]?.nota },

                }}
                onSubmit={(data) => {
                    this.accept += 1;
                    this.state.info[key] = data;
                }}
            />
        </SView>
    }
    getContent() {
        if (this.state.loading) return <SLoad />
        return <SView col={"xs-12"} center>
            <SHr />
            <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center>
                <SView col={"xs-12"}>
                    <SText bold>{"Mensajería: ¿qué vas a enviar?"}</SText>
                    <SHr />
                    <SwitchTipo value={this.state.key_tipo_viaje} onChange={(o) => {
                        this.state.key_tipo_viaje = o;
                        this.setState({ ...this.state })
                    }} />
                    <SHr />
                    <SHr />
                    <SView col={"xs-12"} card height={200} center border={STheme.color.card} style={{
                        backgroundColor: "#fff"
                    }}>
                        <SText center style={{
                            position: "absolute",
                            width: 100
                        }}>Subir foto</SText>
                        <SInput
                            ref={ref => this.inpfile = ref}
                            type='file'
                            style={{
                                width: "100%",
                                height: "100%",
                            }} />
                    </SView>
                    <SHr />
                    <SHr />
                </SView>
                <SView col={"xs-12"}>
                    <SText bold>{"Detalle del envío"}</SText>
                </SView>
                {this.getForm({ key: 0, title: "Remitente" })}
                <SHr />
                <SHr height={1} color={STheme.color.card} />
                <SHr />
                {this.getForm({ key: 1, title: "Destinatario" })}
            </SView>
            <SHr height={50} />
        </SView>
    }
    render() {
        return (
            <SPage title={'index'} hidden disableScroll center>
                <TopBar
                    title={"Mensajería"}
                    leftContent={<SolicitarServicio
                        onPress={() => {

                            var foto = this.inpfile.getValue();
                            if (foto) {
                                if (foto[0]) {
                                    if (foto[0].uri) {
                                        // this.state._foto = foto[0];
                                    }
                                }
                            }
                            this.accept = 0;
                            this.form[0].submit();
                            this.form[1].submit();
                            if (this.accept == 2) {

                                Model.viaje.Action.saveViaje(this.state);
                                SNavigation.navigate("/buscar/confirmar")
                            }
                        }} />
                    } />
                <SView flex col={"xs-12"}>
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