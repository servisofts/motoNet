import TcpSocket from 'react-native-tcp-socket';
import {
    AsyncStorage
} from 'react-native';
import AppParam from '../Json/index.json';
import * as Notificacion from '../Notificaciones'
const delay = ms => new Promise(res => setTimeout(res, ms));
export const initSocket = (store) => {
    var client = false;
    const open = (cert) => {
        if (state = store.getState()) {
            if (state.socketClienteReducer.sessiones[cert.nombre]) {
                console.log("Reintentando");
                if (state.socketClienteReducer.sessiones[cert.nombre].isOpen) {
                    console.log("ya hay un socket abierto");
                    return;
                }
            }

        }
        client = TcpSocket.createConnection(cert, () => {
            store.dispatch({
                component: "socketCliente",
                type: "open",
                data: "",
                nombre: cert.nombre,
                send: (obj, isDispatch) => {
                    client.write(JSON.stringify(obj) + "\n");
                    if (isDispatch) store.dispatch(obj);
                }
            });
            // AsyncStorage.setItem("FIREBASE_TOKEN",JSON.stringify(token));

            AsyncStorage.getItem(AppParam.storage.usuarioLog).then((value) => {
                if (!value) {
                    return;
                }
                if (value.length <= 0) {
                    return;
                }
                AsyncStorage.getItem(AppParam.storage.fbtoken).then((valueToken) => {
                    var token = "void";
                    if (valueToken.length > 0) {
                        var objToken = JSON.parse(valueToken);
                        token = objToken.token;
                    }
                    var usr = JSON.parse(value);
                    var objSend = {
                        component: "usuario",
                        type: "identificacion",
                        data: usr,
                        token: token,
                        fbapp: "ambulancia_android",
                        estado: "cargando"
                    };
                    client.write(JSON.stringify(objSend) + "\n");
                });

            });
        });
        var dataTemporal = "";
        client.on('data', function (data) {
            try {
                var decoderdata = data.toString();
                var re = /---SSofts---/;
                var isFinal = re.test(decoderdata);
                if (isFinal) {
                    console.log("ES FINAL")
                    decoderdata = decoderdata.replace(re, "");
                    dataTemporal = dataTemporal + decoderdata;
                    var datajson = JSON.parse(dataTemporal);
                    if (datajson.type == "exito") {
                        // console.log(dataTemporal);
                    }
                    console.log("Mensaje: ", datajson);
                    dataTemporal = "";
                    store.dispatch({
                        ...datajson
                    });
                    Notificacion.notificar(datajson)
                } else {
                    console.log("NO ES FINAL")
                    dataTemporal = dataTemporal + decoderdata;
                }
            } catch (e) {
                console.log("ERROR", e)
            }
        });
        client.on('error', function (error) {

            store.dispatch({
                component: "socketCliente",
                type: "error",
                nombre: cert.nombre,
                error: error
            })
        });
        client.on('close', function () {
            console.log("SOCKET CLOSE")
            const delay = ms => new Promise(res => setTimeout(res, ms));
            const yourFunction = async () => {
                await delay(5000);
                //onsole.log("Waited 5s");
                open(cert);
            };
            yourFunction();
            store.dispatch({
                component: "socketCliente",
                type: "close",
                nombre: cert.nombre,
                error: "Se perdio la coneccion."
            })
        });
        store.dispatch({
            component: "socketCliente",
            type: "conectando",
            data: cert,
            socket: client

        });
    }
    store.dispatch({
        component: "socketCliente",
        type: "initSocket",
        open: open

    });

    var cert_begin = "-----BEGIN CERTIFICATE-----\n";
    var end_cert = "\n-----END CERTIFICATE-----";
    var cerdata = "MIID4DCCAsigAwIBAgIEX5nb4jANBgkqhkiG9w0BAQsFADCBsTELMAkGA1UEBhMCQk8xEjAQBgNVBAgMCUF2IEJhbnplcjETMBEGA1UEBwwKU2FudGEgQ3J1ejEXMBUGA1UECgwOU2Vydmlzb2Z0cyBTUkwxEzARBgNVBAsMCmNsaW5pY2FfbmoxIjAgBgNVBAMMGWNsaW5pY2Ffbmouc2Vydmlzb2Z0cy5jb20xJzAlBgkqhkiG9w0BCQEWGHJpY2t5LnBhei5kLjk3QGdtYWlsLmNvbTAeFw0yMDEwMjgyMTAwMThaFw0yMDEwMjkyMTAwMThaMIGxMQswCQYDVQQGEwJCTzESMBAGA1UECAwJQXYgQmFuemVyMRMwEQYDVQQHDApTYW50YSBDcnV6MRcwFQYDVQQKDA5TZXJ2aXNvZnRzIFNSTDETMBEGA1UECwwKY2xpbmljYV9uajEiMCAGA1UEAwwZY2xpbmljYV9uai5zZXJ2aXNvZnRzLmNvbTEnMCUGCSqGSIb3DQEJARYYcmlja3kucGF6LmQuOTdAZ21haWwuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5JCLso3hDmCGUfvapcN+NA3awTGPkikObidf3LB+5DEfVAI6RP+0SObL+u6kxsmJeAK79BMDNiATVn3KnzKIA4PRQvGU9nF4ujQc/+krP3NT2osljG8bUJxEvzUTLfjUTX7madhnCwOI6z8lLPo7Iw5QMKsLLP5IZIoVBq+COonsblqEursA++3M4U0ERHKAW8n8f4NX/kbnv+zz6sr8otYSqOrUM4iYb3ZQYZhEo+ygnX4zXcnDTF/KmhMuhKAI/BPy7HETsQmsaxNVEDq1fvstKlAiH/W03HGR60B+AtFqiJI1T14JujLeE7Op21XuyaLKoNzHPaNllTpZ27TgHwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQAvlk4oYfqjC7Y5eOeXPPmsDrCugr9K7X5oYA7lLSbtz3sktEcMlsIJo61MvhbvLd1ep4CUFVz7mlhr0ouu1iT8LcPXps1yMKL7tLKI4t8b6ApfcnWzu1UFhTfBEz5VEcqrHA2L3oocTHZ8JA4Amp68uMbBsHmLdFW8Xu1uQAWWiFL/MXFZh3iu6GswqbFrXJrPQ3KN6q/bk/vuSpx826deTMYDP2eeJKhWfYpS0VsyRazvfeJHVkEKGNZufMcG5t8nqZ8wsb1iaISjkxd83v+RXPY6SfM6CcLyphng1NGLsqTE3rgmyc+9V6qPkzKTBGAsjcdX61IqnMa3RiC1iitL";
    var pem = cert_begin + cerdata + end_cert;
    open({
        nombre: "clinica_nj",
        port: 10006,
        host: "204.93.216.182",
        _host: "192.168.0.3",
        tls: true,
        tlsCert: { uri: pem }
    })



}