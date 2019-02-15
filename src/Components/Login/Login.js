import React, { Component } from 'react'

// Firebase
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Css
import '../../Style/login.scss';

const CONFIG = {
    apiKey: "AIzaSyBUDHajC_WsEn0u3skyDuQ_XPehC61o-lY",
    authDomain: "fir-auth-react-64f8d.firebaseapp.com",
    databaseURL: "https://fir-auth-react-64f8d.firebaseio.com",
    projectId: "fir-auth-react-64f8d",
    storageBucket: "fir-auth-react-64f8d.appspot.com",
    messagingSenderId: "460343751130"
  };

firebase.initializeApp(CONFIG);

export default class Login extends Component{

  constructor(){
    this.authFirebase();
  }
  // Initialization State
  state = {
    isSignIn: false,
    user: {
      name: '',
      email: '',
      uid: ''
    }
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  authFirebase = () =>{

    firebase.auth().onAuthStateChanged( user => {
      this.setState({
        isSignIn: !!user,
      })
      if(this.state.isSignIn){
        this.setState({
          user: {
            name: user.displayName,
            email: user.email,
            uid: user.uid
          }
        })
      }
    })
  }
  render(){
    return(
      <React.Fragment>
        {this.state.isSignIn ?(
          <span>
            <button className="button-primary" onClick={() => firebase.auth().signOut()}>Sign Out!</button>
          </span>
        )
        :
        (
          <div className="main-container shadow">
            <h1 className="text-center text-white"> Login </h1>
            <hr/>
            <StyledFirebaseAuth 
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        
        )
        }
      </React.Fragment>
    )
  }
}