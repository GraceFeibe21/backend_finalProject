import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAMhFfLGpU214i19Io8nAjl-gStu43y8d4",
    authDomain: "web-programming-1c11b.firebaseapp.com",
    databaseURL: "https://web-programming-1c11b-default-rtdb.firebaseio.com",
    projectId: "web-programming-1c11b",
    storageBucket: "web-programming-1c11b.appspot.com",
    messagingSenderId: "951647593754",
    appId: "1:951647593754:web:374f61a85f80f79d9678a3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase;