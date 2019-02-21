import React, { Component } from 'react';
import './Session.scss';

class Session extends Component {
    state = {  }
    render() { 
        return (
            <div className="shadow p-3 mb-5 bg-white rounded">
                <div className="main-card">
                    <section className="element">
                        <p>
                            <strong>
                                Juego
                            </strong>
                        </p>
                        <p>Damas</p>
                    </section>
                    <section className="element">
                        <p>
                            <strong>
                                Creador
                            </strong>
                        </p>
                        <p>Luis</p>
                    </section>
                    <section className="element">
                        <p>
                            <strong>
                                Tamaño
                            </strong>
                        </p>
                        <p>18</p>
                    </section>
                </div>
                <button>Ir al juego</button>
            </div>
            
        );
    }
}
 
export default Session;