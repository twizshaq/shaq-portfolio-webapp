"use client";
import { useEffect, useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Head from 'next/head';
import Link from 'next/link';
import SVGShapes from "@/app/components/SVGShapes";

import imggen from "@/app/assets/image-gen-thumbnail.png"

export default function Projects() {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isHeart, setIsHeart] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");  // State for search term

// Apply overflow: hidden to the body when the component is mounted
    useEffect(() => {
    document.body.classList.add("no-scroll"); // Add the no-scroll class to the body
    return () => {
        document.body.classList.remove("no-scroll"); // Remove it on unmount
    };
}, []);

    const toggleHeart = () => {
        setIsHeart(!isHeart);
    };

    // Array of projects (you can expand this with more projects)
    const projects = [
        { name: "Portfolio Web-App", link: "/projects/portfolio-webapp", imgSrc: "https://shaqportfoliostorage.blob.core.windows.net/images/portfolio-webapp-project-pic.png", alt: "Portfolio Web-App Thumbnail"},
        { name: "Conditional Access", link: "/projects/conditional-access", imgSrc: "https://shaqportfoliostorage.blob.core.windows.net/images/phishing-conditional-access-project-pic.png", alt: "Conditional Access Thumbnail"},
        { name: "Appointment Scheduler", link: "/projects/hair-appointments", imgSrc: "https://shaqportfoliostorage.blob.core.windows.net/images/bzara-beauty-thumbail.jpg", alt: " Image Generator Thumbnail"},
        { name: "Image Generator", link: "/projects/image-generator", imgSrc: "https://shaqportfoliostorage.blob.core.windows.net/images/image-gen-thumbnail.jpg", alt: " Image Generator Thumbnail"},
        { name: "Real Estate Web Scraper", link: "/projects/realestate-webscraper", imgSrc: "https://shaqportfoliostorage.blob.core.windows.net/images/realestate-webscraper-thumbnail.png", alt: " Real Estate Web Scraper Thumbnail"}
    ];
    // const favprojects = [
    //     { name: "Portfolio Web-App", link: "/projects/portfolio-webapp", imgSrc: "/portfolio-webapp-project-pic.png" },
    //     // Add more projects here when ready
    //     // { name: "Conditional Access", link: "/projects/conditional-access", imgSrc: "/phishing-conditional-access-project-pic.png" }
    // ];

    // Filter projects based on search term
    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="projectMain">
            <Head>
                <link rel="preload" as="image" href="https://shaqportfoliostorage.blob.core.windows.net/images/projectspageimg.png" />
                <link rel="preload" as="image" href="https://shaqportfoliostorage.blob.core.windows.net/images/portfolio-webapp-project-pic.png" />
                <link rel="preload" as="image" href="https://shaqportfoliostorage.blob.core.windows.net/images/phishing-conditional-access-project-pic.png" />
            </Head>
            {/* <div className="project-bg-header"></div>  */}
            <span className="project-page-img">
                <img src="https://shaqportfoliostorage.blob.core.windows.net/images/projectspageimg.png" alt="Projects Page img" />
            </span>
            <div className="projects-comp-ctn">
                <div className="project-nav">
                    <form className="search-ctn">
                        <input
                            className="search-bar"
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                        />
                        <span>
                            <span className="search-icon"><IoMdSearch /></span>
                        </span>
                    </form>
                    <div className="filter-bar-ctn">
                        <div className="filter-bar">
                            <span className="heart-icon" onClick={toggleHeart}>{isHeart ? <span className='heart-icon-filled'><FaHeart /></span> : <FaRegHeart />}</span>
                        </div>
                    </div>
                </div>
                <div className="projects">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, index) => (
                            <div key={index} className="project-ctn">
                                <Link href={project.link}>
                                    <img className="project-img" src={project.imgSrc} alt={project.name} />
                                    <div className="project-name-ctn">{project.name}</div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="not-found">No Projects Found.</div>
                    )}
                </div>
                {/* <div className="project-bg-header"></div> */}
            </div>
            {/* <div className="projects-copyright">© Shaquon Hamilton 2024.</div> */}
            {/* <SVGShapes /> */}
        </div>
    );
}
