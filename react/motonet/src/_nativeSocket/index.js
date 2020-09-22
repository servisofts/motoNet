
import myProps from './myProps.json'

const delay = ms => new Promise(res => setTimeout(res, ms));

const SocketComp = (store) => {
    var usuario, url;
    var reintent = 0;
    const Reconnect = async () => {
        await delay(3000);
        reintent++;
        if (reintent > 3) {
            store.dispatch({
                component: 'socket',
                type: 'close',
                estado: 'Reconectando',
                reconect: true,
                mensaje: 'conexion Perdida',
                reintent: reintent,
                socket: false,
            });
        }
        openSocket(url);
        if (store.getState().socketReducer.estado !== "conectado") {
            // Reconnect();
         
        }
        return;
    }
    var openSocket = (url) => {
        var socket = new WebSocket(url);
        socket.onopen = () => {
            console.log('open')
            store.dispatch({
                component: 'socket',
                type: 'open',
                reconect: false,
                estado: 'conectado',
                mensaje: 'conectado con exito',
                reintent: 0,
                socket: socket,
                send:(obj)=>{
                    socket.send(JSON.stringify(obj)+"\n");
                    store.dispatch(obj);
                }
            });
            reintent = 0;
        }
        socket.onclose = () => {
            console.log('close')

                Reconnect();
                
            store.dispatch({
                component: 'socket',
                type: 'close',
                estado: 'desconectado close',
                mensaje: 'conexion Perdida',
                socket: false,
                send:(obj)=>{
                    console.log("Sin conexion, no se puede enviar el mensaje");
                }
            });
        }
        socket.onerror = (event) => {
            console.log(event.data)

            store.dispatch({
                component: 'socket',
                type: 'error',
                estado: 'Error',
                mensaje: 'conexion erronea o Perdida',
                socket: false,
            });
        }
        socket.addEventListener('message', function (event) {

            console.log("MENSAJE SOCKET")

            try {
                var data = JSON.parse(event.data);
                console.log(data.component + " " + data.type)
                console.log(data)
                store.dispatch({
                    ...data
                });
            } catch (e) {
                console.log("ERROR")
            }

        });
    }
    url = myProps.socket.url + myProps.socket.key;
    openSocket(url);

    // Storage.getItem("usuario", (data) => {
    //     usuario = data;
    //     if (usuario) {
    //         usuario = JSON.parse(usuario);
    //         if (usuario.key) {
    //             myProps.socket.key = usuario.key;
    //         }
    //     }

    // });

}
export default SocketComp;
