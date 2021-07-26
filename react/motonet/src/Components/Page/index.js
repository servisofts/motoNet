import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SIcon, SScrollView2, SText, STheme, SView } from '../../SComponent';
import Svg from '../../Svg';

type PageType = {
    title: String,
    onBack: "URL" | "goBack",
    history: 'this.props.history',
    disableScroll: Boolean,
    icon: SIcon
}
export default class Page extends Component<PageType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getBack() {
        if (!this.props.onBack) return <View />
        return <SView
            style={{
                width: "100%",
                height: "100%",
                marginStart: 8,
            }}
            onPress={() => {
                if (this.props.onBack == "goBack") {
                    this.props.history.goBack();
                    return;
                }
                this.props.history.push(this.props.onBack)
            }}>
            <Svg name={"Arrow"} style={{
                width: 30,
                height: 30,
                fill: "#fff"
            }} />
        </SView>
    }
    getBarraSuperior() {
        return <SView
            props={{
                variant: "center",
                direction: "row",
            }}
            style={{
                width: "100%",
                height: 40,
                backgroundColor: STheme().colorPrimary,
                borderBottomRightRadius: 16,
                borderBottomLeftRadius: 16,
            }}>
            <SView props={{
                col: "xs-2"
            }}>
                {this.getBack()}
            </SView>
            <SView props={{
                direction: "row",
                col: "xs-8"
            }} style={{
                height: 40,
                justifyContent: "center",
                alignItems: "center"
            }}>

                {this.props.icon ? (<View style={{
                    width: 30,
                    height: 30,
                    marginRight: 4,
                }}>{this.props.icon}</View>) : (<View />)}
                <View style={{
                    height: "100%",
                    justifyContent: "center"
                }}>
                    <SText
                        props={{
                            variant: "h4"
                        }} style={{
                            color: STheme().colorTextPrimary
                        }}>
                        {this.props.title}
                    </SText>
                </View>
            </SView>
            <SView props={{
                col: "xs-2"
            }}>

            </SView>
        </SView>
    }
    getContent() {
        if (this.props.disableScroll) {
            return this.props.children
        }
        return <SScrollView2 disableHorizontal={true}>
            <View style={{
                width: "100%",
            }}>
                {this.props.children}
            </View >
        </SScrollView2 >
    }
    render() {
        return (
            <View style={{
                width: "100%",
                height: "100%",
                backgroundColor: STheme().backgroundColor
            }}>
                {this.getBarraSuperior()}
                <View style={{
                    marginTop: 4,
                    width: "100%",
                    flex: 1,
                }}>
                    {this.getContent()}
                </View>
            </View>
        );
    }
}
