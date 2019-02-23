import React, { Component } from 'react'
import './AllSessions.scss';
import Session from '../Session/Session';
import Fab from '@material-ui/core/Fab';

class AllSessions extends Component {
    state = {}
    render() {
        return (
            <div className="container">
                <div className="card main-card">
                    <div className="card-body">
                        <h5 className="card-title">Salas de juego</h5>
                        <Session />
                        <Session />
                        <Session />
                        <Session />
                        <Session />
                        <Session />
                        <Session />
                        <Session />
                        <Session />
                        <Session />
                        <Session />
                        <Session />
                        <Session />
                        <Session />
                        <Session />
                        <Session />
                    </div>
                </div>
                <div className="element">
                    <span className="button-elemnt">
                        <Fab>
                            <i className="fas fa-robot icon"></i>
                        </Fab>
                    </span>
                    <span className="button-elemnt">
                        <Fab>
                            <i className="fas fa-plus icon"></i>
                        </Fab>
                    </span>
                </div>
            </div>
        );
    }
}



export default AllSessions;