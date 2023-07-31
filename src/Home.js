import React, {useState} from "react";
import './styles/style.css'
import './styles/Results.css'
import SearchBarForm from './Components/SearchBarForm'
import SearchAndTableContainer from "./Components/SearchandTableContainer";
import ChatButton from "./Components/ChatButton";
import ChatOverlay from "./Components/ChatOverlay";

const Home = () => {
    const [showChat,setShowChat] = useState(false);

    const toggleChat = () => {
        console.log("Toggle Chat Called");
        setShowChat((prevshowChat) => !prevshowChat);
    }

    return (
        <div>
            <div className="container" showChat={showChat}>
                <h1>Eurosearcher</h1>
                <SearchAndTableContainer />
                <ChatButton onClick={toggleChat} />
            </div>
            {showChat && <ChatOverlay />}
        </div>
    )
}

export default Home;