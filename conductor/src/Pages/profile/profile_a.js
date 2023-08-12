import React from 'react';

import DPA, { connect } from 'servisofts-page';
import { SButtom, SHr, SImage, SInput, SList, SLoad, SNavigation, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { Parent } from './index';
import DatosDocumentos from '../../Components/DatosDocumentos/DatosDocumentos';
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

    $getData() {
        this.data = Parent.model.Action.getByKey(this.$params["pk"]);
        return this.data;
    }
    $render() {
        if (!this.$getData()) return <SLoad />

        return <SView col={"xs-12"}>
            <SImage src={Model.usuario._get_image_download_path(SSocket.api, this.data.key)} />
            <SText>{this.data["Nombres"]}</SText>
            <SText>{this.data["Apellidos"]}</SText>
            <SText>{this.data["Telefono"]}</SText>
            <SText>{this.data["Correo"]}</SText>
            <SText>{this.data["CI"]}</SText>
            <SText>{this.data["enable"]}</SText>
        </SView >
    }

}
export default connect(index);