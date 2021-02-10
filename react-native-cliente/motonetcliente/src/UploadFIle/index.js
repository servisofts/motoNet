import { Platform } from 'react-native'
import ConfigJson from './config.json'
var store = false;

export const setStore = (_store) => {
    store = _store;
}
const UploadFile = (props) => {
    // console.log("ENTRO UPLOAD: ", store);
    var photo = {
        type: props.type,
        name: props.name,
        uri: Platform.OS === 'android'
            ? props.data.uri
            : props.data.uri.replace('file://', ''),
    };
    var body = new FormData();
    body.append('data', JSON.stringify(props.obj));
    body.append('file', photo);
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('POST', ConfigJson.url);
    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.onreadystatechange = function () { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE) {
            var objJson = JSON.parse(xhr.responseText);
            store.dispatch(objJson);
            console.log(xhr.responseText)
        }
    }
    xhr.send(body);
    store.dispatch(props.obj);
}
export default UploadFile;