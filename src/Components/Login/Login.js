import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
// Firebase
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Css
import './login.scss';

// Configuration Firebase
//import {CONFIG} from '../Services/FirebaseConfig';
import MainScreen from '../MainScreen/MainScreen';

import {injector} from 'react-services-injector'

const CONFIG = {
  apiKey: "AIzaSyDYv8JgWgmX18LautVwl2fwkHAo0oqt5BU",
  authDomain: "tablegames-4feca.firebaseapp.com",
  databaseURL: "https://tablegames-4feca.firebaseio.com",
  projectId: "tablegames-4feca",
  storageBucket: "tablegames-4feca.appspot.com",
  messagingSenderId: "1024787207709"
};

// Inicial firebase
firebase.initializeApp(CONFIG);
// Configuration of provider firebase
 
class Login extends Component{
  // Initialization State
  state = {
    isSignIn: false,
    openSnack: false,
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
      signInSuccessWithAuthResult: () => false
    }
  }
  
  signOutAuth = () => {
    firebase.auth().signOut();
  }
  
  componentDidMount = () =>{
    this.authStateChange(); 
  }
  // Close Snack Error
  handleClose = () => {
    this.setState({ openSnack: false });
  };

  // Open Snack Error
  handleOpen = () => {
    this.setState({ openSnack: true });
  };
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
        this.services.LoginService.sentUser(this.state.user);
      }
    })
  }

  render(){
    const { openSnack } = this.state;
    return(
      <div>
        {this.state.isSignIn ?(
          <MainScreen signOut={this.signOutAuth}/>
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
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal:'center' }}
          open={openSnack}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          autoHideDuration={4000}
          message={<span id="message-id"><i class="fas fa-exclamation-triangle text-danger"></i> There was a problem logging in <i class="fas fa-exclamation-triangle text-danger"></i></span>}
        />
      </div>
    )
  }
}

export default injector.connect(Login, {toRender: ['LoginService']});