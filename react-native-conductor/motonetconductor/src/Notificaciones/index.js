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
        case "viaje":
            viaje(action)
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
        channelId: "notificaciones-motonet",
        allowWhileIdle: true,
    });
}

const viaje = (action) => {
    switch (action.type) {
        case "viajeEntrante":
            PushNotification.localNotification({
                title: "Motonet", // (optional)
                message: "Nuevo viaje",
                channelId: "notificaciones-motonet",
                allowWhileIdle: true,
            });
            break;
    }

}

const firebase = (action) => {
    PushNotification.localNotification({
        title: "FIREBASE NOTI", // (optional)
        message: JSON.stringify(action), // (required)
        channelId: "notificaciones-motonet",
        allowWhileIdle: true,
    });
}