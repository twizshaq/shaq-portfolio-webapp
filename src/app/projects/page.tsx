"use client";
import { useSpring, animated } from 'react-spring';
import { TbArrowsSort } from "react-icons/tb";
import { MdMovieFilter } from "react-icons/md";
import { TbAdjustments } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";
import { HiOutlineBookmark } from "react-icons/hi";
import { HiBookmark } from "react-icons/hi2";
import { useState } from 'react';

export default function Projects() {

    const [isBookmarked, setIsBookmarked] = useState(false);

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    return (
        <div className="projectMain">
            <span className="project-page-img">
                <img src= "https://shaqportfoliostorage.blob.core.windows.net/images/projectspageimg.png" alt="Projects Page img" />
            </span>
            <div className="projects-comp-ctn">
                <div className="project-nav">
                    <form className="search-ctn">
                        <input className="search-bar" type="text" placeholder="Search"/>
                    <span>
                        <span className="search-icon"><IoMdSearch /></span>
                    </span>
                </form>
                <div className="filter-bar-ctn">
                    <div className="filter-bar">
                        <span className="sort-arrows"><TbArrowsSort /></span>
                        <span className="filter-settings"><TbAdjustments /></span>
                        <span className="bookmrk-icon" onClick={toggleBookmark}>{isBookmarked ? <HiBookmark /> : <HiOutlineBookmark />}</span>
                    </div>
                </div>
            </div>
            <div className="projects">
                <div className="temp-ctn">
                    <span className="projects-coming-soon">
                        <img src= "https://shaqportfoliostorage.blob.core.windows.net/images/shadow.png" alt="Projects Page img" />
                    </span>
                </div>
            </div>
                <footer className="projects-footer">
                    <span className="projects-copyright">© Shaquon Hamilton 2024.</span>
                </footer>
            </div>
        </div>
    );
}