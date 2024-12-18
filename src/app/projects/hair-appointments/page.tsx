"use client";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image'

export default function Hairbookings() {
    return (
        <div className="main-imagegen-writeup">
            <Link href="/projects">
                <div className="bck-btn"><span className="bck-arrow"><FaArrowLeftLong /></span><p className="bck-btn-text">Back</p></div></Link>
            <div className="main-portfolio-writeup-body">
                <p className="mainheaders">Hair Appointment Scheduler</p>
                <br /><br />
                <p className="secondaryheaders">Overview & Purpose</p>
                <p>This hair appointment scheduling web application was designed to simplify and streamline the booking process for my friend, a professional hairstylist. The primary objective is to offer her clients a seamless way to schedule appointments online, while automatically recording all essential client information—such as name, contact number, and appointment details—directly into her Google Calendar. This ensures that my friend can easily manage her bookings, stay organized, and offer a smooth, professional experience to her clientele.</p>
                <br />
                <br />
                <p className="secondaryheaders">What Was Used</p>
                <p>To bring this project to life, I employed a selection of modern web technologies and services:</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Google Calendar API:</span> To seamlessly integrate bookings into my friend’s calendar. Whenever an appointment is confirmed, the event details (client name, contact number, appointment time) are automatically added, reducing manual data entry and minimizing scheduling errors.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• React & Next.js:</span> For building a dynamic, server-rendered front-end interface. React’s component-based architecture simplified the creation of interactive UI elements, while Next.js provided efficient performance and SEO benefits.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• TailwindCSS:</span>To create a clean, responsive, and easily maintainable design. TailwindCSS accelerated the UI development process by providing a utility-first CSS framework.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• JavaScript:</span> Powering the interactive elements and client-side logic. JavaScript was crucial for handling form submissions, input validation, and asynchronous requests to the backend and external APIs.</p>
                <br /><br />
                <p className="secondaryheaders">Challenges</p>
                <p>One of the main challenges I faced during this project was understanding and correctly implementing the Google Calendar API.</p>
                <br /><br />
                <p className="secondaryheaders">Key Features</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Simple Booking Interface:</span> Once an appointment is booked, it’s automatically added to Google Calendar, saving time and ensuring my friend has an up-to-date schedule.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Google Calendar Integration:</span> Clients can easily select a date and time, provide their contact details, and confirm their appointment—all in a few simple steps.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Responsive Design:</span> The web app works seamlessly across desktops, tablets, and mobile devices, ensuring a smooth user experience for all clients.</p>
                <br /><br />
                <p className="secondaryheaders">Lessons Learned</p>
                <p>This project was an excellent opportunity to enhance my skills in web development and working with third-party APIs. Understanding the Google Calendar API and troubleshooting the integration process expanded my knowledge of how APIs handle data and interact with external services. By tackling real-world challenges like API request debugging, I gained confidence in my ability to solve problems and deliver practical, user-focused solutions.</p>
                <br /><br />
            </div>
                <footer className="writeup-footer">
                    <span className="ai-copyright">© Shaquon Hamilton 2024.</span>
                </footer>
        </div>
    );
}