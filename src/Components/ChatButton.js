import React from "react";


function ChatButton(props) {
    return (
        <button className="chatbutton" onClick={props.onClick}>
            Ask for an Achievement
        </button>
    );
}
export default ChatButton