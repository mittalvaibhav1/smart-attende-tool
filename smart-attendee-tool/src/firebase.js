import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDNrINEBQyzyt2dis7RdvA4fuLB_v8paiE",
    authDomain: "smart-attendee-tool.firebaseapp.com",
    projectId: "smart-attendee-tool",
    storageBucket: "smart-attendee-tool.appspot.com",
    messagingSenderId: "292503069701",
    appId: "1:292503069701:web:e51d47affeaa5c308de86c",
    measurementId: "G-GFEHW1GP7Q"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const google_provider =  new firebase.auth.GoogleAuthProvider();
export {auth, google_provider};
export default db;