import React, { Component } from 'react';
import { SForm, SHr, SIcon, SImage, SLoad, SMath, SNavigation, SPopup, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../Model';

type propsType = {

}

export default class QRPedido extends Component<propsType> {
    static defaultProps: propsType = {

    }
    props: propsType;
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    componentDidMount() {
        if(!this.props.data.key) return;
        Model.pedido.Action.getQR({ key_pedido: this.props.data.key }).then((resp) => {
            if (resp.estado != "exito") return;
            this.setState({ data: resp.data })
        });
    }

    getImage() {
        if (!this.state.data) return <SLoad />
        return <SImage src={`data: image/png;base64,${this.state.data.b64}`} style={{
            width: "100%",
            height: "100%"
        }
        } />
    }

    render() {
        return <SView col={"xs-12 "} row center style={{ backgroundColor: STheme.color.white }}>
            <SView col={"xs-11"} center row flex border={"transparent"} >
                <SHr height={40} />
                <SView col={"xs-12"} border={'transparent'}>
                    <SHr height={20} />
                    <SText fontSize={16} center>El restaurante verificará tu pedido escaneando el código QR.</SText>
                </SView>
                <SHr height={40} />
                <SView col={"xs-12"} height={350} border={'transparent'} >
                    {this.getImage(this.props.data)}
                </SView>
                <SText fontSize={18} color={STheme.color.primary} bold center >Hora de entrega: {this.props.data?.horario?.hora_inicio} - {this.props.data?.horario?.hora_fin}</SText>
                {/* <SHr height={10} /> */}
                {/* <PButtom fontSize={20} onPress={() => {}}>ESTADO PEDIDO</PButtom> */}
                <SHr height={40} />
            </SView>
        </SView>
    }
}