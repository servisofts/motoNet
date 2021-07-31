import React, { Component } from 'react'
import { View } from 'react-native';
import { connect } from 'react-redux';
import Page from '../../Components/Page';
// import NaviDrawer from '../../Components/NaviDrawer';
import { STable, SView } from '../../SComponent'
import BotonesPaginas from '../../Components/BotonesPaginas';

const InicioPage = (props) => {
    /*if (!props.state.usuarioReducer.usuarioLog) {
        props.history.push("/");
        return <div />
    }*/
    return (
        <Page
            history={props.history}
            title={"Inicio"}
        // disableScroll={true}
        >
            <SView props={{
                col:"xs-12",
                variant: "center"
            }}>
                <BotonesPaginas
                    history={props.history}
                    data={[
                        { url: "/Usuarios", label: "Usuarios", icon: "usuarios" },
                        { url: "/Publicidad", label: "Publicidad", icon: "publicidad" },
                        { url: "/Asociaciones", label: "Asociaciones", icon: "asociacion" },
                        { url: "/Viajes", label: "Viajes", icon: "ajustesMano" },
                        { url: "/MapaPage", label: "Mapa", icon: "marker" },
                        { url: "/AjustesPage", label: "Ajustes", icon: "ajustes" }
                    ]}
                />
            </SView>
        </Page>
    )
}

const initStates = (state) => {
    return { state }
};


export default connect(initStates)(InicioPage);
