import React, { Component } from 'react';
import { SButtom, SDate, SHr, SIcon, SImage, SInput, SList, SLocation, SMapView, SMath, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import { Linking } from 'react-native';

import SSocket from 'servisofts-socket';
import Detalle from './Item/Detalle';
import BtnNavegar from '../../../Components/BtnNavegar';
export default class Header extends Component {
    render() {
        let data = this.props?.parent?.data;
        if (!data) return null;
        let restaurante = Object.values(data ?? {})[0]?.restaurante;
        return (
            <SView col={"xs-12"} row center padding={8} backgroundColor={STheme.color.background}>
                <SView width={80} center height={80} style={{
                    resizeMode: "cover"
                }}>
                    <SImage src={SSocket.api.root + 'restaurante/' + restaurante?.key}
                        style={{ borderRadius: 8, overflow: "hidden" }} enablePreview />
                </SView>
                <SView width={10} />
                <SView flex >
                    <SView col={"xs-12"} >
                        <SText bold fontSize={15}>{restaurante?.nombre}</SText>
                        <SHr height={0.5} />
                        <SText fontSize={12} color={STheme.color.lightGray}>{restaurante?.direccion}</SText>
                        <SText fontSize={12} color={STheme.color.lightGray}>Capacidad: {restaurante?.capacidad_envio}</SText>
                        <SHr height={1} />

                    </SView>

                </SView>
                <SView style={{
                    position: "absolute",
                    bottom: 4,
                    right: 4
                }}>
                    <SView col={"xs-12"} row height={40} style={{
                        justifyContent: "flex-end",
                    }}>
                        <BtnNavegar latLng={{
                            latitude: restaurante.latitude,
                            longitude: restaurante.longitude,
                        }}><SView>
                                <SIcon name='IMapa' width={35} />
                            </SView>
                        </BtnNavegar>
                        <SView width={18} />
                        <SView onPress={() => {
                            let numero = restaurante.telefono;
                            Linking.openURL(`tel:${numero}`);
                        }}>
                            <SIcon name='ILlamar' width={30} />
                        </SView>
                    </SView>
                </SView>
            </SView>
        )
    }
}