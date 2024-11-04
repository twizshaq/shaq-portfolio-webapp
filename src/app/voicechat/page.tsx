"use client";

import Zelyxai from "@/app/assets/Zelyxai.png";
import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import { BlobServiceClient } from "@azure/storage-blob";
import Link from 'next/link'
import { FaCheck } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Voicechat() {
    const [showDetails, setShowDetails] = useState(false);
    const dropdownRef = useRef<HTMLButtonElement | null>(null);
    const aichatOptRef = useRef<HTMLAnchorElement | null>(null);


const handleClickOutside = (event: MouseEvent) => { // Explicitly define 'event' as MouseEvent
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node) &&
            aichatOptRef.current &&
            !aichatOptRef.current.contains(event.target as Node)
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

    return (
        <div className="aimain">
            <Head>
            <link rel="preload" as="image" href="https://shaqportfoliostorage.blob.core.windows.net/images/zelyxai.png" />
            </Head>
            <button ref={dropdownRef} onClick={() => setShowDetails(!showDetails)} className='ai-selector-btn'><div className="ainameimg"><img src= "https://shaqportfoliostorage.blob.core.windows.net/images/zelyxai.png" alt="zelyx ai logo" /></div><span className='ai-drpdwn-icon'><MdKeyboardArrowDown /></span></button>

            {showDetails && ( 
            <div className='ai-opts-ctn'>
                <div className='ai-opt-child-ctn'>
                    <Link href="/aichat" className='zelyx-opt' ref={aichatOptRef}>
                        <p className='ai-title'>zelyx</p>
                        <p className='ai-desc'>A chatbot to answer questions about me</p>
                    </Link>
                    <button className='voice-opt' style={{backgroundColor: "rgba(255, 255, 255, .3"}}>
                        <p className='ai-title'>?????</p><span className='voicechat-tick'><FaCheck /></span>
                        <p className='ai-desc'>Coming Soon!</p>
                    </button>
                </div>
            </div>
            )}
            <p>Advanced Voice mode</p>
                <footer className="ai-footer">
                    <span className="ai-copyright">© Shaquon Hamilton 2024.</span>
                </footer>
        <div className="ai-bg-header"></div>
        <div className="ai-bg-footer"></div>
        </div>
    );
}
