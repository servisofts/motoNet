import PushNotification from "react-native-push-notification";
export const notificar = (action) => {
    switch (action.component) {
        case "usuario":
            switch (action.type) {
                case "confirmarDatos":
                    confirmarDato(action);
                    break;
            }
            break;
        case "mensaje":
            mensaje(action)
            break;
        case "viaje":
            // viaje(action)
            break;
    }
}
const confirmarDato = (action) => {
    PushNotification.localNotification({
        title: "Ambulancia", // (optional)
        message: "sus datos fueron verificado", // (required)
    });
}


const mensaje = (action) => {
    switch (action.type) {
        case "enviar":
            PushNotification.localNotification({
                title: "Nuevo Mensaje", // (optional)
                message: "mensaje", // (required)
                channelId: "notificaciones-clinica",
                allowWhileIdle: true,
            });
            break;
    }
}

const validarNotificacion = (action) => {
    var mensaje
    switch (action) {
        case "inicio_viaje_conductor":
            mensaje= "Inició viaje conductor";
        break;
        case "conductor_cerca":
            mensaje= "Conductor cerca";
         break;
        case "conductor_llego":
            mensaje= "Conductor llegó";
        break;
        // default:
        //     console.log("PRUEBAA  " + JSON.stringify(action))
    }
    console.log(" PPPPP "+mensaje)
    return mensaje
}
const viaje = (action) => {
    
    if (action.data.movimientos) {
        //console.log("AQUIIIII " + JSON.stringify(action.data.movimientos))
        PushNotification.localNotification({
            title: "Viaje", // (optional)
            //message: "Movimiento en el viaje", // (required)

            message: validarNotificacion(action.data.movimientos), // (required)
            channelId: "notificaciones-clinica",
            allowWhileIdle: true,

        });
    }
}
