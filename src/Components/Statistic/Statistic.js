import React, { Component } from 'react';
import './Statistic.scss'
import { injector } from 'react-services-injector';

class Statistic extends Component {
  state = {}
  render() {
    const { RoomService } = this.services;
    return (
      <div>
        <h3>Statistics</h3>
        <div className="card main-card">
          <p><strong>{RoomService.userName}</strong></p>
          <p>Won games</p>
          <b>8</b>
          <p>Lost games</p>
          <b>8</b>
          <p>Tied games</p>
          <b>8</b>
        </div>
      </div>
    );
  }
}

export default injector.connect(Statistic, { toRender: ['RoomService'] });