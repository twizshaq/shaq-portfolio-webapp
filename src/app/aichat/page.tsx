"use client";

import { useState, useRef, useEffect } from 'react';
import { VscSparkleFilled } from "react-icons/vsc";
import Zelyxai from "@/app/assets/Zelyxai.png";
import Head from 'next/head';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BlobServiceClient } from "@azure/storage-blob";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import Link from 'next/link'
import { motion } from "framer-motion";


export default function Aichat() {
    const [showDetails, setShowDetails] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [showWelcome, setShowWelcome] = useState(true);
    const [welcomeText, setWelcomeText] = useState('');
    const dropdownRef = useRef<HTMLButtonElement | null>(null);
    // const voiceOptRef = useRef<HTMLAnchorElement | null>(null);
    const [messages, setMessages] = useState<Array<{ text: string, fullText?: string, isAI: boolean }>>([]);

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
    const genAI = new GoogleGenerativeAI(apiKey);
    const systemInstruction = process.env.NEXT_PUBLIC_GEMINI_SYSTEM_INSTRUCTIONS as string;

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-002",
    systemInstruction: systemInstruction,
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 21,
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
    const aiMessageFullText = (await result.response.text()).trim();

    setMessages(prevMessages => [
        ...prevMessages,
        { text: '', fullText: aiMessageFullText || 'Error: No valid response from the AI.', isAI: true }
    ]);

      setLoading(false); // Move setLoading(false) here

    typeMessage(aiMessageFullText);

    } catch (error) {
        console.error('Error fetching AI response:', error);
        setMessages(prevMessages => [
        ...prevMessages,
        { text: 'Error: Could not get a response from the AI.', isAI: true }
    ]);
      setLoading(false); // Ensure loading is false if there's an error
    }
};

const typeMessage = (fullText: string) => {
    let index = 0;
    const typingSpeed = 20; // Adjust typing speed as desired (milliseconds per character)

    const interval = setInterval(() => {
        index++;
        setMessages(prevMessages => {
        const lastIndex = prevMessages.length - 1;
        const lastMessage = prevMessages[lastIndex];

        if (lastMessage.isAI) {
            return [
            ...prevMessages.slice(0, lastIndex),
            {
                ...lastMessage,
                text: fullText.slice(0, index),
            }
        ];
        } else {
            return prevMessages;
        }
    });

    if (index >= fullText.length) {
        clearInterval(interval);
        // Remove setLoading(false) from here
        }
    }, typingSpeed);
};

    const typeWelcomeMessage = (fullText: string) => {
        let index = 0;
        const typingSpeed = 50; // Adjust typing speed as desired (milliseconds per character)

        const interval = setInterval(() => {
            index++;
            setWelcomeText(fullText.slice(0, index));

            if (index >= fullText.length) {
                clearInterval(interval);
            }
        }, typingSpeed);
    };

    useEffect(() => {
        typeWelcomeMessage("Welcome to zelyx");
    }, []);

const handleOutgoingChat = () => {
    const message = userMessage.trim();
    if (!message) return;

    setMessages([...messages, { text: message, isAI: false }]);
    setUserMessage('');
    setShowWelcome(false);
    fetchAIResponse(message);
};

const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleOutgoingChat();
    }
};

const handleClickOutside = (event: MouseEvent) => { // Explicitly define 'event' as MouseEvent
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
            // voiceOptRef.current &&
            // !voiceOptRef.current.contains(event.target as Node)
        ) {
            setShowDetails(false); // Close dropdown if click is outside and not on the voice link
        }
    };

    useEffect(() => {
        // Add event listener for clicks
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Clean up event listener on component unmount
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handlePredefinedQuestion = (question: string) => {
        setShowWelcome(false); // Hide the welcome container
        setMessages([...messages, { text: question, isAI: false }]);
        fetchAIResponse(question);
    };
    
    return (
        <div className="aimain">
            <Head>
            <link rel="preload" as="image" href="https://shaqportfoliostorage.blob.core.windows.net/images/zelyxai.png" />
            </Head>
            <button ref={dropdownRef} onClick={() => setShowDetails(!showDetails)} className='ai-selector-btn'><div className="ainameimg"><img src= "https://shaqportfoliostorage.blob.core.windows.net/images/zelyxai.png" alt="zelyx ai logo" /></div><span className='ai-drpdwn-icon'><MdKeyboardArrowDown /></span></button>

            {showDetails && ( 
            <div className='ai-opts-ctn'>
                <div className='ai-opt-child-ctn'>
                    <button className='zelyx-opt' style={{backgroundColor: "rgba(255, 255, 255, .3)"}}>
                        <p className='ai-title'>zelyx</p><span className='chatbot-tick'><FaCheck /></span>
                        <p className='ai-desc'>A chatbot to answer questions about me</p>
                    </button>
                    <button className='voice-opt'>
                        <p className='ai-title'>?????</p>
                        <p className='ai-desc'>Coming Soon!</p>
                    </button>
                    {/* <Link href='/voicechat' className='voice-opt' ref={voiceOptRef}>
                        <p className='ai-title'>?????</p>
                        <p className='ai-desc'>Coming Soon!</p>
                    </Link> */}
                </div>
            </div>
            )}
            
            {showWelcome && (
                <motion.div 
                    className='zelyx-welcome-ctn'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div className='zelyx-welcome-text'>
                        <span className='wtz'>{welcomeText}</span>
                        <br />
                    </div>
                <motion.span 
                    className='wwyltkas'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    What would you like to know about Shaq?
                </motion.span>
                <motion.div 
                    className='pre-opts'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                >
                    <button className='wis' onClick={() => handlePredefinedQuestion("Who is Shaquon?")}>Who is Shaquon?</button>
                    <button className='wedsh' onClick={() => handlePredefinedQuestion("What experiences does Shaq have?")}>What experiences does Shaq have?</button>
                    </motion.div>
                </motion.div>
            )}
            {/* <div className='blobs-ctn'>
                <div className='blob1'></div>
                <div className='blob2' id='blob2id'></div>
                <div className='blob3'></div>
                <div className='blob4'></div>
            </div> */}
            <div className="ai-comp-ctn">
                {/* <div className="aioutput"> */}
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
            {/* </div> */}
        {/* <footer className="ai-footer">
            <span className="ai-copyright">© Shaquon Hamilton 2024.</span>
        </footer> */}
        <div className="ai-bg-header"></div>
        <div className="ai-bg-footer"></div>
        </div>
    );
}
