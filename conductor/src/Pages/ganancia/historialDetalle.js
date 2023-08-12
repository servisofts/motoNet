import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SBuscador, SButtom, SDate, SHr, SIcon, SImage, SList, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import TopBar from '../../Components/TopBar';
import Model from '../../Model';
import SSocket from 'servisofts-socket'
import Pedido_item from './Pedido_item';
import Container from '../../Components/Container';
class historialDetalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.pk = SNavigation.getParam("pk");

    }


    componentDidMount() {
        this.getDatos();
    }
    getDatos() {
        this.setState({ data: null })
        SSocket.sendPromise({
            component: "conciliacion_delivery",
            type: "getAll",
            //  key_restaurante: Model.restaurante.Action.getSelect(),
        }).then(resp => {
            // this.setState({ data: resp.data })
            let dataOk = resp.data;
            this.setState({ data: resp.data[this.pk] })
            // data.filter((item) => item.state == 'New York')
        }).catch(e => {
            console.error(e)
        })

        //lista pedidos conciliados
        this.setState({ dataPedidos: null })
        SSocket.sendPromise({
            component: "pedido",
            type: "getConciliadasDelivery",
            key_conciliacion_delivery: this.pk
        }).then(resp => {
            this.setState({ dataPedidos: resp.data })
        }).catch(e => {
            console.error(e)
        })
    }


    getLista() {
        if (!this.state.dataPedidos) return <SLoad type='skeleton' col={"xs-12"} height={50} />
        return <SList
            data={this.state.dataPedidos}
            order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
            render={(obj) => {
                return <Pedido_item data={obj} />
            }} />
    }


    getFiltro() {

        return <SView col={"xs-12"} center>
            <SHr />
            <SView col={"xs-12"} row center card
                style={{
                    borderRadius: 8,
                    padding: 8
                }}
            >
                <SBuscador />
            </SView>
            <SHr height={15} />
        </SView>
    }

    getHeader() {
        if (!this.state.data) return <SLoad type='skeleton' col={"xs-12"} height={80} />


        return <SView col={"xs-12"} center>
            <SHr />
            <SView col={"xs-12"} row center backgroundColor={STheme.color.primary}
                style={{
                    borderRadius: 8,
                    padding: 8
                }}
            >
                <SView col={"xs-6"} row center
                    style={{
                        borderRightColor: "#FFCCA2",
                        borderRightWidth: 2
                    }}
                >
                    <SView col={"xs-3"}>
                        <SIcon name='Iganancia' height={27} width={27} />
                    </SView>
                    <SView col={"xs-9"}>
                        <SView width={5} />
                        <SText color={STheme.color.white} fontSize={15} bold>MONTO CONCILIADO</SText>
                    </SView>

                </SView>
                <SView col={"xs-6"} center>
                    <SText color={"#FFCCA2"} fontSize={15} bold>
                        {new SDate(this.state.data.fecha_cierre).toString("dd/MM/yyyy")}
                    </SText>
                    <SText color={STheme.color.white} bold fontSize={25}>Bs. {SMath.formatMoney(this.state.data.total_pagado)}</SText>
                </SView>

                {/* <SHr height={10} />
                <SText color={STheme.color.white} fontSize={16} bold>GANANCIAS DE LA SEMANA</SText>
                <SHr />
                <SView flex height={2} />
                <SText color={STheme.color.white} bold fontSize={30}>Bs. {SMath.formatMoney(total)}</SText>
                <SHr height={10} /> */}
            </SView>

            <SText bold fontSize={14} >Comprobante</SText>
            <SHr h={4} />
            <SView width={100} height={100} card>
                <SImage src={SSocket.api.root + "conciliacion_delivery/" + this.pk} enablePreview />
            </SView>
            <SHr height={15} />
        </SView>
    }
    render() {
        return (<SPage hidden header={<TopBar type={"default"} title={"Conciliación"} />}
            onRefresh={(resolve) => {
                this.getDatos();
            }}>
            <SView backgroundColor={"#96BE00"} height={20} col={"xs-12"}></SView>
            <Container>
                <SHr />
                {/* {this.getFiltro()} */}
                {this.getHeader()}

                <SHr height={20} />
                <SView col={"xs-12"} flex>
                    <SText bold fontSize={20} >Historial de pedidos</SText>
                </SView>
                <SHr height={10} />
                {this.getLista()}
                <SHr height={30} />
            </Container>
        </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(historialDetalle);