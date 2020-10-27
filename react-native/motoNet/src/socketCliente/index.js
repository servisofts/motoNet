import TcpSocket from 'react-native-tcp-socket';
import {
    AsyncStorage
} from 'react-native';
const delay = ms => new Promise(res => setTimeout(res, ms));
export const initSocket = (store) => {
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
        var client = TcpSocket.createConnection(cert, () => {
            store.dispatch({
                component: "socketCliente",
                type: "open",
                data: "",
                nombre: cert.nombre,
                send: (obj, isDispatch) => {
                    client.write(JSON.stringify(obj) + "\n");
                    if(isDispatch) store.dispatch(obj);
                }
            });
        
            AsyncStorage.getItem("motonet_usuarioLog").then((value) => {
                if(value.length<=0){
                    return;
                }
                var usr = JSON.parse(value);
                var objSend = { 
                 component: "usuario",
                    type: "identificacion",
                    data: usr,
                    estado: "cargando"
                };
                client.write(JSON.stringify(objSend) + "\n");
            });
        });
        client.on('data', function (data) {
            try {
                var data = JSON.parse(data.toString());
                console.log("Mensaje: ", data);
                store.dispatch({
                    ...data
                });
            } catch (e) {
                console.log("ERROR")
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
    var cerdata = "MIID1DCCArygAwIBAgIEX2pTMDANBgkqhkiG9w0BAQsFADCBqzELMAkGA1UEBhMCQk8xEjAQBgNVBAgMCUF2IEJhbnplcjETMBEGA1UEBwwKU2FudGEgQ3J1ejEXMBUGA1UECgwOU2Vydmlzb2Z0cyBTUkwxEDAOBgNVBAsMB21vdG9uZXQxHzAdBgNVBAMMFm1vdG9uZXQuc2Vydmlzb2Z0cy5jb20xJzAlBgkqhkiG9w0BCQEWGHJpY2t5LnBhei5kLjk3QGdtYWlsLmNvbTAeFw0yMDA5MjIxOTQwMzJaFw0yMDA5MjMxOTQwMzJaMIGrMQswCQYDVQQGEwJCTzESMBAGA1UECAwJQXYgQmFuemVyMRMwEQYDVQQHDApTYW50YSBDcnV6MRcwFQYDVQQKDA5TZXJ2aXNvZnRzIFNSTDEQMA4GA1UECwwHbW90b25ldDEfMB0GA1UEAwwWbW90b25ldC5zZXJ2aXNvZnRzLmNvbTEnMCUGCSqGSIb3DQEJARYYcmlja3kucGF6LmQuOTdAZ21haWwuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkyUYCVpHjamydpSHo/xKes1O4Hdie8ShKFjxcr8v8cXxs/J9cd++MGvmM+RtHr8bkm7OaD0dN4VnQlm8mULEU8X5Yu2JH5emwZo4GZwp3o51IQfQEUYIRqFx+MaYnACL6REQ7OcXCB0l9zWCBolPN/g9t4Er4txnlecGuTM7QnMoVMg9/emvUhY2Yvu16G4oERT+58iToebfWCWEFTngBZ+UoTdzHe5wUNJqD2bxBgNkI8+BJQ7AQg/O0690bYtU5RwbvSebi2MNFhWJOAE29jtp8ZJE4yeDSkdORZRbopIcG1uqRon/+im21LqCNH50ak5aRQmXfVCwLieTbIE25QIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQA6ww1XO5c6S3BOu02ngZ0MRI558dZSDA7/RGg86MqRz911J5smvd1uvs4Xv9VXHdpKd7Ci2Z16fEpmBWTd+frzQjMq0WufzeGIHNWz0H0C+CJmhi39ujgbPjyICQ/cxhDq5IDG2RcLs0t//EABGulnNAGjaKObaEDI80bhWbrp6tUk4U8o2L93Yp2lNdGWimpsHNrJOjZiq/Zg09ZXMstFnjAK5jA4xVobN8EfbV9TRUmF5xh5Sek2C32eY+BeF55TlYt19VNiGSdRIiDq9w26dvy0QlYlsy9eP3UG/XO1gUB2crQyajRRtC32trY5+44zrU02WI1eSIc8+jlHWPf4";
    var pem = cert_begin + cerdata + end_cert;
    open({
        nombre: "motonet",
        port: 10004,
        host: "192.168.0.109",
        tls: true,
        tlsCert: { uri: pem }
    })

   
  
}