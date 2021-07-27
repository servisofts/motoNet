import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SIcon from '../../SIcon';
import { SInput } from '../../SInput';
import { STheme } from '../../STheme';
import SThread from '../../SThread';
import { SView } from '../../SView';

export default class SHeadBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView
                props={{
                    direction: "row"
                }}
                style={{
                    width: "100%",
                    height: 28,
                    paddingStart: 8,
                    paddingEnd: 8,
                    justifyContent: "center",
                }}>

                <SView props={{
                    variant: "center",
                    col: {
                        xs: "10",
                        md: "8",
                        // xl: "6"
                    }
                }} style={{
                    height: 24,
                    alignItems: "flex-start",
                }}>
                    <SInput props={{
                        col: "xs-12 md-6",
                        customStyle: "primary",
                    }}
                        placeholder={"Buscar..."}
                        onChangeText={(text) => {
                            new SThread(600, "buscadorTabla", true).start(() => {
                                this.props.buscar(text);
                            })
                        }}
                    />
                </SView>
                <SView props={{
                    variant: "center",
                    direction: "row",
                    col: {
                        xs: "2",
                        md: "4"
                    }
                }} style={{
                    height: 24,
                    justifyContent: "space-evenly"
                }}>
                    <SView style={{
                        width: 24,
                        height: 24,
                    }} onPress={() => {
                        this.props.reload();
                    }}>
                        <SIcon name={"reloadbox"} style={{
                            fill: STheme().colorPrimary,
                        }} />
                    </SView>
                    <SView style={{
                        width: 24,
                        height: 24,
                    }} onPress={() => {
                        // this.props.reload();
                        this.props.onAdd();
                    }}>
                        <SIcon name={"addRed"} style={{
                            fill: STheme().colorPrimary,
                        }} />

                    </SView>

                </SView>
            </SView>
        );
    }
}
