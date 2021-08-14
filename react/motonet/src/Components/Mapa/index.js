import React, { Component } from 'react'
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { ReactComponent as Logo } from '../../img/MarkerMoto.svg'
import { CircularProgress, Grid } from '@material-ui/core';
import Moment from 'moment';
import { SThread } from '../../SComponent';
import { View } from 'react-native';


const MiMarker = (propMarker) => {
    var color = '#660000';
    if (!propMarker.data.fecha_off) {
        color = '#006600';
    }
    return (
        <div style={{
            position: 'absolute',
            width: 80,
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            // backgroundColor: color,
            borderRadius: 4,
            top: -20,
            left: -40,
        }}
            onClick={() => {
                //alert(propMarker)
            }}>
            {/* <span style={{
                position: "absolute",
                textAlign: "center",
                left: -30,
                top: -25,
                width: 100,
            }}>{(propMarker.minutes == 0 ? "Ahora" : "Hace " + propMarker.minutes + " min.")}</span> */}
            <span style={{
                textAlign: "center",
                fontWeight: "bold",
                width: 80,
                fontSize: 10,
            }}>{propMarker.title}</span>

            <div style={{
                width: 80,
                height: 25,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Logo style={{ width: 25, height: 25, fill: color }} fill={color}/>
            </div>
        </div>
    )
}

export class Mapa extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.getPosition()
    }

    getPosition() {
        var objSend = {
            component: "seguimientoConductor",
            type: "getAll",
            estado: "cargando",
        };
        this.props.state.socketReducer.send(objSend);
    }
    getData() {
        var reducer = this.props.state.usuarioReducer;
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") {
                return false;
            }
            var objSend = {
                component: "usuario",
                type: "getAll",
                estado: "cargando",
                cabecera: "%%",
                data: ""
            };
            this.props.state.socketReducer.send(objSend);
            return false;
        }
        return data;
    }
    render() {
        new SThread(5000, "hiloConductor", false).start(() => {
            this.getPosition()
        })
        var usuarios = this.getData();
        if (!usuarios) {
            return <View />
        }
        var getSVGMapa = () => {

            if (!this.props.state.seguimientoConductorReducer.data) {
                return <div />
            }
            return Object.keys(this.props.state.seguimientoConductorReducer.data).map((key) => {
                var obj = this.props.state.seguimientoConductorReducer.data[key];
                var conductor = usuarios[obj.key_usuario];

                // if (!conductor) {
                //     return <div />
                // }
                // var a = Moment(new Date());//now
                // var b = Moment(obj.fecha_on);
                // var minutes = a.diff(b, 'minutes');
                // if (minutes > 30) {
                //     return <div />
                // }
                // var IMG = Logo;
                // if (obj.emergencias) {
                // IMG = Logo;
                // }

                return (
                    <MiMarker
                        lat={obj.latitude}
                        lng={obj.longitude}
                        title={obj.key_usuario}
                        title={conductor.data["Nombres"].dato + " " + conductor.data["Apellidos"].dato}
                        data={obj}
                    // logo={IMG}
                    />
                )
            })
        }
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAt-U-cFcg5QNfPAvQW5YWT1d1SbEJFNuM" }}
                    defaultCenter={{
                        lat: -17.7799998333333332,
                        lng: -63.180598333333336
                    }}
                    defaultZoom={13}>
                    {getSVGMapa()}
                </GoogleMapReact>
            </div>
        )
    }
}


const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Mapa);
