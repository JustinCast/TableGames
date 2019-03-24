import React, { Component } from 'react';
import './WindowGame.scss'
import Button from '@material-ui/core/Button';
import { injector } from 'react-services-injector';

class WindowGame extends Component {
  state = {}
  render() {
    const { GameService } = this.services;
    return (
      <div id="main-card">
        <p>Nombre del Juego</p>
        <div id="players">
          <section>
            <p>Luis Carlos González Calderón</p>
            <p>Points <b>5</b></p>
            
          </section>
          <section>
            <p>Luis Carlos González Calderón</p>
            <p>Points  <b>8</b></p>
           
          </section>
        </div>

        <div id="game-card" className="shadow rounded">
          {Object.keys(GameService.matrix).map(key => (<div key={key} session={GameService.matrix[key]}></div>))}
        </div>
        <Button id="chat-button">Chat</Button>
      </div>
    );
  }
}
export default injector.connect(WindowGame, { toRender: ['GameService'] });