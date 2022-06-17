import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, DatePickerIOS, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import MarkerAmbulancia from './MarkerAmbulancia';
import RutaViaje from "./RutaViaje";
import Boton1 from '../Boton1';
import Svg from '../../Svg';
// import Svg from 'react-native-svg';
// import Svg from '../../../Svg';

const delay = ms => new Promise(res => setTimeout(res, ms));
var mapa = false;

const Mapa = (props) => {
    const [data, setdata] = React.useState({
        region: {
            latitude: -17.78629,
            longitude: -63.18117,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
            isRender: false,
        },
        origen: false,
        ubicacionActual: false
    })
    // console.log(props.state.viajesReducer.data)
    // var pos = props.state.locationGoogleMapReducer.region;
    var pos = props.state.viajesReducer.data?.direccion_inicio;

    if (!data.region.isRender) {
        if (pos) {
            data.region = {
                latitude: pos.latitude,
                longitude: pos.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
                isRender: true,
            }
            setdata({ ...data });
        }
        return <View />
    }

    const getMarkerInicio = () => {
        // if (!props.state.emergenciaReducer.data) {
        //     return <View />
        // }
        // var dato = props.state.viajesReducer.data.destinos[0];
        // console.log(data)
        var json = { latitude: data.region.latitude, longitude: data.region.longitude };
        return (
            <Marker
                coordinate={json}
            // resizeMode=""
            >
                {/* <View style={{
                    //  width: 50,
                    //  height: 50,
                    justifyContent:"center",
                    alignItems:"center",
                   
                     backgroundColor:"#ccc"
                }}> */}
                {/* <Svg name="Milocation"
                    style={{
                        width: 50,
                        height: 50,
                    }} /> */}
                {/* </View> */}

            </Marker>
        )
    }



    const zoomin = (obj) => {
        // obj = currentPos;
        if (!mapa) {
            return;
        }
        var pos = {
            latitude: obj.latitude,
            longitude: obj.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
        }
        mapa.animateToRegion(pos, 2000);
        // setZoom(true);
        return <View />
    }

    const fitCordinates = (pos) => {
        if (!mapa) {
            return;
        }
        // aqui es donde se va a hacer el zoom
        mapa.fitToCoordinates(pos, {
            edgePadding: {
                top: 100,
                right: 100,
                bottom: 100,
                left: 100,
            }
        })
    }


   

    const hilo = async () => {
        await delay(1000);
        const _clienteOrigen = props.state.viajesReducer.data?.direccion_inicio;
        const _clienteDestino = props.state.viajesReducer.data?.direccion_fin;
        const _conductorUbicacion = props.state.posicionConductorReducer?.posicion;
        var posicionar = [{ latitude: _clienteOrigen?.latitude, longitude: _clienteOrigen?.longitude }, { latitude: _conductorUbicacion?.latitude, longitude: _conductorUbicacion?.longitude }];
        fitCordinates(posicionar)
    }

    hilo();

    return (
        <View style={{
            width: "100%",
            height: "100%",
            paddingBottom: 200
        }}>
            <MapView
                showsUserLocation={true}
                style={{
                    flex: 1,
                    width: '100%',
                    height: "100%",
                }}
                ref={map => { mapa = map }}
                initialRegion={data.region}>
                {/* {getMarkerOrigen()} */}
                {/* {getMarkerFin()}s */}
                {getMarkerInicio()}
                <MarkerAmbulancia state={props.state} />

                <RutaViaje ventanaSelect={props.ventanaSelect} setVentanaSelect={props.setVentanaSelect} />

            </MapView >

        </View>
    )
}

const initStates = (state) => {
    return { state }
};

export default connect(initStates)(Mapa);
