import React, { Component } from 'react';
import { SButtom, SHr, SIcon, SInput, SList, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import PButtom from '../../../../Components/PButtom';
import Model from '../../../../Model';
import Container from '../../../../Components/Container';
import TopBar from '../../../../Components/TopBar';

export default class no_recogido extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        // Model.viaje.Action.CLEAR();
        return (
            <SPage center hidden header={<TopBar type={"usuario"} />}>
                <SView col={"xs-12"} center>
                    <Container >
                        <SHr height={20} />
                        <SView col={"xs-9"} center>
                            <SText bold fontSize={22}>Tapeke no recogido</SText>
                            <SHr height={15} />
                            <SText bold fontSize={16} center>Lo sentimos, no llegaste a tiempo para recoger el pedido.</SText>
                            <SHr />
                            <SText fontSize={14} center>Creemos que tuviste algun retrazo para llegar al restaurante se te cobrara una multa por esta accion, si no estas de acuerdo ponte en contacto con atención al cliente.</SText>
                            <SHr />
                            <PButtom onPress={() => {
                                SNavigation.navigate("/chat", { message: "No llegue a tiempo a tiempo para recoger el pedido del restaurante." });
                            }}>Contactanos</PButtom>
                        </SView>
                        <SHr height={40} />
                        <SView col={"xs-12"} row center height={280} >
                            <SIcon fill={STheme.color.secondary} name={"TimeOut"} height={280} />
                        </SView>
                        <SHr height={40} />
                        <PButtom onPress={() => {
                            Model.pedido.Action.action("cancelar", this.props.data.key, {});
                            // SNavigation.reset("/");
                        }}>ACEPTAR</PButtom>
                    </Container>
                </SView>
            </SPage >
        );
    }
}
