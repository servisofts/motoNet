import React, { Component } from 'react';
import { SButtom, SHr, SIcon, SInput, SList, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import InputLocation from '../../../../Components/InputLocation';
import Model from '../../../../Model';

export default class buscando_conductor extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getTipoViaje(viaje) {
        var info = {
            nombre: viaje.key_tipo_viaje,
        }

        switch (viaje.key_tipo_viaje) {
            case "transporte-moto":
                info.nombre = "Transporte Moto"
                break;
            case "mensajeria-sobre":
                info.nombre = "Mensajeria sobre"
                break;
        }

        return <SText fontSize={16} color={STheme.color.secondary}>{info.nombre}</SText>
    }
    getDirecciones(viaje) {
        return <SList
            data={viaje.destinos}
            render={(destino) => {
                return <InputLocation icon={destino.tipo != "0" ? "pointer" : "Marker"} defaultValue={destino} />
            }}
        />
    }
    render() {
        var viaje = this.props.viaje;
        var params = viaje?.params
        return (
            <SPage center hidden disableScroll>
                <SView col={"xs-12"} flex center backgroundColor={STheme.color.primary}>
                    {/* <SView width={300} height={200} center>
                        <SIcon name={"logoCompleto"} fill={STheme.color.secondary} />
                    </SView> */}

                    <SView col={"xs-11"} center>
                        <SHr />
                        {this.getTipoViaje(viaje)}
                        <SHr />
                        {this.getDirecciones(viaje)}
                        <SHr height={30} />
                        <SText color={STheme.color.secondary}>Cuanto cobraras por el viaje?</SText>
                        <SHr />
                        <SView width={200} center>
                            <SInput ref={ref => this._inp = ref} type='number' customStyle={"motonet"} required defaultValue={"1"} />
                        </SView>
                    </SView>
                    <SHr height={30} />
                    {/* <SText>{params["time_to_accept_driver"]?.valor}</SText> */}
                    <SView row col={"xs-12"} center>
                        <SButtom type='danger'
                            onPress={() => {
                                // Model.viaje.Action.action("", this.props.viaje.key, {
                                //     key_conductor: Model.usuario.Action.getKey(),
                                //     oferta: value
                                // })
                                Model.viaje.Action.CLEAR();
                                SNavigation.replace("/")
                            }}>CANCELAR</SButtom>
                        <SView col={"xs-1"} />
                        <SButtom type={"secondary"} onPress={() => {
                            if (!this._inp.verify()) {
                                return;
                            }
                            var value = this._inp.getValue();

                            Model.viaje.Action.action("negociar_conductor", this.props.viaje.key, {
                                key_conductor: Model.usuario.Action.getKey(),
                                oferta: value
                            }).then((resp) => {

                            }).catch(e => {
                                SPopup.alert("Lo sentimos ya no puedes aceptar este viaje")
                                Model.viaje.Action.CLEAR();
                            })
                        }}>NEGOCIAR</SButtom>
                    </SView>
                </SView>
            </SPage >
        );
    }
}
