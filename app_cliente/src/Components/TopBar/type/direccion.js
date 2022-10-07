import React, { Component } from 'react';
import { SPage, SText, STheme, SView } from 'servisofts-component';

class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"} height={50} row center>
                <SView center>
                    <SText color={STheme.color.secondary} fontSize={12}>{"¿ Cómo podemos ayudarte hoy ?"}</SText>
                </SView>
            </SView>
        );
    }
}

export default index;