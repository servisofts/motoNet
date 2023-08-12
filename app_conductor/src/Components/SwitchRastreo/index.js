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
            active: false,
            colors: {
                active: this.props?.colors?.active ?? "#2FC25F",
                inactive: this.props?.colors?.inactive ?? "#B7B7B7",
                acent: this.props?.colors?.acent ?? "#fff"
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
            width: this?.props?.width ?? 100,
            height: this?.props?.height ?? 40,
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

        ><SText col={"xs-12"} center>{this?.state?.active ? "Online" : "OffLine"}</SText>
        </SView>
    }
}
