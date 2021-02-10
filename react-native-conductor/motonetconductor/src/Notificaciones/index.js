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
        case "emergencia":
            emergencia(action)
            break;
        case "firebase":
            firebase(action)
            break;
    }

}

const confirmarDato = (action) => {
    PushNotification.localNotification({
        title: "Ambulancia", // (optional)
        message: "sus datos fueron verificado", // (required)
        channelId:"notificaciones-clinica",
        allowWhileIdle:true,
    });
}

const emergencia = (action) => {
    switch (action.type) {
        case "viajeEntrante":
            PushNotification.localNotification({
                title: "Ambulacia", // (optional)
                message: "tiene una emergencia....",
                channelId:"notificaciones-clinica",
                allowWhileIdle:true,
            });
            break;
        case "ambulanciaCerca":
            PushNotification.localNotification({
                title: "Ambulacia", // (optional)
                message: "Ya estas llegando a tu destino.",
                channelId:"notificaciones-clinica",
                allowWhileIdle:true,
            });
            break;
    }

}

const firebase = (action) => {
    PushNotification.localNotification({
        title: "FIREBASE NOTI", // (optional)
        message: JSON.stringify(action), // (required)
        channelId:"notificaciones-clinica",
        allowWhileIdle:true,
    });
}