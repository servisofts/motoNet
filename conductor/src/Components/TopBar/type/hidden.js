import React, { Component } from 'react';
import { SIcon, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';

class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"} center>
                {this.props.children}
            </SView>
        );
    }
}

export default index;