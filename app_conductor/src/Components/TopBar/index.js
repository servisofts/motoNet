import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SPage, SText, STheme, SView } from 'servisofts-component';
import Type from './type'
type typeProps = typeof Type;
type TopBarProps = {
    type: typeProps,
    rounded?: boolean,
    title?: string,
    leftContent?: any,
}
class TopBar extends Component<TopBarProps> {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getType() {
        var Elm = Type[this.props.type];
        if (!Elm) Elm = Type["default"]
        return <Elm {...this.props} />
    }
    render() {
        return (
            <SView col={"xs-12"} backgroundColor={STheme.color.barColor} style={{
                ...(this.props.rounded ? {
                    borderBottomEndRadius: 16,
                    borderBottomStartRadius: 16,
                } : {})

            }}>
                {this.getType()}
            </SView>
        );
    }
}

export default TopBar;