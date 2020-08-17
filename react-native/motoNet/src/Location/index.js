import {
    NativeModules,
    NativeEventEmitter,
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
                
                var state = store.getState();
                if(state.socketClienteReducer){
                    if(state.socketClienteReducer.isOpen){
                        var locationToServer = {
                            component:"location",
                            type:"send",
                            data: event.data
                        };
                        state.socketClienteReducer.send(locationToServer);
                }
            }

                objSend.type = "onLocationChange";
                objSend.data = event.data;
                store.dispatch(objSend);
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
        component:"location",
        type:"init",
        open,
        close,

    });

}