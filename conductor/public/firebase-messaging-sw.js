// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyAcR4QG15DCTi5072tSPn81gFFAEPxVv4o",
    authDomain: "tapeke-20bb6.firebaseapp.com",
    projectId: "tapeke-20bb6",
    storageBucket: "tapeke-20bb6.appspot.com",
    messagingSenderId: "885912798330",
    appId: "1:885912798330:web:8bcb6421866ad74960e7c3",
    measurementId: "G-6NWFJYB3Z8"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };
    this.registration.showNotification(notificationTitle,
        notificationOptions);
});