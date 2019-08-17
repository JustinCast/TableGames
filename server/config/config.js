// Initialize Firebase
import firebase from 'firebase';

var config = {
};
firebase.initializeApp(config);

module.exports = firebase.firestore();
