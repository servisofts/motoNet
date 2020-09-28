import {
    NativeModules,
    NativeEventEmitter,
    Platform,
    AsyncStorage
} from 'react-native';
export const init = (store) => {

    var objSend = {
        component: "backgroundLocation",
        type: "initial",
        data: "",
    };

    const getDistanciaMetros = (lat1, lon1, lat2, lon2) => {
        rad = function (x) { return x * Math.PI / 180; }
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
    const open = () => {
        console.log(objSend);
        NativeModules.BackgroundGeolocation.start(1).then(resp => {
            objSend.type = "open";
            store.dispatch(objSend);
            AsyncStorage.setItem("motonet_backgrounLocation", JSON.stringify(objSend));
            const eventEmitter = new NativeEventEmitter(NativeModules.BackgroundGeolocation);
            var eventListener = eventEmitter.addListener('onLocationChange', (event) => {
                if (!event.data.latitude) {
                    event.data = JSON.parse(event.data);
                }
                event.data.deegre = 0;
                var state = store.getState();
                if (state.backgroundLocationReducer.history) {
                    if (state.backgroundLocationReducer.history.length > 0) {

                        var data2 = state.backgroundLocationReducer.history[state.backgroundLocationReducer.history.length - 1];
                        ///AQUI INICIA EL CALCULO DE DEEGRE 

                        var dx = event.data.latitude - data2.latitude;
                        var dy = event.data.longitude - data2.longitude;
                        var theta = Math.atan2(dy, dx); // range (-PI, PI]
                        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
                        event.data.deegre = theta;

                        ///AQUI INICIA EL CALCULO DE DISTANCIA DE DOS CORDENADAS GEOGRAFICAS
                        var data2 = state.backgroundLocationReducer.history[state.backgroundLocationReducer.history.length - 1];
                        var x1 = event.data.latitude;
                        var y1 = event.data.longitude;
                        var x2 = data2.latitude;
                        var y2 = data2.longitude;
                        var distancia = getDistanciaMetros(x1, y1, x2, y2);
                        console.log(distancia);

                        if (distancia < 5) {
                            console.log("distancia menor a 5");
                            return;
                        }
                    }
                }
                objSend.data = event.data;
                objSend.type = "onLocationChange";

                console.log(objSend);
                store.dispatch(objSend);
                if (state.socketClienteReducer) {
                    if (state.socketClienteReducer.sessiones) {
                        if (state.socketClienteReducer.sessiones["motonet"].isOpen) {
                            if (state.usuarioReducer.usuarioLog) {
                                var locationToServer = {
                                    component: "backgroundLocation",
                                    type: "registro",
                                    key_usuario: state.usuarioReducer.usuarioLog.key,
                                    data: event.data
                                };
                                console.log(locationToServer);

                                //antes de enviar hay q comprovar la distancia entre el utlimo punto enviado
                                state.socketClienteReducer.sessiones["motonet"].send(locationToServer);
                            }

                        }
                    }
                }




                //if (!this.props.state.SocketClienteReducer.isOpen) {}
            });
        });
    }
    const close = () => {
        NativeModules.BackgroundGeolocation.stop("Location").then(resp => {
            objSend.type = "close";
            store.dispatch(objSend);
            AsyncStorage.setItem("motonet_backgrounLocation", "");
        })
    }

    store.dispatch({
        component: "backgroundLocation",
        type: "init",
        open,
        close,
    });


}