"use client";

import React, { useState } from 'react';
import { VscSparkleFilled } from "react-icons/vsc";
import Zelyxai from "@/app/assets/Zelyxai.png";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BlobServiceClient } from "@azure/storage-blob";

export default function Aichat() {
    const [loading, setLoading] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState<Array<{ text: string, isAI: boolean }>>([]);

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
    const genAI = new GoogleGenerativeAI(apiKey);
    const systemInstruction = process.env.NEXT_PUBLIC_GEMINI_SYSTEM_INSTRUCTIONS as string;

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: systemInstruction,
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    const fetchAIResponse = async (message: string) => {
        setLoading(true);
        try {
            const chatSession = model.startChat({
                generationConfig,
            });

            const result = await chatSession.sendMessage(message);
            const aiMessage = (await result.response.text()).trim();

            setMessages(prevMessages => [
                ...prevMessages,
                { text: aiMessage || 'Error: No valid response from the AI.', isAI: true }
            ]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            setMessages(prevMessages => [
                ...prevMessages,
                { text: 'Error: Could not get a response from the AI.', isAI: true }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleOutgoingChat = () => {
        const message = userMessage.trim();
        if (!message) return;

        setMessages([...messages, { text: message, isAI: false }]);
        setUserMessage('');
        fetchAIResponse(message);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleOutgoingChat();
        }
    };

    return (
        <div className="aimain">
            <button className="ainameimg"><img src= "https://myportfoliocdnendpoint-anarfba5egc2hthe.z02.azurefd.net/images/zelyxai.png" alt="zelyx ai logo" /></button>
            <div className="ai-comp-ctn">
                <div className="aioutput">
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.isAI ? "aiMessage" : "userMessage"}>
                            <p>{msg.text}</p>
                        </div> ))}
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
                    <span className="send-button" onClick={handleOutgoingChat}><span className="VscSparkleFilled"><VscSparkleFilled /></span></span>
                </form>
                <footer className="ai-footer">
                    <span className="ai-copyright">© Shaquon Hamilton 2024.</span>
                </footer>
            </div>
        {/* <footer className="ai-footer">
            <span className="ai-copyright">© Shaquon Hamilton 2024.</span>
        </footer> */}
        </div>
    );
}
