import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import * as Notificacion from '../Notificaciones'
import AppParam from '../Json/index.json';
import { AsyncStorage } from "react-native";
const SSPushNotification = (props) => {

    PushNotification.configure({
        onRegister: function (token) {
            console.log("TOKEN:", token);
            AsyncStorage.setItem(AppParam.storage.fbtoken, JSON.stringify(token));
        },
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);
            if (notification.data.body) {
                if (typeof notification.data.body == "object") {
                    Notificacion.notificar(notification.data.body);
                } else {
                    Notificacion.notificar(JSON.parse(notification.data.body));
                }
            }
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        onAction: function (notification) {
            // console.log("ACTION:", notification.acxtion);
            // console.log("NOTIFICATION:", notification);
        },
        onRegistrationError: function (err) {
            console.error(err.message, err);
        },
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
    });
    PushNotification.createChannel(
        {
            channelId: "notificaciones-ambulancia", // (required)
            channelName: "notificaciones-chanel", // (required)
            // channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`)
    );
    return true;
}
export default SSPushNotification;