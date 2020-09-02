import {
    NativeModules,
    NativeEventEmitter,
    Platform
} from 'react-native';
export const init = (store) => {

    var objSend = {
        component: "location",
        type: "initial",
        data: "",
    };
    const open = () => {
        NativeModules.Geolocation.start(1).then(resp => {

            objSend.type = "open";
            store.dispatch(objSend);

            const eventEmitter = new NativeEventEmitter(NativeModules.Geolocation);
            var eventListener = eventEmitter.addListener('onLocationChange', (event) => {

                if (!event.data.latitude) {
                    event.data = JSON.parse(event.data);
                }


                event.data.deegre = 0;
                var state = store.getState();
                if (state.locationReducer.history) {
                    if (state.locationReducer.history.length > 0) {
                        var data2 = state.locationReducer.history[state.locationReducer.history.length - 1];
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
                                    component: "location",
                                    type: "registro",
                                    key_usuario_servicio: state.usuarioReducer.usuarioLog.usuario_servicio.key,
                                    data: event.data
                                };
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
        NativeModules.Geolocation.stop("Location").then(resp => {
            objSend.type = "close";
            store.dispatch(objSend);
        })
    }

    store.dispatch({
        component: "location",
        type: "init",
        open,
        close,

    });

}