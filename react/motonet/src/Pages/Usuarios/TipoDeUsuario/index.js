import React, { Component } from 'react';
import { View, Text } from 'react-native';
import BotonesPaginas from '../../../Components/BotonesPaginas';
import Page from '../../../Components/Page';
import { SIcon, SView } from '../../../SComponent';
export default class TipoDeUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Page
                history={this.props.history}
                title={"Usuarios"}
                onBack={"/Inicio"}
                icon={<SIcon name={"usuarios"} />}
            >
                <SView props={{
                    variant: "center"
                }}>
                    <BotonesPaginas
                        history={this.props.history}
                        data={[
                            { url: "/Usuarios/Todos", label: "Todos", icon: "usuarios3" },
                            { url: "/Usuarios/Administradores", label: "Administradores", icon: "usuarios2" },
                            { url: "/Usuarios/Conductores", label: "Conductores", icon: "usuarios1" },
                            { url: "/Usuarios/Clientes", label: "Clientes", icon: "usuarios4" },
                        ]}
                    />
                </SView>
            </Page>
        );
    }
}
