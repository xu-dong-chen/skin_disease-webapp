import React, { useState } from "react";
import "./Chatbot.css";

async function sendMessage(){
    fetch("http://127.0.0.1:8000/chat")
}

function Chatbot(){

    const [isOpen,setIsOpen] = useState(false);
    
    const [message,setMessage] = useState("");
    const [history,setHistory] = useState([]);
    const [loading,setLoading] = useState(false);

    return (
        <div className="chatbot-container">
            { isOpen && (
                <div className="chat-window">
                    <h3>🤖 Skin Assistant</h3>

                    <div className="chat-messages">
                        {history.map((msg,index) => (
                            <div key = {index}>
                                <strong>{msg.sender}:</strong>{msg.text}
                            </div>
                        ))}
                    </div>

                    <input
                        type = "text"
                        placeholder="Ask a question"
                        value = {message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button>
                        Send
                    </button>
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