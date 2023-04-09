import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollTriggerAnimation = ({ children, threshold = 0.1, ...props }:any) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold,
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
          } else {
            controls.start('hidden');
          }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            transition={{ duration: 0.6, ease: 'easeOut' }}
            variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 0.8 },
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default ScrollTriggerAnimation;
