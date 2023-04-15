import React, { useEffect } from 'react';
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
    CardMedia,
    Avatar,
    Step,
    Stepper,
    StepLabel,
} from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import Connector from "@mui/material/Stepper";
import StepIcon from '@mui/material/StepIcon';

// Import your other components and dependencies

const CustomStepIcon = styled(StepIcon)({
    '&.MuiStepIcon-root.MuiStepIcon-active': {
        color: '#0052CC',
    },
    '&.MuiStepIcon-root.MuiStepIcon-completed': {
        color: '#5da183',
        backgroundColor: '#5da183',
    },
});

const steps = [
    {
        title: 'Sign Up',
        description: 'Create your Taskencher account in just a few simple steps.',
    },
    {
        title: 'Create Tasks',
        description: 'Add tasks, set priorities, and assign them to team members.',
    },
    {
        title: 'Collaborate',
        description: 'Collaborate with your team in real time using the built-in chat feature.',
    },
    {
        title: 'Track Progress',
        description: 'Monitor progress, manage deadlines, and ensure timely completion of tasks.',
    },
];

const HowItWorksSection = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    useEffect(() => {
        if (activeStep === steps.length + 1) {
            setActiveStep(0);
        }
    }, [activeStep]);

    return (
        <Container maxWidth="lg" sx={{ pt: 8, pb: 8 }}>
            <Typography variant="h4" sx={{ pb: 2, color: '#0052CC' }}>
                How It Works
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Stepper activeStep={activeStep}
                    onClick={() => setActiveStep(activeStep + 1)}
                    connector={<Connector />} sx={{ pt: 1 }}>
                    {steps.map((step: any, index: number) => (
                        <Step key={index}>
                            <StepLabel StepIconComponent={CustomStepIcon}>{step.title}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Grid className='mt-2' container spacing={4}>
                    {steps.map((step, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setActiveStep(index+1)}
                            >
                                <Card sx={{ padding: 2, textAlign: 'center' }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ pt: 2 }}>
                                            {step.title}
                                        </Typography>
                                        <Typography>{step.description}</Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};
export default HowItWorksSection;

// Your other components and logic
