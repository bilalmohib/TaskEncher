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
import Image from 'next/image';
import { motion } from 'framer-motion';

const aboutUsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutUs = () => {
    return (
        <>
            <Head>
                <title>Taskencher | About Us</title>
                <meta name="description" content="Taskencher About Us" />
                <link rel="icon" href="/logocopy.ico" />
            </Head>
            <Header />
            <Container sx={{ paddingTop: 8, paddingBottom: 8 }}>
                <Typography variant="h3" component="h1" align="center" gutterBottom>
                    About Us
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                    <motion.div
                        variants={aboutUsVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <Image
                            src="/images/aboutus.jpg"
                            alt="About Us"
                            width={700}
                            height={400}
                        />
                    </motion.div>
                </Box>
                <Grid container spacing={4} className="mt-8">
                    <Grid item xs={12} md={6}>
                        <motion.div
                            variants={aboutUsVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Card sx={{ height: '340px', padding: 3 }}>
                                <CardContent>
                                    <Typography variant="h4" component="h2" gutterBottom>
                                        Who We Are
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        We are a team of experienced developers and project managers
                                        who are passionate about helping teams improve their
                                        productivity and achieve their goals. Our mission is to
                                        provide a simple and intuitive project management tool that
                                        helps teams collaborate more effectively and get more done
                                        in less time.
                                    </Typography>
                                    <Typography variant="body1">
                                        If you have any questions or feedback, please don&lsquo;t
                                        hesitate to contact us.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div
                            variants={aboutUsVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Card sx={{ height: '340px', padding: 3 }}>
                                <CardContent>
                                    <Typography variant="h4" component="h2" gutterBottom>
                                        Our Vision
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Our vision is to become the leading project management tool
                                        for teams of all sizes, helping them achieve their goals and
                                        drive their businesses forward. We believe that by providing
                                        powerful yet intuitive tools that simplify the project
                                        management process, we can empower teams to work more
                                        efficiently and achieve better results.
                                    </Typography>
                                    <Typography variant="body1">
                                        Thank you for choosing Taskencher, and we look forward to
                                        working with you.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                </Grid>

            </Container>
            <Footer />
        </>
    );
};

export default AboutUs;