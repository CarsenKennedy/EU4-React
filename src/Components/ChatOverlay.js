import React, { Component, createRef,useState } from "react";
import awsKey from "./awskey.js";


export default class ChatOverlay extends React.Component {
    constructor(props){
        super(props)
        this.inputRef = createRef();
    }
    state = {
        messages:[],
        isVisible: this.props.isVisible,
    }
    scrollToBottom = () => {
        this.el.scrollIntoView({behavior: 'smooth'});
    }
    componentDidMount() {
        this.scrollToBottom();
        this.setState({isVisible: true});
    }
    componentDidUpdate(prevProps) {
        if (this.props.isVisible !== prevProps.isVisible) {
            if (this.props.isVisible) {
              this.scrollToBottom();
            }
            this.setState({ isVisible: this.props.isVisible });
          }
        this.scrollToBottom();
    }
    handleHide = () => {
        this.setState({ isVisible: false });
        this.props.onChatHide();
    }
    addMessage = (message) => {
        this.setState((prevState) => ({
            messages: [...prevState.messages, message]
        }));
    }

    handleMessageSend = (event) => {
        const apiKey =awsKey;
        const apiURL = "https://29lijdshz3.execute-api.us-west-2.amazonaws.com/default/messages";
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'x-api-key': apiKey,
                     },
            body: JSON.stringify({"text": this.inputRef.current.value.trim() })
        };
        const inputValue = this.inputRef.current.value.trim();
        event.preventDefault();
        if (inputValue !== '') {
            const newMessage = {
                text: inputValue,
                author: "User",
            };
            this.addMessage(newMessage);
            this.inputRef.current.value = '';   
            fetch(apiURL, requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((responseData) => {
                    const aiResponse = {
                        text: responseData['text'],
                        author: "AI",
                        };
                    this.addMessage(aiResponse);
                    }
                )

                .catch((error) => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
                        
        

        }
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
        const {messages,isVisible} = this.state;


        return(
            <div className="OverlayContainer"
                style={{ display: isVisible ? "flex" : "none" }}
            >
                <div className="OverlayPopup">
                    <div className="chatHeader">
                        <button className="closeButton" onClick={this.handleHide}>
                        <svg id="closeIcon"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                          d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                          fill="#fff"
                        />
                      </svg>
                        </button>
                    </div>
                    <div className="chatHistory">
                        <Message className="Message AI" data = {{text: "Hello, I am ChatGPT, how can I help you?", author: "ChatGPT"}} />
                        {messages.map((message,index) => (
                            <Message key={index} data = {message} />
                        ))}
                        <div ref = {el => {this.el = el;}} className="chatHistoryBottom"  />
                    </div>
                    <div className="chatTextArea">
                        <form className="chatArea" onSubmit={this.handleMessageSend}>
                            <input id = "textBox" type="text" ref={this.inputRef} placeholder="Ask ChatGPT a question..."></input>
                            <button id ="textBoxButton" type ="submit">
                                <svg id = "chatsend" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" data-reactid="1036">
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
    const messageClassName = `${isUser ? "User" : "AI" }`
    return (

        <div className="Message">
            <span className={messageClassName}></span>
            <span className="Text">{text}</span>
        </div>
    )
}


