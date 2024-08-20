import { ReactNode } from "react";
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

    type AnimatedSectionProps = {
    children: ReactNode;
};

export const AnimatedSection = ({ children }: AnimatedSectionProps) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.8 }} // Animation triggers when the section is 80% in view
    >
            {children}
        </motion.div>
    );
};