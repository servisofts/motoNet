
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SInput, SList, SNavigation, SPage, SScrollView2, SText, STheme, SThread, SView } from 'servisofts-component';
import ChangeItem from './Components/ChangeItem';
import SSocket from 'servisofts-socket';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busqueda: props.parent.state.busqueda
        };

    }

    getData() {
        new SThread(700, "thss", true).start(() => {
            var parent = this.props.parent;
            var location = parent.state.location;
            var direccion = location.direccion;
            if (direccion.length <= 4) {
                return;
            }
            if (this.state.loading) return;
            if (this.state.busqueda == direccion) return;
            this.state.loading = true;
            this.state.busqueda = direccion;
            this.setState({ ...this.state })
            SSocket.sendPromise({
                service: "geolocation",
                component: "locationGoogle",
                type: "autoComplete",
                estado: "cargando",
                data: {
                    direccion: this.state.busqueda,
                    latitude: -17.78629,
                    longitude: -63.18117
                },
            }).then(resp => {
                this.state.loading = false;
                this.state.data = resp.data;
                this.setState({ ...this.state })
            }).catch((e) => {
                this.state.loading = false;
                this.setState({ ...this.state })
            })
        })


    }

    getDetail(obj) {
        SSocket.sendPromise({
            service: "geolocation",
            component: "locationGoogle",
            type: "detail",
            estado: "cargando",
            place_id: obj.place_id,
            direccion: obj.direccion
        }).then(resp => {
            var data = resp.data;
            data.direccion = resp.direccion;
            this.props.parent.setLocation(data);
            this.props.parent.goBack();
        }).catch((e) => {
            console.error(e)
        })
    }
    getRecientes() {
        if (!this.props.parent.state.recientes) return null;
        if (this.props.parent.state.recientes.length <= 0) return null;
        return <>
            <SHr />
            <SView col={"xs-11"}>
                <SText bold>Recientes</SText>
            </SView>
            <SList
                data={this.props.parent.state.recientes}
                center
                render={(obj) => {
                    return <ChangeItem label={obj.direccion} onPress={() => {
                        this.props.parent.setLocation(obj);
                        this.props.parent.goBack();
                    }} />
                }}
            />
        </>
    }
    getListaAuto() {
        if (!this.state.data) return null;
        return <SList
            data={this.state.data}
            center
            render={(obj) => {
                return <ChangeItem label={obj.direccion} onPress={() => {
                    this.getDetail(obj)
                }} />
            }}
        />
    }
    getLista() {
        return <SView col={"xs-12"} flex center>

            <SScrollView2 disableHorizontal>
                <SView col={"xs-12"} center>

                    {this.getListaAuto()}
                    {this.getRecientes()}
                </SView>
            </SScrollView2>
        </SView>

    }
    render() {
        this.getData();
        return (
            <SView col={"xs-12"} flex center>
                <ChangeItem label={"Seleccionar ubicación en el mapa."} type={"mapa"} parent={this.props.parent} />
                <SView col={"xs-12"} flex center>
                    {this.getLista()}
                </SView>
            </SView>
        );
    }
}

export default (index);