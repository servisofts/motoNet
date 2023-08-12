import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import { SHr, SNavigation, SPopup, SText, STheme, SView } from 'servisofts-component';
import Model from '../../Model';
import Buttom from '../../Components/Buttom';

class index extends DPA.delete {
    constructor(props) {
        super(props, { Parent: Parent, title: "Eliminar cuenta bancaria", });
        var data={}
    }
    $allowAccess() {
        return true;
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    }
    $onDelete() {
        this.data.estado = 0;
        Parent.model.Action.editar({
            data: this.data,
            key_usuario: ""
        }).then((resp) => {
            SNavigation.navigate("/driver_cuenta")
        }).catch(e => {
            console.error(e);

        })
    }

    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }

    $render() {
        this.data = this.$getData()
        return <SView center>
            <SHr height={30} />
            <SText fontSize={18}>¿Está seguro que desea eliminar la cuenta bancaria?</SText>
            <SHr height={15} />
            <SText fontSize={14} color={STheme.color.gray}>Por su seguridad esta acción quedará registrada.</SText>
            <SHr height={30} />
            <Buttom onPress={() => {
                this.$onDelete();
            }}>Eliminar</Buttom>
            <SHr height={30} />
        </SView>
    }
}
export default connect(index);