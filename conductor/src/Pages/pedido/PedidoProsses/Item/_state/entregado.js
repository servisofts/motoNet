import React, { Component } from 'react';
import { SButtom, SHr, SIcon, SInput, SList, SNavigation, SPage, SPopup, SText, STheme, SView, SImage } from 'servisofts-component';
import PButtom from '../../../../../Components/PButtom';

export default class entregado extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <SPage center hidden disableScroll
            >
                <SView backgroundColor={"#96BE00"} height={20} col={"xs-12"} style={{ top: 0, position: "absolute" }}></SView>
                <SText fontSize={18} bold>Tapeke entregado con éxito</SText>
                <SHr height={20} />
                <SImage src={require("../../../../../Assets/img/entregado.png")} style={{
                    height: 340
                }} />
                <SHr height={32} />
                {/* <PButtom onPress={() => {
                    SNavigation.reset("/");
                }}>SALIR</PButtom> */}
            </SPage >
        );
    }
}
