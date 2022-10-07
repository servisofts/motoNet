import React, { Component } from 'react';
import { SPage, SText, STheme, SView } from 'servisofts-component';
type ButtomProps = {
    onPress?: Function,
    small?: boolean,
    big?: boolean,
}
class Buttom extends Component<ButtomProps> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var opt = {
            height: 40,
        }
        if (this.props.small) {
            opt.height = 30;
        }
        if (this.props.big) {
            opt.height = 50;
        }
        return (
            <SView
                col={"xs-11"} height={opt.height} backgroundColor={STheme.color.primary}
                style={{
                    borderRadius: 4,
                }} center onPress={this.props.onPress}>
                <SText color={"#fff"}>{this.props.children}</SText>
            </SView>
        );
    }
}

export default (Buttom);