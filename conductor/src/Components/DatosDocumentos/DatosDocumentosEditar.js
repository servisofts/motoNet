import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SOrdenador, SPage, SText, STheme, SView } from 'servisofts-component';
import Model from '../../Model';
import SSocket from 'servisofts-socket'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };


    }

    onSubmit(data, ref, key_usuario) {
        var arr = Object.keys(data);
        var data_final_array = []
        for (let i = 0; i < arr.length; i++) {
            const key_dato = arr[i];
            var dto = Object.values(this.usuario_dato).find(o => o.key_dato == key_dato);
            var dato_str = data[key_dato];
            if (!dato_str) {
                if (dto) {
                    if (dto.descripcion == dato_str) continue;
                } else {
                    continue;
                }
            }
            if (typeof dato_str != "string") {
                dato_str = JSON.stringify(dato_str);
            }
            if (!dto) {
                data_final_array.push({
                    key_usuario_perfil: key_usuario ?? this.props.key_usuario,
                    descripcion: dato_str,
                    key_dato: key_dato
                })

            } else {
                if (dto?.descripcion != dato_str) {
                    data_final_array.push({
                        ...dto,
                        descripcion: dato_str,
                    })
                }
            }
        }
        Model.usuario_dato.Action.registroAll(data_final_array).then((resp) => {
            Model.usuario_dato.Action._dispatch(resp);
            SNavigation.goBack();
        }).catch(e => {
            console.log(e);
        })
    }
    getDatos() {
        var datos;
        if (this.props.key_usuario) {
            datos = Model.dato.Action.getAllByKeyUsuario(this.props.key_usuario);
            this.usuario_dato = Model.usuario_dato.Action.getAllBy({
                key_usuario_perfil: this.props.key_usuario
            })
            if (!this.usuario_dato) return null;

        } else if (this.props.key_rol) {
            this.usuario_dato = {};
            datos = Model.dato.Action.getAllByKeyRol(this.props.key_rol);
        }
        if (!datos) return null;
        var inputs = {};
        // console.log( new SOrdenador([{ key: "tipo", order: "desc", peso: 1 }]).ordernarObject(datos))
        new SOrdenador([{ key: "tipo", order: "desc", peso: 1 }]).ordernarObject(datos).map((key) => {
            var obj = datos[key];
            var dto = Object.values(this.usuario_dato).find(o => o.key_dato == obj.key);
            var defaultValue = dto?.descripcion;
            var filePath = SSocket.api.root + "usuario_dato/" + this.props.key_usuario;
            inputs[obj.key] = { label: obj.descripcion, type: obj.tipo, required: obj.required, defaultValue: defaultValue, filePath: filePath }
        })
        return <SForm inputs={inputs} onSubmitName={"Confirmar"} onSubmit={(data, ref) => {
            // console.log("subir")
            // console.log(data);
            // var files = ref.getFiles()
            // console.log(files);
            if (this.props.onSubmit) {
                this.props.onSubmit().then(key_usuario => {
                    ref.uploadFiles2(
                        SSocket.api.root + "upload/usuario_dato/" + key_usuario,
                    );
                    this.onSubmit(data, ref, key_usuario);

                })
                return;
            }

        }} />
    }
    render() {
        return (
            <SView col={"xs-12"}>
                {/* <SHr /> */}
                {/* <SHr /> */}
                {/* <SText fontSize={14} color={STheme.color.gray}>Recuerde precionar el boton "Confirmar" para guardar los cambios.</SText> */}
                {/* <SHr /> */}
                {this.getDatos()}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);