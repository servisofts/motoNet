import { SNavigation } from 'servisofts-component';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';
import AccentBar from '../../Components/AccentBar';

class index extends DPA.list {

    constructor(props) {
        super(props, {
            title: "Cuentas bancarias",
            Parent: Parent,
            excludes: ["key", "fecha_on", "key_usuario", "key_servicio", "estado", "key_conductor"],
            onRefresh: (resolve) => {
                Parent.model.Action.CLEAR();
                if (resolve) resolve()
            }
        });
    }
    componentDidMount() {
        // if (!Model.restaurante.Action.getSelect()) {
        //     SNavigation.goBack();
        //     return;
        // }
    }
    $allowNew() {
        return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }
    // $allowEdit() {
    //     return true;
    // }
    $allowTable() {
        return false;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    }
    $allowAccess() {
        return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $filter(data) {
        return data.estado != 0
    }

    $getData() {
        return Parent.model.Action.getAllBy({ key_conductor: Model.usuario.Action.getKey() });
    }
}
export default connect(index);