import React, { Component } from 'react';
import './WindowGame.scss'
import Button from '@material-ui/core/Button';
import { injector } from 'react-services-injector';
import { green } from '@material-ui/core/colors';

class WindowGame extends Component {
  state = {}
  render() {

    const { GameService } = this.services;
    const sizeBox="39%";
    const sizeElement="7vw";

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

        <div style={{width: sizeBox}} id="game-card" className="shadow rounded" >
          {Object.keys(GameService.matrix).map(key => (<div style={{width: sizeElement, height:sizeElement}}  key={key} session={GameService.matrix[key]}></div>))}
        </div>
        <Button id="chat-button">Chat</Button>
      </div>
    );
  }
}
export default injector.connect(WindowGame, { toRender: ['GameService'] });