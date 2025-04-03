"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";

export default function Imersa() {
  const pathname = usePathname();
  const [showDetails, setShowDetails] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const [isZelyxHighlighted, setIsZelyxHighlighted] = useState(false);

  // Improved camera state and refs
  const [isMobile, setIsMobile] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDetails(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Better mobile detection with both width and UserAgent check
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobileByWidth = window.innerWidth < 768;
      const isMobileByAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(isMobileByWidth || isMobileByAgent);
      console.log("Mobile detection:", { byWidth: isMobileByWidth, byAgent: isMobileByAgent });
    }
  }, []);

  // Clean up camera resources when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        console.log("Camera tracks stopped on unmount");
      }
    };
  }, []);

  // Improved function to start the camera
  const startCamera = async () => {
    console.log("startCamera function called");
    setCameraError(null);
    
    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia
      ) {
        console.log("getUserMedia is supported");
        
        // Stop any existing stream first
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        
        // Request camera access with explicit constraints for mobile
        const constraints = {
          video: {
            facingMode: "environment",
            width: { ideal: window.innerWidth },
            height: { ideal: window.innerHeight }
          },
          audio: false
        };
        
        console.log("Requesting media with constraints:", constraints);
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log("getUserMedia success - stream tracks:", stream.getVideoTracks().length);
        
        // Store the stream for cleanup
        streamRef.current = stream;
        
        if (videoRef.current) {
          console.log("Setting video source");
          videoRef.current.srcObject = stream;
          
          // For iOS devices
          videoRef.current.setAttribute('playsinline', 'true');
          videoRef.current.setAttribute('webkit-playsinline', 'true');
          
          // Handle play() with proper error handling
          try {
            // Use a promise to ensure play resolves
            await new Promise<void>((resolve, reject) => {
              if (!videoRef.current) return reject("Video element not available");
              
              // Setup event listeners
              const playSuccess = () => {
                console.log("Video playback started successfully");
                resolve();
                // Clean up listeners
                if (videoRef.current) {
                  videoRef.current.removeEventListener("playing", playSuccess);
                  videoRef.current.removeEventListener("error", playError);
                }
              };
              
              const playError = (e: Event) => {
                console.error("Video play error event:", e);
                reject(new Error("Video playback failed"));
                // Clean up listeners
                if (videoRef.current) {
                  videoRef.current.removeEventListener("playing", playSuccess);
                  videoRef.current.removeEventListener("error", playError);
                }
              };
              
              // Add event listeners
              videoRef.current.addEventListener("playing", playSuccess);
              videoRef.current.addEventListener("error", playError);
              
              // Try to play
              const playPromise = videoRef.current.play();
              
              // Handle browsers that don't return a promise
              if (playPromise !== undefined) {
                playPromise.catch(error => {
                  console.error("Play promise rejected:", error);
                  reject(error);
                });
              }
            });
            
            // If we get here, play was successful
            setCameraStarted(true);
            console.log("Camera started successfully");
          } catch (playError) {
            console.error("Error playing video:", playError);
            setCameraError("Could not start video playback. Please try again.");
          }
        } else {
          console.error("Video element reference is null");
          setCameraError("Video element not available");
        }
      } else {
        console.error("getUserMedia is not supported on this device/browser");
        setCameraError("Camera not supported on this device");
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError(err instanceof Error ? err.message : "Unknown camera error");
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-[100dvh]">
      {/* Background container for camera or fallback */}
      <div className="absolute top-[0px] w-[100vw] h-[70dvh] z-[-10]">
        {isMobile ? (
          <>
            <video
              ref={videoRef}
              playsInline
              muted
              autoPlay
              className={`w-full h-full object-cover ${cameraStarted ? "block" : "hidden"}`}
            />
            {cameraError && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-4 rounded-lg z-50">
                {cameraError}
              </div>
            )}
          </>
        ) : (
          // Fallback square on desktop
          <div className="w-[300px] h-[300px] bg-gray-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>

      {/* Enable Camera Button for Mobile */}
      {isMobile && !cameraStarted && (
        <button
          onClick={startCamera}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-lg z-50"
        >
          Enable Camera
        </button>
      )}

      {/* Top bar / Dropdown */}
      <div ref={dropdownRef} className="relative">
        {/* Toggle button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="fixed max-mobile3:left-[80px] max-mobile3:top-[13px] z-[1] top-[85px] left-1/2 -translate-x-1/2 rounded-[35px] pl-[15px] pr-[5px] pb-[2px] hover:bg-white hover:bg-opacity-[.1] flex"
        >
          <div className="text-[2rem] font-extrabold">zelyx</div>
          <span className="text-[2rem] mt-[11px]">
            <MdKeyboardArrowDown />
          </span>
        </button>
        <div
          className="fixed max-mobile3:left-[0px] left-[0px] w-[100vw] max-mobile3:top-[-50px] z-[0] top-[0px] pl-[15px] pr-[5px] pb-[20px] max-mobile3:h-[130px] h-[140px] bg-[#101013] backdrop-blur-[5px] bg-opacity-[.8] flex max-mobile3:blur-[3px] blur-[10px]"
        />
        <div
          className="fixed max-mobile3:left-[0px] left-[0px] w-[100vw] max-mobile3:top-[-2px] z-[1] top-[15px] pl-[15px] pr-[5px] pb-[2px] max-mobile3:h-[7px] h-[0px] bg-[#101013] bg-opacity-[1] flex"
        />

        {/* Dropdown content */}
        {showDetails && (
          <div
            onClick={() => setShowDetails(false)}
            className="fixed flex justify-center top-[150px] w-fit h-fit bg-black/60 backdrop-blur-sm border-[2.5px] border-[--outline-color] border-solid rounded-[35px] overflow-hidden z-[20] max-mobile3:top-[70px] max-mobile3:left-[15px] mobile3:left-1/2 mobile3:-translate-x-1/2"
          >
            <div className="ai-opt-child-ctn">
              <Link
                href="/aichat"
                className={`flex flex-col w-[220px] h-fit text-start p-[7px] rounded-[20px] ${
                  pathname === "/aichat"
                    ? "bg-white bg-opacity-[.3]"
                    : "bg-transparent hover:bg-white hover:bg-opacity-[.1]"
                }`}
              >
                <p className="ai-title">zelyx</p>
                <p className="ai-desc">Assistive chat bot</p>
              </Link>
              <Link
                href="/aichat/imersa"
                className={`flex flex-col w-[220px] h-fit text-start p-[7px] rounded-[20px] ${
                  pathname === "/aichat/imersa"
                    ? "bg-white bg-opacity-[.3]"
                    : "bg-transparent hover:bg-white hover:bg-opacity-[.1]"
                }`}
              >
                <p className="ai-title">imersa</p>
                <p className="ai-desc">Step into my world</p>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      {/* <p className="text-[2rem] font-bold">imersa</p> */}
    </div>
  );
}