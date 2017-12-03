import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAprxgf1X-VWTzcH3I_2nCYgmCblHaSC90",
    authDomain: "roommates-app-75271.firebaseapp.com",
    databaseURL: "https://roommates-app-75271.firebaseio.com",
    projectId: "roommates-app-75271",
    storageBucket: "roommates-app-75271.appspot.com",
    messagingSenderId: "128687921563"
};

export const fire = firebase.initializeApp(config);

// export default fire;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
