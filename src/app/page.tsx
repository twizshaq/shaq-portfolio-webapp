"use client";
import "./globals.css";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { motion, AnimatePresence} from "framer-motion";
import SecurityPlus from "@/app/assets/SecurityPlus.png";
import az104 from "@/app/assets/az104.png";
import az900 from "@/app/assets/az900.png";
import { useRef, useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
import protexxa_logo from "@/app/assets/protexxa_logo.png";
import memoji_icon from "@/app/assets/memoji_icon.png";
import { Typewriter } from '@/app/components/job-title';
import { AnimatedSection } from '@/app/components/animated-section';
import Image from 'next/image';

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
    "A.I & ML Enthusiast",
    "Junior Programmer"
  ];

    useEffect(() => {
    // Initialize EmailJS with your User ID (API Key)
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

  return (
    <div className="homeMain">
          <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="abt-me-ctn">
      <div className="about-me">
        <p className="name">Hi, I'm <span>Shaquon</span></p>
        <p className="jobtitle">I'm a <span><Typewriter titles={titles} speed={150} pause={2000}/></span></p>
        <p className="about">
          I have one year of hands-on experience as a Security Analyst, working with tools like Splunk, AWS GuardDuty, and Azure. Driven by a passion for technology and cloud computing, I’m eager to expand my expertise into AI, machine learning, and software development. As a quick learner, I’m committed to continuously building my skill set and applying my knowledge to real-world projects. This portfolio reflects my journey—showcasing the projects I’ve worked on, the skills I’ve acquired, and the progress I’m making as I establish a reputable presence in the tech industry.
        </p>
        </div>
        <div className="testbox"><Image src={memoji_icon.src} alt="memoji icon" width={400} height={400}/></div>

        <div className="tapered-line"></div>
      </div>


      <div className="work-xp-certs">
      <div className="experience">
        <h1 className="xp-title">Work Experience</h1>
        
        <button>
        <div onClick={() => setShowDetails(!showDetails)}className="protexxa-xp">
          <Image className="protexxa_logo" src={protexxa_logo.src} alt="Protexxa's logo" width={100} height={90}/>
          <div className="protexxa-text-ctn">
            <p className="protexxa-text">Protexxa</p>
            <p className='protexxa-date'>Aug 2023 - Aug 2024</p>
          </div>
        </div>
        </button>

        <div className="protexxa-details">
          <AnimatePresence>
        {showDetails && (
          <motion.div
            className="protexxa-details"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2}}
            ref={detailsRef} 
          >
          <div className="ptx-content">
          <p className="ptx-job-title">Security Analyst</p>
          <div>
            <p className="ptx-task1">Alert Monitoring and Triage:</p>
            <ul className="ptx-ul">
            <p className="ptx-subtask1">• Monitored and triaged security alerts using Atlassian OpsGenie, with logs ingested from Splunk.</p>
            <p className="ptx-subtask1">• Investigated alerts that deviated from the norm by utilizing Splunk for deeper insights.</p>
            <p className="ptx-subtask1">• Collaborated with relevant teams by promptly emailing the responsible parties for follow-up actions.</p>
            </ul>
          </div>
          <div>
          <p className="ptx-task2">Reporting and Analysis:</p>
          <ul className="ptx-ul">
          <p className="ptx-subtask2">• Generated detailed weekly reports covering key metrics such as average triage time (maintained under 30 minutes), total alerts, false positives, and alert types.</p>
          </ul>
          </div>
          <div>
            <p className="ptx-task3">Collaboration with DevSecOps:</p>
            <ul className="ptx-ul">
            <p className="ptx-subtask3">• Worked closely with the DevSecOps team to refine alerting mechanisms, focusing on reducing the number of false positives.</p>
            </ul>
          </div>
          </div>
          <button className="ptx-close-btn" onClick={() => setShowDetails(false)}><p>Close</p></button>
          </motion.div>
          )}
      </AnimatePresence>
        </div>
      </div>


      <div className="certifications">
        <h1 className="certs-title">Certifications</h1>
        <div className="certsfade">
          <motion.div
            className="certimgs-container"
            initial={{ x: '0%' }}
            animate={{ x: '-108.6%' }}
            transition={{
              duration: 20,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
            }}>
            {[az104, SecurityPlus, az900, az104, SecurityPlus, az900].map((logo) => (
              <Image src={logo.src} key={logo.src} alt="cert logos" className="certimgs" width={270} height={400}/>
            ))}
          </motion.div>
        </div>
      </div>
    </div>

            <div className="tapered-line"></div>

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
      </motion.div>
    </div>
  );
}
