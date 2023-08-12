import React, { Component } from 'react';
import { SButtom, SHr, SNavigation, SPage, SText, SView, SMapView, SIcon } from 'servisofts-component';
import Model from '../../../../Model';
import Mapa from '../../../../Components/Mapa';
import TopBar from '../../../../Components/TopBar';

export default class inicio_viaje extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getMarker = ({ latitude, longitude }) => {
        return <SMapView.SMarker latitude={latitude} longitude={longitude}>
            <SIcon name='Marker' width={30} height={30} />
        </SMapView.SMarker>
    }

    getMarkerDestinos = () => {
        if (!this.props.viaje) return null;
        return this.props.viaje.destinos.map(dest => {
            return this.getMarker({ latitude: dest.latitude, longitude: dest.longitude })
        })
    }

    getCurrentDestino = () => {
        if (!this.props.viaje) return null;
        let arr = this.props.viaje.destinos.filter(a => !a.fecha_conductor_llego).sort((a, b) => a.tipo > b.tipo ? 1 : -1)
        return arr[0] ?? {};
    }
    render() {
        const currentDestino = this.getCurrentDestino();
        return (
            <SPage hidden header={<TopBar type={"usuario"} />}>
                <SView col={"xs-12"} flex card>
                    <Mapa >
                        {this.getMarkerDestinos()}
                    </Mapa>
                </SView>
                <SView col={"xs-12"} padding={8} center>
                    <SHr h={16} />
                    <SText bold fontSize={18}>Dirijite al destino {currentDestino.tipo}</SText>
                    <SText >{JSON.stringify(currentDestino)}</SText>
                    <SHr h={16} />
                    <SView row col={"xs-12"}>

                        <SButtom type='danger' onPress={() => {
                            Model.viaje.Action.action("cancelar", this.props.viaje.key).then((resp) => {
                                SNavigation.reset("/");
                            })

                        }}>CANCELAR</SButtom>

                        <SView flex />
                        <SButtom type='outline' onPress={() => {
                            Model.viaje.Action.action("llegue", this.props.viaje.key, {
                                key_direccion: currentDestino.key
                            }).then((resp) => {
                                SNavigation.reset("/");
                            })

                        }}>LLEGUE</SButtom>
                    </SView>
                </SView>


            </SPage >
        );
    }
}
