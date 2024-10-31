"use client";
import { useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { HiOutlineBookmark } from "react-icons/hi";
import { HiBookmark } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Head from 'next/head';
import Link from 'next/link';

export default function Projects() {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isHeart, setIsHeart] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");  // State for search term

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const toggleHeart = () => {
        setIsHeart(!isHeart);
    };

    // Array of projects (you can expand this with more projects)
    const projects = [
        { name: "Portfolio Web-App", link: "/projects/portfolio-webapp", imgSrc: "https://shaqportfoliostorage.blob.core.windows.net/images/portfolio-webapp-project-pic.png", alt: "Portfolio Web-App Thumbnail"},
        { name: "Conditional Access", link: "/projects/conditional-access", imgSrc: "https://shaqportfoliostorage.blob.core.windows.net/images/phishing-conditional-access-project-pic.png", alt: "Conditional Access Thumbnail"},
        // { name: "Employee Onboarding", link: "/projects/conditional-access", imgSrc: "", alt: " Employee Onboarding Thumbnail"}
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
                            <span className="heart-icon" onClick={toggleHeart}>{isHeart ? <FaHeart /> : <FaRegHeart />}</span>
                            <span className="bookmrk-icon" onClick={toggleBookmark}>{isBookmarked ? <HiBookmark /> : <HiOutlineBookmark />}</span>
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
                <div className="project-bg-header"></div>
                <div className="project-bg-footer"></div>
                <footer className="ai-footer">
                    <span className="ai-copyright">© Shaquon Hamilton 2024.</span>
                </footer>
            </div>
        </div>
    );
}
