import React, { useState } from "react";
import "./Chat.css";

const Chat = () => {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const handleUsernameSubmit = () => {
    if (username.trim() !== "") {
      // You can perform further validation if needed
      // For now, just setting the username
      setUsername(username.trim());
    }
  };

  const handleSendMessage = () => {
    const trimmedMessage = messageInput.trim();
    if (trimmedMessage !== "") {
      setMessages([...messages, { sender: username, message: trimmedMessage }]);
      setMessageInput("");
    }
  };

  return (
    <div className="terminal-loader">
      <div className="terminal-header">
        <div className="terminal-title">Status</div>
      </div>
      <br />
      <br />
      <div className="text">Loading...</div>
      <br />
      <br />
      {username ? (
        <div className="chat-container">
          <div className="chat-messages" id="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                <strong>{msg.sender}:</strong> {msg.message}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              id="message-input"
              placeholder="Type your message..."
              className="input"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button id="send-button" onClick={handleSendMessage}>
              send
            </button>
          </div>
        </div>
      ) : (
        <div className="username-input">
          <input
            type="text"
            id="username-input"
            placeholder="Enter your name"
            className="input"
            name="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <button
            id="username-button"
            onClick={handleUsernameSubmit}
            className="sendbtn"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
