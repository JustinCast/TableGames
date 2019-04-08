// Initialize Firebase
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBUDHajC_WsEn0u3skyDuQ_XPehC61o-lY",
  authDomain: "fir-auth-react-64f8d.firebaseapp.com",
  databaseURL: "https://fir-auth-react-64f8d.firebaseio.com",
  projectId: "fir-auth-react-64f8d",
  storageBucket: "fir-auth-react-64f8d.appspot.com",
  messagingSenderId: "460343751130"
};
firebase.initializeApp(config);

module.exports = firebase.firestore();