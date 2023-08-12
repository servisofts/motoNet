import React, { Component } from 'react';
import { SLoad, SText, STheme, SView } from 'servisofts-component';

import { Animated } from 'react-native';

import { SBLocation } from 'servisofts-background-location';

type _SwitchRastreoProps = {
    colors: {
        active?: string,
        inactive?: string,
        acent?: string,
    },
    width?: number,
    height?: number,
}

export default class SwitchRastreo extends Component<_SwitchRastreoProps> {
    state;
    animValue;


    constructor(props: any) {
        super(props);
        this.state = {
            active: SBLocation.isStarted(),
            colors: {
                active: this.props.colors?.active ?? "#2FC25F",
                inactive: this.props.colors?.inactive ?? "#B7B7B7",
                acent: this.props.colors?.acent ?? "#ffffff"
            },
        };
        this.animValue = new Animated.Value(this.state.active ? 1 : 0);
    }
    componentDidMount() {
        SBLocation.addListener((data) => {
            // this.state.active = SBLocation.isStarted();
            // console.log(this.state.active);
            if (this.state.active != SBLocation.isStarted()) {
                this.fadeIn();
            }
        })
    }
    fadeIn() {
        this.state.active = SBLocation.isStarted();
        this.animValue.stopAnimation();
        Animated.timing(this.animValue, {
            toValue: !SBLocation.isStarted() ? 0 : 1,
            duration: 250,
            useNativeDriver: false
        }).start(() => {
            this.state.active = SBLocation.isStarted();
            this.setState({
                active: this.state.active
            });
        });
    }

    render() {
        return <SView animated style={{
            width: this.props.width ?? 115,
            height: this.props.height ?? 40,
            borderRadius: 18,
            justifyContent: 'center',
            backgroundColor: this.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.colors["inactive"], this.state.colors["active"]]
            }),
        }}
            onPress={() => {
                this.fadeIn();
                if (this.props.callback) {
                    this.props.callback({ active: this.state.active })
                }
            }}
        >
            <SView animated center style={{
                width: 115,
                height: 33,
                position: "absolute",
                transform: [{
                    translateX: this.animValue.interpolate({ inputRange: [0, 1], outputRange: [0, -(this.props.width ?? 35)] })
                }]
                // right: ,
            }}
            ><SText col={"xs-12"} center color={"#fff"} bold fontSize={12}>{this.state.active ? "On" : "Offline"}</SText></SView>
            <SView animated style={{
                width: 33,
                height: 33,
                borderRadius: 100,
                position: "absolute",
                transform: [{
                    translateX: this.animValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [4, (this.props.width ?? 100) - 25]
                    })
                }]
            }}
                backgroundColor={this.state.colors["acent"]}
            ></SView>
        </SView>
        return <SView animated style={{
            width: this.props.width ?? 115,
            height: this.props.height ?? 40,
            borderRadius: 18,
            justifyContent: 'center',
            backgroundColor: this.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.colors["inactive"], this.state.colors["active"]]
            }),
        }}
            onPress={() => {
                this.fadeIn();
                this.props.callback({ active: this.state.active })
            }}

        ><SView animated center style={{
            width: 115,
            height: 33,
            position: "absolute",
            right: this.animValue.interpolate({ inputRange: [0, 1], outputRange: [0, (this.props.width ?? 100) - 70] }),
        }}
        ><SText col={"xs-12"} center color={"#fff"} bold fontSize={12}>{this.state.active ? "On" : "Offline"}</SText></SView>
            <SView animated style={{
                width: 33,
                height: 33,
                borderRadius: 100,
                position: "absolute",
                left: this.animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [4, (this.props.width ?? 100) - 33 - 4]
                }),
            }}
                backgroundColor={this.state.colors["acent"]}
            ></SView>
        </SView>
    }
}
