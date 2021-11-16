import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp({
  // Your Config
});

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { db, storage, auth, firebase };
