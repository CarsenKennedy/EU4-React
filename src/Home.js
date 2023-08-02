import React, {useState} from "react";
import './styles/style.css'
import './styles/Results.css'
import SearchAndTableContainer from "./Components/SearchandTableContainer";
import ChatButton from "./Components/ChatButton";
import ChatOverlay from "./Components/ChatOverlay";

const Home = () => {
    const [showChat,setShowChat] = useState(false);
    const [isChatVisible,setIsChatVisible] = useState(false);


    const toggleChat = () => {
        if(!showChat) {
            setShowChat(true);
        }
        setIsChatVisible((prevIsChatVisible) => !prevIsChatVisible);
    }

    const handleChatHide = () => {
        setIsChatVisible(false);
    }

    return (
        <div>
            <div className="container">
                <h1>Eurosearcher</h1>
                <SearchAndTableContainer />
                <ChatButton onClick={toggleChat} />
            </div>
            {showChat && <ChatOverlay onChatHide={handleChatHide}
                                     isVisible={isChatVisible}
                                />}
        </div>
    )
}

export default Home;