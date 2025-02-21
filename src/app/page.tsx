"use client";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";
import { motion, AnimatePresence, useAnimation} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
import { Typewriter } from '@/app/components/job-title';
import Image from 'next/image';
import { FaXTwitter } from "react-icons/fa6";
import Head from 'next/head';
import { BlobServiceClient } from "@azure/storage-blob";
import { SparklesPreview } from "@/app/components/ui/SparklesPreview";

export default function Home() {
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);
  const contactBtnRef = useRef<HTMLButtonElement>(null);
  const contactEmailRef = useRef<HTMLInputElement>(null);
  const contactNameRef = useRef<HTMLInputElement>(null);
  const contactMessageRef = useRef<HTMLTextAreaElement>(null);
  // Focus states (simplified)
    const [emailFocused, setEmailFocused] = useState(false);
    const [messageFocused, setMessageFocused] = useState(false);
    const [nameFocused, setNameFocused] = useState(false);
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

  const parentRef = useRef<HTMLDivElement>(null);
  const blobConfigs = [
    { size: 100, blur: 80, color: 'var(--main-accent-color-dark)', initialX: 50, initialY: 50 },
    { size: 150, blur: 60, color: 'var(--main-blob-color)', initialX: 150, initialY: 200 },
    { size: 100, blur: 80, color: 'var(--main-accent-color-dark)', initialX: 300, initialY: 100 },
    { size: 120, blur: 55, color: 'var(--main-blob-color)', initialX: 400, initialY: 250 },
    { size: 100, blur: 50, color: 'var(--main-accent-color-dark)', initialX: 50, initialY: 50 },
    { size: 150, blur: 60, color: 'var(--main-blob-color)', initialX: 150, initialY: 200 },
    { size: 100, blur: 80, color: 'var(--main-accent-color-dark)', initialX: 300, initialY: 100 },
    { size: 120, blur: 55, color: 'var(--main-blob-color)', initialX: 400, initialY: 250 },
  ];

  const [blobPositions, setBlobPositions] = useState(
    blobConfigs.map(config => ({ x: config.initialX || 0, y: config.initialY || 0 }))
  );
  const [targetPositions, setTargetPositions] = useState(
    blobConfigs.map(config => ({ x: config.initialX || 0, y: config.initialY || 0 }))
  );

  const updateBlobPositions = () => {
    if (!parentRef.current) return;

    const parentRect = parentRef.current.getBoundingClientRect();

    setTargetPositions(prevTargetPositions => {
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
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDetails, detailsRef]);

    useEffect(() => {
        if (showDetails) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto'; // or 'visible' or '' to reset to default
        }
        return () => {
            document.body.style.overflow = 'auto'; // Reset overflow when component unmounts
        };
    }, [showDetails]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative max-w-[1600px] w-full flex flex-wrap justify-center items-center">
        <div className="flex flex-col text-center w-full h-[100svh] justify-center items-center max-w-[90vw] gap-[24px]">
          <p className="text-[4rem] font-bold flex justify-center leading-[70px]">Hey, I'm Shaquon</p>
          {/* <p className="jobtitle">I'm a <span><Typewriter titles={titles} speed={150} pause={2000}/></span></p> */}
          <p className="font-bold text-[1.5rem] text-center">Bringing <span className='fontshine1'>Bold</span> Ideas to Life Through <span className='fontshine1'>AI</span></p>
          {/* <div className="mt-[20px] mb-[5px] inset-x-60 bg-gradient-to-r max-w-[90vw] from-transparent via-white to-transparent h-[5px] w-[700px] blur-[2px] z-[5]" /> */}
          <p className="font-medium text-[1rem] max-w-[700px] text-center leading-relaxed">
            Junior in tech expanding my skills in AI, Software/Web Development and engineering through hands-on projects. This portfolio highlights my journey, showcasing my projects, skills, and growth as I build a strong professional presence.
          </p>
          <div className="absolute h-[400px] w-[700px] max-w-[90vw] -z-[1] max-mobile3:hidden" ref={parentRef}>
            {blobConfigs.map((config, index) => (
              <motion.div
                key={index}
                className={`rounded-full absolute`}
                style={{
                  width: `${config.size}px`,
                  height: `${config.size}px`,
                  backgroundColor: config.color,
                  filter: `blur(${config.blur}px)`,
                  x: blobPositions[index].x,
                  y: blobPositions[index].y,
                }}
                animate={{ x: targetPositions[index]?.x, y: targetPositions[index]?.y }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  onComplete: updateBlobPositions
                }}
              />
            ))}
          </div>
        </div>
    <div>
      <div className="max-w-[1200px] w-[90vw] p-5 text-center flex flex-col justify-center items-center gap-[120px] flex mb-[100px]">
        <div>
          <h1 className="text-[1.7rem] font-bold mb-[20px]">Work Experience</h1>
          <div className="xp-ctns">
              <button onClick={() => setShowDetails(!showDetails)}className="bg-[--inner-bg-color] rounded-[30px] border-[2.5px] border-[--outline-color] flex items-center overflow-hidden transition-[transform,box-shadow] duration-300 items-center">
                <Image src="https://shaqportfoliostorage.blob.core.windows.net/images/protexxa_logo.png" alt="Protexxa Logo" height={100} width={100} className="-mr-[20px]"/>
                <div className="flex flex-col px-[15px] pb-[15px] pt-[5px] items-start">
                  <p className="text-[1.7rem] font-bold">Protexxa</p>
                  <p className="jobTitle">Security Analyst</p>
                  <p className='text-[.85rem] font-semibold'>Aug 2023 - Aug 2024</p>
                </div>
              </button>
          </div>
          {showDetails && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-[.5] flex justify-center items-center z-50">
              <div className="relative">
                <div ref={detailsRef} className=" px-[30px] pt-[20px] rounded-[40px] max-w-[90vw] w-fit relative border-[3px] border-[#38383e] bg-opacity-20 backdrop-blur-[30px] flex flex-col items-end" >
                <h2 className="text-[1.5rem] font-bold mb-4 items-start text-left w-[100%]">Protexxa - Security Analyst</h2>
                {/* <button className="absolute top-[30px] right-[45px]" onClick={() => setShowDetails(false)}>
                    <div className="absolute w-[23px] h-[4px] bg-white rounded-[30px] rotate-[45deg]"></div>
                    <div className="absolute w-[23px] h-[4px] bg-white rounded-[30px] rotate-[-45deg]"></div>
                </button> */}
                <p className="items-start text-left max-w-[500px]">
                  As a Security Analyst at Protexxa, I was responsible for monitoring and analyzing security events to protect the organization's information assets, Along with writing weekly reports.
                  {/* Add more details about your role and responsibilities here */}
                </p>
                <p className='flex flex-col mt-4 w-[100%] items-start text-left mb-[20px]'>
                    During my time at Protexxa, I gained experience in:
                    <ul className='list-disc list-inside mt-2 text-left'>
                        <li>Splunk (SIEM)</li>
                        <li>Azure</li>
                        <li>Report Writing</li>
                        <li>Aws GaurdDuty</li>
                    </ul>
                </p>
                {/* <button onClick={() => setShowDetails(false)} className="w-fit text-red-500 hover:text-red-400 -mb-[10px] border-[1.5px] rounded-full px-[30px] py-[5px]">
                  <p className="font-bold text-[1.3rem]">close</p>
                </button> */}
              </div>
              </div>
            </div>
          )}
        </div>
    <div className="flex flex-wrap gap-[100px] justify-center">
      <div className="certifications" ref={certContainerRef}>
        <h1 className="text-[1.7rem] mb-[30px] font-bold">Certifications</h1>
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
      <div className="max-w-[500px] px-[20px] pb-[20px] text-center overflow-hidden">
        <h1 className="text-[1.7rem] mb-[30px] font-bold">Skills/Tools</h1>
        <div className="flex gap-[20px] max-w-[400px] w-[90vw] flex-wrap justify-center">
          <Image
              className=""
              src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/aws-logo.svg"
              alt="AWS Logo"
              width={50}
              height={50}/>
            <Image
              src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/azure-logo.svg"
              alt="Azure Logo"
              width={50}
              height={50}/>
            <Image
              src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/gcp-logo.svg"
              alt="GCP Logo"
              width={50}
              height={50}/>
            <Image
              className="rounded-[10px]"
              src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/javascript-logo.svg"
              alt="Javascript Logo"
              width={50}
              height={50}/>
            <Image
              src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/lllustrator-logo.svg"
              alt="Illustrator Logo"
              width={50}
              height={50}/>
            <Image
              src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/photoshop-logo.svg"
              alt="Photoshop Logo"
              width={50}
              height={50}/>
              <Image
              src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/figma-logo.svg"
              alt="Figma Logo"
              width={30}
              height={30}/>
            <Image
              src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/python-logo.svg"
              alt="Python Logo"
              width={50}
              height={50}/>
            <Image
              src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/supabase-logo.svg"
              alt="Supabase Logo"
              width={50}
              height={50}/>
            <Image
              src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/tailwind-logo.svg"
              alt="Tailwind CSS Logo"
              width={50}
              height={50}/>
            <Image
              src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/typescript-logo.svg"
              alt="Typescript Logo"
              width={50}
              height={50}/>
            <Image
              src="https://insta-recipe-assets.s3.us-east-1.amazonaws.com/cloudflare-logo.svg"
              alt="Cloudflare Logo"
              width={50}
              height={50}/>
            <Image
              className="invert"
              src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/splunk-logo.svg"
              alt="Splunk Logo"
              width={80}
              height={80}/>
            <Image
              src="https://shaqportfoliostorage.blob.core.windows.net/skills-tools/jira-logo.svg"
              alt="Jire Logo"
              width={50}
              height={50}/>
        </div>
    </div>
    </div>

    </div>
      </div>
      <div className="max-w-fit w-[90vw] mx-auto mb-0 p-5 text-center flex flex-col items-center relative">
        <h1 className="font-bold text-[1.7rem] mb-[30px]">Contact</h1>
        <form ref={contactFormRef} className="flex flex-col max-w-fit items-center gap-[40px] bg" onSubmit={handleSubmit}>
          {/* <div className="absolute -mt-[4.7px] mr-[30px] self-end bg-[--mainbg-color] h-[7px] w-[54px]"></div> */}
          <p className="self-end absolute -mt-[12px] font-bold mr-[30px] px-[5px] tracking-[.5px] z-[1]"><span className={nameFocused ? "fontshine1" : "text-white"}>Name</span></p>
          <p className="self-end absolute -mt-[21.5px] font-bold mr-[30px] px-[5px] tracking-[.5px] bg-[--mainbg-color]"><span className="text-[--mainbg-color]">Name</span></p>
          <input ref={contactNameRef} className="flex items-center my-[13] max-w-[90vw] w-[500px] p-[13px_20px] pointer-events-auto outline-none rounded-[30px] border-[2.5px] border-[--outline-color] bg-[--inner-bg-color] font-semibold" type="text" placeholder="Your Name" onFocus={() => setNameFocused(true)} onBlur={() => setNameFocused(false)} required/>

          {/* <div className="absolute mt-[90.5px] mr-[30.5px] self-end bg-[--mainbg-color] h-[7px] w-[50px]"></div> */}
          <p className="self-end absolute mt-[83px] font-bold mr-[30px] px-[5px] tracking-[.5px] z-[1]"><span className={emailFocused ? "fontshine1" : "text-white"}>Email</span></p>
          <p className="self-end absolute mt-[73.5px] font-bold mr-[30px] px-[5px] tracking-[.5px] bg-[--mainbg-color]"><span className="text-[--mainbg-color]">Email</span></p>
          <input ref={contactEmailRef} className="flex items-center my-[13] max-w-[90vw] w-[500px] p-[13px_20px] pointer-events-auto outline-none rounded-[30px] border-[2.5px] border-[--outline-color] bg-[--inner-bg-color] font-semibold" type="email" placeholder="Example@gmail.com" onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)} required/>


          <p className="self-end absolute mt-[177px] font-bold mr-[30px] px-[5px] tracking-[.5px] z-[1]"><span className={messageFocused ? "fontshine1" : "text-white"}>Message</span></p>
          <p className="self-end absolute mt-[168.2px] font-bold mr-[30px] px-[5px] tracking-[.5px] bg-[--mainbg-color]"><span className="text-[--mainbg-color]">Message</span></p>
          <textarea ref={contactMessageRef} className="flex items-center my-[13] max-w-[90vw] w-[500px] h-[150px] p-[13px_20px] pointer-events-auto outline-none rounded-[30px] border-[2.5px] border-[--outline-color] font-semibold resize-none bg-[--inner-bg-color]" placeholder="Your Message..." onFocus={() => setMessageFocused(true)} onBlur={() => setMessageFocused(false)} required/>

          <button ref={contactBtnRef} type="submit" className="bg-inner-bg-color px-[40px] py-[7px] text-[18px] border-[2.5px] border-[--outline-color] rounded-full self-center font-semibold m-3 transition-transform duration-1000 bg-[--inner-bg-color]">Submit</button>
        </form>
      </div>
        <footer className="footer-h-pg">
          <div className="flex relative text-[1.8rem] gap-[10px] -bottom-[50px]">
            <span className="Xtwitter"><a href="https://x.com/twizshaq"><FaXTwitter /></a></span>
            <span className="resume-download"><a href="https://shaqportfoliostorage.blob.core.windows.net/resume/ShaquonHamiltonResume.pdf" target="_blank"><CgFileDocument /></a></span>
          </div>
          <span className="flex relative -bottom-[60px] font-semibold pb-[10px] text-[.7rem]">© Shaquon Hamilton 2024.</span>
        </footer>
    </div>
    </div>
  );
}
