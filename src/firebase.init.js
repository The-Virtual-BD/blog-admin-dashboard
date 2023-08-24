// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: "AIzaSyA6KygcGBuqtSMjkCcqIbwF6xbe29lx4x4",

	authDomain: "digital-cardiology-lab.firebaseapp.com",

	projectId: "digital-cardiology-lab",

	storageBucket: "digital-cardiology-lab.appspot.com",

	messagingSenderId: "184970424119",

	appId: "1:184970424119:web:0b2a98866a259da54eb4b2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
