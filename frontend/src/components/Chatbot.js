import React, { useState,useEffect,useRef } from "react";
import "./Chatbot.css";

function Chatbot(){

    const [isOpen,setIsOpen] = useState(true); // boolean value to chat window
    
    const [message,setMessage] = useState(""); // user message
    const [history,setHistory] = useState([]); // chat history
    const [loading,setLoading] = useState(false); // boolean value to indicate if the AI is repsonding or not
    
    // function when the user sends a message
    const sendMessage = async () => {

        if (loading){ // if the program is still loading (more for protection)
            return;
        }

        const userMessage = { // User message to save into the chat history
            sender: "You", 
            text: message
        };
        if(!message.trim()){ // check if its an empty message
            return;
        }
        
        // update chat history and clear the last message inputted by the user
        setHistory(prev => [...prev, userMessage]); 
        setMessage("");

        setLoading(true);
        // Try catch finally to get ai response and catch errors
        try{
            const response = await fetch("https://your-chatbot-backend.onrender.com/chat", 
                {
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        message: message
                    })
                })

            const data = await response.json();

            const aiResponse = {
                sender: "AI",
                text: data.response
            }
            setHistory(prev => [...prev, aiResponse]);
        }
        catch(error){
            console.error(error);
        }
        finally{
            setLoading(false) // Will always run to enable the user to ask another question
        }
    }   

    const chatEndRef = useRef(null);
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [history])

    return (
        <div className="chatbot-container">
            { isOpen && (
                <div className="chat-window">
                    <h3>🤖 Skin Assistant</h3>

                    <div className="chat-messages"> 
                        {history.map((msg,index) => ( 
                            <div key = {index} className={`message ${msg.sender === "You" ? "user-message" : "ai-message"}`}>
                                <strong>{msg.sender}</strong>
                                <br />
                                {msg.text}
                            </div>
                        ))}
                        <div ref={chatEndRef}></div>
                    </div>

                    <div className="chat-input">
                        <input
                            type = "text"
                            placeholder="Ask a question"
                            value = {message}
                            onChange={(e) => setMessage(e.target.value)}

                            onKeyDown={(e) => {
                                if(e.key === "Enter"){
                                    sendMessage();
                                }
                            }}
                        />

                        <button onClick={sendMessage} // Button to send question and disabled while AI is generating answer
                                disabled = {loading}>
                            {loading ? "Thinking..." : "Send"} 
                        </button>
                    </div>
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