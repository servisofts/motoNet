
var store = false;
var isDebug = true;
import Config from './config.json';
export const init = (_store) => {
    store = _store;
}

export const send = (dataSend, isDispatch) => {
    var body = new FormData();
    body.append('data', JSON.stringify(dataSend));
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('POST', Config.url);
    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.onreadystatechange = function () { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE) {
            var objJson = JSON.parse(xhr.responseText);
            if (store && isDispatch) {
                if (isDebug) console.log("HTTPCONECTION = Store no iniciado");
                store.dispatch(objJson);
            }
            console.log(xhr.responseText)

        }
    }
    xhr.send(body);
    if (store && isDispatch) {
        if (isDebug) console.log("HTTPCONECTION = Store no iniciado");
        store.dispatch(objJson);
    }
    // store.dispatch(props.obj);

}

export default class HttpConection {
    static sendJson(data) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', "https://motonet.servisofts.com/servicios/geolocation");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "*/*");
        xhr.onreadystatechange = function () { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE) {
                try {
                    var objJson = JSON.parse(xhr.responseText);
                    if (store) {
                        store.dispatch(objJson);
                    }
                } catch (e) {
                    console.log(e);
                    console.log(xhr.responseText);
                }

            }
        }
        xhr.send(JSON.stringify(data));
        if (store) {
            store.dispatch(data);
        }
    }
}