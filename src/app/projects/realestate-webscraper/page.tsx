"use client";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image'

export default function Imagegen() {

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
                <p className="mainheaders">Real Estate Web Scraper</p>
                <br /><br />
                <p className="secondaryheaders">Overview & Purpose</p>
                <p>This project showcases my ability to build a functional and user-centric web application that leverages web scraping techniques to gather and filter real estate listings. The core goal was to create a tool that allows users to dynamically search for properties based on specific criteria they select on the front end. This demonstrates my proficiency in both front-end and back-end development, including handling user input, implementing complex filtering logic, and managing data retrieved from external sources.</p>
                <br /><br />
                <p className="secondaryheaders">What Was Used</p>
                <p>To accomplish this, I leveraged a combination of powerful tools and technologies:</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• React with Next.js:</span> Used for building the dynamic and interactive user interface, allowing users to select search parameters and view the filtered listings.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• FastAPI (Python):</span> Employed as the back-end framework to handle API requests, implement the web scraping logic, and filter the scraped data based on the user's selected parameters.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Beautiful Soup (Python):</span> A Python library used for parsing the HTML content retrieved from the target real estate website, making it easy to extract relevant data points from the unstructured HTML.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Requests (Python):</span> A Python library used to make HTTP requests to the target website, fetching the HTML content that needed to be scraped.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Axios (JavaScript):</span> Used on the front-end to make asynchronous HTTP requests to the back-end API, sending the user's search parameters and receiving the filtered listings.</p>
                <br />
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}} ref={tweetRef}>
                <blockquote className="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr">made a real estate web scraper. currently only scrapes one site. but it works to a certain extent so that&#39;s another project to add to my portfolio <a href="https://t.co/UUTkgLUhEU">pic.twitter.com/UUTkgLUhEU</a></p>&mdash; shaq (@twizshaq) <a href="https://twitter.com/twizshaq/status/1873192791607787774?ref_src=twsrc%5Etfw">December 29, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script></div>
                <br /><br />
                <p className="secondaryheaders">Challenges</p>
                <p>This project presented several challenges, each contributing to a deeper understanding of web scraping and application development:</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• </span>Initial Filtering Inaccuracies: The primary challenge was ensuring the filtering logic accurately reflected the user's selections. Initially, the filtering based on property type (e.g., Villa/House) was not working correctly, leading to the display of irrelevant listings (like land). This required careful analysis of the scraped data and iterative refinement of the back-end filtering logic.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• </span>Dynamic and Varied Website Structure: Websites can have inconsistent HTML structures, making it challenging to reliably extract data. I had to identify stable CSS selectors and implement robust parsing logic to handle potential variations in the target website's HTML.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• </span>Accurate Property Type Identification: Determining the correct property type from the scraped data proved difficult, as the target website didn't always use consistent terminology in the listing titles. I had to adapt the back-end filtering to analyze other data points, like the bedbath field, to improve accuracy.</p>
                <br /><br />
                <p className="secondaryheaders">Lessons Learned</p>
                <p>This project reinforced the critical importance of data analysis and iterative development in web scraping and full-stack development. Key lessons learned include:</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• </span>The Importance of Understanding the Data: Initially, I relied on the short_title for filtering property types, but analyzing the scraped data revealed that the bedbath field was a more reliable source. This highlighted the necessity of thoroughly understanding the data being scraped before implementing filtering logic.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• </span>Adaptability to Website Structure: Web scraping requires adaptability. Understanding how to identify and utilize different data points when the primary ones are insufficient is a crucial skill.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• </span>Front-End and Back-End Integration: This project provided valuable experience in integrating front-end user interactions with back-end data processing, highlighting the importance of clear API design and communication between the two layers.</p>
                <br /><br />
            </div>
                <footer className="writeup-footer">
                    <span className="ai-copyright">© Shaquon Hamilton 2024.</span>
                </footer>
        </div>
    );
}