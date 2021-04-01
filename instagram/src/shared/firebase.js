import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAlw7N7M7oTrcyn32tNtUa7fAXmD-fkJsw",
    authDomain: "image-commu.firebaseapp.com",
    projectId: "image-commu",
    storageBucket: "image-commu.appspot.com",
    messagingSenderId: "894547134452",
    appId: "1:894547134452:web:1dc58130ba2658aef25ba1",
    measurementId: "G-TRJ1EFDN7P",
};

firebase.initializeApp(firebaseConfig);
const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();

export { auth, apiKey, firestore, storage, realtime };
