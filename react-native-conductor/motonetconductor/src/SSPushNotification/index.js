import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import * as Notificacion from '../Notificaciones'
import AppParam from '../Json/index.json';
import { AsyncStorage } from "react-native";
const SSPushNotification = (props) => {
    PushNotification.createChannel(
        {
            channelId: "notificaciones-motonet", // (required)
            channelName: "notificaciones-chanel", // (required)
            // channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`)
    );
    PushNotification.configure({
        onRegister: function (token) {
            console.log("TOKEN: " + JSON.stringify(token));
            AsyncStorage.setItem(AppParam.storage.fbtoken, JSON.stringify(token));
        },
        onNotification: function (notification) {
            console.log("NOTIFICATION:" + JSON.stringify(notification));
            if (notification.data.body) {
                if (typeof notification.data.body == "string") {
                    notification.data.body = JSON.parse(notification.data.body);
                    //NOTIICAR REDUCER 
                }

                props.dispatch(notification.data.body);
                alert(notification.data.body);
                Notificacion.notificar(notification.data.body);
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
    return true;
}
export default SSPushNotification;