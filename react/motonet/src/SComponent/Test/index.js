import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SButtom, SForm } from '..';
import { SInput } from '../SInput';
import { SView } from '../SView';

export type TestPropsType = {
    detalle: String
}
export default class Test extends Component<TestPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getDetalle() {
        return this.props.detalle;
    }
    render() {
        return (
            <SView props={{
                col:"xs-12",
                variant:"center"
            }}>
                <SForm
                    props={{
                        variant: "center",
                        col: "xs-11 sm-8 md-6",
                    }}
                    inputProps={{
                        customStyle: "primary",
                    }}
                    inputs={{
                        key_encargado: { label: "Responsable", type: "default", isRequired: true },
                        descripcion: { label: "Descripción", type: "default", isRequired: true },
                        direccion: { label: "Dirección", type: "email", isRequired: true },
                    }}
                    onSubmit={(data) => {
                        console.log(data);
                    }} />
            </SView>
        );
    }
}
Test.defaultProps = {
    detalle: "Default detalle"
}
