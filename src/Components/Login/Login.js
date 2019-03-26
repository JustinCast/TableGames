import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import firebaseApp from '../Services/FirebaseService';

// Css
import './login.scss';

// Configuration Firebase
//import {CONFIG} from '../Services/FirebaseConfig';
import MainScreen from '../MainScreen/MainScreen';

import {injector} from 'react-services-injector'




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
      firebaseApp.firebase_.auth.GoogleAuthProvider.PROVIDER_ID,
      firebaseApp.firebase_.auth.FacebookAuthProvider.PROVIDER_ID,
      firebaseApp.firebase_.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }
  
  signOutAuth = () => {
    firebaseApp.auth().signOut();
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
    firebaseApp.firebase_.auth().onAuthStateChanged( user => {
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
                firebaseAuth={firebaseApp.firebase_.auth()}
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