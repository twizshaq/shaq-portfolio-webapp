"use client";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image'

export default function Instarecipe() {

    const tweetRef = useRef<HTMLDivElement | null>(null); // Create a ref to target the blockquote

    useEffect(() => {
        // Load the Twitter script only on the client-side, after component mount
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;

        if (tweetRef.current) { // Append the script to the div containing the blockquote
            tweetRef.current.appendChild(script);
        }

        return () => {
            // Cleanup: Remove the script when the component unmounts (optional but good practice)
            if (tweetRef.current && tweetRef.current.contains(script)) {
                tweetRef.current.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="main-imagegen-writeup">
            <Link href="/projects">
                <div className="bck-btn"><span className="bck-arrow"><FaArrowLeftLong /></span><p className="bck-btn-text">Back</p></div></Link>
            <div className="main-portfolio-writeup-body">
                <p className="mainheaders">Insta Recipe: AI-based Food Image Recognition with Recipe Discovery</p>
                <br /><br />
                <p className="secondaryheaders">Overview & Purpose</p>
                <p>Insta Recipe is a Next.js web application that identifies a dish from an uploaded image and provides users with its key ingredients, a suggested recipe, additional images, and even related links to Pinterest and YouTube. The main motivation behind this project was a spark of inspiration I thought it would be both fascinating and practical for anyone curious about recreating a dish they come across.</p>
                <br /><br />
                <p className="secondaryheaders">What Was Used</p>
                <p>To build this project, I utilized a modern tech stack and a couple of cloud services:</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>Google Gemini API</span><br />To analyze the uploaded food images and generate ingredient lists, recipes, and related dish information.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>Supabase</span><br />For user account creation and image handling. This setup allows users to sign up, upload images, and retrieve results securely.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>JavaScript</span><br />For handling client-side interactions and fine-tuning app logic.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>Search Queries</span><br />Dynamically constructed queries (using the recognized dish name) to generate relevant Pinterest and YouTube links.</p>
                <br />
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}} ref={tweetRef}>
                <blockquote className="twitter-tweet" data-media-max-width="560" data-chrome='noheader nofooter noborders transparent' ><p lang="en" dir="ltr">so i made this web app that analyzes food 😃 <a href="https://t.co/nhpDtnjUN8">pic.twitter.com/nhpDtnjUN8</a></p>&mdash; shaq (@twizshaq) <a href="https://twitter.com/twizshaq/status/1892621361916358794?ref_src=twsrc%5Etfw">February 20, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js"></script></div>
                <br /><br />
                <p className="secondaryheaders">Challenges</p>
                <p>This project presented several challenges, each offering valuable learning opportunities:</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>Supabase Integration</span><br />
                The biggest hurdle I faced was integrating Supabase for user account creation and image storage. As this was my first time using Supabase, I encountered a learning curve in configuring authentication, database rules, and ensuring a smooth user experience.</p>
                <br /><br />
                <p className="secondaryheaders">Key Features</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>Food Recognition & Recipe Generation</span><br />Users can upload a food image, and within seconds, the Google Gemini API identifies the dish, suggests possible ingredients, and provides a recipe outline.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>Additional Food Images & Quick Links</span><br />It also fetches related images of the recognized dish. Moreover, it generates dynamic links to Pinterest and YouTube, giving users instant access to more ideas, tutorials, and visual inspiration.</p>
                <br /><br />
            </div>
                <footer className="writeup-footer">
                    <span className="ai-copyright">© Shaquon Hamilton 2024.</span>
                </footer>
        </div>
    );
}