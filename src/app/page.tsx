"use client";
import { FaLinkedin } from "react-icons/fa";
import { LuGithub } from "react-icons/lu";
import { LuFileText } from "react-icons/lu";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { PiInfoBold } from "react-icons/pi";
import Head from "next/head";
import { BlobServiceClient } from "@azure/storage-blob";
import throttle from "lodash/throttle";

export default function Home() {
  const [showDetails, setShowDetails] = useState(false);
  const [showSection, setShowSection] = useState(false);
  const [divVisible, setDivVisible] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false); // New state
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);
  const contactBtnRef = useRef<HTMLButtonElement>(null);
  const contactEmailRef = useRef<HTMLInputElement>(null);
  const contactNameRef = useRef<HTMLInputElement>(null);
  const contactMessageRef = useRef<HTMLTextAreaElement>(null);

  const text = "Hey, I'm Shaq";
  const [displayText, setDisplayText] = useState("");

  // Typewriter effect for "Hey, I'm Shaq"
  useEffect(() => {
    setDisplayText("");
    setIsTypingComplete(false);
    let index = -1;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Focus states for form inputs
  const [emailFocused, setEmailFocused] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("QZVrH0yzI2UqbmkJD");
  }, []);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = contactEmailRef.current?.value || "";
    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setErrorMessage(null);
    if (contactBtnRef.current) contactBtnRef.current.innerText = "Just a Moment...";
    const inputFields = {
      from_name: contactNameRef.current?.value || "",
      from_email: email,
      message: contactMessageRef.current?.value || "",
    };
    emailjs
      .send("service_palz86f", "template_157wg82", inputFields)
      .then(() => {
        if (contactBtnRef.current) contactBtnRef.current.innerText = "Message Sent!";
        if (contactNameRef.current) contactNameRef.current.value = "";
        if (contactEmailRef.current) contactEmailRef.current.value = "";
        if (contactMessageRef.current) contactMessageRef.current.value = "";
      })
      .catch((error) => {
        console.error("Failed to send message:", error);
        if (contactBtnRef.current) contactBtnRef.current.innerText = "Failed to Send";
      });
  };

  // Certification carousel logic (unchanged)
  const certContainerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [originalContentWidth, setOriginalContentWidth] = useState(0);
  const imageMargin = 40;
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const imageData = [
    { src: "https://shaqportfoliostorage.blob.core.windows.net/images/az104.png", id: "az104" },
    { src: "https://shaqportfoliostorage.blob.core.windows.net/images/SecurityPlus.png", id: "securityPlus" },
    { src: "https://shaqportfoliostorage.blob.core.windows.net/images/az900.png", id: "az900" },
  ];

  const duplicatedImageData = imageData.concat(imageData);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setImagesLoaded(0);
    };
    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (certContainerRef.current) {
      const images = certContainerRef.current.querySelectorAll<HTMLImageElement>(".certimgs");
      if (images.length === 0) return;
      const allImagesLoaded = Array.from(images).every((img) => img.naturalWidth > 0);
      if (!allImagesLoaded) return;
      let totalWidth = 0;
      Array.from(images)
        .slice(0, images.length / 2)
        .forEach((img) => {
          const style = window.getComputedStyle(img);
          const width = parseFloat(style.width);
          const marginLeft = parseFloat(style.marginLeft);
          const marginRight = parseFloat(style.marginRight);
          totalWidth += width + marginLeft + marginRight;
        });
      setOriginalContentWidth(totalWidth);
    }
  }, [imagesLoaded, windowWidth]);

  useEffect(() => {
    if (originalContentWidth > 0) {
      const duration = (originalContentWidth / 100) * 0.9;
      controls.start({
        x: [0, -originalContentWidth],
        transition: { repeat: Infinity, repeatType: "loop", duration, ease: "linear" },
      });
    }
  }, [controls, originalContentWidth]);

  // Scroll effect for description text (unchanged)
  const descriptionText = "Junior in tech expanding my skills through hands-on projects. This portfolio highlights my journey, showcasing my projects, skills, and growth as I build a strong professional presence.";
  const [whiteChars, setWhiteChars] = useState(0);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (descriptionRef.current) {
        const rect = descriptionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = 1 - (rect.top / windowHeight);
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
        const numWhiteChars = Math.floor(clampedProgress * descriptionText.length);
        setWhiteChars(numWhiteChars);
      }
    }, 100);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Blob animation logic (unchanged)
  const parentRef = useRef<HTMLDivElement>(null);
  const blobConfigs = [
    { size: 100, blur: 80, color: "var(--main-accent-color-dark)", initialX: 50, initialY: 50 },
    { size: 150, blur: 60, color: "var(--main-blob-color)", initialX: 150, initialY: 200 },
    { size: 100, blur: 80, color: "var(--main-accent-color-dark)", initialX: 300, initialY: 100 },
    { size: 120, blur: 55, color: "var(--main-blob-color)", initialX: 400, initialY: 250 },
    { size: 100, blur: 50, color: "var(--main-accent-color-dark)", initialX: 50, initialY: 50 },
    { size: 150, blur: 60, color: "var(--main-blob-color)", initialX: 150, initialY: 200 },
    { size: 100, blur: 80, color: "var(--main-accent-color-dark)", initialX: 300, initialY: 100 },
    { size: 120, blur: 55, color: "var(--main-blob-color)", initialX: 400, initialY: 250 },
  ];

  const [blobPositions, setBlobPositions] = useState(
    blobConfigs.map((config) => ({ x: config.initialX || 0, y: config.initialY || 0 }))
  );
  const [targetPositions, setTargetPositions] = useState(
    blobConfigs.map((config) => ({ x: config.initialX || 0, y: config.initialY || 0 }))
  );

  const updateBlobPositions = () => {
    if (!parentRef.current) return;
    const parentRect = parentRef.current.getBoundingClientRect();
    setTargetPositions((prevTargetPositions) => {
      return prevTargetPositions.map((_, index) => {
        const blobWidth = blobConfigs[index].size;
        const blobHeight = blobConfigs[index].size;
        const maxX = parentRect.width - blobWidth;
        const maxY = parentRect.height - blobHeight;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        return { x: randomX, y: randomY };
      });
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDetails && detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
        setShowDetails(false);
      }
    };
    if (showDetails) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDetails]);

  useEffect(() => {
    if (showDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDetails]);

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20, rotate: -2 },
    visible: { opacity: 1, y: 0, rotate: -2 },
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative w-[100vw] flex flex-wrap justify-center items-center">
        {/* HERO SECTION */}
        <div className="flex flex-col text-center w-full h-[100dvh] justify-center items-center max-w-[90vw] gap-[20px]">
          {divVisible && (
            <div className="absolute bg-[var(--mainbg-color)] h-[74px] w-[175px] bottom-[0px] right-0 z-[1]"></div>
          )}
          <iframe
            src="https://pioneering-places-492531.framer.app"
            className="w-[100vw] h-[100dvh] absolute -z-[10]"
          ></iframe>
          <p className="text-[3.4rem] font-bold flex justify-center leading-[70px] max-sm:text-[3rem]">
            {displayText.split("").map((char, index) => (
              <span key={index} className="typewriter-letter">
                {char === " " ? "\u00a0" : char}
              </span>
            ))}
          </p>
          <motion.div
            className="absolute bg-[#092cdc]/10 backdrop-blur-[5px] py-[7px] px-[30px] rounded-[15px] font-bold rotate-[20deg] border-[2.3px] border-[#0a90ff]/60 mt-[80px] max-sm:mt-[73px] inline-block"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isTypingComplete ? "visible" : "hidden"}
            transition={{ duration: 1.2, delay: .5 }}
          >
            I like <span className="fontshine1">building</span> stuff
          </motion.div>
          {divVisible && (
            <motion.button
              variants={{
                hidden: { opacity: 0, y: 0 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={isTypingComplete ? "visible" : "hidden"}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-[60px] font-bold z-[5]"
              onClick={() => {
                setShowSection(true);
                setDivVisible(false);
              }}
            >
              Click to Explore
            </motion.button>
          )}
        </div>

        {/* CONDITIONAL SECTION */}
        {showSection && (
          <div className="flex justify-center items-center flex-col">
            <div className="absolute right-0 top-[91dvh] bg-[--mainbg-color] w-[170px] h-[120px] h565:top-[80dvh]"></div>
            {/* Scroll Animated Div */}
            <div className="flex w-full max-w-[90vw] justify-center py-[100px]">
              <p ref={descriptionRef} className="text-center max-w-[700px] font-bold text-[1.6rem]">
                {descriptionText.split("").map((char, index) => (
                  <span
                    key={index}
                    style={{
                      color: index < whiteChars ? "white" : "rgba(147, 197, 253, 0.2)",
                      transition: "color 0.3s ease-in-out",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </p>
            </div>
            {/* WORK EXPERIENCE / CERTIFICATIONS / SKILLS */}
            <div className="max-w-[1200px] w-[90vw] p-5 text-center flex flex-col justify-center items-center gap-[120px] flex mb-[100px]">
              <div className="flex flex-col items-center gap-[20px]">
                <h1 className="text-[1.7rem] font-semibold mb-[20px]">Work Experience</h1>
                <div className="xp-ctns">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="bg-[var(--inner-b-color)] rounded-[25px] border-[#2c2c2e] border-[2px] flex items-start overflow-hidden transition-[transform,box-shadow] duration-300 hover:bg-[#66666b] hover:bg-opacity-[.15] w-fit h-fit pt-[5px] pb-[15px] px-[16px] gap-[20px] min-w-fit"
                  >
                    <Image
                      src="https://shaq-portfolio-webapp.s3.us-east-1.amazonaws.com/protexxa-logo.png"
                      alt="Protexxa Logo"
                      height={100}
                      width={50}
                      className="mt-[10px] rounded-[5px]"
                    />
                    <div className="flex flex-col items-start gap-[2px]">
                      <p className="text-[1.8rem] font-bold">Protexxa</p>
                      <p className="jobTitle">Security Analyst</p>
                      <p className="text-[.8rem] italic">Aug 2023 - Aug 2024</p>
                    </div>
                  </button>
                  {showDetails && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-[.5] flex justify-center items-center z-50">
                      <div className="relative">
                        <div
                          ref={detailsRef}
                          className="px-[30px] pt-[20px] rounded-[40px] max-w-[90vw] w-fit relative border-[3px] border-[#2c2c2e] backdrop-blur-[20px] flex flex-col items-end"
                        >
                          <h2 className="text-[1.5rem] font-bold mb-4 items-start text-left w-[100%]">
                            Protexxa - Security Analyst
                          </h2>
                          <p className="items-start text-left max-w-[500px]">
                            As a Security Analyst at Protexxa, I was responsible for monitoring and
                            analyzing security events to protect the organization's information assets,
                            along with writing weekly reports.
                          </p>
                          <p className="flex flex-col mt-4 w-[100%] items-start text-left mb-[20px]">
                            During my time at Protexxa, I gained experience in:
                            <ul className="list-disc list-inside mt-2 text-left">
                              <li>Splunk (SIEM)</li>
                              <li>Azure</li>
                              <li>Report Writing</li>
                              <li>Aws GuardDuty</li>
                              <li>Basic Networking</li>
                            </ul>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Certifications */}
              <div className="flex flex-col-reverse flex-wrap gap-[100px] justify-center">
                <div className="flex flex-col items-center gap-[0px]">
                  <div className="flex gap-[10px]">
                    <h1 className="text-[1.7rem] mb-[30px] font-bold">Certifications</h1>
                    <button className="text-[1.2rem] mr-[17px] self-start mt-[12px]" onClick={() => setIsPopupOpen(true)}>
                      <PiInfoBold />
                    </button>
                  </div>
                  {isPopupOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[.8] z-[999]" onClick={() => setIsPopupOpen(false)}>
                      <div className="bg-black border-[2px] border-[#2c2c2e] bg-opacity-20 text-white rounded-[40px] p-6 relative w-11/12 max-w-md backdrop-blur-[30px]" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-[1.5rem] font-bold mb-[10px]">Certification Links</h2>
                        <div className="flex flex-col gap-[5px]">
                          <a href="https://www.credly.com/badges/c8f32c9a-9a24-4fba-8e8d-72ed3069a34a/public_url" target="_blank" rel="noopener noreferrer">
                            <p>CompTIA Security+</p>
                          </a>
                          <a href="https://learn.microsoft.com/api/credentials/share/en-us/shaq/6C5E9BFFC166E515?sharingId=970D69F5872C846" target="_blank" rel="noopener noreferrer">
                            <p>Azure Administrator Associate</p>
                          </a>
                          <a href="https://learn.microsoft.com/api/credentials/share/en-us/shaq/BAA7A8D338017DA5?sharingId=970D69F5872C846" target="_blank" rel="noopener noreferrer">
                            <p>Azure Fundamentals</p>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="certifications" ref={certContainerRef}>
                    <div className="certsfade">
                      <motion.div className="certimgs-container" animate={controls}>
                        {duplicatedImageData.map((logo, index) => (
                          <Image
                            key={`${logo.id}-${index}`}
                            src={logo.src}
                            alt="cert logos"
                            className="certimgs"
                            width={400}
                            height={0}
                            style={{ marginRight: `${imageMargin}px` }}
                            priority
                            onLoad={() => setImagesLoaded((prev) => prev + 1)}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
                {/* Skills/Tools */}
                <div className="max-w-[90vw] w-fit pb-[20px] text-center overflow-hidden">
                  <h1 className="text-[1.7rem] mb-[30px] font-bold">Skills/Tools</h1>
                  <div className="flex gap-[20px] max-w-[700px] flex-wrap justify-center">
                    <div className="flex gap-[20px] justify-start overflow-x-scroll scrollbar-hidden">
                      <div className="min-w-[370px] hover:bg-[#66666b] hover:bg-opacity-[.15] skills-ctns">
                        <p className="font-semibold text-[1.2rem]">Cloud & Infra</p>
                        <div className="flex gap-[20px]">
                          <Image src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/aws-logo.svg" alt="AWS Logo" width={50} height={50} />
                          <Image src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/azure-logo.svg" alt="Azure Logo" width={50} height={50} />
                          <Image src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/gcp-logo.svg" alt="GCP Logo" width={50} height={50} />
                          <Image src="https://insta-recipe-assets.s3.us-east-1.amazonaws.com/cloudflare-logo.svg" alt="Cloudflare Logo" width={50} height={50} />
                          <Image src="https://shaq-portfolio-webapp.s3.us-east-1.amazonaws.com/terraform-icon.svg" alt="Terraform Logo" width={50} height={50} />
                        </div>
                      </div>
                      <div className="min-w-fit hover:bg-[#66666b] hover:bg-opacity-[.15] skills-ctns">
                        <p className="font-semibold text-[1.2rem]">Web Dev</p>
                        <div className="flex gap-[20px]">
                          <Image src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/tailwind-logo.svg" alt="Tailwind CSS Logo" width={50} height={50} />
                          <Image src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/supabase-logo.svg" alt="Supabase Logo" width={50} height={50} />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-[20px] justify-start overflow-x-scroll scrollbar-hidden">
                      <div className="min-w-fit hover:bg-[#66666b] hover:bg-opacity-[.15] skills-ctns">
                        <p className="font-semibold text-[1.2rem]">Languages</p>
                        <div className="flex gap-[20px]">
                          <Image src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/python-logo.svg" alt="Python Logo" width={50} height={50} />
                          <Image src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/javascript-logo.svg" alt="Javascript Logo" width={50} height={50} className="rounded-[10px]" />
                          <Image src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/typescript-logo.svg" alt="Typescript Logo" width={50} height={50} />
                        </div>
                      </div>
                      <div className="min-w-fit hover:bg-[#66666b] hover:bg-opacity-[.15] skills-ctns">
                        <p className="font-semibold text-[1.2rem]">Design</p>
                        <div className="flex gap-[20px]">
                          <Image src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/lllustrator-logo.svg" alt="Illustrator Logo" width={50} height={50} />
                          <Image src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/photoshop-logo.svg" alt="Photoshop Logo" width={50} height={50} />
                          <Image src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/figma-logo.svg" alt="Figma Logo" width={30} height={30} />
                        </div>
                      </div>
                      <div className="min-w-fit hover:bg-[#66666b] hover:bg-opacity-[.15] skills-ctns">
                        <p className="font-semibold text-[1.2rem]">Security</p>
                        <div className="flex gap-[20px]">
                          <Image src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/splunk-logo.svg" alt="Splunk Logo" width={80} height={80} className="invert" />
                          <Image src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/jira-logo.svg" alt="Jira Logo" width={50} height={50} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* CONTACT SECTION */}
            <div className="max-w-fit w husky-[90vw] mx-auto mb-0 p-5 text-center flex flex-col items-center relative">
              <h1 className="font-bold text-[1.7rem] mb-[30px]">Contact</h1>
              <form ref={contactFormRef} className="flex flex-col max-w-fit items-center gap-[40px]" onSubmit={handleSubmit}>
                <div className="relative flex flex-col items-end">
                  <p className="self-end absolute -mt-[12px] font-bold mr-[30px] px-[5px] tracking-[.5px] z-[1]">
                    <span className={nameFocused ? "fontshine1" : "text-white"}>Name</span>
                  </p>
                  <p className="self-end absolute -mt-[21.5px] font-bold mr-[30px] px-[5px] tracking-[.5px] bg-[--mainbg-color]">
                    <span className="text-[--mainbg-color]">Name</span>
                  </p>
                  <input
                    ref={contactNameRef}
                    className="flex items-center my-[13] max-w-[90vw] w-[500px] p-[13px_20px] pointer-events-auto outline-none rounded-[20px] border-[2.5px] border-[--outline-color] bg-[--inner-bg-color] font-semibold"
                    type="text"
                    placeholder="Your Name"
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                    required
                  />
                </div>
                <div className="relative flex flex-col items-end">
                  <p className="self-end absolute mt-[-12px] font-bold mr-[30px] px-[5px] tracking-[.5px] z-[1]">
                    <span className={emailFocused ? "fontshine1" : "text-white"}>Email</span>
                  </p>
                  <p className="self-end absolute mt-[-12px] font-bold mr-[30px] px-[5px] tracking-[.5px] bg-[--mainbg-color]">
                    <span className="text-[--mainbg-color]">Email</span>
                  </p>
                  <input
                    ref={contactEmailRef}
                    className="flex items-center my-[13] max-w-[90vw] w-[500px] p-[13px_20px] pointer-events-auto outline-none rounded-[20px] border-[2.5px] border-[--outline-color] bg-[--inner-bg-color] font-semibold"
                    type="email"
                    placeholder="Example@gmail.com"
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    required
                  />
                </div>
                <div className="relative flex flex-col items-end">
                  <p className="self-end absolute mt-[-12px] font-bold mr-[30px] px-[5px] tracking-[.5px] z-[1]">
                    <span className={messageFocused ? "fontshine1" : "text-white"}>Message</span>
                  </p>
                  <p className="self-end absolute mt-[-12px] font-bold mr-[30px] px-[5px] tracking-[.5px] bg-[--mainbg-color]">
                    <span className="text-[--mainbg-color]">Message</span>
                  </p>
                  <textarea
                    ref={contactMessageRef}
                    className="flex items-center my-[13] max-w-[90vw] w-[500px] h-[150px] p-[13px_20px] pointer-events-auto outline-none rounded-[25px] border-[2.5px] border-[--outline-color] font-semibold resize-none bg-[--inner-bg-color]"
                    placeholder="Your Message..."
                    onFocus={() => setMessageFocused(true)}
                    onBlur={() => setMessageFocused(false)}
                    required
                  />
                </div>
                {errorMessage && <p className="text-red-500 font-semibold mt-[-20px]">{errorMessage}</p>}
                <button
                  ref={contactBtnRef}
                  type="submit"
                  className="bg-inner-bg-color px-[40px] py-[7px] text-[18px] border-[2.5px] border-[--outline-color] rounded-[20px] self-center font-semibold m-3 transition-transform duration-1000 bg-[--inner-bg-color] hover:bg-[#66666b] hover:bg-opacity-[.2]"
                >
                  Submit
                </button>
              </form>
            </div>
            {/* FOOTER */}
            <footer className="footer-h-pg">
              <div className="flex relative text-[1.8rem] gap-[13px] -bottom-[50px]">
                <span className="Xtwitter">
                  <a href="https://github.com/twizshaq" target="_blank" rel="noopener noreferrer">
                    <LuGithub />
                  </a>
                </span>
                <span className="resume-download">
                  <a
                    href="https://shaq-portfolio-webapp.s3.us-east-1.amazonaws.com/resume-for-webapp.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LuFileText />
                  </a>
                </span>
              </div>
              <span className="flex relative -bottom-[60px] font-semibold pb-[10px] text-[.7rem]">
                © Shaquon Hamilton 2024.
              </span>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}