import React, { Component } from 'react'
import './AllSessions.scss';

import Session from '../Session/Session'

class AllSessions extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <div className="card main-card">
                    <div className="card-body">
                        <h5 className="card-title">Salas de juego</h5>
                        <Session/>
                        <Session/>
                        <Session/>
                        <Session/>
                        <Session/>
                        <Session/>
                        <Session/>
                        <Session/>
                        <Session/>
                        <Session/>
                        <Session/>
                        <Session/>  
                    </div>  
                </div>
            </div>
        );
    }
}


 
export default AllSessions;