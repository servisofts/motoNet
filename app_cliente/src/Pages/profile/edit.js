import React from 'react';

import DPA, { connect } from 'servisofts-page';
import { Parent } from './index';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';

class index extends DPA.edit {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: [],
        });
    }
    $allowAccess() {
        return true;
    }
    $getData() {
        return Parent.model.Action.getByKey(Model.usuario.Action.getKey());
    }
    $inputs() {
        var inputs = super.$inputs();
        delete inputs["Password"];
        inputs["Correo"].type = "email"
        inputs["Telefono"].type = "phone"
        return inputs;
    }
    $onSubmit(data) {
        Parent.model.Action.editar({
            data: {
                ...this.data,
                ...data
            },
            key_usuario: ""
        }).then((resp) => {
            SNavigation.goBack();
        }).catch(e => {
            console.error(e);

        })
    }
}

export default connect(index);