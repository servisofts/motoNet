
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SInput, SNavigation, SPage, SStorage, SText, STheme, SThread, SView } from 'servisofts-component';
import TopBar from '../../Components/TopBar';
import TypeMapa from './mapa';
import TypeLista from './lista';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                latitude: 0,
                longitude: 0,
                direccion: ""
            },
            recientes: [],
        };
        SStorage.getItem("ubicacion_recientes", (cv) => {
            if (!cv) return;
            var arr = JSON.parse(cv);
            this.state.recientes = arr;
            this.setState({ ...this.state })
        });
        var location = SNavigation.getParam("location");
        if (location) {
            this.state.location = location;
            this.state.busqueda = location.direccion;
        }
        this.onSelect = SNavigation.getParam("onSelect");
    }


    addReciente(location) {
        var isEqual = false;
        this.state.recientes.map((obj) => {
            if (obj.direccion == location.direccion) {
                isEqual = true;
            }
        })
        if (!isEqual) {
            this.state.recientes.unshift(location);
            if (this.state.recientes.length > 10) {
                this.state.recientes = this.state.recientes.slice(0, 10);
            }
        }
        SStorage.setItem("ubicacion_recientes", JSON.stringify(this.state.recientes));
        this.setState({ ...this.state })
    }
    goBack() {
        if (this.onSelect) {
            if (!this.state.location.direccion) {
                this.state.location = {
                    latitude:0,
                    longitude:0,
                    direccion:""
                }
            } else {
                if (this.state.location.latitude && this.state.location.longitude) {
                    this.addReciente(this.state.location);
                }
            }

            this.onSelect(this.state.location);
        }
        SNavigation.goBack();
    }
    setLocation(data) {
        this.state.location = data;
        this.setState({
            ...this.state
        })
    }
    getBar() {
        return <TopBar type={"hidden"}>
            <SView height={80} col={"xs-12"} center>
                <SView col={"xs-11"}>
                    <SInput
                        icon={<SView width={30} center height onPress={() => {
                            this.goBack();
                        }}>
                            <SIcon name={"Arrow"} fill={STheme.color.secondary} width={20} />
                        </SView>}
                        customStyle="motonet"
                        value={this.state.location?.direccion}
                        placeholder={"Buscar destino"}
                        onChangeText={(txt) => {
                            // this.state.location.direccion = txt+"";
                            this.setState({
                                location: {
                                    ...this.state.location,
                                    direccion: txt,
                                }
                            })

                        }}
                        style={{
                            height: 50
                        }} />
                </SView>
            </SView>
        </TopBar>
    }


    getType() {
        if (this.state.type == "mapa") {
            return <TypeMapa parent={this} />
        }
        return <TypeLista parent={this} />
    }
    render() {

        return (
            <SPage title={'index'} hidden disableScroll >
                {this.getBar()}
                <SView col={"xs-12"} flex center>
                    {this.getType()}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);