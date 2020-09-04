import TcpSocket from 'react-native-tcp-socket';

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
                send: (obj) => {
                    client.write(JSON.stringify(obj) + "\n");
                }
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
    var cerdata = "MIID1DCCArygAwIBAgIEX06s1TANBgkqhkiG9w0BAQsFADCBqzELMAkGA1UEBhMCQk8xEjAQBgNVBAgMCUF2IEJhbnplcjETMBEGA1UEBwwKU2FudGEgQ3J1ejEXMBUGA1UECgwOU2Vydmlzb2Z0cyBTUkwxEDAOBgNVBAsMB21vdG9uZXQxHzAdBgNVBAMMFm1vdG9uZXQuc2Vydmlzb2Z0cy5jb20xJzAlBgkqhkiG9w0BCQEWGHJpY2t5LnBhei5kLjk3QGdtYWlsLmNvbTAeFw0yMDA5MDEyMDE5MzNaFw0yMDA5MDIyMDE5MzNaMIGrMQswCQYDVQQGEwJCTzESMBAGA1UECAwJQXYgQmFuemVyMRMwEQYDVQQHDApTYW50YSBDcnV6MRcwFQYDVQQKDA5TZXJ2aXNvZnRzIFNSTDEQMA4GA1UECwwHbW90b25ldDEfMB0GA1UEAwwWbW90b25ldC5zZXJ2aXNvZnRzLmNvbTEnMCUGCSqGSIb3DQEJARYYcmlja3kucGF6LmQuOTdAZ21haWwuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr09JMFteLhIm6gEsJvGrC8wvvQas/06NDI+I3HT7lXkxDdHLNBFLJt7nwjvOckPPx0pEbLDP0iDLWLA7UZA5AWMwWZHMcetmn+UMKVsuMK+4ZZL4P3oyu0dp0VMuWrdoqWk5ap1CaJ1tkqJO3GdL/ytQAVT3bNo2POQYS2+z9I7mDu1ZvQH/wCflSsoP703N03zNDXPeKJeH8TR26HdmkPF7r1G+ZC+p3JugFsJw45DqCPuBYSTaVAygtxgOVGOIsCu1EosoNJwx2W97jDjQkeHWG1qfLek28ssn8aa5LeHUjqLrdhIeC7GadeXYXhzXzi8FeJyqj70njOid/FkErQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQB6Q63XZQcz3IEgEOJEbyc1e1Ah4gaiOHNRJSh4KtpCdVIjmDneBvUAuGlecc9oW6Q58yMZwBqrNAd19g9jymUTF5x/zWdMUWLOQLZjbs+SL5fhBXn0539FV6ESdBKN6r6uokyTRhK2fMoLnqm2QQdxcfHF5UxQadOB3hdQmntC9zYHka6UHrmALupBv1WS5WTMtDKapoylSqPZQx2Hvr39PtztUSYimoDLAhAiAePQzs0S0M8PepOPr7K0tot8gm23Rvaf3YvuLZwmiUmmSzuqSgLStxFUthV1v9R/R0uJLZsoqZOg6amaeH9W37IhFFvhzGikdaGjNi9hd/tsc6D1";
    var pem = cert_begin + cerdata + end_cert;
    open({
        nombre: "motonet",
        port: 10004,
        host: "192.168.0.3",
        tls: true,
        tlsCert: { uri: pem }
    })
}