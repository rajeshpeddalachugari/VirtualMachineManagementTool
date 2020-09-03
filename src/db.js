import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDFsyBLBhimIM4TVJb7k704VvDmoA06g6w",
    authDomain: "vue-fire-store-b1bbf.firebaseapp.com",
    databaseURL: "https://vue-fire-store-b1bbf.firebaseio.com",
    projectId: "vue-fire-store-b1bbf",
    storageBucket: "vue-fire-store-b1bbf.appspot.com",
    messagingSenderId: "1030879014200",
    appId: "1:1030879014200:web:01c373370d0953d9cd65cd"
};
// Get a Firestore instance
export const db = firebase
    .initializeApp(firebaseConfig)
    .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }