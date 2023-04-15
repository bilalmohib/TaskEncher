import { useRouter } from 'next/router';
import { Box, Button, Container, Grid, Typography } from '@mui/material';

const Footer = () => {

    const router = useRouter();

    return (
        <footer>
            <Box sx={{ backgroundColor: '#172B4D', pt: 8, pb: 8 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" sx={{ pb: 4, color: '#ffffff' }}>
                        Join Taskencher today!
                    </Typography>
                    <Typography variant="body1" sx={{ pb: 4, color: '#ffffff' }}>
                        Discover how Taskencher can help you streamline your projects, improve collaboration,
                        and boost productivity. Sign up now and start transforming the way you manage tasks!
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => router.push('/signup')}
                    >
                        Get Started
                    </Button>
                </Container>
            </Box>

            <Box sx={{ backgroundColor: '#0052CC', pt: 4, pb: 4 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ color: '#ffffff' }}>
                                Taskencher
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#ffffff' }}>
                                Taskencher is a powerful and user-friendly task management platform designed to help teams
                                collaborate, stay organized, and achieve success.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ color: '#ffffff' }}>
                                Quick Links
                            </Typography>
                            <Button sx={{ color: '#ffffff' }} onClick={() => router.push('/about')}>
                                About Us
                            </Button>
                            <Button sx={{ color: '#ffffff' }} onClick={() => router.push('/contact')}>
                                Contact
                            </Button>
                            <Button sx={{ color: '#ffffff' }} onClick={() => router.push('/faq')}>
                                FAQ
                            </Button>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" sx={{ color: '#ffffff', pt: 4 }}>
                        © {new Date().getFullYear()} Taskencher. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </footer>
    )
}
export default Footer;