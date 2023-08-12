import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SList, SLoad, SPage, SText, SView } from 'servisofts-component';
import Model from '../../Model';

class root extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    renderDatos() {
        var datos = Model.dato.Action.getAll();
        this.rol_datos = Model.rol_dato.Action.getAllBy({
            key_rol: "b8920e90-1cbd-4fac-b740-62fac4d22bbd"
        });
        if (!datos) return <SLoad />
        if (!this.rol_datos) return <SLoad />
        return <SList
            data={this.rol_datos}
            render={(obj) => {
                if (!obj.key_dato) return null;
                var dato = datos[obj.key_dato]
                if (!dato) return null;
                return <SView col={"xs-12"}>
                    <SText>{dato.descripcion}</SText>
                    <SText>{dato.tipo}</SText>
                </SView>
            }}
        />

    }

    render() {
        this.usuario_dato = Model.usuario_dato.Action.getAllBy({
            key_usuario_perfil: Model.usuario.Action.getKey()
        })

        return (
            <SPage title={'root'}>
                <SText>{'Rellena tus datos faltantes'}</SText>
                {this.renderDatos()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(root);