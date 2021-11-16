import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDpB2qE2d38eNdThwya3VO0enTOQx-X-Po",
  authDomain: "lemon-1c4c5.firebaseapp.com",
  projectId: "lemon-1c4c5",
  storageBucket: "lemon-1c4c5.appspot.com",
  messagingSenderId: "155068374743",
  appId: "1:155068374743:web:53afb43f967a382f7f5a92",
  measurementId: "G-D58K92DFGD",
});

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { db, storage, auth, firebase };
