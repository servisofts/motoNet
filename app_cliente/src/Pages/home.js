
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, ScrollView } from 'react-native'
import { SHr, SIcon, SImage, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import TopBar from '../Components/TopBar';
import Model from '../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    tipoItem({ label, detail, icon, url }) {
        return <SView col={"xs-12"} height={110} row style={{
            padding: 8,
            borderRadius: 8,
            borderBottomWidth: 2,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: STheme.color.card,
        }} onPress={() => {
            SNavigation.navigate(url);
        }}>
            <SView flex height style={{
                justifyContent: "center"
            }}>
                <SText bold fontSize={22}>{label}</SText>
                <SText>{detail}</SText>
            </SView>
            <SView width={100} center height >
                <SIcon name={icon} width={70} height={70} />
            </SView>
        </SView>
    }
    publicidadItem({ src }) {
        return <SView width={238} height={150} padding={4}>
            <SImage enablePreview src={src} style={{ resizeMode: "contain", borderRadius: 8 }} />
        </SView>
    }
    getPublicidad() {
        return <SView col={"xs-12"}  >
           
                {/* <SText>TODO:Publicidad</SText> */}
                <FlatList horizontal data={[
                    { src: require('../Assets/img/banner1.jpg') },
                    { src: require('../Assets/img/banner2.jpg') },
                    { src: require('../Assets/img/banner1.jpg') },
                    { src: require('../Assets/img/banner2.jpg') },
                    { src: require('../Assets/img/banner1.jpg') },
                    { src: require('../Assets/img/banner2.jpg') },
                ]}
                    renderItem={row => this.publicidadItem(row.item)}
                />
           
        </SView>
    }
    getTiposDeViajes() {
        return <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center flex>
            <SView flex />
            {this.tipoItem({ label: "Transporte", detail: "A todo destino", icon: "transporte", url: "/buscar/transporte" })}
            <SView flex />
            {this.tipoItem({ label: "Pedidos", detail: "De tus comercios favoritos", icon: "pedidos", url: "/buscar/pedido" })}
            <SView flex />
            {this.tipoItem({ label: "Mensajería", detail: "Servicio de mensajería", icon: "mensajeria", url: "/buscar/mensajeria" })}
            <SView flex />
            {this.getPublicidad()}
            <SHr height={20} />
        </SView>
    }
    render() {
        return (
            <SPage disableScroll hidden>
                <TopBar type={"usuario"} rounded />
                <SView col={"xs-12"} flex center>
                    {this.getTiposDeViajes()}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);