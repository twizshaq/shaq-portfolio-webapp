"use client";
import { useEffect, useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { LuGithub } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { PiInfoBold } from "react-icons/pi";
import Head from 'next/head';
import { PiStarFourFill } from "react-icons/pi";
import Link from 'next/link';
import SVGShapes from "@/app/components/SVGShapes";

import imggen from "@/app/assets/image-gen-thumbnail.png"

// Define the Project type
interface Project {
    name: string;
    link: string;
    imgSrc: string;
    alt: string;
    isFavorite: boolean;
}


export default function Projects() {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isHeart, setIsHeart] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    // Explicitly type favoriteProjects state as Project[]
    const [favoriteProjects, setFavoriteProjects] = useState<Project[]>([]);

    useEffect(() => {
        document.body.classList.add("no-scroll");
        return () => {
        document.body.classList.remove("no-scroll");
        };
    }, []);

    const toggleHeart = () => {
        setIsHeart(!isHeart);
    };

    const legacyProjects: Project[] = [ // Type legacyProjects array
        { name: "Conditional Access", link: "/projects/conditional-access", imgSrc: "https://shaqportfoliostorage.blob.core.windows.net/images/phishing-conditional-access-project-pic.png", alt: "Conditional Access Thumbnail", isFavorite: false },
        { name: "Appointment Scheduler", link: "/projects/hair-appointments", imgSrc: "https://shaqportfoliostorage.blob.core.windows.net/images/bzara-beauty-thumbail.jpg", alt: " Image Generator Thumbnail", isFavorite: false },
        { name: "Image Generator", link: "/projects/image-generator", imgSrc: "https://shaqportfoliostorage.blob.core.windows.net/images/image-gen-thumbnail.jpg", alt: " Image Generator Thumbnail", isFavorite: false },
        { name: "Real Estate Web Scraper", link: "/projects/realestate-webscraper", imgSrc: "https://shaqportfoliostorage.blob.core.windows.net/images/realestate-webscraper-thumbnail.png", alt: " Real Estate Web Scraper Thumbnail", isFavorite: false }
    ];

    const newProjects: Project[] = [ // Type newProjects array
        { name: "Insta Recipe", link: "/projects/insta-recipe", imgSrc: "https://insta-recipe-assets.s3.us-east-1.amazonaws.com/insta-recipe-thumbnail.jpg", alt: "Insta Recipe Thumbnail", isFavorite: true },
        { name: "Portfolio Web-App", link: "/projects/portfolio-webapp", imgSrc: "https://shaqportfoliostorage.blob.core.windows.net/images/portfolio-webapp-project-pic.png", alt: "Portfolio Web-App Thumbnail", isFavorite: true },
    ];

    // Combine project lists for unified search and favorite filtering
    const allProjects: Project[] = [...newProjects, ...legacyProjects]; // Type allProjects array

    // Filter all projects based on search term
    const filteredProjects = allProjects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleFavoriteProject = (projectName: string) => { // Type projectName parameter
        const updatedProjects = allProjects.map(project => {
            if (project.name === projectName) {
                return { ...project, isFavorite: !project.isFavorite };
            }
            return project;
        });

        // Update both the individual project lists and the combined list (if needed for state management elsewhere)
        // In this simplified example, we're not managing newProjects and legacyProjects in state,
        // so we don't need to update them here.

        setFavoriteProjects(updatedProjects.filter(project => project.isFavorite));
    };

    useEffect(() => {
    // This will run once on mount and ensure that anything marked
    // isFavorite: true in the array goes into favoriteProjects.
    const alreadyFavorited = allProjects.filter(p => p.isFavorite);
    setFavoriteProjects(alreadyFavorited);
    }, []);

    const projectsToRender = isHeart
        ? favoriteProjects
        : searchTerm
            ? filteredProjects
            : allProjects;


    return (
        <div className="projectMain">
        <Head>
            <link rel="preload" as="image" href="https://shaqportfoliostorage.blob.core.windows.net/images/projectspageimg.png" />
            <link rel="preload" as="image" href="https://shaqportfoliostorage.blob.core.windows.net/images/portfolio-webapp-project-pic.png" />
            <link rel="preload" as="image" href="https://shaqportfoliostorage.blob.core.windows.net/images/phishing-conditional-access-project-pic.png" />
        </Head>

        <div className="project-page-img">
            <div className='absolute ml-[49px] mt-[5px] rotate-[35deg] z-[2] max-mobile3:text-[.75rem] text-[0rem] drop-shadow-[0px_0px_2px_rgba(255,255,255,.5)]'><PiStarFourFill /></div>
            <div className='absolute ml-[50px] mt-[8px] max-mobile3:w-[10px] w-[0px] max-mobile3:h-[9px] bg-[--mainbg-color]'></div>
            <div className="max-mobile3:text-[2rem] text-[0rem] font-extrabold">Projects</div>
        </div>

            <div className="mt-[240px] h-[calc(100vh-240px)] overflow-y-auto pb-5 flex flex-col items-center text-center max-mobile3:mt-[190px] max-mobile3:h-[calc(100dvh-190px)] scrollbar-hidden">
                <div className="project-nav">
                <form className="search-ctn">
                    <input
                    className="h-fit w-[90vw] max-w-[400px] rounded-full border-[3px] border-[--outline-color] bg-[var(--inner-bg-color)] pl-12 outline-none font-semibold py-[11px]"
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute text-[1.8rem] ml-[13px] mt-[0%] text-[--outline-color-light]"><IoMdSearch /></span>
                </form>
                <div className="filter-bar-ctn">
                    <div className="filter-bar">
                        <span className="text-[1.6rem] text-[--outline-color-light] inline-block hover:text-[#cdcdd5] hover:drop-shadow-[0px_0px_4px_rgba(205,205,213,.5)] duration-[.5s]" ><a href="https://github.com/twizshaq" target="_blank" rel="noopener noreferrer"><LuGithub /></a></span>
                        <span className="hover:text-[#ff4964] hover:drop-shadow-[0px_0px_4px_rgba(255,13,67,.5)] duration-[.5s] heart-icon" onClick={toggleHeart}>
                            {isHeart ? <span className='heart-icon-filled'><FaHeart /></span> : <FaRegHeart />}
                        </span>
                    </div>
                </div>
                </div>

                {/* Favorite Projects Section (Visible when heart filter is active) */}
                {isHeart && (
                    <div className='flex max-w-[1300px] w-[100vw] h-fit justify-center gap-[10px] mt-[0px]'>
                        <div className='flex gap-[10px] mb-[30px]'>
                            <p className='text-[1.3rem] font-bold max-whenwrap4:ml-[10px] ml-[10px]'>Favorite Projects</p>
                        </div>
                    </div>
                )}
                {isHeart && (
                <div className='flex flex-wrap gap-[50px] justify-center max-w-[1300px] w-[100vw] px-[30px] z-0 max-mobile3:top-[-5px] max-mobile3:gap-[30px] max-whenwrap3:justify-center mb-[30px]'>
                    {favoriteProjects.length > 0 ? (
                    favoriteProjects.map((project, index) => (
                        <div key={index} className="w-[365px] h-[200px] rounded-[40px] border-[3.3px] overflow-hidden border-[--outline-color-light]">
                            <div className="flex items-end w-fit max-w-[90vw] h-[200px]">
                                <div className='font-bold text-[2rem] ml-[20px] mb-[20px] mr-[30px] leading-[30px] text-start text-shadow-md drop-shadow-[0px_0px_2px_rgba(255,255,255,.8)]'>{project.name}</div>
                            </div>
                            <Link href={project.link}>
                                <img className="-mt-[200px] object-cover object-center h-[100%]" src={project.imgSrc} alt={project.alt} />
                            </Link>
                        </div>
                    ))
                    ) : (
                    <div className="absolute flex mt-[100px] w-[100vw] justify-center font-bold text-[1.7rem]">
                        <p>No Favorite Projects</p>
                    </div>
                    )}
                </div>
                )}


                {/* Search Results Section (Visible only when searching and heart filter is NOT active) */}
                {!isHeart && searchTerm && (
                <div className='flex max-w-[1300px] w-[100vw] h-fit justify-center gap-[10px] mt-[20px]'>
                    {/* <div className='flex gap-[10px] mb-[30px]'>
                    <p className='text-[1.3rem] font-bold max-whenwrap4:ml-[10px] ml-[10px]'>Search Results</p>
                    </div> */}
                </div>
                )}
                {!isHeart && searchTerm && (
                <div className='flex flex-wrap gap-[50px] justify-start max-w-[1300px] w-[100vw] px-[30px] z-0 max-mobile3:top-[-5px] max-mobile3:gap-[30px] max-whenwrap3:justify-center'>
                    {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                        <div key={index} className="w-[365px] h-[200px] rounded-[40px] border-[3.3px] overflow-hidden border-[--outline-color-light]">
                            <div className="flex items-end w-fit max-w-[90vw] h-[200px]">
                                <div className='font-bold text-[2rem] ml-[20px] mb-[20px] mr-[30px] leading-[30px] text-start text-shadow-md drop-shadow-[0px_0px_2px_rgba(255,255,255,.8)]'>{project.name}</div>
                            </div>
                            <Link href={project.link}>
                                <img className="-mt-[200px] object-cover object-center h-[100%]" src={project.imgSrc} alt={project.alt} />
                            </Link>
                        </div>
                    ))
                    ) : (
                    <div className="mt-[100px] font-bold text-[1.7rem] w-[100vw]">No Projects Found</div>
                    )}
                </div>
                )}

                {/* Default Project Sections (Featured & Legacy - Visible when NOT searching and heart filter is NOT active) */}
                {!isHeart && !searchTerm && (
                <>
                    {/* New Projects Section */}
                    <div className='flex max-w-[1300px] w-[100vw] h-fit justify-center gap-[10px] mt-[20px]'>
                    </div>
                    <div className='flex flex-wrap gap-[50px] justify-start max-whenwrap2:justify-center max-w-[1300px] w-[100vw] px-[30px] z-0 max-mobile3:top-[-5px] max-mobile3:gap-[30px] max-whenwrap3:justify-center mb-[30px]'>
                        {newProjects.map((project, index) => (
                        <div key={index} className="justify-center w-[365px] h-[200px] rounded-[40px] border-[3.3px] overflow-hidden border-[--outline-color-light]">
                            <div className="flex items-end w-[365px] max-w-[90vw] h-[200px]">
                                <div className='font-bold text-[2rem] ml-[20px] mb-[25px] mr-[30px] leading-[30px] text-start text-shadow-md drop-shadow-[0px_0px_2px_rgba(255,255,255,.8)]'>{project.name}</div>
                            </div>
                            <Link href={project.link}>
                                <img className="-mt-[199.8px] object-cover object-center h-[100%]" src={project.imgSrc} alt={project.alt} /> {/* Use project.alt here */}
                            </Link>
                        </div>
                        ))}
                    </div>

                    {/* Legacy Projects Section */}
                    <div className='flex max-w-[1300px] w-[100vw] h-fit justify-center gap-[10px]'>
                        <div className='flex gap-[10px] mb-[30px]'>
                        <p className='text-[1.3rem] font-bold max-whenwrap4:ml-[10px] ml-[10px]'>Legacy Projects</p>
                        <button className="text-[1.2rem] mr-[17px] self-center" onClick={() => setIsPopupOpen(true)}>
                            <PiInfoBold />
                        </button>
                        </div>
                        {isPopupOpen && (
                        <div
                            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[.8] z-[999]"
                            onClick={() => setIsPopupOpen(false)}
                        >
                            <div
                            className="bg-black border-[3px] border-[--outline-color] bg-opacity-20 text-white rounded-[40px] p-6 relative w-11/12 max-w-md backdrop-blur-[30px]"
                            onClick={(e) => e.stopPropagation()}
                            >
                            <h2 className="text-[1.5rem] font-bold mb-[10px]">Legacy Projects</h2>
                            <p>
                                Projects where I didn't put as much effort into them or felt satisfied with the end results.
                            </p>
                            </div>
                        </div>
                        )}
                    </div>
                    <div className='flex flex-wrap gap-[50px] justify-start max-w-[1300px] w-[100vw] px-[30px] z-0 max-mobile3:top-[-5px] max-mobile3:gap-[30px] max-whenwrap3:justify-center  mb-[70px] max-mobile5:mb-[30px] o'>
                        {legacyProjects.map((project, index) => (
                        <div key={index} className="w-[365px] h-[200px] rounded-[40px] border-[3.3px] overflow-hidden border-[--outline-color-light]">
                            <div className="flex items-end w-fit max-w-[90vw] h-[200px]">
                                <div className='font-bold text-[2rem] ml-[20px] mb-[20px] mr-[30px] leading-[30px] text-start text-shadow-md drop-shadow-[0px_0px_2px_rgba(255,255,255,.8)]'>{project.name}</div>
                            </div>
                            <Link href={project.link}>
                                <img className="-mt-[200px] object-cover object-center h-[100%]" src={project.imgSrc} alt={project.alt} />
                            </Link>
                        </div>
                        ))}
                    </div>
                </>
                )}
            </div>
        </div>
    );
}