import React from "react";

// 
function ChatButton(props) {
    console.log("ChatButton Rendered");
    return (
        <button className="chatbutton" onClick={props.onClick}>
            Ask for an Achievement
        </button>
    );
}
export default ChatButton