import TcpSocket from 'react-native-tcp-socket';

import * as RNFS from 'react-native-fs';


export const initSocket = (store, myProps) => {

    var Console = {
        component: "console",
        type: "mensaje",
        data: ""
    };

    
     const open =(cert)=>{
        cert = RNFS.readFIleSync(cert+"/service.pem");
      const client = TcpSocket.createConnection({
            port: 10001,
            host: "192.168.0.110",
            tls: true,
            //   tlsCheckValidity: true, // Disable validity checking
            tlsCert:cert // Self-signed certificate
        }, () => {
            store.dispatch({
                component: "console",
                type: "open",
                data: "",
                client: (obj) => {
                    store.dispatch(obj);
                    client.write(JSON.stringify(obj) + "\n");
    
                }
            });
    
        });
    
        client.on('data', function (data) {
            //CONSOLE REDUCEDR
            Console.data = data.toString();
            store.dispatch(Console)
            //
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
            Console.data = error;
            store.dispatch(Console)
        });
    
    
        client.on('close', function () {
            Console.data = "ConnectionClose";
            store.dispatch(Console)
        });
    
    
     }


     store.dispatch({
        component: "console",
        type: "socketClient",
        socketClient:open
    });

}