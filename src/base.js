import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCdVlHqsdtvsyZFoodj8zUfzrl898IPATw",
  authDomain: "mytodo-af123.firebaseapp.com",
  projectId: "mytodo-af123",
  storageBucket: "mytodo-af123.appspot.com",
  messagingSenderId: "830127761588",
  appId: "1:830127761588:web:605d93d0f66979f753cfe1",
});

export default app;
