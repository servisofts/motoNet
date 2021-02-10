import {
    NativeModules,
    NativeEventEmitter,
    Platform,
    AsyncStorage
} from 'react-native';
import AppParams from '../Json/index.json'
const delay = ms => new Promise(res => setTimeout(res, ms));

import * as HttpConection from '../HttpConection'
var conectado = false;
export const init = (store) => {

    var objSend = {
        component: "backgroundLocation",
        type: "initial",
        data: "",
    };

    const getDistanciaMetros = (lat1, lon1, lat2, lon2) => {
        var rad = function (x) { return x * Math.PI / 180; }
        var R = 6378.137; //Radio de la tierra en km 
        var dLat = rad(lat2 - lat1);
        var dLong = rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) *
            Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        //aquí obtienes la distancia en metros por la conversion 1Km =1000m
        var d = R * c * 1000;
        return d;
    }
    const getDeegre = (data, history) => {
        if (!history) {
            return 0;
        }

        if (history.length < 1) {
            return 0;
        }
        ///AQUI INICIA EL CALCULO DE DISTANCIA DE DOS CORDENADAS GEOGRAFICAS
        var data2 = history[history.length - 1];
        var x1 = data.latitude;
        var y1 = data.longitude;
        var x2 = data2.latitude;
        var y2 = data2.longitude;
        var distancia = getDistanciaMetros(x1, y1, x2, y2);
        if (distancia <= 2) {
            // console.log("distancia menor a 2");
            return data2.deegre;
        }
        return toDegre(x1, y1, x2, y2);
        // var dt1;
        // var dt2;
        // var coutTheta = 0;
        // var cant = 4;
        // var actual = false;
        // for (let i = 0; i < cant; i++) {
        //     if (i == 0) {
        //         dt1 = data;
        //     } else {
        //         dt1 = history[history.length - i];
        //     }
        //     dt2 = history[history.length - (i + 1)];
        //     var dx = dt1.latitude - dt2.latitude;
        //     var dy = dt1.longitude - dt2.longitude;
        //     var theta = Math.atan2(dy, dx); // range(-PI, PI]
        //     coutTheta += theta;
        //     if (!actual) {
        //         actual = theta;
        //     }
        // }
        // // theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        // return (coutTheta + actual) / cant + 1;
    }
    const toDegre = (lat1, lon1, lat2, lon2) => {
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var y = Math.sin(dLon) * Math.cos(lat2);
        var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
        var bearing = Math.atan2(y, x) * 180 / Math.PI;
        if (bearing < 0) {
            bearing = bearing + 360;
        }
        bearing = bearing.toFixed(0);
        // bearing = bearing * Math.PI / 180; // to rad
        return bearing;
    }
    const sendServerAsync = async (state) => {
        await delay(5000);
        var state = store.getState();
        if (!state.backgroundLocationReducer.isOpen) {
            return;
        }
        sendServer(state);
        sendServerAsync(state);
    }
    const sendServer = (state) => {
        try {

            if (!state.backgroundLocationReducer.isOpen) {
                return;
            }
            // if (state.socketClienteReducer) {
            //     if (state.socketClienteReducer.sessiones) {
            //         if (state.socketClienteReducer.sessiones[AppParam.socket.name].isOpen) {
            if (state.usuarioReducer.usuarioLog) {
                if (state.backgroundLocationReducer.history[0]) {
                    var time = state.backgroundLocationReducer.last;
                    var time2 = new Date();
                    // console.log(time);
                    // console.log(time2);
                    if (time2.getTime() - time.getTime() < 500) {
                        //console.log("UBICACION NO ENVIADA ESPERAR ");
                        return;
                    }
                    var data = state.backgroundLocationReducer.history[state.backgroundLocationReducer.history.length - 1];
                    var locationToServer = {
                        component: "backgroundLocation",
                        type: "registro",
                        key_usuario: state.usuarioReducer.usuarioLog.key,
                        data: data
                    };
                    // state.socketClienteReducer.sessiones[AppParam.socket.name].send(locationToServer);
                    HttpConection.send(locationToServer, false);
                    console.log("UBICACION ENVIADA AL SERVIDOR: ", locationToServer.data, new Date(locationToServer.data.time));
                }

                //antes de enviar hay q comprovar la distancia entre el utlimo punto enviado
                // state.socketClienteReducer.sessiones[AppParam.socket.name].send(locationToServer);
            }

            //         }
            //     }
            // }
        } catch (e) {
            console.log("ERROR BLocation", e);
        }

    }
    const open = () => {
        console.log(objSend);
        // if (conectado) {
        //     console.log("Ya esta ensendida");
        //     return;
        // }
        conectado = true;
        NativeModules.BackgroundGeolocation.start(1).then(resp => {
            objSend.type = "open";
            store.dispatch(objSend);
            conectado = true;
            AsyncStorage.setItem(AppParams.storage.isBackgroundLocation, JSON.stringify(objSend));
            // sendServerAsync(store);
            const eventEmitter = new NativeEventEmitter(NativeModules.BackgroundGeolocation);
            var lastTime = 0;
            var eventListener = eventEmitter.addListener('onLocationChange', (event) => {
                if (!event.data.latitude) {
                    event.data = JSON.parse(event.data);
                }

                if (lastTime >= event.data.time) {
                    return;
                }
                if (event.data.accuracy > 20) {
                    console.log("BAJA PRESICION")
                    return;
                }
                lastTime = event.data.time;
                var state = store.getState();

                event.data.deegre = getDeegre(event.data, state.backgroundLocationReducer.history);
                objSend.data = event.data;
                objSend.type = "onLocationChange";
                objSend.last = new Date();
                // console.log("UBICACION CAMBIO", objSend);
                store.dispatch(objSend);
                sendServer(state);

                //if (!this.props.state.SocketClienteReducer.isOpen) {}
            });
        });
    }
    const close = () => {
        NativeModules.BackgroundGeolocation.stop("Location").then(resp => {
            objSend.type = "close";
            conectado = false;
            store.dispatch(objSend);
            store.getState().backgroundLocationReducer.history = [];
            AsyncStorage.setItem(AppParams.storage.isBackgroundLocation, "");
        })
    }

    var states = store.getState();
    states.backgroundLocationReducer.isOpen = false;
    states.backgroundLocationReducer.estado = "close";
    states.backgroundLocationReducer.open = open;
    states.backgroundLocationReducer.close = close;

    AsyncStorage.getItem(AppParams.storage.isBackgroundLocation).then((value) => {
        if (value) {
            // props.state.backgroundLocationReducer.close();
            open();
        }
    });


}