import DPA, { connect } from 'servisofts-page';
import Model from '../../../Model';

const Parent = {
    name: "sucurusal",
    path: "/sucursal",
    model: Model.sucursal
}
class index extends DPA.list {
    constructor(props) {
        super(props, {
            page: false,
            Parent: Parent,
            type:"componentTitle",
            title: "Sucursales",
            excludes: ["key", "fecha_on", "key_usuario", "key_servicio", "estado", "lat", "lng", "observacion", "key_empresa", "direccion"],
            // item: Item,

        });
    }
    $allowNew() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }

    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" });
    }
    $filter(data) {
        return data.estado != 0
    }
    onNew() {
        super.onNew({ key_empresa: this.props.key_empresa })
    }
    // $onSelect(data) {
    //     return;
    // }
    $getData() {
        // var empresa = Model.empresa.Action.getByKey(this.props.key_empresa)
        return Parent.model.Action.getAllByKeyEmpresa(this.props.key_empresa);
    }
}
export default connect(index);