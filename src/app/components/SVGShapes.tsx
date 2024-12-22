import React from "react";
import "./SVGShapes.css";

function SVGShapes() {
  // Generate an array of random positions and scales
  const generateShapes = () => {
    const shapes = [];
    for (let i = 0; i < 20; i++) { // Adjust the number of "X" shapes
      const left = Math.random() * 100; // Random horizontal position (%)
      const top = Math.random() * 100; // Random vertical position (%)
      const scale = 0.5 + Math.random(); // Random scale between 0.5 and 1.5
      shapes.push({ left, top, scale });
    }
    return shapes;
  };

  const shapes = generateShapes();

  return (
    <div className="svg-container">
      {shapes.map((shape, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 120 120"
          direction="ltr"
          className="svg"
          style={{
            position: "absolute",
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            transform: `scale(${shape.scale})`,
          }}
        >
          <path d="M 99.6 20.4 Q 96 24 92.4 27.6" className="path path1" />
          <path d="M 92.4 20.4 Q 96 24 99.6 27.6" className="path path2" />
        </svg>
      ))}
    </div>
  );
}

export default SVGShapes;