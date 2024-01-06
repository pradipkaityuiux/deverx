import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnFCpJlYBvk6P8XXGqwRJivO9oLNHaLpY",
  authDomain: "deverxblog.firebaseapp.com",
  databaseURL: "https://deverxblog-default-rtdb.firebaseio.com",
  projectId: "deverxblog",
  storageBucket: "deverxblog.appspot.com",
  messagingSenderId: "626422674331",
  appId: "1:626422674331:web:43ef392b45183b6e2ea73e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}