import React, { Component } from 'react'

// Firebase
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Css
import './login.scss';

// Configuration Firebase
import {CONFIG} from '../Services/FirebaseConfig';

// Inicial firebase
firebase.initializeApp(CONFIG);
// Configuration of provider firebase
 
export default class Login extends Component{

  // Initialization State
  state = {
    isSignIn: false,
    user: {
      name: '',
      email: '',
      uid: ''
    }
  }

  // Interface configuration (providers)
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

  
  componentDidMount = () =>{
    this.authStateChange(); 
  }

  // Handle auth change of firebase
  authStateChange = () => {
    firebase.auth().onAuthStateChanged( user => {
      this.setState({
        isSignIn: !!user, // Change state sign in
      })
      if(this.state.isSignIn){
        this.setState({
          user: { // Set actual user
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
      <div>
        {this.state.isSignIn ?(
          <span>
            <button className="button-primary" onClick={() => firebase.auth().signOut()}>Sign Out!</button>
          </span>
        )
        :
        (
          <div className="main shadow">
            <h3 className="text-center text-white"> Login </h3>
            <hr/>
            <StyledFirebaseAuth 
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        
        )
        }
      </div>
    )
  }
}