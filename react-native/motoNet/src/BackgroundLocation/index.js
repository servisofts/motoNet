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
    const open = () => {
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
                        console.log(data2);
                        var dx = event.data.latitude - data2.latitude;
                        var dy = event.data.longitude - data2.longitude;
                        var theta = Math.atan2(dy, dx); // range (-PI, PI]
                        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
                        event.data.deegre = theta;
                    }
                }
                objSend.data = event.data;
                objSend.type = "onLocationChange";
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