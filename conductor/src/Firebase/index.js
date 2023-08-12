import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import DeviceKey from "./DeviceKey";

class Firebase {
    static async init() {
        try {

            const firebaseConfig = {
                apiKey: "AIzaSyAcR4QG15DCTi5072tSPn81gFFAEPxVv4o",
                authDomain: "tapeke-20bb6.firebaseapp.com",
                projectId: "tapeke-20bb6",
                storageBucket: "tapeke-20bb6.appspot.com",
                messagingSenderId: "885912798330",
                appId: "1:885912798330:web:8bcb6421866ad74960e7c3",
                measurementId: "G-6NWFJYB3Z8"
            };
            const app = initializeApp(firebaseConfig);
            const messaging = getMessaging(app);
            getToken(messaging, { vapidKey: "BLZr3ZbjWPqLCC0XjPK902zA90nMpocN0sI1Sh2b9kmZHuAe0MVAH58Zaqm8eWkkgVftWAy_aqW7q3Lutj6PlcE" }).then((currentToken) => {
                if (currentToken) {
                    console.log('Token: ', currentToken);
                    DeviceKey.setKey(currentToken);
                    // Send the token to your server and update the UI if necessary
                    // ...
                    onMessage(messaging, (payload) => {
                        console.log('Message received. ', payload);
                        Notification.requestPermission().then(function (result) {
                            var notification = new Notification( payload.notification.title,{body: payload.notification.body});
                        });
                        
                        // ...
                    });
                } else {
                    // Show permission request UI
                    console.log('No registration token available. Request permission to generate one.');
                    // ...
                }
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
                // ...
            });
        } catch (err) {
            console.log("error", err);
        }

    }
}
export default Firebase;