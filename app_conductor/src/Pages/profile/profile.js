import React from 'react';

import DPA, { connect } from 'servisofts-page';
import { SButtom, SHr, SInput, SList, SNavigation, SText, SView } from 'servisofts-component';
import Model from '../../Model';
import { Parent } from './index';
class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "Password"],
            defaultParams: {
                "pk": Model.usuario.Action.getKey()
            },
        });
        this.pk = Model.usuario.Action.getKey();
        this.$params.pk = this.pk;
    }

    $allowEdit() {
        return true;
    }
    // $allowDelete() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    // }
    // $allowAccess() {
    //     return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    // }

    $getData() {
        return Parent.model.Action.getByKey(this.$params["pk"]);
    }
    $footer() {
        return <SView col={"xs-12"} center>
            <SHr />
            <SButtom type={'outline'} onPress={() => {
                Model.usuario.Action.unlogin();
            }}>Cerrar sesión</SButtom>
            <SHr />
        </SView>

    }
}
export default connect(index);