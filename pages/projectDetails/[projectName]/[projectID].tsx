import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import styles from './style.module.css';

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
import CustomLoader from '../../../components/CustomLoader';
import Overview from '../../../components/ProjectDetails/Overview';
import HeaderProjectDetails from '../../../components/HeaderProjectDetails';
import List from '../../../components/ProjectDetails/List';
import Board from '../../../components/ProjectDetails/Board';
import Timeline from '../../../components/ProjectDetails/Timeline';
import Calender from '../../../components/ProjectDetails/Calender';
import Workflow from '../../../components/ProjectDetails/Workflow';
import Dashboard from '../../../components/ProjectDetails/Dashboard';
import Messages from '../../../components/ProjectDetails/Messages';
import Files from '../../../components/ProjectDetails/Files';

const currentDate = new Date();

const ProjectDetails: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Profile - TaskEncher (Supercharge Your Workflow and Amplify Task Management) </title>
                <meta name="description" content="Project Management Software" />
                <link rel="icon" href="/logocopy.ico" />
            </Head>
        </div>
    )
}

const ProjectDetailsComp = () => {

    const [taskDue, setTaskDue] = useState<any>(currentDate);

    const frequentCollaboratorsList = [
        {
            name: "Bilal Mohib",
            email: "bilalmohib7896@gmail.com",
            photoURL: null
        },
        {
            name: "Arif Alvi",
            email: "arifalvi@gmail.com",
            photoURL: null
        },
        {
            name: "Imran Khan",
            email: "imrankhan@gmail.com",
            photoURL: null
        },
        {
            name: "Nawaz Sharif",
            email: "nawazsharif@gmail.com",
            photoURL: null
        },
        {
            name: "Asif Ali Zardari",
            email: "asifalizardari@gmail.com",
            photoURL: null
        }
    ]

    const router = useRouter();

    const { projectName, projectID } = router.query;

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

    const [selectedTabItemValue, setSelectedTabItemValue] = useState<Number>(1);

    const [projectTitle, setProjectTitle] = useState<string>("");

    return (
        <div className={styles.container}>
            {(isSignedIn) ? (
                <div className={styles.container}>
                    <header className={`fixed-top ${styles.header}`}>
                        <HeaderProjectDetails
                            setProjectTitle={setProjectTitle}
                            projectID={projectID}
                            email={signedInUserData.email}
                            projectTitle={projectTitle}
                            photoURL={signedInUserData.photoURL}
                            selectedTabItemValue={selectedTabItemValue}
                            setSelectedTabItemValue={setSelectedTabItemValue} />
                    </header>

                    <div className={styles.mainContainer}>
                        {(selectedTabItemValue === 1) ? (
                            <Overview photoURL={signedInUserData.photoURL} />
                        ) : (selectedTabItemValue === 2) ? (
                            <List
                                email={signedInUserData.email}
                                projectName={projectName}
                                projectID={projectID}
                            />
                        ) : (selectedTabItemValue === 3) ? (
                            <Board />
                        ) : (selectedTabItemValue === 4) ? (
                            <Timeline />
                        ) : (selectedTabItemValue === 5) ? (
                            <Calender />
                        ) : (selectedTabItemValue === 6) ? (
                            <Workflow />
                        ) : (selectedTabItemValue === 7) ? (
                            <Dashboard />
                        ) : (selectedTabItemValue === 8) ? (
                            <Messages />
                        ) : (selectedTabItemValue === 9) ? (
                            <Files />
                        ) : (
                            <>Please Select the correct tab</>
                        )}
                    </div>
                </div>
            ) : (
                <CustomLoader />
            )}
        </div>
    )
}

export {
    ProjectDetails as default,
    ProjectDetailsComp
}
