import React, { Component } from 'react';
import './WindowGame.scss'
import Button from '@material-ui/core/Button';
import { injector } from 'react-services-injector';


class WindowGame extends Component {
  state = {
    game: [],
    score: {},
    users: this.props.location.state.users,
    stateGameId: this.props.location.state.stateGameId,
    gameName: this.props.location.state.gameName,
    difficulty: this.props.location.state.difficulty,
    sizeBox: "20%",
    sizeElement: "20%"
  }

  componentDidMount() {
    this.services.GameService.setElement(this.state.stateGameId);
    //this.services.GameService.sizeBox(this.state.game.length);
  }

  getDifficulty() {
    if (this.state.difficulty === 1)
      return "Easy";
    if (this.state.difficulty === 2)
      return "Medium";
    if (this.state.difficulty === 3)
      return "Hard";
  }

  getSizeBox(boxSize) {
    if (boxSize === 25) //5*5
      return "43%";
    if (boxSize === 36) //6*6
      return "43%";
    if (boxSize === 49) //7*7
      return "45%";
    if (boxSize === 64) //8*8
      return "44%";
  }

  getSizeElement(elementSize) {
    if (elementSize === 25) //5*5
      return "7.5vw";
    if (elementSize === 36) //6*6
      return "6.5vw";
    if (elementSize === 49) //7*7
      return "5.6vw";
    if (elementSize === 64) //8*8
      return "4.8vw";
  }

  render() {
    if (this.services.GameService.getElement !== undefined) {
      this.services.GameService.newMatrix.then(data =>
        this.setState({
          game: data.game,
          score: data.scores,
          sizeBox: this.getSizeBox(data.game.length),
          sizeElement: this.getSizeElement(data.game.length)
        })
      );
    }

    return (
      <div id="main-card">
        <p>{this.state.gameName}</p>
        <div id="players">
          <section>
            <p>{this.state.users[0].name}</p>
            <p>Score <b>{this.state.score.p1Score}</b></p>
          </section>
          <section>
            <p>Dificultad <b>{this.getDifficulty()}</b> </p>
          </section>

          <section>
            <p>Luis Carlos González Calderón</p>
            <p>Score <b>{this.state.score.p2Score}</b></p>
          </section>
        </div>
        <div style={{ width: this.state.sizeBox }} id="game-card" className="shadow rounded" >
          {this.state.game.length > 0 ? (
            Object.keys(this.state.game).map(key => (
              <div style={{ width: this.state.sizeElement, height: this.state.sizeElement }} key={key}
                onClick={() => {
                  this.services.GameService.sentClick(this.state.stateGameId, JSON.parse(localStorage.getItem("actualUser")).uid, this.state.game[key])
                }
                }>
                <img alt="Loading" src={this.state.game[key].img} style={{ width: this.state.sizeElement, height: this.state.sizeElement }}></img>
              </div>)
            )
          ) : (<h2>Loading game</h2>)
          }
        </div>

        <Button id="chat-button" onClick={() => console.log("Hola munndo")}>Chat</Button>

      </div>
    );
  }
}
export default injector.connect(WindowGame, { toRender: ['GameService'] });