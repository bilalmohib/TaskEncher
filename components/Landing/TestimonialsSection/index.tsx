import React from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    Avatar,
} from '@mui/material';

//Importing components
import ScrollTriggerAnimation from '@app/components/ScrollTriggerAnimation';
// import ScrollAnimation from "@app/components/ScrollAnimation";

// For animations
import { motion } from 'framer-motion';

const TestimonialsSection: React.FC = () => {
    const router = useRouter();

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
            avatar: '/images/jane.jpg',
        },
        {
            name: 'John Smith',
            role: 'Team Lead',
            company: 'XYZ Inc.',
            quote:
                'Taskencher has made it much easier for us to manage our tasks and keep track of progress.',
            avatar: '/images/john.jpg',
        },
        {
            name: 'Emily Johnson',
            role: 'Product Manager',
            company: 'Tech Solutions',
            quote:
                'Our team loves Taskencher! It has streamlined our workflow and improved overall efficiency.',
            avatar: '/images/emily.jpg',
        },
    ];

    const scrollVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        // {/* Testimonials section */ }
        <Box
            sx={{
                backgroundColor: '#F4F5F7',
                borderBottom: '1px solid #E0E0E0',
                paddingTop: 8,
                paddingBottom: 8,
            }
            }
        >
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ pb: 4, color: '#0052CC' }}>
                    Testimonials
                </Typography>
                <MotionGrid container spacing={4} variants={containerVariants}>
                    {testimonials.map((testimonial, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <ScrollTriggerAnimation key={index} animationVariants={scrollVariants}>
                                <MotionCard
                                    elevation={3}
                                    sx={{ padding: 2, display: 'flex', flexDirection: 'column', textAlign: 'center' }}
                                    variants={itemVariants}
                                >
                                    <Avatar
                                        alt={testimonial.name}
                                        src={testimonial.avatar}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            margin: 'auto',
                                            marginBottom: 2,
                                        }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{testimonial.name}</Typography>
                                        <Typography variant="subtitle2">{testimonial.role}</Typography>
                                        <Typography variant="subtitle2">{testimonial.company}</Typography>
                                        <Typography sx={{ marginTop: 2 }}>{testimonial.quote}</Typography>
                                    </CardContent>
                                </MotionCard>
                            </ScrollTriggerAnimation>
                        </Grid>
                    ))}
                </MotionGrid>
            </Container>
        </Box>
    )
}
export default TestimonialsSection;
