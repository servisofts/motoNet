import React, { Component } from 'react';
import Model from '../../Model';

class buscar_abstract extends Component {
    state;
    key_tipo_viaje = ""
    constructor(type, props) {
        super(props);
        this.key_tipo_viaje = type;
        this.state = {
            loading: true,
            key_tipo_viaje: this.key_tipo_viaje,
            info: {},
            destinos: []
        };

        Model.viaje.Action.getViaje().then((resp) => {
            this.state = { ...this.state, ...(resp ?? {}), key_tipo_viaje: this.key_tipo_viaje, loading: false };
            this.setState({ ...this.state })
        })
    }
}
export default buscar_abstract;