import TcpSocket from 'react-native-tcp-socket';



export const initSocket = (store, myProps) => {
var client = false;

    const open = (cert) => {

         client = TcpSocket.createConnection(myProps, () => {
            store.dispatch({
                component: "socketCliente",
                type: "open",
                data: "",
                send: (obj) => {
                   
                    client.write(JSON.stringify(obj) + "\n");

                }
            });

        });



        client.on('data', function (data) {
            try {
                store.dispatch({
                    component:"socketCliente",
                    type:"mensaje",
                    data:data.toString()
                })
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
                component:"socketCliente",
                type:"error",
                error:error
            })
        });


        client.on('close', function () {
            console.log("SOCKET CLOSE")
            store.dispatch({
                component:"socketCliente",
                type:"close",
                error:"Se perdio la coneccion."
            })
        });
        

    }
   

    store.dispatch({
        component: "socketCliente",
        type: "initSocket",
        open: open,
        close:()=>{
            client.end();
        }
    });


    open("")

}