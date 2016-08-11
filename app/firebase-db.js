import Firebase from 'firebase';

var firebaseApp = Firebase.initializeApp({
  apiKey: "AIzaSyDaWR8G1TMrDtGAQRHscbH833yV63TZzvg",
  authDomain: "vuejs-firebase-4aeb4.firebaseapp.com",
  databaseURL: "https://vuejs-firebase-4aeb4.firebaseio.com",
  storageBucket: "vuejs-firebase-4aeb4.appspot.com",
});

export default firebaseApp.database();
