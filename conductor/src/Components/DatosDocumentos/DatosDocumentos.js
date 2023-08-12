import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SIcon, SList, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Model from '../../Model';
import DatoItem from "./DatoItem";
import SSocket from 'servisofts-socket'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    getDatos() {
        var datos = Model.dato.Action.getAllByKeyUsuario(this.props.key_usuario);
        this.usuario_dato = Model.usuario_dato.Action.getAllBy({
            key_usuario_perfil: this.props.key_usuario
        })
        if (!datos) return null;
        if (!this.usuario_dato) return null;
        // console.log(datos);
        return <SList
            data={datos}
            initSpace={0}
            space={0}
            order={[{ key: "tipo", order: "desc", peso: 1 }]}
            render={(obj) => {
                // if(Object.values(obj).find(o => o.tipo == "file")) 
                var dto = Object.values(this.usuario_dato).find(o => o.key_dato == obj.key);
                // console.log(obj);
                return <DatoItem obj={obj} dto={dto}  />
            }}
        />
    }
    render() {
        return (
            <SView col={"xs-12"} >
                <SHr height={10} />
                <SText bold fontSize={16}>Documentos Usuario</SText>
                <SHr height={10} />

                {/* <SText fontSize={16} bold>Datos y documentos</SText> */}
                {/* <SView row card width={100} center height={30} onPress={() => {
                        SNavigation.navigate("/usuario/profile/edit_datos", { pk: this.props.key_usuario })
                    }}>
                        <SIcon name='Pencil' fill={STheme.color.text} width={12} />
                        <SView width={8} />
                        <SText>Editar</SText>
                    </SView> */}
                {/* <SHr height={4}/> */}
                {this.getDatos()}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);