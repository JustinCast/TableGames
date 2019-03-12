import React, { Component } from 'react';
import './Session.scss';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

class Session extends Component {
    render() {
        return (
            <div className="container-card">
                <ExpansionPanel>
                    <ExpansionPanelSummary>
                      <p className="title">Nombre de la sala</p>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="rounded main-card">
                            <div className="second-card">
                                <div className="element-opt">
                                    <p className="title">Juego</p>
                                    <p>Damas</p>
                                </div>
                                <div className="element-opt">
                                    <p className="title">Creador</p>
                                    <p>Pepe</p>
                                </div>
                                <div className="element-opt">
                                    <p className="title">Tamaño</p>
                                    <p>18*18</p>
                                </div>
                            </div>
                            <div className="button">
                                <Button>Ir al juego</Button>
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default Session;