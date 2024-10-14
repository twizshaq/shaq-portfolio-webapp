"use client";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image'

export default function Conditionalaccessproject() {
    return (
        <div className="main-conditionalaccess-writeup">
            <Link href="/projects">
                <div className="bck-btn"><span className="bck-arrow"><FaArrowLeftLong /></span><p className="bck-btn-text">Back</p></div></Link>
            <div className="main-portfolio-writeup-body">
                <p className="mainheaders">Conditional Access Policy: Phishing Simulation</p>
                <br /><br />
                <p className="secondaryheaders">Conditional Access Policy: Overview & Purpose</p>
                <p>This project involves setting up a phishing simulation with a Conditional Access Policy to safeguard user credentials from unauthorized access. In this simulation, a user would receive a phishing email containing a fake link to a login page. Upon entering their credentials, a bad actor would attempt to use these stolen credentials to gain access to the system. However, the Conditional Access Policy ensures that such unauthorized access attempts are blocked unless the request originates from a trusted home office network.</p>
                <br /><br />
                <p className="secondaryheaders">What Was Used</p>
                <p>To build and host this project, I used a modern tech stack and various cloud services, including:</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Microsoft Office 365 Outlook:</span> For sending phishing simulation emails.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Azure Entra ID (formerly Azure Active Directory):</span> To manage users and enforce the conditional access policies.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• VPN:</span> Used to simulate login attempts from different locations to verify that only the home network IP range allows successful login.</p>
                <br /><br />
                <p className="secondaryheaders">Use Case</p>
                <p>Phishing attacks are one of the most common ways attackers steal user credentials. In this use case, a phishing simulation is designed to test whether credentials obtained through a fake login page could be used by a malicious actor.</p>
                <br />
                <Image src="https://shaqportfoliostorage.blob.core.windows.net/images/phishing-email.png" alt="Access Blocked Image" width={650} height={0} style={{ display: 'block', 
    margin: '0 auto'}}/>
                <br />
                <p>The conditional access policy adds an extra security layer by restricting successful logins to specific network locations, such as the trusted home office network. Even if credentials are compromised, the attacker cannot log in unless they are connected to this predefined network.</p>
                <br />
                <p>This setup aligns with zero-trust principles, ensuring that user credentials alone are not sufficient to gain access—further verifying the origin of the access attempt before allowing login.</p>
                <br /><br />
                <p className="secondaryheaders">Implementation</p>
                <p>The policy was implemented using a network-based approach, restricting access to the following conditions:</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• IP Range Restriction:</span> Only devices on the home office network can log in to the account, even with valid credentials.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Blocked IPs:</span> All login attempts from unrecognized networks, including those using the stolen credentials from the phishing simulation, were blocked.</p>
                <br />
                <p>The policy ensures that unauthorized actors, even with compromised login details, cannot gain entry unless they are on a trusted IP address.</p>
                <br /><br />
                <p className="secondaryheaders">Challenges</p>
                <p>This project was relatively straightforward to implement. No significant technical issues arose during configuration or testing.</p>
                <br /><br /> 
                <p className="secondaryheaders">Outcome</p>
                <p>The implemented Conditional Access Policy resulted in a substantial improvement in security posture, as it blocked any login attempts from locations outside the predefined home network. This successfully mitigates the risk of unauthorized access, even in cases where credentials are stolen through phishing.</p>
                <br />
                <Image src="https://shaqportfoliostorage.blob.core.windows.net/images/access-blocked.png" alt="Access Blocked Image" width={650} height={0} style={{ display: 'block', 
    margin: '0 auto'}}/>
                <br />
                <p className="secondaryheaders">Lessons Learned</p>
                <p>This project highlighted the importance of network-based access control as part of a comprehensive security strategy. It reinforced the effectiveness of Conditional Access Policies and demonstrated that:</p>
                <br />
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Credentials alone are not enough:</span> Location-based policies add critical context to authentication attempts.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Zero Trust Architecture:</span> Policies like these help shift towards a more robust security model where trust is not implicit based on user credentials alone.</p>
                <p style={{ marginLeft: "25px" }}><span style={{ fontWeight: "700"}}>• Continuous Improvement:</span> Future policies could incorporate Multi-Factor Authentication (MFA) or device compliance policies to further enhance security.</p>
                <br />
            </div>
                <footer className="ai-footer">
                    <span className="ai-copyright">© Shaquon Hamilton 2024.</span>
                </footer>
        </div>
    );
}