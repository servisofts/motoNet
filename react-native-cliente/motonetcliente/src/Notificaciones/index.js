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
const viaje = (action) => {
    PushNotification.localNotification({
        title: "Viaje", // (optional)
        message: "Movimiento en el viaje", // (required)
        channelId: "notificaciones-clinica",
        allowWhileIdle: true,
    });
}
