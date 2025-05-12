"use client";
import "./globals.css";
import { FaLinkedin } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { Roboto } from 'next/font/google';
// import styles from '@/page.module.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400','500','700']
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
    const toggleButton = document.querySelector('.burgerlabel');
    
    // Close the nav if clicking outside and not on the toggle button
    if (
      toggleButton &&
      navRef.current &&
      !navRef.current.contains(event.target as Node) &&
      !toggleButton.contains(event.target as Node)
    ) {
      setIsNavOpen(false);
    }
  };

  const handleScroll = () => {
    if (isNavOpen) {
      setIsNavOpen(false);
    }
  };

  // Attach the listeners
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', handleScroll);

  return () => {
    // Cleanup listeners on unmount
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('scroll', handleScroll);
  };
}, [isNavOpen]);

const toggleNav = () => {
  setIsNavOpen((prev) => !prev);
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
                Home
              </span>
            </Link>
            <Link href="/projects" onClick={toggleNav}>
              <span id="projects" className={`navtext ${pathname === "/projects" ? "active-navbar" : ""}`}>
                Projects
              </span>
            </Link>
            <Link href="/aichat" onClick={toggleNav}>
              <span id="aichat" className={`navtext ${pathname === "/aichat" ? "active-navbar" : ""}`}>
                AI Bots
              </span>
            </Link>
          </nav>
        {/* <footer className="footer">
            <span className="copyright">© Shaquon Hamilton 2024.</span>
        </footer> */}
        </div>
        {children}
      </body>
    </html>
  );
}
