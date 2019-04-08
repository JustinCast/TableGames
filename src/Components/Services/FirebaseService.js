
// Firebase
import firebase from 'firebase';

const CONFIG = {
  apiKey: "AIzaSyBUDHajC_WsEn0u3skyDuQ_XPehC61o-lY",
  authDomain: "fir-auth-react-64f8d.firebaseapp.com",
  databaseURL: "https://fir-auth-react-64f8d.firebaseio.com",
  projectId: "fir-auth-react-64f8d",
  storageBucket: "fir-auth-react-64f8d.appspot.com",
  messagingSenderId: "460343751130"
  };

// Inicial firebase
export default firebase.initializeApp(CONFIG);

