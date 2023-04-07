import React from 'react';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Header: React.FC = () => {
    const router = useRouter();

    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Container maxWidth="lg">
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Button
                            sx={{
                                background: "transparent",
                                border: "none",
                                '&:hover': {
                                    background: 'transparent',
                                },
                                '&:active': {
                                    background: 'transparent',
                                },
                                '&:focus': {
                                    background: 'transparent',
                                }
                            }}
                            onClick={() => router.push('/')}>
                            <Image
                                src="/logocopy.png"
                                alt="Taskencher Logo"
                                width={48}
                                height={48}
                            />
                            <span
                                style={{
                                    "fontSize": "24",
                                    "marginTop": "3px",
                                    "background": "linear-gradient(90deg, #5e8cff 0%, #66ffeb 100%)",
                                    "WebkitBackgroundClip": "text",
                                    "MozBackgroundClip": "text",
                                    "backgroundClip": "text",
                                    "WebkitTextFillColor": "transparent"
                                }}>
                                TaskEncher
                            </span>
                            <Typography
                                variant="subtitle2"
                                component="span"
                                style={{
                                    color: '#FF0000',
                                    fontWeight: 'bold',
                                    marginLeft: '5px',
                                }}
                            >
                                BETA
                            </Typography>
                            <div style={{ fontSize: 10, position: 'relative', bottom: '-10px', right: '-5px' }}>
                                Rev Up Tasks & Efficiency
                            </div>
                        </Button>
                    </Box>
                    <Button color="inherit" onClick={() => router.push('/features')}>
                        Features
                    </Button>
                    <Button color="inherit" onClick={() => router.push('/pricing')}>
                        Pricing
                    </Button>
                    <Button color="inherit" onClick={() => router.push('/about')}>
                        About
                    </Button>
                    <Button color="inherit" onClick={() => router.push('/contact')}>
                        Contact
                    </Button>
                    <Button color="primary" variant="outlined" onClick={() => router.push('/login')}>
                        Get Started
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;