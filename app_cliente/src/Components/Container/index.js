import React, { Component } from 'react';
import { SView } from 'servisofts-component';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"} center {...this.props}>
                <SView col={"xs-11 sm-10 md-8 lg-6 xl-4 xxl-3"} center>
                    {this.props.children}
                </SView>
            </SView>
        );
    }
}
