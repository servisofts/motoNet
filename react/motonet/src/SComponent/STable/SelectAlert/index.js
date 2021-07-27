import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SIcon, SPopupOpen, SText, STheme, SView } from '../../../SComponent';
import BotonesPaginas from "../../BotonesPaginas";

export default class SelectAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (<SView
            props={{
                variant: "center"
            }}
            style={{
                width: 500,
                maxWidth: "100%",
                maxHeight: "100%",
                height: 400,
                backgroundColor: STheme().backgroundColor,
                borderRadius: 8,
            }}>
            <SText props={{
                variant: "h4"
            }}>Acciones</SText>
            <SView props={{
                direction: "row",
                col: "xs-11",
                variant: "center"
            }}>
                <BotonesPaginas
                    col={"xs-5 md-6"}
                    data={[
                        { label: "Editar", icon: "editar", onPress: () => { this.props.onAction("edit") } },
                        { label: "Eliminar", icon: "eliminar", onPress: () => { this.props.onAction("delete") } },
                    ]} />
            </SView>
        </SView>
        );
    }
}
