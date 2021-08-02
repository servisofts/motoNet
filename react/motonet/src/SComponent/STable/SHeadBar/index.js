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
    getAdd() {
        if (!this.props.onAdd) {
            return <View />;
        }
        return <SView style={{
            width: 24,
            height: 24,
            marginEnd:8,
        }} onPress={() => {
            // this.props.reload();
            this.props.onAdd();
        }}>
            <SIcon name={"addRed"} style={{
                fill: STheme().colorPrimary,
            }} />

        </SView>
    }
    render() {
        return (
            <SView
                props={{
                    direction: "row"
                }}
                style={{
                    width: "100%",
                    height: 32,
                    justifyContent: "center",
                }}>

                <SView props={{
                    col: {
                        xs: "9",
                        md: "8",
                        // xl: "6"
                    }
                }} style={{
                    height: "100%",
                    alignItems: "flex-start",
                    paddingStart: 8,
                }}>
                    <SInput props={{
                        col: "xs-12 md-6",
                        customStyle: "primary",
                    }}
                        style={{
                            margin: 0,
                            height: 28,
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
                        xs: "3",
                        md: "4"
                    }
                }} style={{
                    height: 24,
                    justifyContent:"flex-end"
                }}>
                    <SView style={{
                        width: 24,
                        height: 24,
                        marginEnd:8,
                    }} onPress={() => {
                        this.props.reload();
                    }}>
                        <SIcon name={"reloadbox"} style={{
                            fill: STheme().colorPrimary,
                        }} />
                    </SView>
                    {this.getAdd()}

                </SView>
            </SView>
        );
    }
}
