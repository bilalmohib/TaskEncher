// import React from 'react';
// import { useRouter } from 'next/router';
// import { Box, Button, Container, Grid, Typography } from '@mui/material';

// const Landing: React.FC = () => {
//   const router = useRouter();

//   return (
//     <Container sx={{ pt: 8 }}>
//       <Typography variant="h2" align="center" sx={{ pb: 4 }}>
//         Welcome to Taskencher
//       </Typography>
//       <Typography variant="h5" align="center">
//         Boost your business success with efficient task management
//       </Typography>
//       <Grid container spacing={4} sx={{ pt: 4 }}>
//         {/* Add feature blocks here */}
//       </Grid>
//       <Grid container spacing={4} sx={{ pt: 4 }}>
//         <Grid item xs={12} sm={4}>
//           <Box border={1} borderColor="divider" borderRadius={1} p={2} textAlign="center">
//             <Typography variant="h6">Free</Typography>
//             <Typography>5 projects</Typography>
//           </Box>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <Box border={1} borderColor="divider" borderRadius={1} p={2} textAlign="center">
//             <Typography variant="h6">$5 / month</Typography>
//             <Typography>50 projects</Typography>
//           </Box>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <Box border={1} borderColor="divider" borderRadius={1} p={2} textAlign="center">
//             <Typography variant="h6">$10 / month</Typography>
//             <Typography>100 projects</Typography>
//           </Box>
//         </Grid>
//       </Grid>
//       <Box textAlign="center" sx={{ mt: 4 }}>
//         <Button variant="contained" color="primary" onClick={() => router.push('/login')}>
//           Get Started
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Landing;


// import React from 'react';
// import { useRouter } from 'next/router';
// import { Box, Button, Container, Grid, Typography, Paper } from '@mui/material';
// import { BsGraphUp, BsClipboardData, BsPeople } from 'react-icons/bs';

// const Landing: React.FC = () => {
//   const router = useRouter();

//   return (
//     <Box
//       sx={{
//         // backgroundImage: `url("https://source.unsplash.com/random?workspace")`,
//         backgroundImage: `url("https://d12y7sg0iam4lc.cloudfront.net/s/img/marketing/top-task-management/task-management-software.png")`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <Container maxWidth="lg" sx={{ pt: 8, pb: 8 }}>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h2" sx={{ pb: 2 }}>
//               Welcome to Taskencher
//             </Typography>
//             <Typography variant="h5" sx={{ pb: 2 }}>
//               Boost your business success with efficient task management
//             </Typography>
//             <Button
//               variant="contained"
//               color="primary"
//               size="large"
//               onClick={() => router.push('/login')}
//             >
//               Get Started
//             </Button>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             {/* Add an image or illustration here if needed */}
//           </Grid>
//         </Grid>

//         <Grid container spacing={4} sx={{ pt: 4 }}>
//           <Grid item xs={12} sm={4}>
//             <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
//               <BsGraphUp size={48} />
//               <Typography variant="h6" sx={{ pt: 2 }}>
//                 Powerful Analytics
//               </Typography>
//               <Typography>
//                 Gain insights and make data-driven decisions with Taskencher&apos;s powerful analytics
//                 tools.
//               </Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
//               <BsClipboardData size={48} />
//               <Typography variant="h6" sx={{ pt: 2 }}>
//                 Streamlined Workflow
//               </Typography>
//               <Typography>
//                 Organize and prioritize tasks with our intuitive interface and customizable
//                 workflows.
//               </Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
//               <BsPeople size={48} />
//               <Typography variant="h6" sx={{ pt: 2 }}>
//                 Team Collaboration
//               </Typography>
//               <Typography>
//                 Collaborate effectively with your team, share updates, and track progress in real
//                 time.
//               </Typography>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default Landing;

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

const Landing: React.FC = () => {
  const router = useRouter();

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
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pt: 8, pb: 8 }}>
        <Typography variant="h4" sx={{ pb: 4, color: '#0052CC' }}>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <BsGraphUp size={48} color="#0052CC" />
              <Typography variant="h6" sx={{ pt: 2 }}>
                Powerful Analytics
              </Typography>
              <Typography>
                Gain insights and make data-driven decisions with Taskencher&apos;s powerful analytics
                tools.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <BsClipboardData size={48} color="#0052CC" />
              <Typography variant="h6" sx={{ pt: 2 }}>
                Streamlined Workflow
              </Typography>
              <Typography>
                Organize and prioritize tasks with our intuitive interface and customizable
                workflows.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <BsPeople size={48} color="#0052CC" />
              <Typography variant="h6" sx={{ pt: 2 }}>
                Team Collaboration
              </Typography>
              <Typography>
                Collaborate effectively with your team, share updates, and track progress in real
                time.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="h4" sx={{ pt: 8, pb: 4, color: '#0052CC' }}>
          Benefits
        </Typography>
        <Grid container spacing={4}>
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
        </Grid>

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

