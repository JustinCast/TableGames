import React, { Component } from 'react'
import './AllSessions.scss';
import Session from '../Session/Session';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';

import { injector } from 'react-services-injector';

class AllSessions extends Component {
    state = {}
    render() {
        const { RoomService } = this.services;
        return (
            <div className="container">
                <div className="card main-card">
                    <div className="card-body">
                    <h5 className="card-title">Game sessions</h5>
                        {
                        RoomService.sessions.length > 0 ?(Object.keys(RoomService.sessions).map(key => (<Session key={key} session={RoomService.sessions[key]} />))):(<h3>There aren't sessions yet</h3>)
                        }
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

export default injector.connect(AllSessions, { toRender: ['RoomService', 'LoginService'] });