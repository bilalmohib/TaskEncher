// pages/features/index.tsx

import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
} from '@mui/material';
import Header from '@app/components/Landing/Header';
import Footer from '@app/components/Landing/Footer';
import { motion } from 'framer-motion';

const featuresData = [
    {
        title: 'Task Creation and Management',
        description:
            'Easily create, manage, and assign tasks to your team members. Keep track of progress and deadlines to ensure maximum productivity.',
    },
    {
        title: 'Team Collaboration',
        description:
            'Improve communication and collaboration within your team using our built-in chat and discussion features.',
    },
    {
        title: 'One-to-One Chat',
        description:
            'Have private conversations with individual team members to discuss task-specific details or provide personalized feedback.',
    },
    {
        title: 'Project Management',
        description:
            'Organize your tasks within projects and keep an eye on the overall progress of your team.',
    },
    {
        title: 'Customizable Workflows',
        description:
            'Tailor your workflow to fit your team’s unique needs and preferences. Customize task statuses, priorities, and more.',
    },
    {
        title: 'Powerful Analytics',
        description:
            'Gain insights into your team’s performance and productivity using powerful analytics tools and data-driven reports.',
    },
];

const Features = () => {
    return (
        <>
            <Header />
            <Container sx={{
                paddingTop: 8,
                paddingBottom: 8
            }}>
                <Typography variant="h3" component="h1" align="center" gutterBottom
                    className="font-serif border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-900"
                >
                    Taskencher Features
                </Typography>
                <Grid container spacing={4} className="mt-4">
                    {featuresData.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <motion.div
                                style={{ height: '300px' }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 },
                                }}
                            >
                                <Card sx={{
                                    padding: 3,
                                    height: '300px'
                                }}>
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            component="h2"
                                            sx={{
                                                marginBottom: 2
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                marginTop: 1
                                            }}
                                            className='font-mono'
                                        >
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default Features;
