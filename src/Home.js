import React from "react";
import './styles/style.css'
import './styles/Results.css'
import SearchBarForm from './Components/SearchBarForm'
import SearchAndTableContainer from "./Components/SearchandTableContainer";
import ChatButton from "./Components/ChatButton";

const Home = () => {
    return (
        <div className="container">
            <h1>Eurosearcher</h1>
            <SearchAndTableContainer />
            <ChatButton/>
        </div>
    )
}

export default Home;