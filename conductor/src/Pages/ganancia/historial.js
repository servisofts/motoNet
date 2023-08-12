import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SBuscador, SButtom, SDate, SHr, SIcon, SList, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import TopBar from '../../Components/TopBar';
import Model from '../../Model';
import SSocket from 'servisofts-socket'
import Pedido_item from './Pedido_item';
import Container from '../../Components/Container';
import Conciliacion_item from './Conciliacion_item';
class historial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

    }

    componentDidMount() {
        this.getDatos();
    }
    getDatos() {
        this.setState({ data: null })
        SSocket.sendPromise({
            component: "conciliacion_delivery",
            type: "getAll",
        }).then(resp => {
            let dataOk = resp.data;
            this.setState({ data: Object.values(resp.data).filter(items => items.key_conductor == Model.usuario.Action.getKey()) })
        }).catch(e => {
            console.error(e)
        })
    }

    getLista() {
        if (!this.state.data) return <SLoad type='skeleton' col={"xs-12"} height={50} />
        return <SList
            data={this.state.data}
            order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
            render={(obj) => {
                return <Conciliacion_item data={obj} />
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

    render() {
        return (<SPage hidden header={<TopBar type={"default"} title={"Conciliaciones"} />}
            onRefresh={(resolve) => {
                this.getDatos();
            }}>
            <SView backgroundColor={"#96BE00"} height={20} col={"xs-12"}></SView>
            <Container>
                <SHr />
                {/* {this.getFiltro()} */}
                <SHr height={8} />
                <SView col={"xs-12"} flex>
                    <SText bold fontSize={20} >Historial de conciliaciones</SText>
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
export default connect(initStates)(historial);