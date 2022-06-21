import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCLFa8OD_fi9RCi_yORbHe0bG4YX7kSNKs",
  authDomain: "uber-eats-a95b5.firebaseapp.com",
  projectId: "uber-eats-a95b5",
  storageBucket: "uber-eats-a95b5.appspot.com",
  messagingSenderId: "315910542653",
  appId: "1:315910542653:web:a89cbf4ffe719339872154",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();


export default firebase;
