import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, SLoad } from 'servisofts-component';
import Container from '../../Components/Container';
import Model from '../../Model';
import SSocket from 'servisofts-socket';
import Header from '../../Components/Header';

class root extends Component {
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
        SNavigation.navigate("/documento/moto")

    }



    render() {

        var datos = Model.dato.Action.getAllByKeyRol("b8920e90-1cbd-4fac-b740-62fac4d22bbd");
        if (!datos) return <SLoad />;
        var key_usuario = Model.usuario.Action.getKey();

        var filePath = SSocket.api.root + "usuario_dato/" + key_usuario;
        this.usuario_dato = Model.usuario_dato.Action.getAllBy({ key_usuario_perfil: key_usuario })
        if (!this.usuario_dato) return null;
        // console.log(datos);
        var _fotoci = Object.values(datos).find(o => o.descripcion == "Foto CI");
        var dto__fotoci = Object.values(this.usuario_dato).find(o => o.key_dato == _fotoci.key);

        var _fotoci_rev = Object.values(datos).find(o => o.descripcion == "Foto CI Reverso");
        var dto__fotoci_rev = Object.values(this.usuario_dato).find(o => o.key_dato == _fotoci_rev.key);

        // var _cuentabancaria = Object.values(datos).find(o => o.descripcion == "Cuenta bancaria?");
        // var dto_cuentabancaria = Object.values(this.usuario_dato).find(o => o.key_dato == _cuentabancaria?.key);

        var _nit = Object.values(datos).find(o => o.descripcion == "NIT");
        var dto_nit = Object.values(this.usuario_dato).find(o => o.key_dato == _nit.key);

        var _ciudad = Object.values(datos).find(o => o.descripcion == "Ciudad");
        var dto_ciudad = Object.values(this.usuario_dato).find(o => o.key_dato == _ciudad.key);

        var _genero = Object.values(datos).find(o => o.descripcion == "Genero");
        var dto_genero = Object.values(this.usuario_dato).find(o => o.key_dato == _genero?.key);
        // console.log("placakey ", datos)
        // console.log((_fotoci))
        return (<SPage title={"Documento Conductor"}
            onRefresh={(resolve) => {
                Model.usuario_dato.Action.CLEAR();
                Model.dato.Action.CLEAR();
            }}
            header={<Header />}
        >
            <Container>
                <SHr height={30} />
                {/* <SText fontSize={this.state.fontSize}>Conductor</SText>
                <SHr height={1} color={"red"} />
                <SHr height={50} /> */}

                <SForm
                    ref={(form) => { this.form = form; }}
                    col={"xs-12"}
                    inputProps={{
                        col: "xs-12",
                        separation: 16
                    }}
                    row
                    style={{
                        justifyContent: "space-between"
                    }}
                    inputs={{
                        [_fotoci.key]: { col: "xs-5.5", label: _fotoci.descripcion, placeholder: "Foto CI", type: _fotoci.tipo, isRequired: false, defaultValue: dto__fotoci?.descripcion, filePath: filePath },
                        [_fotoci_rev.key]: { col: "xs-5.5", label: _fotoci_rev.descripcion, placeholder: "Foto CI", type: _fotoci_rev.tipo, isRequired: false, defaultValue: dto__fotoci_rev?.descripcion, filePath: filePath },
                        //[_fotoci.key]: { col: "xs-12",label: _fotoci.descripcion, placeholder: "SOAT", type: _fotoci.tipo, isRequired: false,  filePath: filePath, },
                        // [_cuentabancaria.key]: { label: _cuentabancaria.descripcion, placeholder: "Cuenta Bancaria", type: "CheckBox", isRequired: false, defaultValue: dto_cuentabancaria?.descripcion },
                        // [_cuentabancaria.key]: {
                        //     label: "¿Cuenta bancaria?", placeholder: "¿Cuenta bancaria?", type: "select",
                        //     options: [
                        //         { key: "1", content: "Sí" },
                        //         { key: "0", content: "No" },
                        //     ],
                        //     isRequired: false, defaultValue: dto_cuentabancaria?.descripcion
                        // },
                        [_nit.key]: { label: _nit.descripcion, placeholder: "Nit", type: _nit.tipo, isRequired: true, defaultValue: dto_nit?.descripcion },
                        [_ciudad.key]: { label: _ciudad.descripcion, placeholder: "Ciudad", type: _ciudad.tipo, isRequired: false, defaultValue: dto_ciudad?.descripcion },
                        [_genero.key]: { label: _genero.descripcion, placeholder: "Genero", type: "select", isRequired: false, defaultValue: dto_genero?.descripcion, options: ["Masculino", "Femenino"] },
                    }}
                    onSubmitName={"ACEPTAR"}
                    onSubmit={(data, ref) => {

                        this.onSubmit(data, ref, key_usuario);
                        ref.uploadFiles2(SSocket.api.root + "upload/usuario_dato/" + key_usuario);

                    }}
                />
                <SHr height={50} />
            </Container>
        </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(root);