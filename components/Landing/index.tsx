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
import HowItWorksSection from './HowItWorksSection';
import TestimonialsSection from './TestimonialsSection';

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
  const MotionCard = motion(Card);

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
      title: 'Increased Productivity',
      icon: <BsCheckCircle size={48} color="#0052CC" />,
      description:
        'Improve your team&apos;s productivity with clear goals, prioritized tasks, and real-time progress tracking.',
    },
    {
      title: 'Seamless Communication',
      icon: <BsChatDots size={48} color="#0052CC" />,
      description:
        'Keep your team connected and engaged with our built-in chat features, ensuring effective collaboration.',
    },
    {
      title: 'Improved Efficiency',
      icon: <BsCheckCircle size={48} color="#0052CC" />,
      description:
        'Improve your team&apos;s efficiency with clear goals, prioritized tasks, and real-time progress tracking.',
    },
  ];

  const pricings = [
    {
      title: 'Basic',
      price: '$10 / month',
      features: [
        'Up to 10 users',
        'Basic features',
        'Email support',
      ]
    },
    {
      title: 'Pro',
      price: '$25 / month',
      features: [
        'Up to 50 users',
        'All features',
        'Priority support',
      ]
    },
    {
      title: 'Enterprise',
      price: 'Custom Pricing',
      features: [
        'Unlimited users',
        'Custom features',
        'Dedicated support',
      ]
    },
  ]

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
                <ScrollTriggerAnimation animationVariants={scrollVariants}>
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
                </ScrollTriggerAnimation>
              </Grid>
              <Grid item xs={12} md={6}>
                <ScrollTriggerAnimation animationVariants={scrollVariants}>
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
                </ScrollTriggerAnimation>
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
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <ScrollTriggerAnimation key={index} animationVariants={scrollVariants}>
                <MotionPaper
                  elevation={3}
                  sx={{ p: 4, textAlign: 'center' }}
                  variants={itemVariants}
                >
                  {benefit.icon}
                  <Typography variant="h6" sx={{ pt: 2 }}>
                    {/* Increased Productivity */}
                    {benefit.title}
                  </Typography>
                  <Typography>
                    {/* Improve your team&apos;s productivity with clear goals, prioritized tasks, and real-time progress tracking. */}
                    {benefit.description}
                  </Typography>
                </MotionPaper>
              </ScrollTriggerAnimation>
            </Grid>
          ))}
        </MotionGrid>

        <Typography variant="h4" sx={{ pt: 8, pb: 4, color: '#0052CC' }}>
          Pricing
        </Typography>
        <MotionGrid container spacing={4} variants={containerVariants}>
          {pricings.map((pricing, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <ScrollTriggerAnimation key={index} animationVariants={scrollVariants}>
                <MotionCard
                  elevation={3}
                  sx={{ padding: 2 }}
                  variants={itemVariants}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ pb: 2 }}>
                      {pricing.title}
                    </Typography>
                    <Typography variant="h6" sx={{ pb: 2 }}>
                      {pricing.price}
                    </Typography>
                    {pricing.features.map((feature, index) => (
                      <Typography key={index}>{feature}</Typography>
                    ))}
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary" onClick={() => router.push('/signup')}>
                      Get Started
                    </Button>
                  </CardActions>
                </MotionCard>
              </ScrollTriggerAnimation>
            </Grid>
          ))}
        </MotionGrid>
      </Container>

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

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

