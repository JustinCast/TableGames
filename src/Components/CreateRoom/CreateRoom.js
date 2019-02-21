import React, { Component } from 'react';
import './CreateRoom.scss';
class CreateRoom extends Component {

    //refs
    name = React.createRef();
    game = React.createRef();
    size = React.createRef();
    difficulty = React.createRef();

    state = {  
        room: {
            name: '',
            game:'',
            sizeGame:0,
            difficulty:'',
            isMachine: false
        }
    }

    render() { 
        return ( 
            <div className="App container">
                <div className="main-container shadow p-3 mb-5 rounded">
                    <form>
                        <h2>Create Room</h2>
                        <hr/>
                        <div className="space">
                            <h3>Name</h3>
                            <input className="u-full-width" type="text" ref={this.name} placeholder="Ex. Room Game" />
                        </div>

                        <div className="space">
                            <h3>Select Game</h3>
                            <select className="u-full-width" ref={this.game}>
                                <option value="Damas">Damas</option>
                                <option value="Mind">Mind</option>
                            </select>
                        </div>

                        <div className="space">
                            <h3>Size Game</h3>
                            <select className="u-full-width" ref={this.size}>
                                <option value="12x12">12 x 12</option>
                                <option value="16 x 16">16 x 16</option>
                            </select>
                        </div>

                        <div className="space">
                            <h3>Difficulty</h3>
                            <select className="u-full-width" ref={this.difficulty}>
                                <option value="baby">baby</option>
                                <option value="promising">promising</option>
                                <option value="viking">viking</option>
                                
                            </select>
                        </div>

                        <div className="text-center"> 
                            <button type="button" className="btn btn-primary btnCreate shadow p-3 mb-5 rounded"><a>Create</a></button>
                        </div>  
                    </form>
                    </div>
         
            </div>
        );
    }
}
 
export default CreateRoom;