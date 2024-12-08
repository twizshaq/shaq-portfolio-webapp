"use client";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image'

export default function Imagegen() {
    return (
        <div className="main-imagegen-writeup">
            <Link href="/projects">
                <div className="bck-btn"><span className="bck-arrow"><FaArrowLeftLong /></span><p className="bck-btn-text">Back</p></div></Link>
            <div className="main-portfolio-writeup-body">
                <p className="mainheaders">Image Generation with Stable Diffusion</p>
                <br /><br />
                <p className="secondaryheaders">Overview & Purpose</p>
                <p>This project showcases my ability to deploy and work with advanced machine learning models, specifically Stable Diffusion, to generate AI-powered images. The goal was to integrate cutting-edge AI tools into a functional environment, demonstrating practical expertise in cloud deployment, AI model handling, and creative image generation. This endeavor highlights my continuous growth as a developer, particularly in leveraging cloud technologies to solve resource-intensive challenges.
                <br />
                <br />
                The use of Stable Diffusion allows for high-quality image generation based on detailed text prompts, opening up new possibilities for projects requiring creative AI solutions. This project serves as both a portfolio piece and a demonstration of my ability to deploy, manage, and utilize complex AI systems within cloud environments.</p>
                <br /><br />
                <p className="secondaryheaders">What Was Used</p>
                <p>To accomplish this, I leveraged a combination of powerful tools and technologies:</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Google Cloud Platform (GCP):</span> Used for deploying a virtual machine (VM) to handle the compute-heavy requirements of Stable Diffusion.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Stable Diffusion:</span> An advanced text-to-image generation open source model capable of creating visually stunning artwork from simple textual prompts.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Python:</span> For scripting and managing the AI pipeline, including installation, configuration, and generating images programmatically.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Hugging Face:</span> Utilized to manage and download Stable Diffusion model weights, ensuring seamless integration into the deployment pipeline.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• SSH and SCP:</span> Secure Shell (SSH) and Secure Copy (SCP) were used to manage remote access and transfer generated images from the cloud VM to a local environment.</p>
                <br /><br />
                <p className="secondaryheaders">Challenges</p>
                <p>This project presented several challenges, each offering valuable learning opportunities:</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• </span>Cloud Resource Constraints: Without GPU access during GCP’s free trial, I had to optimize Stable Diffusion for CPU execution. This required extensive testing and configuration to ensure image generation worked effectively, even at reduced performance levels.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• </span>Model Management: Managing and downloading large pre-trained models like Stable Diffusion required understanding Hugging Face's APIs and properly configuring local directories to handle the model files.</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• </span>SSH and SCP Troubleshooting: Configuring SSH keys and resolving public key authentication errors posed another challenge, especially during image transfers between the VM and the local machine. These issues deepened my understanding of secure cloud access and key management.</p>
                <br /><br /> 
                <p className="secondaryheaders">Lessons Learned</p>
                <p>This project underscored the importance of adaptability and problem-solving in the face of technical constraints. From optimizing Stable Diffusion for CPU usage to overcoming SSH challenges, each hurdle enriched my understanding of cloud deployment and AI integration.</p>
                <br /><br />
            </div>
                <footer className="writeup-footer">
                    <span className="ai-copyright">© Shaquon Hamilton 2024.</span>
                </footer>
        </div>
    );
}