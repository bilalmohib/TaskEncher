// pages/pricing/index.tsx

import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
} from '@mui/material';
import Head from 'next/head';
import Header from '@app/components/Landing/Header';
import Footer from '@app/components/Landing/Footer';
import { motion } from 'framer-motion';

const pricingData = [
    {
        title: 'Basic',
        price: '$0/month',
        features: [
            'Task Creation and Management',
            'Team Collaboration',
            'One-to-One Chat',
        ],
    },
    {
        title: 'Pro',
        price: '$19.99/month',
        features: [
            'Task Creation and Management',
            'Team Collaboration',
            'One-to-One Chat',
            'Project Management',
            'Customizable Workflows',
        ],
    },
    {
        title: 'Premium',
        price: '$29.99/month',
        features: [
            'Task Creation and Management',
            'Team Collaboration',
            'One-to-One Chat',
            'Project Management',
            'Customizable Workflows',
            'Powerful Analytics',
        ],
    },
];

const Pricing = () => {
    return (
        <>
            <Head>
                <title>Taskencher | Pricing</title>
                <meta name="description" content="Taskencher Pricing" />
                <link rel="icon" href="/logocopy.ico" />
            </Head>
            <Header />
            <Container sx={{ paddingTop: 8, paddingBottom: 8 }}>
                <Typography variant="h3" component="h1" align="center" gutterBottom
                    className="font-serif border-b-2 border-t-0 border-l-0 border-r-0 border-solid border-gray-900"
                >
                    Taskencher Pricing
                </Typography>
                <Grid container spacing={4} className="mt-4">
                    {pricingData.map((pricing: any, index: number) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <motion.div
                                style={{ height: '470px' }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 },
                                }}
                            >
                                <Card
                                    sx={{
                                        padding: 3,
                                        height: '470px',
                                        borderRadius: 8,
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            component="h2"
                                            sx={{ marginBottom: 2 }}
                                        >
                                            {pricing.title}
                                        </Typography>
                                        <Typography variant="h4" sx={{ marginBottom: 2 }}>
                                            {pricing.price}
                                        </Typography>
                                        <Box sx={{ marginBottom: 2, height: "210px" }}>
                                            <ul>
                                                {pricing.features.map((feature: any, index: number) => (
                                                    <li key={index}>
                                                        <Typography className='font-mono' variant="body1">
                                                            {feature}
                                                        </Typography>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Box>
                                        <Box sx={{ textAlign: 'center' }}>
                                            <motion.button
                                                whileHover={{
                                                    scale: 1.05,
                                                    transition: { duration: 0.2 },
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                                style={{
                                                    backgroundColor: '#3f51b5',
                                                    color: '#fff',
                                                    padding: '12px 32px',
                                                    borderRadius: 8,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: 2,
                                                    fontWeight: 600,
                                                    fontSize: '1rem',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                Select Plan
                                            </motion.button>
                                        </Box>
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

export default Pricing;
