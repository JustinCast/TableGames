import React, { Component } from 'react';
import './WindowGame.scss'
import Button from '@material-ui/core/Button';
import { injector } from 'react-services-injector';
import firebaseApp from '../Services/FirebaseService';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Message from '../Message/Message'


class WindowGame extends Component {
  state = {
    game: [],
    score: {},
    users: [],//this.props.location.state.users,
    stateGameId: "",//localStorage.getItem("stateGameId"), //this.props.location.state.stateGameId,
    gameName: this.props.location.state.gameName,
    difficulty: "", //this.props.location.state.difficulty,
    sizeBox: "80%",
    sizeElement: "",
    open: false,
    scroll: 'paper',
    message: "",
    canShow: false
  }

  componentDidMount() {
    this.getStateGame();
  }


  getStateGame() {
    console.log(this.state.gameName)

    firebaseApp.firebase_
      .firestore()
      .collection("session")
      .where("name", "==", this.state.gameName)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          if (doc.data().users[1] !== undefined || doc.data().users[1] === null) {
            this.setState({
              canShow: true,
              users: doc.data().users,
              stateGameId: doc.data().stateGameId,
              difficulty: doc.data().difficulty
            })
            this.getData()
            console.log("hay jugadoR ");
          } else {
            this.setState({
              canShow: false
            })
            console.log("NO hay jugador ");
          }
        })
      });
  }

  /*getUsers() {
    firebaseApp.firebase_
      .firestore()
      .collection("session")
      .where("stateGameId", "==", this.state.stateGameId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().users[1] !== undefined || doc.data().users[1] === null) {
            this.setState({
              canShow: true
            })
            console.log("hay jugadoR ");
          } else {
            this.setState({
              canShow: false
            })
            console.log("NO hay jugador ");
          }
        });
      });
  }*/

  getData() {
    console.log(this.state.stateGameId + " en get data ")
    firebaseApp.firebase_
      .firestore()
      .collection("stateGame")
      .doc(this.state.stateGameId)
      .onSnapshot((doc) => {
        this.setState({
          game: doc.data().game,
          score: doc.data().scores,
          sizeBox: this.getSizeBox(doc.data().game.length),
          sizeElement: this.getSizeElement(doc.data().game.length)
        })
      });
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
    if (boxSize === 16) //4*4
      return "46%";
    if (boxSize === 36) //6*6
      return "49%";
    if (boxSize === 64) //8*8 
      return "45%";
  }

  getSizeElement(elementSize) {
    if (elementSize === 16) //4*4
      return "10vw";
    if (elementSize === 36) //6*6
      return "6.5vw";
    if (elementSize === 64) //8*8
      return "4.8vw";
  }

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  setField(e) {
    this.setState({ message: e.target.value });
  }
  render() {


    return (
      <div id="main-card">
        {this.state.canShow === true ? (
          <div>
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
            <Button id="chat-button" onClick={this.handleClickOpen('paper')}>Chat</Button>
          </div>

        ) : (<h1>Esperando que el jugador dos se conecte</h1>)

        }


        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Chat</DialogTitle>
          <DialogContent>
            <Message />
          </DialogContent>
          <DialogActions>
            <div className="write-massage">
              <TextField
                name="message"
                id="message"
                label="Write a message"
                onChange={(e) => this.setField(e)}
              />
              <Button id="button-send" onClick={() => { this.services.GameService.sendMessage(this.state.message) }} >Send </Button>
            </div>
            <Button onClick={this.handleClose} color="primary">Close </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default injector.connect(WindowGame, { toRender: ['GameService'] });