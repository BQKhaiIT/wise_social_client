import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCeKwb-0eXfvnbL5gfteevAjADUZdrGpRE",
    authDomain: "fir-c70c5.firebaseapp.com",
    projectId: "fir-c70c5",
    storageBucket: "fir-c70c5.firebasestorage.app",
    messagingSenderId: "93198435129",
    appId: "1:93198435129:web:5a74ee2dc493ed62959ee8"
  };

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Khởi tạo Cloud Messaging
const messaging = getMessaging(app);

// Request notification permission from user.
export const requestPermission = async () => {
    try {
        const currentToken = await getToken(messaging, {
            vapidKey: "BP9GVPUaHYrgPwCwnFbDBnf9BmiziculQIE2hhM2LB49xoBu0SQBGPaCJo9R8_cljsWWohYGQGq4eLAUzKh1OH8",
          });
        return currentToken;
    } catch (error) {
        console.error("Cannot get token: :", error);
    }
};

// Listen for messages from FCM while the page is open
export const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        console.log("Message received:", payload);
        resolve(payload);
      });
    });

// Export messing as use.
export { app, messaging };