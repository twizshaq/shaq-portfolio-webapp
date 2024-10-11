"use client";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

export default function Portfolioproject() {
    const [isFixed, setIsFixed] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!buttonRef.current) return;

            // Get the position of the button relative to the viewport
            const buttonTop = buttonRef.current.getBoundingClientRect().top;

            // Change to fixed if the button is at the top of the viewport (adjust threshold as needed)
            if (window.scrollY > 5) { // Change 200 to desired scroll threshold
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className="main-portfolio-writeup">
            <Link href="/projects">
                <div className="bck-btn"><span className="bck-arrow"><FaArrowLeftLong /></span><p className="bck-btn-text">Back</p></div></Link>
            <div className="main-portfolio-writeup-body">
                <p className="mainheaders">Interactive Portfolio Web App: Merging Personal Branding with AI Technology</p>
                <br /><br />
                <p className="secondaryheaders">Portfolio Web App: Overview & Purpose</p>
                <p>This portfolio web application is designed to reflect my professional journey, showcasing the projects I’ve worked on, the skills I’ve acquired, and my continuous growth as a developer. The primary goal is to establish a reputable digital presence that not only highlights my technical expertise but also engages users in an interactive way.
                What sets this portfolio apart is the integration of an AI chatbot, powered by Google AI Studio, which allows visitors to ask personalized questions about me (Shaq). The AI responds based on the specific data I’ve provided, ensuring accurate, tailored information. Additionally, the chatbot can answer questions related to topics I’m passionate about, such as Artificial Intelligence (AI), Machine Learning (ML), and engineering.</p>
                <br /><br />
                <p className="secondaryheaders">What Was Used</p>
                <p>To build and host this project, I used a modern tech stack and various cloud services, including:</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Next.js:</span> A React-based framework that simplifies the development of fast, server-rendered web applications.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• TailwindCSS:</span> For flexible and efficient styling, allowing me to create a responsive and visually appealing user interface.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• JavaScript:</span> For interactive elements and client-side functionality.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Azure App Service:</span> To host the web app, providing scalability and security.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Azure Blob Storage:</span> For hosting images used on the site.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• GitHub:</span> For source control, versioning, and deploying the web app via GitHub Actions.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Google AI Studio:</span> For integrating a customizable AI chatbot that interacts with users.</p>
                <br /><br />
                <p className="secondaryheaders">Challenges</p>
                <p>This project was not without its challenges, and they contributed to significant learning experiences:</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>1• </span>AI Chatbot Deployment: My initial plan was to use Azure OpenAI Service to power the chatbot. However, deploying the web app as a static web app created some compatibility issues with integrating the AI service. Azure's OpenAI integration required more advanced configurations that weren’t feasible with the static hosting setup.
                <br /><br />
                After researching alternatives, I shifted to Google AI Studio, which provided cutting-edge AI models at no cost. This decision not only resolved the technical issues but also helped me avoid the high costs associated with Azure OpenAI.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>2• </span>GitHub Deployment: As it was my first time deploying a web application through GitHub Actions, I encountered some difficulties in setting up continuous deployment. The learning curve involved understanding how to configure the workflow files and troubleshoot errors during the automated deployment process. In the end, I successfully implemented a CI/CD pipeline, which allowed smooth, automated deployments.</p>
                <br /><br />
                <p className="secondaryheaders">Key Features</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>1• AI Chatbot:</span> The AI chatbot is the standout feature of this portfolio. Users can interact with the bot to ask questions about me, my experience, and my skills. The chatbot pulls from the personal information I provided, ensuring accurate and relevant responses. It can also engage in conversations about my interests, such as AI, ML, and engineering, offering a unique and interactive experience for visitors.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>2• Project Showcase:</span> The portfolio showcases my key projects, with detailed explanations of the technologies used, the challenges faced, and the outcomes achieved. This helps potential employers or collaborators understand my expertise and the impact of my work.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>3• Responsive Design:</span> The web app is fully responsive, ensuring a seamless user experience across different devices and screen sizes.</p>
                <br /><br />
                <p className="secondaryheaders">Future Enhancements</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>1• New Projects:</span>I plan to regularly update the portfolio with new projects as I continue to grow in my career and explore more advanced technologies.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>2• AI Expansion:</span>I am considering adding a second AI chatbot to cover different use cases, although I’m still exploring the best direction for this addition. It could potentially focus on answering technical queries or assisting other developers who visit my site.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>3• Tech Entry Guide:</span>A future feature could be a step-by-step guide for individuals who are new to tech. This section would offer practical advice and resources for those looking to get started in fields like web development and cloud engineering.</p>
                <br /><br />
                <p className="secondaryheaders">Learning & Growth</p>
                <p>This project pushed me out of my comfort zone several times, particularly when integrating the AI and managing the deployment process. At several points, especially when I encountered issues with the AI implementation and the GitHub deployment, I considered abandoning the project. However, persistence paid off, and I came away with a deeper understanding of web development and cloud engineering.</p>
                <br />
                <p>One of the most valuable lessons was learning how to troubleshoot and overcome deployment obstacles. The practical knowledge I gained from working with Azure and cloud technologies far exceeds what I learned through certifications alone. This project has not only expanded my technical skills but also instilled a sense of confidence that I can tackle even more complex projects in the future.</p>
            </div>
                <footer className="ai-footer">
                    <span className="ai-copyright">© Shaquon Hamilton 2024.</span>
                </footer>
        </div>
    );
}