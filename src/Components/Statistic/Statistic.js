import React, { Component } from 'react';
import './Statistic.scss'
import firebaseApp from '../Services/FirebaseService';

class Statistic extends Component {
  state = {
    name: "",
    wonGames: "",
    lostGames: "",
    tiedGames: ""
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    firebaseApp.firebase_
      .firestore()
      .collection("player")
      .where("uid", "==", JSON.parse(localStorage.getItem('actualUser')).uid)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          this.setState({
            name: doc.data().name,
            wonGames: doc.data().wonGames,
            lostGames: doc.data().lostGames,
            tiedGames: doc.data().tiedGames
          })
        })
      });
  }


  render() {
    return (
      <div>
        <h3>Statistics</h3>
        <div className="card main-card">
          <p><strong>{this.state.name}</strong></p>
          <p>Won games</p>
          <b>{this.state.wonGames}</b>
          <p>Lost games</p>
          <b>{this.state.lostGames}</b>
          <p>Tied games</p>
          <b>{this.state.tiedGames}</b>
        </div>
      </div>
    );
  }
}

export default Statistic;