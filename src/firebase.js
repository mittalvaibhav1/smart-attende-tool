import firebase from 'firebase';

const firebaseConfig = {
    /* YOUR CONFIG HERE*/
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const google_provider =  new firebase.auth.GoogleAuthProvider();
export {auth, google_provider};
export default db;