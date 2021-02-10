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
        case "farmacia":
            farmacia(action)
            break;
        case "firebase":
            firebase(action)
            break;
        case "analisis":
            analisis(action)
            break;
        case "consulta":
            consulta(action)
            break;
        case "laboratorio":
            laboratorio(action)
            break;
        case "ordenSeguro":
            ordenSeguro(action)
            break;
    }
}
const confirmarDato = (action) => {
    PushNotification.localNotification({
        title: "Ambulancia", // (optional)
        message: "sus datos fueron verificado", // (required)
    });
}

const emergencia = (action) => {
    switch (action.type) {
        case "viajeEntrante":
            PushNotification.localNotification({
                title: "Ambulacia", // (optional)
                message: "tiene una emergencia....", // (required)
                channelId: "notificaciones-clinica",
                allowWhileIdle: true,
            });
            break;
        case "ambulanciaCerca":
            PushNotification.localNotification({
                title: "Ambulacia", // (optional)
                message: "Su ambulancia está llegando..", // (required)
                channelId: "notificaciones-clinica",
                allowWhileIdle: true,
            });
            break;
    }
}
const farmacia = (action) => {
    switch (action.type) {
        case "cotizar":
            PushNotification.localNotification({
                title: "Receta cotizada", // (optional)
                message: "Se a cotizado su receta por " + action.data.cotizacion + " Bs.", // (required)
                channelId: "notificaciones-clinica",
                allowWhileIdle: true,
            });
            break;
    }

}

const firebase = (action) => {
    console.log("ENTRO NOTIFICAR");
    PushNotification.localNotification({
        title: "FIREBASE NOTI", // (optional)
        message: JSON.stringify(action), // (required), // (required)
        channelId: "notificaciones-clinica",
        allowWhileIdle: true,
    });
}

const analisis = (action) => {
    switch (action.type) {
        case "cotizar":
            PushNotification.localNotification({
                title: "Imagenología", // (optional)
                message: "Se cotizo su analisis", // (required)
                channelId: "notificaciones-clinica",
                allowWhileIdle: true,
            });
            break;
    }
}

const consulta = (action) => {
    switch (action.type) {
        case "confirmarConsulta":
            PushNotification.localNotification({
                title: "Consulta", // (optional)
                message: "Se a confirmado su consulta.", // (required)
                channelId: "notificaciones-clinica",
                allowWhileIdle: true,
            });
            break;
        case "cancelarConsulta":
            PushNotification.localNotification({
                title: "Consulta", // (optional)
                message: "Se a denegado su consulta.", // (required)
                channelId: "notificaciones-clinica",
                allowWhileIdle: true,
            });
            break;
    }
}

const ordenSeguro = (action) => {
    switch (action.type) {
        case "accion":
            PushNotification.localNotification({
                title: "Orden seguro", // (optional)
                message: "Se a verificado su orden", // (required)
                channelId: "notificaciones-clinica",
                allowWhileIdle: true,
            });
            break;
    }
}

const laboratorio = (action) => {
    switch (action.type) {
        case "cotizar":
            PushNotification.localNotification({
                title: "Laboratorio", // (optional)
                message: "Se a cotizado su laboratorio por " + action.data.cotizacion + " Bs.", // (required)
                channelId: "notificaciones-clinica",
                allowWhileIdle: true,
            });
            break;
    }
}