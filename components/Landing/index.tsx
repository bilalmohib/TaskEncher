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


import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, Grid, Typography, Paper } from '@mui/material';
import { BsGraphUp, BsClipboardData, BsPeople } from 'react-icons/bs';

const Landing: React.FC = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        // backgroundImage: `url("https://source.unsplash.com/random?workspace")`,
        backgroundImage: `url("https://d12y7sg0iam4lc.cloudfront.net/s/img/marketing/top-task-management/task-management-software.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth="lg" sx={{ pt: 8, pb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={{ pb: 2 }}>
              Welcome to Taskencher
            </Typography>
            <Typography variant="h5" sx={{ pb: 2 }}>
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
            {/* Add an image or illustration here if needed */}
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ pt: 4 }}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <BsGraphUp size={48} />
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
              <BsClipboardData size={48} />
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
              <BsPeople size={48} />
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
      </Container>
    </Box>
  );
};

export default Landing;
