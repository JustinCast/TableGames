import React from 'react';
import './Message.scss'
import { injector } from 'react-services-injector';

class Message extends React.Component {

    state = {
        messages: []
    }

    componentDidMount(){
        this.services.GameService.messages.then(data => {
            this.setState({
                messages: data
            })
        })
    }

    render() {  
        return (
            <div>
                {Object.keys(this.state.messages).map(key => (
                    <div className="chat-container" key={key}>
                        <h5>{this.state.messages[key].name}</h5>
                        <p>{this.state.messages[key].text}</p>
                        <hr></hr>
                    </div>
                ))}
            </div>
        )

    }
}

export default injector.connect(Message, { toRender: ['GameService'] });