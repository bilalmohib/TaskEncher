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
import CustomModal from '@app/components/CustomModal';
import Overview from '@app/components/ProjectDetails/Overview';
import HeaderProjectDetails from '@app/components/HeaderProjectDetails';
import List from '@app/components/ProjectDetails/List';
import Board from '@app/components/ProjectDetails/Board';
import Timeline from '@app/components/ProjectDetails/Timeline';
import Calender from '@app/components/ProjectDetails/Calender';
import Workflow from '@app/components/ProjectDetails/Workflow';
import Dashboard from '@app/components/ProjectDetails/Dashboard';
import Messages from '@app/components/ProjectDetails/Messages';
import Files from '@app/components/ProjectDetails/Files';
import Navbar from '@app/components/Navbar';
import Sidebar from '@app/components/Sidebar';
import CustomLoader from '@app/components/CustomLoader';

const currentDate = new Date();

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

                    <div>
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

interface MainContentProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    currentMenuItem: number;
    setCurrentMenuItem: (value: number) => void;
    signedInUserData: { email: string };
    width: number;
    height: number;
}

const ProjectDetails: React.FC<MainContentProps> = (
    {
        isOpen,
        setIsOpen,
        currentMenuItem,
        setCurrentMenuItem,
        signedInUserData,
        width,
        height
    }) => {

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////

    const email = signedInUserData.email;

    let q = query(collection(db, "Data", "Projects", email));

    const [snapshot, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    const [projects, setProjects] = useState<any>([]);

    const [projectStages, setProjectStages] = useState<any>([]);

    const [projectMembers, setProjectMembers] = useState<any>([]);

    // FOR GETTING PROJECTS
    useEffect(() => {

        if (!loading && snapshot && email) {
            let localObj;

            let arrProjects = snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            // Extract all the project members from the projects array
            setProjects(arrProjects);
            // @ts-ignore
            setProjectStages(localObj?.ProjectStages);
            // @ts-ignore
            setProjectMembers(localObj?.ProjectMembers);

            // console.clear();
            console.log("Projects ==> ", snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            console.log("Project Details ==> ", localObj);
            // @ts-ignore
            console.log("Project Stages ==> ", localObj?.ProjectStages);
            // @ts-ignore
            console.log("Project Members ==> ", localObj?.ProjectMembers);
            // }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, snapshot]);
    // FOR GETTING PROJECTS

    return (
        <div>
            <Head>
                <title>Project Details - TaskEncher (Supercharge Your Workflow and Amplify Task Management) </title>
                <meta charSet="utf-8" lang='en' />
                <meta name="description" content="Project Management Software" />
                <link rel="icon" href="/logocopy.ico" />
            </Head>
            <main className={styles.main}>
                <div style={{ position: "relative", zIndex: "100 !important" }}>
                    <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
                <div className="d-flex">
                    <div className='z-50'>
                        <Sidebar
                            currentMenuItem={currentMenuItem}
                            setCurrentMenuItem={setCurrentMenuItem}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            projectMembers={projectMembers}
                            signedInUserData={signedInUserData}
                            projectList={projects}
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                        />
                    </div>

                    <div style={{ marginTop: 70, zIndex: "1 !important" }} className={`${styles.rightSideContainer} ${isOpen ? styles.shrinkContainer : styles.expandContainer}`}>
                        <ProjectDetailsComp />
                    </div>
                </div>
            </main>

            <CustomModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                modalType='inviteMembers'
                title='Invite Members'
            />

        </div>
    )
}

export default ProjectDetails;
