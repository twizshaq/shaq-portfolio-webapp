"use client";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";
import { motion, AnimatePresence, useAnimation} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
import { Typewriter } from '@/app/components/job-title';
// import { AnimatedSection } from '@/app/components/animated-section';
import Image from 'next/image';
import { FaXTwitter } from "react-icons/fa6";
import Head from 'next/head';
import { BlobServiceClient } from "@azure/storage-blob";

export default function Home() {
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef(null);
  const contactFormRef = useRef<HTMLFormElement>(null);
  const contactBtnRef = useRef<HTMLButtonElement>(null);
  const contactEmailRef = useRef<HTMLInputElement>(null);
  const contactNameRef = useRef<HTMLInputElement>(null);
  const contactMessageRef = useRef<HTMLTextAreaElement>(null);
  const titles = [
    "Junior SOC Analyst",
    "Junior Programmer"
  ];

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

    emailjs.send("service_palz86f", "template_157wg82", inputFields)
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

  const certContainerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [originalContentWidth, setOriginalContentWidth] = useState(0);
  const imageMargin = 40;
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const imageData = [
    { src: 'https://shaqportfoliostorage.blob.core.windows.net/images/az104.png', id: 'az104' },
    { src: 'https://shaqportfoliostorage.blob.core.windows.net/images/SecurityPlus.png', id: 'securityPlus' },
    { src: 'https://shaqportfoliostorage.blob.core.windows.net/images/az900.png', id: 'az900' },
  ];

  // Duplicate the image data for seamless looping
  const duplicatedImageData = imageData.concat(imageData);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Reset imagesLoaded to trigger recalculation
      setImagesLoaded(0);
    };

    window.addEventListener('resize', handleResize);
    // Initial window width
    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
  if (certContainerRef.current) {
    const images = certContainerRef.current.querySelectorAll<HTMLImageElement>('.certimgs');
    if (images.length === 0) return;

    // Ensure images are loaded
    const allImagesLoaded = Array.from(images).every((img) => img.naturalWidth > 0);
    if (!allImagesLoaded) return;

    // Calculate total width of original image elements including margins
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

    // For debugging
    console.log('Calculated originalContentWidth:', totalWidth);
  }
}, [imagesLoaded, windowWidth]);

  useEffect(() => {
    if (originalContentWidth > 0) {
      const duration = (originalContentWidth / 100) * 0.9; // Adjust speed as needed
      controls.start({
        x: [0, -originalContentWidth],
        transition: {
          repeat: Infinity,
          repeatType: 'loop',
          duration,
          ease: 'linear',
        },
      });
    }
  }, [controls, originalContentWidth]);

  return (
    <div className="homeMain">
        <span className="home-page-img">
          <img src= "https://shaqportfoliostorage.blob.core.windows.net/images/homepagemainimg.png" alt="Home Page img" />
        </span>
      <div className="abt-me-ctn">
      <div className="about-me">
        <p className="name">Hey, I'm <span>Shaquon</span></p>
        <p className="jobtitle">I'm a <span><Typewriter titles={titles} speed={150} pause={2000}/></span></p>
        <p className="about">
          One year of experience as a Security Analyst, specializing in tools like Splunk, AWS GuardDuty, and Azure. Passionate about technology and innovation, I’m expanding my skills in AI, Machine Learning, Cloud Security, and Software/Web Development through hands-on projects. This portfolio highlights my journey, showcasing my projects, skills, and growth as I build a strong professional presence.
        </p>
        </div>
        <div className="testbox">
          <Image src= "https://shaqportfoliostorage.blob.core.windows.net/images/memoji2.png" alt="memoji icon" width={800} height={400} priority quality={100}/>
        </div>
        {/* <div className="avlbty"><div className="avlbty-indicator"></div><p>Available for new projects</p></div> */}
      </div>
      {/* <div className="skills-ctn">
        <p className="skills-title">Skills</p>
        <div className="skills-box"></div>
      </div> */}
    <div className="experience">
        <h1 className="xp-title">Work Experience</h1>
        <div className="xp-ctns">
        <button>
        <div onClick={() => setShowDetails(!showDetails)}className="protexxa-xp">
          <Image className="protexxa_logo" src="https://shaqportfoliostorage.blob.core.windows.net/images/protexxa_logo.png" alt="Protexxa's logo" width={100} height={100}/>
          <div className="protexxa-text-ctn">
            <p className="protexxa-text">Protexxa</p>
            <p className="jobTitle">Security Analyst</p>
            <p className='protexxa-date'>Aug 2023 - Aug 2024</p>
          </div>
        </div>
        </button>
      </div>
      </div>

          <div className="certifications" ref={certContainerRef}>
        <h1 className="certs-title">Certifications</h1>
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
              onLoad={() => {
                setImagesLoaded((prev) => prev + 1);
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>

      <div className="contact-form">
        <h1 className="contact-form-title">Contact</h1>
        <p className="contact-summary">Feel free to reach out.</p>
        <form ref={contactFormRef} className="form-container" onSubmit={handleSubmit}>
          <p className="contact-labels">Name</p>
          <input ref={contactNameRef} className="contactname" type="text" placeholder="Your Name" />
          <p className="contact-labels">Email</p>
          <input ref={contactEmailRef} className="contactemail" type="email" placeholder="Example@gmail.com" />
          <p className="contact-labels">Message</p>
          <textarea ref={contactMessageRef} className="contactmessage" placeholder="Your Message..." />
          <button ref={contactBtnRef} type="submit" className="submit-contact-btn">Submit</button>
        </form>
      </div>
        <footer className="footer-h-pg">
          <div className="footersocials">
            {/* <span className="linkedIn"><a href="https://www.linkedin.com/in/shaquonhamilton/"><FaLinkedin /></a></span> */}
            <span className="Xtwitter"><a href="https://x.com/twizshaq"><FaXTwitter /></a></span>
            <span className="resume-download"><a href="https://shaqportfoliostorage.blob.core.windows.net/resume/ShaquonHamiltonResume.pdf" target="_blank"><CgFileDocument /></a></span>
          </div>
          <span className="copyright">© Shaquon Hamilton 2024.</span>
        </footer>
      {/* </motion.div> */}
    </div>
  );
}
