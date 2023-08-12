import React, { Component } from 'react';
import { SHr, SText, SView } from 'servisofts-component';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView backgroundColor={"#96BE00"} height={20} col={"xs-12"}></SView>
        );
    }
}

export default Header;