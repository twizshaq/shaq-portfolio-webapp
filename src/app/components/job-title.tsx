import { useState, useEffect } from 'react';

type TypewriterProps = {
    titles: string[];
    speed?: number;
    pause?: number;
};

export const Typewriter: React.FC<TypewriterProps> = ({ titles, speed = 100, pause = 4000 }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [forward, setForward] = useState(true);
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        if (forward && subIndex === titles[index]?.length) {
            // Pause after fully typing the title
            setTimeout(() => setForward(false), pause);
        } else if (!forward && subIndex === 0) {
            // Move to the next title
            setIndex((prevIndex) => (prevIndex + 1) % titles.length);
            setForward(true);
        } else {
            const timeout = setTimeout(() => {
                setSubIndex((prevSubIndex) => prevSubIndex + (forward ? 1 : -1));
            }, forward ? speed : speed / 2);

            return () => clearTimeout(timeout);
        }
    }, [subIndex, forward, titles, speed, pause, index]);

    // Blinking effect that always toggles
    useEffect(() => {
        const blinkTimeout = setInterval(() => {
            setBlink((prev) => !prev);
        }, 500); // Blinking interval in milliseconds

        return () => clearInterval(blinkTimeout);
    }, []);

    return (
        <span>
            {`${titles[index].substring(0, subIndex)}${blink ? "|" : " "}`}
        </span>
    );
};