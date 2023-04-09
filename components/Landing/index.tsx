import React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  BsGraphUp,
  BsClipboardData,
  BsPeople,
  BsChatDots,
  BsCheckCircle,
} from 'react-icons/bs';
import Image from 'next/image';

//Importing components
import Header from './Header';
import ScrollTriggerAnimation from '@app/components/ScrollTriggerAnimation';
// import ScrollAnimation from "@app/components/ScrollAnimation";

// For animations
import { motion, useAnimation } from 'framer-motion';
import { InView, useInView } from 'react-intersection-observer';

const Landing: React.FC = () => {
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
  const MotionPaper = motion(Paper);

  const features = [
    {
      title: 'Powerful Analytics',
      icon: <BsGraphUp size={48} color="#0052CC" />,
      description:
        'Gain insights and make data-driven decisions with Taskencher\'s powerful analytics tools.',
    },
    {
      title: 'Streamlined Workflow',
      icon: <BsClipboardData size={48} color="#0052CC" />,
      description:
        'Organize and prioritize tasks with our intuitive interface and customizable workflows.',
    },
    {
      title: 'Team Collaboration',
      icon: <BsPeople size={48} color="#0052CC" />,
      description:
        'Collaborate effectively with your team, share updates, and track progress in real time.',
    },
  ];

  const benefits = [
    {
      title: 'Easy to use',
      icon: <BsCheckCircle size={48} color="#0052CC" />,
      description:
        'Taskencher is designed to be easy to use, so you can focus on what matters most.',
    },
    {
      title: 'Real-time updates',
      icon: <BsCheckCircle size={48} color="#0052CC" />,
      description:
        'Stay up to date with your team\'s progress and get notified of any changes in real time.',
    },
    {
      title: 'Secure and reliable',
      icon: <BsCheckCircle size={48} color="#0052CC" />,
      description:
        'Taskencher is built on a secure and reliable platform, so you can rest assured that your data is safe.',
    },
    {
      title: '24/7 support',
      icon: <BsCheckCircle size={48} color="#0052CC" />,
      description:
        'Our team is always available to help you with any questions or concerns you may have.',
    },
    {
      title: 'Free forever',
      icon: <BsCheckCircle size={48} color="#0052CC" />,
      description:
        'Taskencher is completely free to use, so you can get started right away.',
    }
  ];

  const scrollVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box>
      <Header />
      <Box
        sx={{
          //   backgroundImage: `url("https://source.unsplash.com/random?workspace")`,
          //   backgroundSize: 'cover',
          //   backgroundPosition: 'center',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 8, pb: 8 }}>
          <motion.div
            style={{ paddingTop: 8, paddingBottom: 8 }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h2" sx={{ pb: 2, color: '#0052CC' }}>
                  Welcome to Taskencher
                </Typography>
                <Typography variant="h5" sx={{ pb: 2, color: '#172B4D' }}>
                  Boost your business success with efficient task management
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => router.push('/login')}
                >
                  Get Started
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Image
                  src="/images/landing.png"
                  alt="Project management illustration"
                  width={500}
                  height={400}
                  objectFit="cover"
                  objectPosition="center"
                  loading="eager"
                  style={{ borderRadius: '8px' }}
                />
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 8, pb: 8 }}>
        <Typography variant="h4" sx={{ pb: 4, color: '#0052CC' }}>
          Features
        </Typography>
        <MotionGrid container spacing={4} variants={containerVariants}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <ScrollTriggerAnimation key={index} animationVariants={scrollVariants}>
                <MotionPaper
                  elevation={3}
                  sx={{ p: 4, textAlign: 'center' }}
                  variants={itemVariants}
                >
                  {feature.icon}
                  <Typography variant="h6" sx={{ pt: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography>{feature.description}</Typography>
                </MotionPaper>
              </ScrollTriggerAnimation>
            </Grid>
          ))}
        </MotionGrid>

        <Typography variant="h4" sx={{ pt: 8, pb: 4, color: '#0052CC' }}>
          Benefits
        </Typography>
        <MotionGrid container spacing={4} variants={containerVariants}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <BsCheckCircle size={48} color="#0052CC" />
              <Typography variant="h6" sx={{ pt: 2 }}>
                Increased Productivity
              </Typography>
              <Typography>
                Improve your team&apos;s productivity with clear goals, prioritized tasks, and real-time progress tracking.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <BsChatDots size={48} color="#0052CC" />
              <Typography variant="h6" sx={{ pt: 2 }}>
                Seamless Communication
              </Typography>
              <Typography>
                Keep your team connected and engaged with our built-in chat features, ensuring effective collaboration.
              </Typography>
            </Paper>
          </Grid>
        </MotionGrid>

        <Typography variant="h4" sx={{ pt: 8, pb: 4, color: '#0052CC' }}>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ padding: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ pb: 2 }}>
                  Basic
                </Typography>
                <Typography variant="h6" sx={{ pb: 2 }}>
                  $10 / month
                </Typography>
                <Typography>Up to 10 users</Typography>
                <Typography>Basic features</Typography>
                <Typography>Email support</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" onClick={() => router.push('/signup')}>
                  Get Started
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ padding: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ pb: 2 }}>
                  Pro
                </Typography>
                <Typography variant="h6" sx={{ pb: 2 }}>
                  $25 / month
                </Typography>
                <Typography>Up to 50 users</Typography>
                <Typography>All features</Typography>
                <Typography>Priority support</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" onClick={() => router.push('/signup')}>
                  Get Started
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ padding: 2 }}>
              <CardContent>
                <Typography variant="h5" sx={{ pb: 2 }}>
                  Enterprise
                </Typography>
                <Typography variant="h6" sx={{ pb: 2 }}>
                  Custom Pricing
                </Typography>
                <Typography>Unlimited users</Typography>
                <Typography>Custom features</Typography>
                <Typography>Dedicated support</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" onClick={() => router.push('/contact')}>
                  Contact Us
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>

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
    </Box>
  );
};

export default Landing;

