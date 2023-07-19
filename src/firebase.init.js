// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNHXAGTSgXPKviXXLX3rLD--MS5KGQDfs",
  authDomain: "sunrise-com.firebaseapp.com",
  projectId: "sunrise-com",
  storageBucket: "sunrise-com.appspot.com",
  messagingSenderId: "580824599310",
  appId: "1:580824599310:web:df8810d230b473f92aa55f"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;