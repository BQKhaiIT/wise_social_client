importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

// Cấu hình Firebase
const firebaseConfig = { 
  apiKey : "AIzaSyCeKwb-0eXfvnbL5gfteevAjADUZdrGpRE" , 
  authDomain : "fir-c70c5.firebaseapp.com" , 
  projectId : "fir-c70c5" , 
  storageBucket : "fir-c70c5.firebasestorage.app" , 
  messagingSenderId : "93198435129" , 
  appId : "1:93198435129:web:5a74ee2dc493ed62959ee8" 
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Xử lý thông báo khi app ở chế độ background
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
