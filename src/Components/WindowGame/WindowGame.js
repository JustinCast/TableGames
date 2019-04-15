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
    stateGameId: "",
    gameName: this.props.location.state.gameName,
    difficulty: "",
    sizeBox: "80%",
    sizeElement: "",
    open: false,
    scroll: 'paper',
    message: "",
    canShow: false,
    playerOne: "",
    playerTwo: "",
    playerOneUid: "",
    playerTwoUid: "",
    actualPlayer: {}
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
          if (doc.data().users[1] !== undefined & doc.data().users[1] !== null) {
            console.log("entroooooo donde no debía ");
            this.setState({
              canShow: true,
              playerOne: doc.data().users[0].name,
              playerTwo: doc.data().users[1].name,
              playerOneUid: doc.data().users[0].uid,
              playerTwoUid: doc.data().users[1].uid,
              stateGameId: doc.data().stateGameId,
              difficulty: doc.data().difficulty
            })
            this.getData()
            console.log("hay jugadoR ");
          }
          if (doc.data().users[1] === null) {
            this.setState({
              canShow: true,
              playerOne: doc.data().users[0].name,
              playerTwo: "Robot",
              playerOneUid: doc.data().users[0].uid,
              playerTwoUid: null,
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
          sizeElement: this.getSizeElement(doc.data().game.length),
          actualPlayer: doc.data().actualPlayer
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
    if (window.innerHeight > 640 && window.innerWidth > 360) {
      if (boxSize === 16) //4*4
        return "46%";
      if (boxSize === 36) //6*6
        return "49%";
      if (boxSize === 64) //8*8 
        return "45%";
    }
    if (window.innerHeight <= 640 && window.innerWidth <= 360) {
      if (boxSize === 16) //4*4
        return "96%";
      if (boxSize === 36) //6*6
        return "96%";
      if (boxSize === 64) //8*8 
        return "96%";
    }

  }

  getSizeElement(elementSize) {
    if (window.innerHeight > 640 && window.innerWidth > 360) {
      if (elementSize === 16) //4*4
        return "10vw";
      if (elementSize === 36) //6*6
        return "6.5vw";
      if (elementSize === 64) //8*8
        return "4.8vw";
    }
    if (window.innerHeight <= 640 && window.innerWidth <= 360) {
      if (elementSize === 16) //4*4
        return "22vw";
      if (elementSize === 36) //6*6
        return "14vw";
      if (elementSize === 64) //8*8
        return "10vw";
    }
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
      <div >
        {this.state.canShow === true ? (
          <div id="main-card">
            <p>{this.state.gameName}</p>
            <div id="players">
              <section>
                {this.state.actualPlayer === this.state.playerOneUid ?
                  (<b style={{ color: "white" }}>{this.state.playerOne}</b>) :
                  (<p>{this.state.playerOne}</p>)
                }
                <p>Score <b>{this.state.score.p1Score}</b></p>
              </section>
              <section>
                <p>Dificultad <b>{this.getDifficulty()}</b> </p>
              </section>
              <section>
                {this.state.actualPlayer === null ?
                  (<b style={{ color: "white" }}>{this.state.playerTwo}</b>) :
                  (<p>{this.state.playerTwo}</p>)
                }

                <p>Score <b>{this.state.score.p1Score}</b></p>
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
        ) : (<h1 id="Loading">Waiting for the other player</h1>)
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

//this.handleClickOpen('paper')