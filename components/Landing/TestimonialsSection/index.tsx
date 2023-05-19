import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"; // Assuming you'r
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    Avatar,
    ButtonBase
} from '@mui/material';
import Ripple from '@app/components/Ripple';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Importing components
import ScrollTriggerAnimation from '@app/components/ScrollTriggerAnimation';
// import ScrollAnimation from "@app/components/ScrollAnimation";

// For animations
import { motion } from 'framer-motion';

// Custom arrow components
const CustomNextArrow = ({ onClick }: any) => (
    <ButtonBase
        style={{
            color: "#fff",
            backgroundColor: "#172b4d",
            position: "absolute",
            right: 15,
            top: "50%",
            fontSize: 30,
            zIndex: 2,
            width: 45,
            height: 45,
            borderRadius: "50%",
            cursor: "pointer",
        }}
        onClick={onClick}
    >
        {/* <Ripple color={"#1fecf9"} duration={2000} /> */}
        <FaArrowRight
            style={{
                marginTop: -3,
                marginLeft: 3
            }}
        />
    </ButtonBase>
);

const CustomPrevArrow = ({ onClick }: any) => (
    <ButtonBase
        style={{
            color: "#fff",
            backgroundColor: "#172b4d",
            position: "absolute",
            left: 15,
            top: "50%",
            fontSize: 30,
            zIndex: 2,
            width: 45,
            height: 45,
            borderRadius: "50%",
            cursor: "pointer"
        }}
        onClick={onClick}
    >
        {/* <Ripple color={"#1fecf9"} duration={2000} /> */}
        <FaArrowLeft
            style={{
                marginTop: -3,
                marginLeft: 3
            }}
        />
    </ButtonBase>
);

const TestimonialsSection: React.FC = () => {
    const [key, setKey] = useState(Date.now());

    useEffect(() => {
        setKey(Date.now());
    }, []);

    // Framer Motion variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5, when: 'beforeChildren', staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const MotionGrid = motion(Grid);
    const MotionCard = motion(Card);

    // New content for the Testimonials section
    const testimonials = [
        {
            name: 'Jane Doe',
            role: 'Project Manager',
            company: 'ABC Corp.',
            quote:
                'Taskencher has been a game-changer for our team. It helps us stay organized and collaborate more effectively.',
            avatar: 'https://img.freepik.com/free-photo/portrait-handsome-young-man-smiling_23-2148431276.jpg?w=1380&t=st=1684439486~exp=1684440086~hmac=7bfa1a024b3b9ff549c9058559e847cdd4ea4660d59cb11ebdbce25fcdb264b8',
        },
        {
            name: 'John Smith',
            role: 'Team Lead',
            company: 'XYZ Inc.',
            quote:
                'Taskencher has made it much easier for us to manage our tasks and keep track of progress.',
            avatar: 'https://img.freepik.com/free-photo/close-up-portrait-smiling-man-with-healthy-teeth_186202-2424.jpg?w=740&t=st=1684439509~exp=1684440109~hmac=7baa22d0357b8e918347fd369b5ea0c2cdcc8207e0b52dc9fc83b6e6b5d35e68',
        },
        {
            name: 'Emily Johnson',
            role: 'Product Manager',
            company: 'Tech Solutions',
            quote:
                'Our team loves Taskencher! It has streamlined our workflow and improved overall efficiency.',
            avatar: 'https://img.freepik.com/free-photo/attractive-happy-guy-with-bristle-have-wide-smile_144627-2023.jpg?w=740&t=st=1684439536~exp=1684440136~hmac=fd71e24997b96d4c140769e7f0599e6f9f581f84ee237499e285208cb64d8b7f',
        },
        {
            name: 'Sarah Jones',
            role: 'Project Manager',
            company: 'ABC Corp.',
            quote:
                'Taskencher has been a game-changer for our team. It helps us stay organized and collaborate more effectively.',
            avatar: "https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129416.jpg?w=1380&t=st=1684439615~exp=1684440215~hmac=a505f46baf332a93366ce167c7be5dbd63de6f09454711af210d72f9902c2249"
        }
    ];

    const scrollVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        // {/* Testimonials section */ }
        <Box
            sx={{
                bgcolor: '#F4F5F7',
                borderBottom: '1px solid #E0E0E0',
                pt: 8,
                pb: 8,
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ pb: 4, color: '#0052CC' }}>
                    Testimonials
                </Typography>

                <Slider
                    dots={true}
                    infinite={true}
                    speed={800}
                    autoplay={true}
                    autoplaySpeed={2000}
                    key={key}
                    slidesToShow={3}
                    slidesToScroll={1}
                    nextArrow={<CustomNextArrow />}
                    prevArrow={<CustomPrevArrow />}
                >
                    {testimonials.map((testimonial, index) => (
                        <div key={index}>
                            {/* <ScrollTriggerAnimation key={index} animationVariants={scrollVariants}> */}
                            <MotionCard
                                elevation={3}
                                key={index}
                                sx={{
                                    padding: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'center',
                                    bgcolor: '#fff',
                                    borderRadius: 2,
                                    marginRight: 1
                                }}
                                variants={itemVariants}
                            >
                                <Avatar
                                    alt={testimonial.name}
                                    src={testimonial.avatar}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        margin: 'auto',
                                        marginBottom: 2
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: '#0052CC', fontWeight: 'bold' }}>
                                        {testimonial.name}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: '#888', fontStyle: 'italic' }}>
                                        {testimonial.role}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: '#333' }}>
                                        {testimonial.company}
                                    </Typography>
                                    <Typography sx={{ mt: 2, color: '#666' }}>{testimonial.quote}</Typography>
                                </CardContent>
                            </MotionCard>
                            {/* </ScrollTriggerAnimation> */}
                        </div>
                    ))}
                </Slider>
            </Container>
        </Box>
    )
}
export default TestimonialsSection;
