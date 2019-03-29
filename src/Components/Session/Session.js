import React, { Component } from 'react';
import './Session.scss';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Link } from 'react-router-dom';

class Session extends Component {
    render() {
        const {game,name,gameSize} = this.props.session;
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
                                    <p>{game}</p>
                                </div>
                                <div className="element-opt">
                                    <p className="title">Creador</p>
                                    <p>{name}</p>
                                </div>
                                <div className="element-opt">
                                    <p className="title">Tamaño</p>
                                    <p>{gameSize}</p>
                                </div>
                            </div>
                            <div className="button">
                            <Link to={{ pathname: '/windowGame'}}>
                                <Button>Ir al juego</Button>
                            </Link>
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default Session;