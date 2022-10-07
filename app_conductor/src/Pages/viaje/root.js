import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SPage, SText, SView } from 'servisofts-component';
import Model from '../../Model';
import ViajeState from './Components/ViajeState';

class root extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    componentDidMount() {
        // Model.viaje.Action.getActivo().then((resp) => {
        //     this.setState({ viaje: resp })
        // })

        /* <SText>key_viaje= {viaje.key}</SText>
               <SText>key_usuario= {viaje.key_usuario}</SText>
               <SText>{viaje.key_tipo_viaje}</SText>
               <SText>{viaje.state}</SText>
               <SHr />
               <SHr />
               <SButtom type='danger' onPress={() => {
                   Model.viaje.Action.action("cancelar", viaje.key);
               }}>CANCELAR</SButtom>
               <SButtom type='danger' onPress={() => {
                   // Model.viaje.Action.getActivoAsync().then(resp => {
                   //     console.log(resp);
                   // }).catch(e => {
                   //     console.error(e);
                   // })
               }}>GET SERVER</SButtom> */

    }

    render() {
        var viaje = Model.viaje.Action.getActivo();
        if (!viaje) return null;
        return (<SView col={"xs-12"} height>
            <ViajeState viaje={viaje} />
        </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(root);