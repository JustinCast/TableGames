import React, { Component } from 'react';

// Firebase
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Css
import './login.scss';

// Configuration Firebase
import {CONFIG} from '../Services/FirebaseConfig';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// Inicial firebase
firebase.initializeApp(CONFIG);


export const GET_PLAYERS = gql`
  query getPlayers {
    players {
      name
      email
    }
  }
`;

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
      <Query
    query={gql`
      {
        players {
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) console.log(error);

      return data.players.map(({ name }) => (
        <div>
          <p>{`${name}`}</p>
        </div>
      ));
    }}
  </Query>
  //     <Query query={GET_PLAYERS}>
  //   {({ loading, data }) => !loading && (
  //     <React.Fragment>
  //       {this.state.isSignIn ?(
  //         <span>
  //           <div>
  //           <button className="button-primary" onClick={() => firebase.auth().signOut()}>Sign Out!</button>
  //           {data.players.map(p => (
  //             <ul>
  //               <li>{p.name}</li>
  //               <li>{p.email}</li>
  //             </ul>
  //         ))}
  //         </div>
  //         </span>
  //       )
  //       :
  //       (
  //         <div className="main-container shadow">
  //           <h1 className="text-center text-white"> Login </h1>
  //           <hr/>
  //           <StyledFirebaseAuth 
  //             uiConfig={this.uiConfig}
  //             firebaseAuth={firebase.auth()}
  //           />
  //         </div>
        
  //       )
  //       }
  //     </React.Fragment>
  //   )}
  // </Query>
    )
  }
}
