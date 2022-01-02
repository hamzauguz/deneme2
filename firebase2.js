// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDP5VawTPEfxLk5oow-pFXfmU309XxvIIU",
  authDomain: "deneme2-5251a.firebaseapp.com",
  projectId: "deneme2-5251a",
  storageBucket: "deneme2-5251a.appspot.com",
  messagingSenderId: "116666497496",
  appId: "1:116666497496:web:2c959812d276110b9b1aad",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
