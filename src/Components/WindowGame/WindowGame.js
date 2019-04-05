import React, { Component } from 'react';
import './WindowGame.scss'
import Button from '@material-ui/core/Button';
import { injector } from 'react-services-injector';
import { element, string } from 'prop-types';
import { Link } from '@material-ui/core';

class WindowGame extends Component {
  state = {
    game: [],
    score: {},
    users: this.props.location.state.users,
    stateGameId: this.props.location.state.stateGameId,
    gameName: this.props.location.state.gameName,
    sizeBox: "39%"
  }

  componentDidMount() {
    this.services.GameService.setElement(this.state.stateGameId);
  }


  render() {
    if (this.services.GameService.getElement !== undefined) {
      this.services.GameService.newMatrix.then(data =>
        this.setState({
          game: data.game,
          score: data.scores
        })
      )
    }

    var sizeElement = "4.8vw";

    /*if (this.state.game.length !== 0) {
      this.services.GameService.sizeBox(this.state.game.length);
      this.setState({ sizeBox: this.services.GameService.getSizeBox });
    }*/

    return (
      <div id="main-card">
        <p>{this.state.gameName}</p>
        <div id="players">
          <section>
            <p>{this.state.users[0].name}</p>
            <p>Score <b>{this.state.score.p1Score}</b></p>
          </section>
          <section>
            <p>Luis Carlos González Calderón</p>
            <p>Score <b>{this.state.score.p2Score}</b></p>
          </section>
        </div>
         <div style={{ width: this.state.sizeBox }} id="game-card" className="shadow rounded" >
          {this.state.game.length > 0 ? (
            Object.keys(this.state.game).map(key => (
              <div style={{ width: sizeElement, height: sizeElement }} key={key}
                onClick={() => {
                  console.log(" Uid " + JSON.parse(localStorage.getItem("actualUser")).uid + " " + this.state.game[key] + this.state.stateGameId)
                }
                }>
                <img alt="Loading" src={this.state.game[key].img} style={{ width: "4.3vw", height: "4.3vw" }}></img>
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