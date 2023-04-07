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
import styled from '@emotion/styled';
import Header from '../components/Landing/Header';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    featureItem: {
        padding: 8,
    },
    featureTitle: {
        marginBottom: 2,
    },
    featureDescription: {
        marginTop: 1,
    },
}));

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
    const classes = useStyles();

    return (
        <>
            <Header />
            <Container className={classes.container}>
                <Typography variant="h2" component="h1" align="center" gutterBottom>
                    Taskencher Features
                </Typography>
                <Grid container spacing={4}>
                    {featuresData.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card className={classes.featureItem}>
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        component="h2"
                                        className={classes.featureTitle}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        className={classes.featureDescription}
                                    >
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default Features;
