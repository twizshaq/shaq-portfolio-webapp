"use client";
import React, { useState } from 'react';
import { TbSend } from "react-icons/tb";
import zelyxai from "@/app/assets/zelyxai.png";

export default function Aichat() {
    const [loading, setLoading] = useState(false);

    // Handles sending out messages
    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState<Array<{ text: string, isAI: boolean }>>([]);

    const fetchAIResponse = async (message: string) => {
        setLoading(true);
        try {
            // Replace 'your-azure-openai-endpoint' and 'your-api-key' with your actual endpoint and API key
            const response = await fetch('https://resume-bot.openai.azure.com/openai/deployments/zelyx-gpt/chat/completions?api-version=2023-03-15-preview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': '244d1a258a954e22886291ee270ee399', // Correct header for API key
                },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: message }],
                    max_tokens: 500, // Adjust this value based on the desired length of the response
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
                throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
            }
            const data = await response.json();
            const aiMessage = data.choices[0].message.content.trim(); // Adjust based on API response structure
            setMessages(prevMessages => [...prevMessages, { text: aiMessage, isAI: true }]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            setMessages(prevMessages => [...prevMessages, { text: 'Error: Could not get a response from the AI.', isAI: true }]);
        } finally {
            setLoading(false);
        }
    };

    const handleOutgoingChat = () => {
        const message = userMessage.trim();
        if (!message) return; // Exit if there is no message

        console.log(message);
        setMessages([...messages, { text: message, isAI: false }]); // Add the new message to the messages list
        setUserMessage(''); // Clear the input field after sending the message

        // Fetch AI response
        fetchAIResponse(message);

        // Show loading indicator after a delay
        setLoading(true);
        setTimeout(() => setLoading(false), 2000); // Corrected the syntax to properly set loading to false after delay
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default action for Enter key press
            handleOutgoingChat();
        }
    };

    return (
        <div className="aimain">
            <button className="ainame"><img src={zelyxai.src} alt="zelyx ai logo" /></button>
            <div className="aioutput">
                {/* <p className="aiwelcome">Welcome ✦</p> */}
                {/* Render each message in the messages array */}
                {messages.map((msg, index) => (
                    <div key={index} className={msg.isAI ? "aiMessage" : "userMessage"}>
                        <p>{msg.text}</p>
                    </div> ))}
                    {/* <p className='userMessage'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod dignissimos ducimus, consequatur, deleniti vero nostrum, repellendus sed esse expedita fugiat voluptatem dolore praesentium. Eligendi odio nostrum nulla numquam quisquam iste.</p>
                    <p className='aiMessage'>Lorem ipsum dolor sit alla numq quisquam iste.</p>
                    <p className='aiMessage'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod dignissimos ducimus, consequatur, deleniti vero nostrum, repellendus sed esse expedita fugiat voluptatem dolore praesentium. Eligendi odio nostrum nulla numquam quisquam iste.</p>
                    <p className='aiMessage'>Lorem ipsum dolor sit alla numq quisquam iste.</p>
                    <p className='userMessage'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod dignissimos ducimus, consequatur, deleniti vero nostrum, repellendus sed esse expedita fugiat voluptatem dolore praesentium. Eligendi odio nostrum nulla numquam quisquam iste.</p>
                    <p className='aiMessage'>Lorem ipsum dolor sit alla numq quisquam iste.</p> */}
                    {/* <div className="loading-indicator">
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                    </div> */}
                {loading && (
                    <div className="loading-indicator">
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                    </div>
                )}
            </div>
            <form className="aiquestbox" onSubmit={(e) => e.preventDefault()}>
                <input
                    className="inputchat"
                    type="text"
                    placeholder="Ask a question!"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <span className="send-button" onClick={handleOutgoingChat}><TbSend/></span>
            </form>
        </div>
    );
}