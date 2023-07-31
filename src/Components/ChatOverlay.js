import React, { Component, createRef } from "react";


export default class ChatOverlay extends React.Component {
    constructor(props){
        super(props)
        this.inputRef = createRef();
    }
    state = {
        messages:[],
    }
    addMessage = (message) => {
        this.setState((prevState) => ({
            messages: [...prevState.messages, message]
        }));
    }

    handleMessageSend = (event) => {
        const inputValue = this.inputRef.current.value.trim();
        event.preventDefault();
        if (inputValue !== '') {
            const newMessage = {
                text: inputValue,
                author: "User",
            };
            this.addMessage(newMessage);
            this.inputRef.current.value = '';   
        }
        // Create api call 
        

    }
// Neccessary components
// Needs exit button for chat overlay to close but keep state until refresh
// if chat button is opened for first time on this page send greet message 
// chat messages 
// send question to lambda then return the result in the messagequeue
// Make profile avatars go to top of the message div and justify content to the top of div too
// Make ai messages go on left and user messages go on right
//
//
    render () {
        const {messages} = this.state;
        return(
            <div className="OverlayContainer">
                <div className="OverlayPopup">
                    <div className="chatHistory">
                        {messages.map((message) => (
                            <Message data = {message} />
                        ))}
                    </div>
                    <div className="chatTextArea">
                        <form className="chatArea" onSubmit={this.handleMessageSend}>
                            <input id = "textBox" type="text" ref={this.inputRef} placeholder="Ask ChatGPT a question..."></input>
                            <button id ="textBoxButton" type ="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-reactid="1036">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button> 
                        </form>
                    </div>
                </div>
            </div>
        )
}



}

const Message  = ({data}) => {
    const {author,text} =data;
    const isUser = author === "User";
    const messageClassName = `Message ${isUser ? "User" : "" }`
    return (

        <div className={messageClassName}>
            <span className="Author"></span>
            <span className="Text">{text}</span>
        </div>
    )
}


