// Import the functions you need from the SDKs you need
//import messaging from '@react-native-firebase/messaging';
//
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { Notifications } from 'react-native-notifications';
import DeviceKey from './DeviceKey';

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
};


class Firebase {

    static async init() {
        try {

            await sleep(500);
            // await messaging().hasPermission();
            var authorizationStatus = await messaging().requestPermission({
                sound: true,
                announcement: true,
                providesAppNotificationSettings: true
            });
            if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
                console.log('User has notification permissions enabled.');
            } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
                console.log('User has provisional notification permissions.');
            } else {
                console.log('User has notification permissions disabled');
            }
            // await messaging().setAutoInitEnabled(true);
            messaging().getToken().then(fcmToken => {
                if (fcmToken) {
                    DeviceKey.setKey(fcmToken);
                }
            }).catch(err => {
                console.log(err.message);
            });
            messaging().setBackgroundMessageHandler(async remoteMessage => {
                console.log('Message handled in the background!', remoteMessage);
            });
            const unsubscribe = messaging().onMessage(async remoteMessage => {
                console.log('Message received. ', remoteMessage);
                Notifications.postLocalNotification({
                    title: remoteMessage.notification.title,
                    body: remoteMessage.notification.body,
                });
                // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
            });
        } catch (e) {
            console.log(e)
        }

    }
}
export default Firebase;