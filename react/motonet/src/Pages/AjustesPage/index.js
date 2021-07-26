import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Page from '../../Components/Page';
import { SIcon } from '../../SComponent';

export default class AjustesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Page
                history={this.props.history}
                title={"Ajustes"}
                onBack={"goBack"}
                icon={<SIcon name={"ajustes"}/>}
            >

            </Page>
        );
    }
}
