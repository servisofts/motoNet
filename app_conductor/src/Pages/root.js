
import React, { Component } from 'react';
import { Linking, PermissionsAndroid } from 'react-native'
import { connect } from 'react-redux';
import SBLocation from 'servisofts-background-location';
import { SIcon, SMapView, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import SwitchRastreo from '../Components/SwitchRastreo';
import TopBar from '../Components/TopBar';
import Model from '../Model';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        if (!Model.usuario.Action.getUsuarioLog()) {
            // SNavigation.replace("/login");
            return <SText>No hay usuario</SText>
        }
        return (
            <SPage title={'index'} hidden disableScroll center header={<TopBar type={"usuario"} />}>
                <SView col={"xs-12"} height={50} center backgroundColor={STheme.color.barColor}>
                    <SwitchRastreo callback={(resp) => {
                        if (!resp.active) {
                            SBLocation.start({
                                nombre: "Title notification",
                                label: "Body notification",
                                minTime: 1000,
                                minDistance: 1
                            }).then(e => {

                            }).catch(e => {
                                if (e.error == "permision") {
                                    Linking.openSettings();
                                }
                            })
                        } else {
                            SBLocation.stop();
                        }
                    }} />
                </SView>
                <SView col={"xs-12"} flex>
                    <SMapView initialRegion={{
                        latitude: -17.77999983,
                        longitude: -63.1805983,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);