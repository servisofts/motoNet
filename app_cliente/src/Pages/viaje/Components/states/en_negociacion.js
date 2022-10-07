import React, { Component } from 'react';
import { SButtom, SHr, SNavigation, SPage, SText } from 'servisofts-component';
import Model from '../../../../Model';

export default class en_negociacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        console.log(this.props.viaje);
        return (
            <SPage center hidden>

                <SText fontSize={16}>{'Negociacion activa'}</SText>

                <SText>{'Aceptas el precio del viaje?'}</SText>
                <SHr />
                <SButtom type={"success"} onPress={() => {
                    Model.viaje.Action.action("aceptar_negociacion", this.props.viaje.key, {
                        key_conductor: Model.usuario.Action.getKey(),
                        oferta: 100.02
                    }).then((resp) => {
                        // Model.viaje.Action.CLEAR();
                        console.log(resp);
                    })
                }}>ACEPTAR</SButtom>
                <SHr />
                <SButtom type='danger'
                    onPress={() => {
                        Model.viaje.Action.action("denegar_negociacion", this.props.viaje.key, {
                            key_conductor: Model.usuario.Action.getKey(),
                            oferta: 100.02
                        }).then((resp) => {
                            // Model.viaje.Action.CLEAR();
                            console.log(resp);
                        })
                    }}>CANCELAR</SButtom>

            </SPage>
        );
    }
}
