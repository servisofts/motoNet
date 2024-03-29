import React, { Component } from 'react';
import { SHr, SText, STheme, SView } from 'servisofts-component';

class BottomBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"} style={{
                position: "absolute",
                bottom: 0,
                backgroundColor: STheme.color.background,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                overflow: 'hidden',
            }} center>
                <SHr />
                {this.props.children}
                <SHr />
            </SView>
        );
    }
}

export default BottomBox;