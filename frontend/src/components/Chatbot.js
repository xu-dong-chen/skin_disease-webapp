import React, { useState } from "react";
import "./Chatbot.css";

async function sendMessage(){
    fetch("http://127.0.0.1:8000/chat")
}

function Chatbot(){

    const [isOpen,setIsOpen] = useState(false);
    
    const [message,setMessage] = useState("");
    const [history,setHistory] = useState("");

    return (
        <div className="chatbot-container">
            { isOpen && (
                <div className="chat-window">
                    <h3>🤖 Skin Assistant</h3>

                    <p>Hello! Ask me about common skin diseases.</p>

                </div>
                )}
            
            <button className="chat-button"
                    onClick={() => setIsOpen(!isOpen)}
            >
                💬
            </button>
        </div>
    );
}

export default Chatbot;