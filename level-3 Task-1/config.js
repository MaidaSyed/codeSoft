import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9icTfF080WRQNsH7Mz9Rk4dkaJbfCqqU",
  authDomain: "hackathon-b1a5a.firebaseapp.com",
  projectId: "hackathon-b1a5a",
  storageBucket: "hackathon-b1a5a.appspot.com",
  messagingSenderId: "930874912259",
  appId: "1:930874912259:web:9012caba8afa0b0ea16836"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

export { db }