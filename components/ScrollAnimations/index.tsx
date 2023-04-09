// ScrollAnimation.js
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollAnimation = ({ children, threshold = 0.1, variants }: any) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: threshold,
    });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

export default ScrollAnimation;
