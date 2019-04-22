import React, { Component } from 'react'
import './AllSessions.scss';
import Session from '../Session/Session';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';
import firebaseApp from '../Services/FirebaseService';
import { injector } from 'react-services-injector';

class AllSessions extends Component {
    state = {
        sessions: []
    }

    componentDidMount() {
        this.getSessions();
    }

    getSessions() {

        let allSessions = [];
        firebaseApp.firebase_
            .firestore()
            .collection("session")
            .onSnapshot((querySnapshot) => {
                allSessions = [];
                querySnapshot.forEach((doc) => {
                    allSessions.push(doc.data())
                })
                this.setState({
                    sessions: allSessions
                })
            }
            )
    }

    render() {
        return (
            <div className="container">
                <div className="card main-card">
                    <div className="card-body">
                        <h5 className="card-title">Game sessions</h5>
                        {
                            this.state.sessions.length > 0 ? (Object.keys(this.state.sessions).map(key => (<Session key={key} session={this.state.sessions[key]} />))) : (<h3>There aren't sessions yet</h3>)
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

export default injector.connect(AllSessions, { toRender: ['LoginService'] });