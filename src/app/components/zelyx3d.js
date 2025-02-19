// components/SketchfabModel.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const SketchfabModel = ({ modelUid }) => {
  const mountRef = useRef(null);
  const camera = useRef(null); // useRef for camera as well, to access it in handleResize
  const renderer = useRef(null); // useRef for renderer too

  // Define handleResize OUTSIDE of useEffect, but within component scope
  const handleResize = () => {
    if (camera.current && mountRef.current && renderer.current) { // Check if refs are valid
      camera.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.current.render(scene, camera.current); // Use camera.current
    }
  };


  useEffect(() => {
    if (!modelUid) return;

    const scene = new THREE.Scene();
    camera.current = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    renderer.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.current.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.current.domElement);

    // Lighting (same as before) ...

    // Model Loading (FETCH FROM API ROUTE NOW)
    const loader = new GLTFLoader();
    const apiUrl = `/api/sketchfab-model?modelUid=${modelUid}`; // API route URL

    fetch(apiUrl) // Fetch from your API route
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }
        return response.blob(); // Get response as Blob (for GLTFLoader)
      })
      .then(blob => {
        const url = URL.createObjectURL(blob); // Create a URL for the Blob
        loader.load(
          url, // Load from the Blob URL
          (gltf) => {
            scene.add(gltf.scene);

            // Animation (same as before) ...
            // Camera Adjustment (same as before) ...
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          (error) => {
            console.error('An error happened loading the model:', error);
          }
        );
      })
      .catch(error => {
        console.error('Error fetching model data from API:', error);
      });

    // Resize handling (using container dimensions) - Attach event listener in useEffect
    window.addEventListener('resize', handleResize); // Use the moved handleResize

    return () => {
      window.removeEventListener('resize', handleResize); // Remove event listener in cleanup
      if (mountRef.current && renderer.current && renderer.current.domElement) { // Check refs before cleanup
        mountRef.current.removeChild(renderer.current.domElement);
      }
      if (renderer.current) {
        renderer.current.dispose();
      }
      // scene.dispose();  <-  Keep or remove scene.dispose() as needed
    };

  }, [modelUid]);

  return <div ref={mountRef} style={{ width: '300px', height: '300px' }} />;
};

export default SketchfabModel;