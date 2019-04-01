import React, { Component } from 'react';
import './WindowGame.scss'
import Button from '@material-ui/core/Button';
import { injector } from 'react-services-injector';

class WindowGame extends Component {
  state = {
    game: [],
    score: {},
    stateGameId: this.props.location.state.stateGameId
  }

  componentDidMount() {
    this.services.GameService.setElement(this.state.stateGameId);
  }

  render() {
    
    if(this.services.GameService.getElement!=undefined){
      this.services.GameService.newMatrix.then(data =>
        this.setState({
          game: data.game,
          score: data.scores,
        })
      );
    }
    
    const sizeBox = "44%";
    const sizeElement = "4.8vw";

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

        <div style={{ width: sizeBox }} id="game-card" className="shadow rounded" >
          {this.state.game.length > 0 ? (
            Object.keys(this.state.game).map(key => (
              <div style={{ width: sizeElement, height: sizeElement }} key={key}>
                <img src={this.state.game[key].img} style={{ width: "4.3vw", height: "4.3vw" }} ></img>
              </div>)
            )
          ) : (<h2>Loading game</h2>)
          }
        </div>
        <Button id="chat-button">Chat</Button>
      </div>
    );
  }
}
export default injector.connect(WindowGame, { toRender: ['GameService'] });

//Object.keys().map(key => (<div style={{width: sizeElement, height:sizeElement}}  key={key}></div>))