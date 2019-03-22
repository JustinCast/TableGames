import React, { Component } from 'react';
import './Statistic.scss'

class Statistic extends Component {
  state = {}
  render() {
    return (
      <div>
        <h3>Statistics</h3>
        <div className="card main-card">
          <p><strong>{JSON.parse(localStorage.getItem('actualUser')).name}</strong></p>
          <p>Won games</p>
          <b>{JSON.parse(localStorage.getItem('actualUser')).wonGames}</b>
          <p>Lost games</p>
          <b>{JSON.parse(localStorage.getItem('actualUser')).lostGames}</b>
          <p>Tied games</p>
          <b>{JSON.parse(localStorage.getItem('actualUser')).tiedGames}</b>
        </div>
      </div>
    );
  }
}

export default Statistic;