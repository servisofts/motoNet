import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText } from 'servisofts-component';
import Container from '../../Components/Container';
import Model from '../../Model';
import SSocket from 'servisofts-socket';
import Header from '../../Components/Header';

class moto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontSize: 46,
            // defaultValue: "--"
        };

    }

    async onSubmit(data, ref, key_usuario) {
        var arr = Object.keys(data);
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
                var resp = await Model.usuario_dato.Action.registro({
                    data: {
                        key_usuario_perfil: key_usuario ?? this.props.key_usuario,
                        descripcion: dato_str,
                        key_dato: key_dato
                    },
                    key_usuario: Model.usuario.Action.getKey()
                })


            } else {
                if (dto?.descripcion != dato_str) {
                    var resp = await Model.usuario_dato.Action.editar({
                        data: {
                            ...dto,
                            descripcion: dato_str,
                        },
                        key_usuario: Model.usuario.Action.getKey()
                    })

                }

            }

        }
        SNavigation.replace("/");

    }

    render() {

        var datos = Model.dato.Action.getAllByKeyRol("b8920e90-1cbd-4fac-b740-62fac4d22bbd");
        if (!datos) return null;
        var key_usuario = Model.usuario.Action.getKey();

        var filePath = SSocket.api.root + "usuario_dato/" + key_usuario;
        this.usuario_dato = Model.usuario_dato.Action.getAllBy({ key_usuario_perfil: key_usuario })
        if (!this.usuario_dato) return null;



        var _placa = Object.values(datos).find(o => o.descripcion == "Placa");
        var dto_placa = Object.values(this.usuario_dato).find(o => o.key_dato == _placa.key);

        var _soat = Object.values(datos).find(o => o.descripcion == "SOAT");
        var dto_soat = Object.values(this.usuario_dato).find(o => o.key_dato == _soat.key);

        var _foto_del_vehiculo = Object.values(datos).find(o => o.descripcion == "Foto del vehiculo");
        var dto_foto_del_vehiculo = Object.values(this.usuario_dato).find(o => o.key_dato == _foto_del_vehiculo.key);

        var _tipo_vehiculo = Object.values(datos).find(o => o.descripcion == "Tipo vehiculo");
        var dto_tipo_vehiculo = Object.values(this.usuario_dato).find(o => o.key_dato == _tipo_vehiculo.key);

        console.log(_soat);

        return (<SPage title={"Documento Motorizado"}
            header={<Header />}
            onRefresh={(resolve) => {
                Model.usuario_dato.Action.CLEAR();
                Model.dato.Action.CLEAR();
            }}
        >
            <Container>

                <SHr height={30} />
                {/* <SText fontSize={this.state.fontSize}>Documento Moto</SText>
                <SHr height={1} color={"red"} />
                <SHr height={50} /> */}
                <SForm
                    ref={(form) => { this.form = form; }}
                    col={"xs-12"}
                    inputProps={{
                        col: "xs-12",
                        separation: 16,

                    }}
                    style={{
                        alignItems: "center",
                    }}
                    inputs={{
                        [_placa.key]: { label: _placa.descripcion, placeholder: "Placa", type: _placa.tipo, isRequired: false, defaultValue: dto_placa?.descripcion },
                        [_tipo_vehiculo.key]: { label: "Tipo vehículo", placeholder: "Tipo vehículo", type: _tipo_vehiculo.tipo, isRequired: false, defaultValue: dto_tipo_vehiculo?.descripcion },
                        [_soat.key]: {
                            col: "xs-12", label: _soat.descripcion, placeholder: "SOAT", type: _soat.tipo, isRequired: false, defaultValue: dto_soat?.descripcion, filePath: filePath
                        },
                        [_foto_del_vehiculo.key]: {
                            col: "xs-12", label:"Foto del vehículo", type: _foto_del_vehiculo.tipo, placeholder: "Foto del vehículo", isRequired: false, defaultValue: dto_foto_del_vehiculo?.descripcion, filePath: filePath
                        },

                    }}
                    onSubmitName={"SAVE"}

                    onSubmit={(data, ref) => {
                        ref.uploadFiles2(SSocket.api.root + "upload/usuario_dato/" + key_usuario);
                        this.onSubmit(data, ref, key_usuario);


                    }}
                />

            </Container>
        </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(moto);