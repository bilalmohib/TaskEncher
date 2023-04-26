import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
//////////////////////////////////////////////////

import Router from 'next/router';

import ScrollTriggerAnimation from '@app/components/ScrollTriggerAnimation';

// For animations
import { motion } from 'framer-motion';

import {
    doc,
    collection,
    onSnapshot,
    addDoc,
    query,
    orderBy,
    deleteDoc,
    setDoc,
    where
} from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';

// Importing firebase
import { db, auth } from "../../../firebase";
import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import CustomLoader from '../../CustomLoader';

import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Avatar,
    Typography,
    ButtonBase,
    Checkbox,
    Stack,
    IconButton,
    Autocomplete,
    Tooltip,
    Modal,
    Grid,
    Paper
} from '@mui/material';
import { handleClientScriptLoad } from 'next/script';
import Image from 'next/image';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { BsCheckCircle, BsChatDots } from 'react-icons/bs';
import { GoDeviceDesktop } from 'react-icons/go';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';

// Importing CSS styles
import styles from './Reporting.module.css';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    // border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1.3rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    paddingTop: 30,
    paddingBottom: 30,
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    backgroundColor: "#f9f8f8"
}));

interface ReportingProps {
    email: string;
}

const Reporting: React.FC<ReportingProps> = ({
    email
}) => {
    // ________________________ For Login ________________________ //
    const router = useRouter();

    // Framer Motion variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5, when: 'beforeChildren', staggerChildren: 0.2 },
        },
    };

    const scrollVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const MotionGrid = motion(Grid);
    const MotionPaper = motion(Paper);

    // Accordion
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    // For Changing Accordion
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    // signed in user data
    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    // States for status of login users
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [Loading, setloading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                if (signedInUserData === null) {
                    if (user.isAnonymous === true) {
                        let tempUser = {
                            displayName: "Anonymous",
                            email: `anonymous${user.uid}@guest.com`,
                            photoURL: user.photoURL,
                        }
                        console.log(tempUser);
                        setSignedInUserData(tempUser);
                        setIsSignedIn(true);
                    } else {
                        console.log(user);
                        setSignedInUserData(user);
                        setIsSignedIn(true);
                    }
                    // ...
                    setloading(false);
                }
                // if (!Loading) {
                //}
            } else {
                // User is signed out
                console.log("User is signed out");
                // ...
            }
        });
    }, [signedInUserData, Loading]);

    const dashboardList = [
        {
            title: 'Project Performance Dashboard',
            icon: <GoDeviceDesktop
                size={35}
                // color="#0052CC" 
                color="#ffffff"
            />,
            description:
                "The Project Performance Dashboard offers a holistic view of your team's projects, highlighting key performance indicators, progress tracking, and task completion status. Uncover valuable insights to drive better decision-making, streamline workflows, allocate resources efficiently, and boost overall project success. Keep track of project health and stay in control with real-time data at your fingertips.",
            createdBy: "You",
            createdAt: "12/12/2021",
            lastModified: "12/08/2022",
            lastModifiedBy: "You",
            projectID: "1234567890",
            projectURL: "https://www.google.com",
            dashboardType: "Project Performance Dashboard",
            dashboardID: "1234567890",
            dashboardURL: "https://www.google.com",
        },
        {
            title: ' Project Success Overview',
            icon: <GoDeviceDesktop
                size={35}
                // color="#0052CC"
                color="#ffffff"
            />,
            description:
                "The Project Success Overview provides a comprehensive snapshot of your team's project performance, showcasing essential metrics, progress updates, and task accomplishment rates. Gain actionable insights that empower informed decision-making, optimize processes, allocate resources effectively, and elevate project outcomes. Monitor project vitality and maintain command with instant access to crucial data.",
            createdBy: "You",
            createdAt: "02/11/2022",
            lastModified: "02/11/2022",
            lastModifiedBy: "You",
            projectID: "1234567890",
            projectURL: "https://www.google.com",
            dashboardType: "Project Performance Dashboard",
            dashboardID: "1234567890",
            dashboardURL: "https://www.google.com",
        },
        {
            title: 'Project Progress Insights',
            icon: <GoDeviceDesktop
                size={35}
                // color="#0052CC" 
                color="#ffffff"
            />,
            description:
                "The Project Progress Insights dashboard offers a holistic view of your team's project achievements, tracking key performance indicators, milestones, and task completion trends. Make data-driven decisions to streamline workflows, prioritize resources, and improve project results. Stay informed and on track with real-time visibility into the essential aspects of your projects' performance.",
            createdBy: "You",
            createdAt: "04/08/2001",
            lastModified: "12/12/2021",
            lastModifiedBy: "You",
            projectID: "1234567890",
            projectURL: "https://www.google.com",
            dashboardType: "Project Performance Dashboard",
            dashboardID: "1234567890",
            dashboardURL: "https://www.google.com",
        },
    ];

    ////////////////////////////////////// FOR GETTING PROJECTS DATA //////////////////////////////////////
    const e = email;

    // FOR GETTING PROJECTS
    let q = query(collection(db, "Data", "Projects", `${e}`));

    const [snapshot, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    // GETTINGS Active Jobs
    const [projects, setProjects] = useState<any>([]);
    // const [loading, setLoading] = useState(true); 

    // FOR GETTING PROJECTS
    useEffect(() => {

        if (!loading) {
            let projectMembers = [];
            let tempProjectsObj: any = snapshot?.docs.map((doc, i) => ({ ...doc.data(), id: doc.id }));

            setProjects(tempProjectsObj);

            // Create a new array containing projectmembers of each project object
            if (tempProjectsObj !== undefined) {
                for (let i = 0; i < tempProjectsObj.length; i++) {
                    projectMembers.push(tempProjectsObj[i].ProjectMembers);
                    //console.log("Project Members ==> ", tempProjectsObj[i].ProjectMembers);
                }
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, snapshot]);
    // FOR GETTING PROJECTS

    return (
        <div>
            {/* Home Page */}
            {Loading ? (
                <CustomLoader />
            ) : (
                <section className={styles.container}>
                    <h3 style={{ marginLeft: 30, marginTop: 30, color: 'black', fontWeight: 'lighter' }}>Reporting</h3>
                    <Box
                        className={styles.addDashboardContainer}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                marginLeft: "30px",
                                color: 'white',
                                fontWeight: 'lighter',
                                textTransform: 'none',
                                fontSize: '16px',
                            }}
                        // onClick={() => alert("Add Dashboard")}
                        >
                            + Add dashboard
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#ffffff !important",
                            // border: "1px solid red",
                            background: "#ffffff !important"
                        }}
                    >
                        <Box
                            sx={{
                                borderBottom: "1px solid rgb(203, 203, 208)",
                                marginTop: "25px",
                                width: "96%",
                                backgroundColor: "#ffffff !important",
                                // border: "1px solid red",
                                background: "#ffffff !important",
                            }}
                        >
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
                                sx={{
                                    backgroundColor: "#ffffff !important",
                                    // border: "1px solid red",
                                    background: "#ffffff !important",
                                }}
                            >
                                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"
                                    sx={{
                                        backgroundColor: "#ffffff !important",
                                        // border: "1px solid red",
                                        background: "#ffffff !important",
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            // marginTop: "5px",
                                            color: 'black',
                                            fontWeight: 'lighter',
                                            // lineHeight: "1.8px",
                                        }}
                                    >
                                        Recents
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{
                                        backgroundColor: "#ffffff !important",
                                        // border: "1px solid red",
                                        background: "#ffffff !important",
                                    }}
                                >
                                    <MotionGrid container spacing={4} variants={containerVariants}>
                                        {dashboardList.map((reportingDashboard, index) => (
                                            <Grid item xs={12} sm={4} key={index}>
                                                <ScrollTriggerAnimation key={index} animationVariants={scrollVariants}>
                                                    <MotionPaper
                                                        elevation={3}
                                                        sx={{
                                                            p: 4,
                                                            // backgroundColor: '#E5F0FF',
                                                            backgroundColor: 'white',
                                                            borderRadius: "10px",
                                                            boxShadow: "none",
                                                            border: "1px solid rgb(203, 203, 208)",
                                                            cursor: "pointer",
                                                            transition: "all 0.1s ease-in-out",
                                                            "&:hover": {
                                                                // backgroundColor: '#E5F0FF',
                                                                // backgroundColor: '#4573d2',
                                                                // color: 'white',
                                                                border: "1px solid #4573d2",
                                                                transition: "all 0.1s ease-in-out",
                                                            }
                                                        }}
                                                        onClick={() => {
                                                            const targetUrl = `/reportDetails/${reportingDashboard.title}/${reportingDashboard.dashboardID}`;
                                                            router.push(targetUrl, undefined, { shallow: true });
                                                        }}
                                                        variants={itemVariants}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection: "row"
                                                            }}
                                                        >
                                                            <Box sx={{ width: "20%" }}>
                                                                <Box
                                                                    sx={{
                                                                        // backgroundColor: '#E5F0FF',
                                                                        backgroundColor: '#4573d2',
                                                                        width: "70px",
                                                                        height: "60px",
                                                                        borderRadius: "10px",
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                        alignItems: "center"
                                                                    }}
                                                                >
                                                                    {reportingDashboard.icon}
                                                                </Box>
                                                            </Box>
                                                            <Typography
                                                                variant="h5"
                                                                sx={{
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    marginLeft: 4,
                                                                    width: "80%"
                                                                }}
                                                            >
                                                                {reportingDashboard.title}
                                                            </Typography>
                                                        </Box>
                                                        <br />

                                                        <Typography
                                                            sx={{
                                                                marginBottom: 3,
                                                                display: '-webkit-box',
                                                                WebkitBoxOrient: 'vertical',
                                                                WebkitLineClamp: 3,
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                            }}
                                                        >
                                                            {reportingDashboard.description}
                                                        </Typography>

                                                        <hr />
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                marginTop: 3
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    backgroundColor: '#f9aaef',
                                                                    width: "40px",
                                                                    height: "40px",
                                                                    borderRadius: "50%",
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    fontSize: "18px"
                                                                }}
                                                            >
                                                                MB
                                                            </Box>
                                                            <Typography
                                                                variant="h6"
                                                                sx={{
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    marginLeft: 3,
                                                                    fontWeight: 'lighter',
                                                                }}
                                                            >
                                                                owned by {reportingDashboard.createdBy}
                                                            </Typography>
                                                            <Typography
                                                                variant="h6"
                                                                sx={{
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    marginLeft: 3,
                                                                    fontWeight: 'lighter',
                                                                    fontSize: "16px"
                                                                }}
                                                            >
                                                                {new Date(reportingDashboard.createdAt).toDateString()}
                                                            </Typography>
                                                        </Box>
                                                    </MotionPaper>
                                                </ScrollTriggerAnimation>
                                            </Grid>
                                        ))}
                                    </MotionGrid>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Box>
                </section>
            )}
        </div>
    );
}
export default Reporting;