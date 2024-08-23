"use client";
import "./globals.css";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { Roboto } from 'next/font/google';
import styles from '@/page.module.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['500', '700']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isNavOpen) {
        setIsNavOpen(false);
      }
    };

    const handleScroll = () => {
      if (isNavOpen) {
        setIsNavOpen(false); 
      }
    };

    // Add/remove event listeners based on isNavOpen
    if (isNavOpen) {
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
    } else {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll); 
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll); 
    };
  }, [isNavOpen]); 

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };


  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <input 
          type="checkbox" 
          id="navbartoggle" 
          className="navbartoggle" 
          checked={isNavOpen} 
          onChange={toggleNav} 
        />
        <label htmlFor="navbartoggle" className="burgerlabel">
          <div className="labeldiv"></div>
          <div className="labeldiv"></div>
          <div className="labeldiv"></div>
        </label>
        <div className="navigator-container" ref={navRef}>
          <nav className={`navigator ${isNavOpen ? 'open' : ''}`}>
            <Link href="/" onClick={toggleNav}>
              <span id="home" className={`navtext ${pathname === "/" ? "active-navbar" : ""}`}>
                HOME
              </span>
            </Link>
            <Link href="/projects" onClick={toggleNav}>
              <span id="projects" className={`navtext ${pathname === "/projects" ? "active-navbar" : ""}`}>
                PROJECTS
              </span>
            </Link>
            <Link href="/aichat" onClick={toggleNav}>
              <span id="aichat" className={`navtext ${pathname === "/aichat" ? "active-navbar" : ""}`}>
                AI CHAT
              </span>
            </Link>
          </nav>
        </div>
        <footer className="footer">
          <div className="footersocials">
            <span className="linkedIn"><a href="https://www.linkedin.com/in/shaquonhamilton/"><FaLinkedin /></a></span>
            <span className="github"><a href="https://github.com/twizshaq"><FaGithubSquare /></a></span>
          </div>
          <span className="copyright">© Shaquon Hamilton 2024.</span>
        </footer>
        {children}
      </body>
    </html>
  );
}
