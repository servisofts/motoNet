import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "estado", "key_servicio", "key_conductor"]
        });
    }
    $allowAccess() {
        return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
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
        data.key_conductor = Model.usuario.Action.getKey()
        Parent.model.Action.registro({
            data: data,
            key_usuario: Model.usuario.Action.getKey()
        }).then((resp) => {
            SNavigation.goBack();
        }).catch(e => {
            console.error(e);

        })
    }
}

export default connect(index);