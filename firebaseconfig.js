import firebase from "firebase";
import "firebase/storage";
//yarn add firebase@8.2.3

var firebaseConfig = {
  apiKey: "AIzaSyDP5VawTPEfxLk5oow-pFXfmU309XxvIIU",
  authDomain: "deneme2-5251a.firebaseapp.com",
  projectId: "deneme2-5251a",
  storageBucket: "deneme2-5251a.appspot.com",
  messagingSenderId: "116666497496",
  appId: "1:116666497496:web:2c959812d276110b9b1aad",
};
firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();
export default database;
