import React, { Component } from 'react';
import './CreateRoom.scss';
import {FormControl,Input,InputLabel,Select,MenuItem,Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';

import {injector} from 'react-services-injector';


class CreateRoom extends Component {
    // State
    state = {
        openSnack: false,  
        name: '',
        game:'Damas',
        gameSize:8,
        difficulty:1,
        isMachine: this.props.location.state.isMachine
    }

   // Update Handle
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value 
        });
    };

    submit = (values, pristineValues) => {
        // get all values and pristineValues on form submission
    }
    
    handleForm = () =>{
        if(this.state.name.length <= 0){
            this.setState({
                openSnack: true
            })
        }else{
            //TODO: Goto game
            let session = {
                name: this.state.name,
                game: this.state.game,
                gameSize: this.state.gameSize,
                difficulty: this.state.difficulty,
                isMachine: this.state.isMachine
            }
            this.services.SessionService.createSession(session)
        }
    }

    handleClose = () => {
        this.setState({ openSnack: false });
    };

    render() {
        const { openSnack } = this.state; 
        return ( 
            <div className="App container">
                <div className="main-container shadow p-3 mb-5 rounded">
                    <h2 className="text-center text-white"> Create Room</h2>
                    <hr/>
                    <FormControl className="col mt-2"> 
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input id="name" name="name" value={this.state.name} onChange={this.handleChange}/>
                     </FormControl> 

                    <FormControl className="col mt-4"> 
                    <InputLabel htmlFor="game">Game</InputLabel>
                    <Select
                        value={this.state.game}
                        onChange={this.handleChange}
                        name="game"
                        id="game"
                    >
                        <MenuItem value="Damas">Damas</MenuItem>
                        <MenuItem value="Memory">Memory</MenuItem>
                    </Select>
                    </FormControl>

                    <FormControl className="col mt-4">
                    <InputLabel htmlFor="gameSize">Size Game</InputLabel> 
                    <Select
                        value={this.state.gameSize}
                        onChange={this.handleChange}
                        name="gameSize"
                        id="gameSize"
                    >
                        <MenuItem value={8}>8 X 8</MenuItem>
                        <MenuItem value={10}>10 X 10</MenuItem>
                        <MenuItem value={12}>12 X 12</MenuItem>
                        <MenuItem value={14}>14 X 14</MenuItem>
                    </Select>
                    </FormControl>
                    {this.state.isMachine ?(
                    <FormControl className="col mt-4">
                    <InputLabel htmlFor="difficulty">Difficulty</InputLabel>  
                    <Select
                        value={this.state.difficulty}
                        onChange={this.handleChange}
                        name="difficulty"
                        id="difficulty"
                    >
                        <MenuItem value={1}>Fácil</MenuItem>
                        <MenuItem value={2}>Medio</MenuItem>
                        <MenuItem value={3}>Difícil</MenuItem>
                    </Select>
                    </FormControl>
                    ): null}
                    <div className="col mt-4 btn">
                        <Button variant="contained" color="primary" onClick={this.handleForm}>
                            Create
                        </Button>
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal:'center' }}
                    open={openSnack}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    autoHideDuration={5000}
                    message={<span id="message-id"><i className="fas fa-exclamation-triangle text-danger"></i> Name of session is empty <i className="fas fa-exclamation-triangle text-danger"></i></span>}
                    />
            </div>
        );
    }
}
export default injector.connect(CreateRoom, {toRender: ['SessionService']});