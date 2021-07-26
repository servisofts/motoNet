import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SIcon from '../../../SIcon';
import { SPopupOpen } from '../../../SPopup';
import { SText } from '../../../SText';
import { STheme } from '../../../STheme';
import { SView } from '../../../SView';

export default class Opciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getListaHeaders() {
        return this.props.header.map((obj, i) => {
            return <SView props={{
                col: "xs-6 md-4",
                direction: "row"
            }} style={{
                height: 30,
                alignItems: "center",
            }} onPress={() => {
                this.props.header[i] = {
                    ...obj,
                    hidden:!obj.hidden,
                }
                this.props.setHeader(this.props.header)
            }}>
                <View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: STheme().colorSecondary,
                    backgroundColor: (obj.hidden ? "transparent" : STheme().colorSecondary)
                }}>

                </View>
                <SView props={{
                    col: "xs-8",
                }} style={{
                    height: "100%",
                    marginStart: 8,
                    justifyContent: "center"
                }}>
                    <SText>{obj.label}</SText>
                </SView>
            </SView>
        })
    }
    getOpcionesPopup() {
        return <SView
            props={{
                variant: "center"
            }}
            style={{
                width: 500,
                maxWidth: "100%",
                maxHeight: "100%",
                height: 500,
                backgroundColor: STheme().backgroundColor,
                borderRadius: 8,
            }}>
            <SView props={{
                direction: "row",
                col: "xs-11",
                variant: "center"
            }}>
                {this.getListaHeaders()}
            </SView>
        </SView>
    }

    render() {
        return (
            <SView
                style={{
                    width: 24,
                    height: 24,
                    padding: 2,
                }}
                props={{

                }} onPress={() => {
                    SPopupOpen({
                        key: "2asda",
                        content: (this.getOpcionesPopup())
                    })
                }}>
                <SIcon name={'engranaje'} style={{
                    fill: "#fff"
                }} />
            </SView>
        );
    }
}
