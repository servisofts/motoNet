import {
    NativeModules,
    AsyncStorage,
    AppRegistry,
    Platform,
    NativeEventEmitter
} from 'react-native';

import * as HttpConection from '../../HttpConection'
import SThread from '../../SThread';

class BackgroundService {
    run;
    store;
    // eventEmitter;
    location;
    prevLocation;
    Listener;
    
    constructor() {
        this.log("SSBackgroundLocation constructor");
        this.run = false;
        this.location = { latitude: 0, longitude: 0, time: 0 };
        this.prevLocation = { latitude: 0, longitude: 0, time: 0 };

        this.Listener = async (evt) => {
            _inst.onLocationChange(_inst, evt);
        }
        if (Platform.OS == "android") {
            AppRegistry.registerHeadlessTask('SSBackgroundLocation', () => this.Listener);
        } else if (Platform.OS == "ios") {
            this.eventEmitter = new NativeEventEmitter(NativeModules.SSBackgroundLocation);
        }

        var _inst = this;
        AsyncStorage.getItem('backgroundLocationStorage', (error, result) => {
            if (result) {
                _inst.run = true;
                _inst.stop();
                _inst.start();
            }

        });


    }
    start() {
        console.log("Start BACKGROUND LOCATION")
        var _inst = this;
        this.run = true;
        if (Platform.OS == "ios") {
            _inst.eventEmitter.addListener('onLocationChange', this.Listener);

        }
        NativeModules.SSBackgroundLocation.start(1).then(resp => {
            if (_inst.location.latitude != 0) {
                _inst.sendServer();
            }
            _inst.log("start");
            this.lastSend = 0;
            AsyncStorage.setItem('backgroundLocationStorage', JSON.stringify({
                isOpen: true,
            }));
            _inst.store.dispatch({
                component: "backgroundLocation",
                type: "open",
                estado: "cargando"
            })
        });
    }
    stop() {
        console.log("STOP BACKGROUND LOCATION")
        var _inst = this;
        this.run = false;
        if (Platform.OS == "ios") {
            _inst.eventEmitter.removeListener('onLocationChange', this.Listener);
        }
        NativeModules.SSBackgroundLocation.stop("Location").then(resp => {
            _inst.log("stop");
            AsyncStorage.removeItem('backgroundLocationStorage');
            _inst.store.dispatch({
                component: "backgroundLocation",
                type: "close",
                estado: "cargando"
            })
        })
        var state = this.store.getState();
        if (!state.usuarioReducer.usuarioLog) {
            this.log("ERROR SEND SERVER::: no se encontro usuario" + JSON.stringify(state.usuarioReducer))
        } else {
            HttpConection.send({
                component: "backgroundLocation",
                type: "stop",
                key_usuario: state.usuarioReducer.usuarioLog.key,
                id: "httpSession",
            }, false);
        }
    }
    onLocationChange(_inst, event) {
        if (!this.isRun()) {
            return;
        }
        if (!event.data.latitude) {
            event.data = JSON.parse(event.data);
        }
        if (_inst.location.time == event.data.time) {
            return;
        }
        _inst.prevLocation = { ..._inst.location };
        _inst.location = event.data;

        event.data.deegre = this.toDegre(_inst.location.latitude, _inst.location.longitude, _inst.prevLocation.latitude, _inst.prevLocation.longitude);
        console.log("Deegres " + event.data.deegre)
        _inst.sendServer();
    }

    getDistanciaMetros = (lat1, lon1, lat2, lon2) => {
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
    toDegre = (lat1, lon1, lat2, lon2) => {
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
    startHiloReSend = async () => {
        new SThread(5000, "HiloSendServerLocation", true).start(() => {
            if (!this.isRun()) {
                return;
            }
            if (new Date().getTime() - this.lastSend > 3000) {
                if (this.hiloLocation) {
                    if (this.getDistanciaMetros(this.hiloLocation.latitude, this.hiloLocation.longitude, this.location.latitude, this.location.longitude) <= 1) {
                        return;
                    }
                }
                this.hiloLocation = this.location;
                this.sendServer();
            }
        })
    }
    sendServer() {
        this.log("send Server:::" + JSON.stringify(this.location))
        if (this.store) {
            var state = this.store.getState();
            if (!state.usuarioReducer.usuarioLog) {
                this.log("ERROR SEND SERVER::: no se encontro usuario" + JSON.stringify(state.usuarioReducer))
            } else {

                // if(this.location.accuracy>50){
                // this.log(" BAJA PRECICION")
                // }
                this.store.dispatch({
                    component: "backgroundLocation",
                    type: "onLocationChange",
                    data: this.location,
                    estado: "cargando",
                    last: new Date()
                })

                var locationToServer = {
                    component: "backgroundLocation",
                    type: "registro",
                    key_usuario: state.usuarioReducer.usuarioLog.key,
                    data: this.location,
                    id: "httpSession",
                };
                if (new Date().getTime() - this.lastSend > 750) {
                    this.lastSend = new Date().getTime();
                    this.startHiloReSend();
                    HttpConection.send(locationToServer, false);
                }

                // this.log("SEND SERVER::: EXISTE USUARIO")
            }
        } else {
            this.log("ERROR SEND SERVER::: no store")

        }
    }
    setStore(_store) {
        this.store = _store;
    }
    isRun() {
        return this.run;
    }
    log(str) {
        // console.log("SSBackgroundLocation:::  " + str);
    }
}
export default BackgroundService;