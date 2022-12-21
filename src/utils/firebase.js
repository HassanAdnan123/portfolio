import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBmqa9sZm7q4R6GuqgUm3SxYdPVxfce93A",
    authDomain: "portfolio-backend-d2112.firebaseapp.com",
    databaseURL: "https://portfolio-backend-d2112-default-rtdb.firebaseio.com",
    projectId: "portfolio-backend-d2112",
    storageBucket: "portfolio-backend-d2112.appspot.com",
    messagingSenderId: "771553559178",
    appId: "1:771553559178:web:65977c7dc7f86faca2a373"
  };

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);