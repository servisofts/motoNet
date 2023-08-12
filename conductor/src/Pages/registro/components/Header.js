import React, { Component } from 'react';
import { SHr, SIcon, SText, SView } from 'servisofts-component';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"} center>
                <SHr height={30} />
                <SView col={"xs-11"} height={180} center>
                    <SIcon name={"logoCompleto"} />
                </SView>
                <SHr height={16} />
                <SView center col={"xs-10"}>
                    <SText center font='Roboto' fontSize={16} color={"#666666"}>{this.props?.title}</SText>
                </SView>
                <SHr height={20} />
            </SView>
        );
    }
}
