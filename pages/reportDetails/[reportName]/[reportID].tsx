import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';

// Importing Icons
import { CiTimer } from "react-icons/ci";
import { AiOutlineMail, AiOutlinePlus } from "react-icons/ai";
import { BsCheckCircle, BsTriangle } from "react-icons/bs";
import { TbListDetails, TbSquareRotated } from "react-icons/tb";
import { SlLink } from "react-icons/sl";

import DatePicker from 'react-date-picker/dist/entry.nostyle';

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

import {
    onAuthStateChanged,
} from "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from "../../../firebase";
import CustomLoader from '@app/components/CustomLoader';
import HeaderReportDetails from '@app/components/HeaderReportDetails';
import Navbar from '@app/components/Navbar';
import Sidebar from '@app/components/Sidebar';

// Importing Material ui
import {
    Button,
    Grid
} from '@mui/material';

import StatReportIndividual from '@app/components/ReportDetails/StatReportIndividual';
import GraphReportIndividual from '@app/components/ReportDetails/GraphReportIndividual';

// Importing Styles
import styles from './style.module.css';

const currentDate = new Date();

const ReportDetailsComp = () => {

    const router = useRouter();
    const { reportName, reportID } = router.query;

    const [taskDue, setTaskDue] = useState<any>(currentDate);

    const statReportData = [
        {
            reportTitle: "Total Tasks",
            reportValue: "15",
            reportIcon: <TbListDetails size={30} />,
            reportColor: "#FFC107",
        },
        {
            reportTitle: "Completed Tasks",
            reportValue: "5",
            reportIcon: <BsCheckCircle size={30} />,
            reportColor: "#4CAF50",
        },
        {
            reportTitle: "Incomplete Tasks",
            reportValue: "5",
            reportIcon: <TbSquareRotated size={30} />,
            reportColor: "#F44336"
        },
        {
            reportTitle: "Overdue Tasks",
            reportValue: "5",
            reportIcon: <BsTriangle size={30} />,
            reportColor: "#FF9800"
        }
    ];

    // reportTitle: string;
    // reportData: any;
    // graphType: string;
    // reportColor: string;
    // reportDescription: string;

    const graphReportData = [
        {
            reportTitle: "Incomplete tasks by project",
            reportData: [
                {
                    name: "FYP",
                    value: 5,
                },
                {
                    name: "Water Management",
                    value: 5,
                },
                {
                    name: "Smart Parking",
                    value: 5,
                },
            ],
            graphType: "line",
            reportColor: "#FFC107",
            reportDescription: "This graph shows the number of incomplete tasks in each project.",
        },
        {
            reportTitle: "Incomplete tasks by priority",
            reportData: [
                {
                    name: "High",
                    value: 5,
                },
                {
                    name: "Medium",
                    value: 5,
                },
                {
                    name: "Low",
                    value: 5,
                },
            ],
            graphType: "bar",
            reportColor: "#4CAF50",
            reportDescription: "This graph shows the number of incomplete tasks in each priority.",
        },
        {
            reportTitle: "Incomplete tasks by assignee",
            reportData: [
                {
                    name: "Ali",
                    value: 5,
                },
                {
                    name: "Ahmed",
                    value: 5,
                },
                {
                    name: "Usman",
                    value: 5,
                },
            ],
            graphType: "pie",
            reportColor: "#F44336",
            reportDescription: "This graph shows the number of incomplete tasks in each assignee.",
        },
        {
            reportTitle: "Incomplete tasks by due date",
            reportData: [
                {
                    name: "Today",
                    value: 5,
                },
                {
                    name: "Tomorrow",
                    value: 5,
                },
                {
                    name: "Next Week",
                    value: 5,
                },
            ],
            graphType: "radar",
            reportColor: "#FF9800",
            reportDescription: "This graph shows the number of incomplete tasks in each due date.",
        }
    ];

    const [firestoreData, setFirestoreData] = useState<any>([]);
    const [status, setStatus] = useState<Boolean>(false);
    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    const [isSignedIn, setIsSignedIn] = useState<Boolean>(false);

    useEffect(() => {

        // console.log("Current Path : ", window.location.pathname);
        // console.log("activeJobs ==>", activeJobs);

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
                    } else {
                        console.log(user);
                        setSignedInUserData(user);
                    }
                    setIsSignedIn(true);
                    // ...
                }
            } else {
                // User is signed out
                console.log("User is signed out");
                // alert("Please sign in to continue");
                // navigate("/login");
                // ...
            }
        });
    }, [signedInUserData, isSignedIn]);

    return (
        <div className={styles.container}>
            {(isSignedIn) ? (
                <div className={styles.container}>
                    <header className={`fixed-top ${styles.header}`}>
                        <HeaderReportDetails
                            reportID={reportID}
                            email={signedInUserData.email}
                            reportName={reportName}
                            photoURL={signedInUserData.photoURL}
                        />
                    </header>

                    <div className='pl-5 border-t-[1px] border-[#edebea] border-b-[1px] border-solid'>
                        <Button
                            variant="contained"
                            className="mt-3 mb-3"
                            style={{
                                backgroundColor: "#4573d2",
                                color: "#ffffff",
                                fontWeight: 400,
                                fontSize: 14,
                                textTransform: "none",
                                borderRadius: 5,
                                padding: "10px 20px",
                                boxShadow: "none",
                                height: "35px",
                            }}
                        >
                            <AiOutlinePlus className="mr-2" />
                            Add Chart
                        </Button>
                    </div>

                    <div style={{ width: "95%", marginLeft: "2.5%", marginTop: 25 }}>
                        <Grid container spacing={3}>
                            {statReportData.map((report: any, index: number) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <StatReportIndividual
                                        reportTitle={report.reportTitle}
                                        reportValue={report.reportValue}
                                        reportIcon={report.reportIcon}
                                        reportColor={report.reportColor}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        <Grid container spacing={3} style={{ marginTop: -50 }}>
                            {graphReportData.map((report: any, index: number) => (
                                <Grid item xs={12} sm={6} md={6} key={index}>
                                    <GraphReportIndividual
                                        reportTitle={report.reportTitle}
                                        reportData={report.reportData}
                                        graphType={report.graphType}
                                        reportColor={report.reportColor}
                                        reportDescription={report.reportDescription}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                    </div>
                </div>
            ) : (
                <CustomLoader />
            )
            }
        </div >
    )
}

interface MainContentProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    currentMenuItem: number;
    setCurrentMenuItem: (value: number) => void;
    signedInUserData: { email: string };
    width: number;
    height: number;
}

const ReportDetails: React.FC<MainContentProps> = (
    {
        isOpen,
        setIsOpen,
        currentMenuItem,
        setCurrentMenuItem,
        signedInUserData,
        width,
        height
    }) => {
    return (
        <div>
            <Head>
                <title>Profile - TaskEncher (Supercharge Your Workflow and Amplify Task Management) </title>
                <meta charSet="utf-8" lang='en' />
                <meta name="description" content="Project Management Software" />
                <link rel="icon" href="/logocopy.ico" />
            </Head>
            <main className={styles.main}>
                <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="d-flex">
                    <Sidebar currentMenuItem={currentMenuItem} setCurrentMenuItem={setCurrentMenuItem} isOpen={isOpen} setIsOpen={setIsOpen} />

                    <div style={{ marginTop: 70 }} className={`${styles.rightSideContainer} ${isOpen ? styles.shrinkContainer : styles.expandContainer}`}>
                        <ReportDetailsComp />
                    </div>
                </div>
            </main>
        </div>
    )
}
export default ReportDetails;
