
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SInput, SMapView, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import ChangeItem from './Components/ChangeItem';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLocation(region) {
        SSocket.sendPromise({
            service: "geolocation",
            component: "locationGoogle",
            type: "geocode",
            data: region,
            estado: "cargando",
        }).then(resp => {
            this.props.parent.setLocation(resp.data);
        })
    }
    render() {
        var { location } = this.props.parent.state;
        var defaultLocation = {
            latitude: -17.7799998333333332,
            longitude: -63.180598333333336
        }
        if (!location.latitude && !location.longitude) {
            this.getLocation(defaultLocation)
        }
        return (
            <SView col={"xs-12"} flex center>
                <ChangeItem label={"Seleccionar ubicacion en la lista."} type={"lista"} parent={this.props.parent} />
                <SView flex col={"xs-12"} center>
                    <SMapView initialRegion={{
                        latitude: !location.latitude ? defaultLocation.latitude : location.latitude,
                        longitude: !location.longitude ? defaultLocation.longitude : location.longitude,
                        latitudeDelta: 0.07,
                        longitudeDelta: 0.07,
                    }} onRegionChangeComplete={(evt) => {
                        this.getLocation(evt)
                    }} />
                    <SView
                        width={30}
                        height={30}
                        style={{
                            position: "absolute"
                        }}>
                        <SIcon name={"Marker"} fill={STheme.color.primary} />
                    </SView>
                </SView>
                <SView
                    col={"xs-11"} height={40} backgroundColor={STheme.color.primary}
                    style={{
                        borderRadius: 4,
                        position: "absolute",
                        bottom: 8,
                    }} 
                    onPress={()=>{
                        this.props.parent.goBack();
                    }} center>
                    <SText color={"#fff"}>Aceptar</SText>
                </SView>
            </SView >
        );
    }
}

export default (index);