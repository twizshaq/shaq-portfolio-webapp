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
import SketchfabEmbed from '@/app/components/zelyx3d';


export default function Aichat() {
    const [showDetails, setShowDetails] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [showWelcome, setShowWelcome] = useState(true);
    const [welcomeText, setWelcomeText] = useState('');
    const [showVoiceChat, setShowVoiceChat] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    // const voiceOptRef = useRef<HTMLAnchorElement | null>(null);
    const [messages, setMessages] = useState<Array<{ text: string, fullText?: string, isAI: boolean }>>([]);
    const sketchfabModelUid = '45bcbeabab9949a3aaaea42a0255143f';
    const [hasSentMessage, setHasSentMessage] = useState(false); // New state variable

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
    setHasSentMessage(true); // Set hasSentMessage to true when a message is sent
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
        setHasSentMessage(true); // Set hasSentMessage to true when a predefined question is clicked
    };
    const [isZelyxHighlighted, setIsZelyxHighlighted] = useState(false);
    const handleZelyxButtonClick = () => {
        setIsZelyxHighlighted(!isZelyxHighlighted);
        setShowVoiceChat(!showVoiceChat);
    };

    return (
        <div className="flex flex-col items-center min-h-[100dvh]">
            <div ref={dropdownRef} className="relative">
                {/* Toggle button */}
                <button 
                    onClick={() => setShowDetails(!showDetails)}
                    className='fixed max-mobile3:left-[80px] max-mobile3:top-[13px] z-[1] top-[85px] left-1/2 -translate-x-1/2 rounded-[15px] pl-[15px] pr-[5px] pb-[2px] hover:bg-white hover:bg-opacity-[.1] flex'
                >
                    <div className="text-[2rem] font-extrabold">zelyx</div>
                    <span className='text-[2rem] mt-[11px]'>
                    <MdKeyboardArrowDown />
                    </span>
                </button>
                <div 
                    className='fixed max-mobile3:left-[0px] left-[0px] w-[100vw] max-mobile3:top-[-50px] z-[0] top-[0px] pl-[15px] pr-[5px] pb-[20px] max-mobile3:h-[130px] h-[140px] bg-[#101013] backdrop-blur-[5px] bg-opacity-[.8] flex max-mobile3:blur-[3px] blur-[10px]'>
                </div>
                <div 
                    className='fixed max-mobile3:left-[0px] left-[0px] w-[100vw] max-mobile3:top-[-2px] z-[1] top-[0px] pl-[15px] pr-[5px] pb-[2px] max-mobile3:h-[7px] h-[0px] bg-[#101013] bg-opacity-[1] flex '>
                </div>
                {/* Dropdown content */}
                {showDetails && (
                    <div onClick={() => setShowDetails(!showDetails)} className='fixed flex justify-center top-[150px] w-fit h-[150px] bg-black/60 backdrop-blur-sm border-[2.5px] border-[--outline-color] border-solid rounded-[35px] overflow-hidden z-[1] max-mobile3:top-[70px] max-mobile3:left-[15px] z-[20] mobile3:left-1/2 mobile3:-translate-x-1/2'>
                    <div className='ai-opt-child-ctn'>
                        <div className='w-[250px] h-[60px] text-start p-[7px] rounded-[22px] bg-white bg-opacity-[.3]'>
                        <p className='ai-title'>zelyx</p>
                        <span className='chatbot-tick'><FaCheck /></span>
                        <p className='ai-desc'>Assistive chat bot</p>
                        {/* <button
                            onClick={handleZelyxButtonClick}
                            className={`absolute flex items-center justify-center h-[50px] w-[50px] rounded-[17px] right-[15px] top-[16px] gap-[4px] ${
                                isZelyxHighlighted
                                ? 'bg-[var(--main-accent-color)]'
                                : 'bg-transparent hover:bg-[var(--main-accent-color)]'
                            }`}
                            >
                            <div className='bg-white w-[4px] h-[11px] rounded-full'></div>
                            <div className='bg-white w-[4px] h-[25px] rounded-full'></div>
                            <div className='bg-white w-[4px] h-[16px] rounded-full'></div>
                            <div className='bg-white w-[4px] h-[10px] rounded-full'></div>
                            </button> */}
                        </div>
                        <button className='w-[250px] h-[60px] text-start p-[7px] rounded-[22px] bg-transparent hover:bg-white hover:bg-opacity-[.3]'>
                            <p className='ai-title'>?????</p>
                            <p className='ai-desc'>Coming Soon!</p>
                        </button>
                    </div>
                </div>
                )}
            </div>
            {showVoiceChat ? (
            <div className='flex flex-col h-[100dvh] items-center justify-center gap-[50px]'>
                <div className='w-[500px] max-w-[90vw]'>
                    <p className='font-bold text-[1.5rem] text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae delectus qui tempore aliquid</p>
                </div>
                <div className='flex items-center justify-center h-[50px] w-[50px] rounded-[17px] right-[15px] top-[16px] gap-[4px]'>
                    <div className='bg-white w-[6px] h-[11px] rounded-full'></div>
                    <div className='bg-white w-[6px] h-[25px] rounded-full'></div>
                    <div className='bg-white w-[6px] h-[16px] rounded-full'></div>
                    <div className='bg-white w-[6px] h-[25px] rounded-full'></div>
                    <div className='bg-white w-[6px] h-[10px] rounded-full'></div>
                </div>
                <button className='font-semibold text-[1.3rem] bg-[--main-accent-color] hover:bg-[--main-accent-color-dark] py-[10px] px-[30px] rounded-full'>
                    <p>Tap to Speak</p>
                </button>
            </div>
        ) : (
            <div className="flex flex-col">
        {showWelcome && (
            <div className='flex flex-col gap-[30px] items-center justify-center w-[600px] max-w-[90vw] min-h-[100dvh]'>
                <div className='flex flex-col self-center text-center gap-[5px] z-[2]'>
                    <p className='font-semibold text-[1.5rem]'>Hey there, I'm <span className='fontshine1'>zelyx</span> shaq's personal assistant!</p>
                </div>
                <div className='flex flex-col bg-black bg-opacity-[.8] rounded-[35px] gap-[15px] pb-[16px] px-[15px] w-[550px] max-w-[90vw] border-[3px] border-transparent focus-within:border-[--outline-color] transition-colors duration-300 z-[10]'>
                    <div className='flex items-end justify-end'>
                        <textarea
                        placeholder='Ask a question!'
                        className='w-[100%] h-[70px] outline-none bg-black bg-opacity-[0] pt-[20px] pr-[100px] font-semibold pl-[10px] resize-none'
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}/>

                        <button className='absolute bg-[--main-accent-color] hover:bg-[--main-accent-color-dark] mr-[0px] py-[5px] px-[20px] rounded-full font-semibold' onClick={handleOutgoingChat}>send</button>
                    </div>
                    <div className='flex self-center w-[100%] gap-[15px] h-[40px] overflow-scroll font-semibold scrollbar-hidden mt-[5px]'>
                        <button className='py-[7px] px-[20px] min-w-fit rounded-full bg-[--ai-pdq-bgcolor] bg-opacity-[.8] fontshine' onClick={() => handlePredefinedQuestion("Who is Shaquon?")}>Who is shaq/shaquon?</button>
                        <button className='py-[7px] px-[20px] min-w-fit rounded-full bg-[--ai-pdq-bgcolor] fontshine' onClick={() => handlePredefinedQuestion("What are shaq's interests?")}>What are shaq's interests?</button>
                        <button className='py-[7px] px-[20px] min-w-fit rounded-full bg-[--ai-pdq-bgcolor] fontshine' onClick={() => handlePredefinedQuestion("What experiences does shaq have?")}>What experiences does shaq have?</button>
                        <button className='py-[7px] px-[20px] min-w-fit rounded-full bg-[--ai-pdq-bgcolor] fontshine' onClick={() => handlePredefinedQuestion("What are shaq's skills?")}>What are shaq's skills?</button>
                    </div>
                </div>
            </div>
            )}
            {hasSentMessage && (
            <div className="flex flex-col w-[550px] max-w-[90vw] mt-[120px] pb-[120px] max-mobile3:mt-[80px]">
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
        )}
            {hasSentMessage && (
                <div className='fixed items-center justify-center bottom-[0px] flex flex-col pb-[15px] px-[15px] w-[550px] max-w-[90vw] h-[85px]'>
                    <div className='absolute flex items-end justify-end bg-black bg-opacity-[.6] pb-[15px] px-[15px] bottom-[20px] w-[550px] max-w-[90vw] rounded-[30px] border-[2.5px] border-[--outline-color]'>
                        <textarea
                        placeholder='Ask a question!'
                        className='w-[100%] h-[70px] outline-none bg-black bg-opacity-[0] pt-[15px] pr-[100px] font-semibold pl-[10px] resize-none'
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}/>

                        <button className='absolute bg-[--main-accent-color] hover:bg-[--main-accent-color-dark] mr-[0px] py-[5px] px-[20px] rounded-full font-semibold' onClick={handleOutgoingChat}>send</button>
                    </div>
                    <div className='fixed self-center w-[550px] h-[120px] bg-[--mainbg-color] -z-[20]'></div>
                </div>
            )}
            </div>
        )}
        {/* <Head>
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
                    </button> */}
                    {/* <Link href='/voicechat' className='voice-opt' ref={voiceOptRef}>
                        <p className='ai-title'>?????</p>
                        <p className='ai-desc'>Coming Soon!</p>
                    </Link> */}
                {/* </div>
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
            <div className="ai-comp-ctn"> */}
                {/* <div className="aioutput"> */}
                    {/* {messages.map((msg, index) => (
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
                </footer> */}
            {/* </div> */}
        {/* <footer className="ai-footer">
            <span className="ai-copyright">© Shaquon Hamilton 2024.</span>
        </footer> */}
        {/* <div className="ai-bg-header"></div>
        <div className="ai-bg-footer"></div> */}
        </div>
    );
}