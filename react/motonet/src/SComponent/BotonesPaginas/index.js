import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SImage, SText, STheme, SView, SIcon, } from '../../SComponent';
import { IconsNames } from "../SIcon"
import { TypeCol } from '../SView/cols';
type BotonesType = {
    history: 'this.props.history',
    data: [{ url: String, label: "Title", icon: IconsNames, onPress: Function }],
    col: TypeCol
}
export default class BotonesPaginas extends Component<BotonesType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getButtom = ({ url, label, icon, onPress }) => {
        return <SView props={{
            variant: ["col-square", "center"],
            col: (this.props.col ? this.props.col : "xs-4 sm-3.5 md-3 lg-2.5 xl-2")
        }} style={{
            padding: 8,
        }} >
            <SView props={{
                variant: ["center"],
                col: "xs-12"
            }} onPress={() => {
                if (onPress) { onPress(); return; }
                if (this.props.history) {
                    this.props.history.push(url);
                }
            }}>
                <SView props={{
                    variant: ["col-square", "center"],
                    col: "xs-9"
                }} style={{
                    borderRadius: 8,
                    overflow: 'hidden',
                }}>
                    <SIcon name={icon} />
                </SView>
                <SText style={{
                    color: STheme().colorSecondary,
                    textAlign: "center",
                    marginTop: 4,
                    fontSize:16,
                }}>{label}</SText>
            </SView>
        </SView>
    }
    render() {
        return (
            <SView props={{
                variant: "center",
                col: "xs-12 md-10 xl-8",
                direction: "row",
            }} style={{
                height: "100%",
            }}>
                {this.props.data.map((obj) => {
                    return this.getButtom(obj)
                })}

            </SView>
        );
    }
}
