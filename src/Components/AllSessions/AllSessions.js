import React, { Component } from 'react'
import './AllSessions.scss';
import Session from '../Session/Session';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom'
class AllSessions extends Component {
  state = {}
  render() {
    return (
      <div className="container">
        <div className="card main-card">
          <div className="card-body">
            <h5 className="card-title">Salas de juego</h5>
            <Session />
          </div>
        </div>
        <div className="element">
          <Link className="button-elemnt" to={{ pathname: '/create-room', state: { isMachine: true } }}>
            <span>
              <Fab>
                <i className="fas fa-robot icon"></i>
              </Fab>
            </span>
          </Link>
          <Link className="button-elemnt" to={{ pathname: '/create-room', state: { isMachine: false } }}>
            <span >
              <Fab>
                <i className="fas fa-plus icon"></i>
              </Fab>
            </span>
          </Link>
        </div>
      </div>
    );
  }
}

export default AllSessions;