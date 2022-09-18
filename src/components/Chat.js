import React, { Component } from 'react'
import { connect } from 'react-redux';
import io from 'socket.io-client';
import './Chat.css'

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [], // {content: 'some message', self: true}
            typedMessage: '',
            isOpen: false
        };
        this.socket = io.connect('https://codeial.codingninjas.com:5000/');
        this.userEmail = props.user.email;

        if (this.userEmail) {
            this.setupConnections();
        }
    }
    setupConnections = () => {
        const socketConnection = this.socket;
        const self = this;

        this.socket.on('connect', function () {
            console.log('CONNECTION ESTABLISHED');

            socketConnection.emit('join_room', {
                user_email: this.userEmail,
                chatroom: 'codeial',
            });

            socketConnection.on('user_joined', function (data) {
                console.log('NEW USER JOINED', data);
            });
        });

        this.socket.on('receive_message', function (data) {
            // add message to state
            const { messages } = self.state;
            const messageObject = {};
            messageObject.content = data.message;

            if (data.user_email === self.userEmail) {
                messageObject.self = true;
            }

            self.setState({
                messages: [...messages, messageObject],
                typedMessage: '',
            });
        });
    };

    handleChatClick = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    handleSubmit = () => {
        const { typedMessage } = this.state;

        if (typedMessage && this.userEmail) {
            this.socket.emit('send_message', {
                message: typedMessage,
                user_email: this.userEmail,
                chatroom: 'codeial'
            })
        }
    }

    render() {
        const { isOpen, typedMessage, messages } = this.state;
        return (
            <div className="chat-box">
                <div className="chat-header" onClick={this.handleChatClick}>
                    Group Chat
                    <img src="https://cdn-icons-png.flaticon.com/512/992/992534.png" className={isOpen ? 'chat-img-rotate' : ''} alt="" />
                </div>
                {isOpen && <div className="chat-display">
                    {messages.map((message) => (
                        <div className={
                            message.self ?
                                'chat-bubble self-chat'
                                :
                                'chat-bubble other-chat'
                        }>
                            {message.content}
                        </div>
                    ))}
                </div>}

                {
                    isOpen && <div className="chat-footer">
                        <input type="text" value={typedMessage} onChange={(e) => this.setState({ typedMessage: e.target.value })} />
                        <button onClick={this.handleSubmit} >SEND</button>
                    </div>
                }
            </div >
        )
    }
}

function mapStateToProps({ auth }) {
    return {
        user: auth.user
    }
}
export default connect(mapStateToProps)(Chat);