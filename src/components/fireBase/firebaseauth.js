
import * as Firebase from "firebase";
import "firebase/firestore";
let config = {
  apiKey: "AIzaSyCIsOesYYcQc5p6QudyYyjqE6oD8HUETWg",
  authDomain: "myschool-4c292.firebaseapp.com",
  databaseURL: "https://myschool-4c292.firebaseio.com",
  projectId: "myschool-4c292",
  storageBucket: "myschool-4c292.appspot.com",
  messagingSenderId: "159503281543"
};
let app;
if (!Firebase.apps.length) {
  app = Firebase.initializeApp(config);
}
export const db = Firebase.firestore(app);
// export const firestore= app.firestore();
