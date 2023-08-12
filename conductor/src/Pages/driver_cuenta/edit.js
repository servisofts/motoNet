import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';

class index extends DPA.edit {
    constructor(props) {
        super(props, {
            Parent: Parent,
            title:"Editar cuenta bancaria",
            excludes: []
        });
    }
    $allowAccess() {
        return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
    $inputs() {
        let inp = super.$inputs();
        inp["nombre"].label = "Nombre del titular";
        inp["ci"].label = "Número de documento de identidad";
        inp["sucursal"].label = "Sucursal de destino";
        inp["numero_cuenta"].label = "Número de cuenta";
        inp["numero_cuenta"].type = "number";
        inp["banco"].label = "Nombre del banco";

        return inp;
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