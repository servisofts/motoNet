import React, { Component } from 'react';
import { SButtom, SHr, SIcon, SPage, SText, STheme, SView } from 'servisofts-component';

export default class buscando_conductor extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage title={'buscando_conductor'} hidden disableScroll>
                <SView flex col={"xs-12"} backgroundColor={STheme.color.primary} center>
                    <SView width={300} height={200} center>
                        <SIcon name={"logoCompleto"} fill={STheme.color.secondary} />
                    </SView>
                    <SHr height={100} />
                    <SText color={STheme.color.secondary}>{'Buscando conductor...'}</SText>

                </SView>
            </SPage>
        );
    }
}
